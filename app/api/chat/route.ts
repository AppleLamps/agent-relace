import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { getRelaceClient, extractRelaceError } from '../../lib/relace-client';
import { validateUUID, sanitizeUserInput, detectInjectionPatterns } from '../../lib/validation';
import { RETRIEVAL_CONFIG, MESSAGE_VALIDATION, MODEL_CONFIG, RETRY_CONFIG, SECURITY_CONFIG, AVAILABLE_MODELS } from '../../lib/constants';
import { buildOptimizedContext } from '../../lib/context-optimizer';

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
      // Use generic referer to avoid exposing internal app structure
      'HTTP-Referer': 'https://relace.ai/',
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
  maxRetries: number = RETRY_CONFIG.MAX_RETRIES,
  initialDelay: number = RETRY_CONFIG.INITIAL_DELAY_MS
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

/**
 * Get max output tokens based on model ID
 */
function getMaxOutputTokens(modelId: string): number {
  const outputLimits: Record<string, number> = {
    'x-ai/grok-4.1-fast': 30000,
    'mistralai/devstral-2512:free': 262000,
    'x-ai/grok-code-fast-1': 10000,
    'openai/gpt-oss-120b:exacto': 131000,
    'minimax/minimax-m2': 130000,
  };
  return outputLimits[modelId] || MODEL_CONFIG.MAX_OUTPUT_TOKENS;
}

