import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { getRelaceClient, extractRelaceError } from '../../lib/relace-client';
import { validateUUID } from '../../lib/validation';

// Initialize OpenRouter client (OpenAI-compatible API)
function getOpenRouterClient(): OpenAI {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not configured');
  }
  
  return new OpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000',
      'X-Title': 'Relace Chat',
    },
  });
}

/**
 * Retry function with exponential backoff
 * Useful for handling 404 errors when repository is still indexing
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      const { status } = extractRelaceError(error);
      
      // Only retry on 404 errors (repository not indexed yet)
      if (status === 404 && attempt < maxRetries) {
        const delay = initialDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw error;
    }
  }
  
  throw lastError;
}

interface RetrieveResult {
  results: Array<{
    filename: string;
    content?: string;
    score: number;
  }>;
  hash: string;
  pending_embeddings: number;
}

export async function POST(request: Request) {
  try {
    // Initialize clients
    const relaceClient = getRelaceClient();
    const openrouter = getOpenRouterClient();

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { repoId, message, conversationHistory = [], stream = false } = body;
    
    // Validate inputs
    if (!repoId || typeof repoId !== 'string') {
      return NextResponse.json(
        { error: 'repoId is required and must be a string' },
        { status: 400 }
      );
    }
    
    if (!validateUUID(repoId)) {
      return NextResponse.json(
        { error: 'Invalid repoId format. Expected UUID.' },
        { status: 400 }
      );
    }
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'message is required and must be a non-empty string' },
        { status: 400 }
      );
    }
    
    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'message is too long. Maximum length is 5000 characters.' },
        { status: 400 }
      );
    }
    
    // Validate conversation history format
    if (conversationHistory && !Array.isArray(conversationHistory)) {
      return NextResponse.json(
        { error: 'conversationHistory must be an array' },
        { status: 400 }
      );
    }
    
    // Step 1: Use Relace semantic retrieval to find relevant code
    // Retry on 404 errors (repository might still be indexing)
    // Using larger token limit since Grok-4.1-fast supports 2M context
    const retrievalResult = await retryWithBackoff<RetrieveResult>(
      () => relaceClient.repo.retrieve(repoId, {
        query: message,
        include_content: true,
        token_limit: 500000, // Increased for Grok's 2M context window
        score_threshold: 0.3,
      })
    );
    
    // Check if embeddings are still pending
    if (retrievalResult.pending_embeddings > 0) {
      console.warn(`Warning: ${retrievalResult.pending_embeddings} embeddings still pending for repo ${repoId}`);
    }
    
    // Step 2: Build context from retrieved files
    const codeContext = retrievalResult.results
      .filter(file => file.content) // Only include files with content
      .map(file => `// File: ${file.filename}\n${file.content}`)
      .join('\n\n---\n\n');
    
    // Step 3: Create system prompt with code context
    const systemPrompt = `You are a helpful AI assistant that answers questions about codebases. 
You have access to relevant code files from the repository. Use this context to provide accurate, 
detailed answers. If the user asks about code that isn't in the context, let them know you need 
more information.

When referencing code, mention the file names. Be concise but thorough.

Relevant code files:
${codeContext || 'No relevant files found. Please try rephrasing your question.'}`;
    
    // Step 4: Build conversation messages
    // Validate and sanitize conversation history
    const sanitizedHistory = (conversationHistory || [])
      .filter((msg: any) => 
        msg && 
        typeof msg === 'object' && 
        (msg.role === 'user' || msg.role === 'assistant') &&
        typeof msg.content === 'string'
      )
      .slice(-50); // Increased limit for Grok's large context window
    
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt },
      ...sanitizedHistory,
      { role: 'user', content: message },
    ];
    
    // Step 5: Call OpenRouter with Grok-4.1-fast
    // Configure with fallbacks and zero completion insurance
    const completionOptions: any = {
      model: 'x-ai/grok-4.1-fast',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 30000, // Grok-4.1-fast supports 30k output tokens
      // Model fallbacks for reliability
      fallbacks: [
        'anthropic/claude-3.5-sonnet',
        'openai/gpt-4-turbo',
        'google/gemini-pro-1.5'
      ],
      // Zero completion insurance - ensures response completes even if model fails
      // This is handled by OpenRouter automatically when using fallbacks
    };

    // Handle streaming vs non-streaming
    if (stream) {
      completionOptions.stream = true;
      
      // Create a streaming response
      const completionStream = await openrouter.chat.completions.create(completionOptions);
      
      // Create a ReadableStream for SSE
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            // Send initial metadata
            const metadata = {
              type: 'metadata',
              relevantFiles: retrievalResult.results.map((f) => ({
                filename: f.filename,
                score: f.score,
              })),
              pendingEmbeddings: retrievalResult.pending_embeddings,
            };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(metadata)}\n\n`));
            
            // Stream the response
            for await (const chunk of completionStream) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'content', content })}\n\n`));
              }
            }
            
            // Send completion signal
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
            controller.close();
          } catch (error: any) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`));
            controller.close();
          }
        },
      });
      
      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Non-streaming response
      const completion = await openrouter.chat.completions.create(completionOptions);
      
      const response = completion.choices[0].message.content;
      
      if (!response) {
        throw new Error('OpenRouter returned an empty response');
      }
      
      // Step 6: Return response with metadata
      return NextResponse.json({
        response,
        relevantFiles: retrievalResult.results.map((f) => ({
          filename: f.filename,
          score: f.score,
        })),
        tokenUsage: completion.usage,
        pendingEmbeddings: retrievalResult.pending_embeddings,
      });
    }
  } catch (error: any) {
    console.error('Error in chat:', error);
    
    // Extract structured error information
    const { code, message: errorMessage, status } = extractRelaceError(error);
    
    // Handle specific error cases
    if (status === 401) {
      return NextResponse.json(
        { error: 'Authentication failed. Please check your API keys.' },
        { status: 401 }
      );
    }
    
    if (status === 403) {
      return NextResponse.json(
        { error: 'Insufficient permissions. Please check your API key permissions.' },
        { status: 403 }
      );
    }
    
    if (status === 404) {
      return NextResponse.json(
        { error: 'Repository not found or not indexed yet. Please wait a moment and try again.' },
        { status: 404 }
      );
    }
    
    if (status === 423) {
      return NextResponse.json(
        { error: 'Repository is temporarily locked. Please try again in a moment.' },
        { status: 423 }
      );
    }
    
    if (status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Handle OpenRouter/OpenAI API errors
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { 
          error: error.message || 'OpenRouter API error',
          code: error.code || undefined,
        },
        { status: error.status || 500 }
      );
    }
    
    // Generic error response
    return NextResponse.json(
      { 
        error: errorMessage || 'Failed to process chat',
        code: code !== 'unknown_error' ? code : undefined,
      },
      { status: status >= 400 && status < 600 ? status : 500 }
    );
  }
}