interface RetrieveResult {
  results: Array<{
    filename: string;
    content?: string | null;
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
        { error: 'Invalid JSON in request body.' },
        { status: 400 }
      );
    }

    const { repoId, message, conversationHistory = [], stream = false, model } = body;

    // Validate model if provided
    const validModelIds = AVAILABLE_MODELS.map(m => m.id);
    const selectedModel = model && validModelIds.includes(model) ? model : MODEL_CONFIG.PRIMARY_MODEL;

    // Validate inputs
    if (!repoId || typeof repoId !== 'string') {
      return NextResponse.json(
        { error: 'repoId is required and must be a string.' },
        { status: 400 }
      );
    }

    if (!validateUUID(repoId).valid) {
      return NextResponse.json(
        { error: 'Invalid repoId format. Expected UUID.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string.' },
        { status: 400 }
      );
    }

    if (message.length > MESSAGE_VALIDATION.MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message is too long. Maximum length is ${MESSAGE_VALIDATION.MAX_MESSAGE_LENGTH} characters.` },
        { status: 400 }
      );
    }

    // Detect potential injection attacks
    const injectionCheck = detectInjectionPatterns(message);
    if (injectionCheck.detected) {
      console.warn(`Potential injection attack detected: ${injectionCheck.pattern}`);
      return NextResponse.json(
        { error: 'Invalid message format. Message appears to contain suspicious patterns.' },
        { status: 400 }
      );
    }

    // Validate conversation history format
    if (conversationHistory && !Array.isArray(conversationHistory)) {
      return NextResponse.json(
        { error: 'conversationHistory must be an array.' },
        { status: 400 }
      );
    }

    // Step 1: Use Relace semantic retrieval to find relevant code
    // Retry on 404 errors (repository might still be indexing)
    const retrievalResult = await retryWithBackoff<RetrieveResult>(
      () => relaceClient.repo.retrieve(repoId, {
        query: message,
        include_content: true,
        token_limit: RETRIEVAL_CONFIG.TOKEN_LIMIT,
        score_threshold: RETRIEVAL_CONFIG.SCORE_THRESHOLD,
      })
    );

    // Check if embeddings are still pending
    if (retrievalResult.pending_embeddings > 0) {
      console.warn(`Warning: ${retrievalResult.pending_embeddings} embeddings still pending for repo ${repoId}`);
    }

    // Normalize null contents to undefined for downstream helpers
    const normalizedResults = retrievalResult.results.map((result) => ({
      ...result,
      content: result.content ?? undefined,
    }));

    // Step 2: Build optimized context from retrieved files
    // Uses intelligent file selection and sizing for large repositories
    const optimizedContextResult = buildOptimizedContext(normalizedResults, {
      maxFiles: RETRIEVAL_CONFIG.MAX_CONTEXT_FILES,
      softLimit: RETRIEVAL_CONFIG.SOFT_CONTEXT_LIMIT,
      hardLimit: RETRIEVAL_CONFIG.HARD_CONTEXT_LIMIT,
    });

    if (optimizedContextResult.wasTruncated) {
      console.info(`Context truncated: ${optimizedContextResult.truncationReason}. Files: ${optimizedContextResult.filesIncluded}, Characters: ${optimizedContextResult.totalCharacters}`);
    }

    const codeContext = optimizedContextResult.context;

    // Step 3: Create system prompt with code context
    // Escape special characters in code context to prevent prompt injection
    const escapedCodeContext = (codeContext || 'No relevant files found. Please try rephrasing your question.')
      .replace(/```/g, '\\`\\`\\`') // Escape markdown code blocks
      .replace(/\$/g, '\\$'); // Escape dollar signs that might trigger special patterns

    const systemPrompt = `You are a helpful AI assistant that answers questions about codebases. 
You have access to relevant code files from the repository. Use this context to provide accurate, 
detailed answers. If the user asks about code that isn't in the context, let them know you need 
more information.

When referencing code, mention the file names. Be concise but thorough.

Relevant code files:
${escapedCodeContext}`;

    // Step 4: Build conversation messages
    // Validate and sanitize conversation history
    const sanitizedHistory = (conversationHistory || [])
      .filter((msg: any) =>
        msg &&
        typeof msg === 'object' &&
        (msg.role === 'user' || msg.role === 'assistant') &&
        typeof msg.content === 'string' &&
        msg.content.length > 0
      )
      .map((msg: any) => ({
        role: msg.role,
        // Sanitize content to prevent injection attacks
        content: msg.role === 'user' ? sanitizeUserInput(msg.content) : msg.content,
      }))
      .slice(-RETRIEVAL_CONFIG.MAX_CONVERSATION_HISTORY);

    // Verify total conversation history doesn't exceed safe limits
    const totalHistoryLength = sanitizedHistory.reduce((sum: number, msg: any) => sum + msg.content.length, 0);
    if (totalHistoryLength > SECURITY_CONFIG.MAX_HISTORY_CONTENT_LENGTH) {
      console.warn(`Conversation history exceeds safe content length limit: ${totalHistoryLength}`);
      return NextResponse.json(
        { error: 'Conversation history is too large. Please start a new conversation.' },
        { status: 400 }
      );
    }

    // Sanitize the current user message
    const sanitizedMessage = sanitizeUserInput(message);

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: systemPrompt },
      ...sanitizedHistory,
      { role: 'user', content: sanitizedMessage },
    ];

    // Get model-specific output limits
    const modelConfig = AVAILABLE_MODELS.find(m => m.id === selectedModel);
    const maxOutputTokens = getMaxOutputTokens(selectedModel);

    // Step 5: Call OpenRouter with model configuration
    const completionOptions: any = {
      model: selectedModel,
      messages: messages as any,
      temperature: MODEL_CONFIG.TEMPERATURE,
      max_tokens: maxOutputTokens,
      fallbacks: MODEL_CONFIG.FALLBACK_MODELS,
    };

    // Handle streaming vs non-streaming
    if (stream) {
      completionOptions.stream = true;

      // Create a streaming response
      const completionStream = await openrouter.chat.completions.create(completionOptions);
      const streamIterable = completionStream as unknown as AsyncIterable<any>;

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
            let hasContent = false;
            for await (const chunk of streamIterable) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                hasContent = true;
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'content', content })}\n\n`));
              }
            }

            // Handle empty response gracefully
            if (!hasContent) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'content', content: '(No response generated. Please try rephrasing your question.)' })}\n\n`));
            }

            // Send completion signal
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
            controller.close();
          } catch (error: any) {
            // Send error but keep connection alive for proper cleanup
            const errorMessage = error.message || 'An error occurred during streaming';
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'error', error: errorMessage })}\n\n`));
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

      // Gracefully handle empty responses with a placeholder
      const finalResponse = response || '(No response generated. Please try rephrasing your question.)';

      // Step 6: Return response with metadata
      return NextResponse.json({
        response: finalResponse,
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
          error: error.message || 'OpenRouter API error.',
          code: error.code || undefined,
        },
        { status: error.status || 500 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        error: errorMessage || 'Failed to process chat.',
        code: code !== 'unknown_error' ? code : undefined,
      },
      { status: status >= 400 && status < 600 ? status : 500 }
    );
  }
}

