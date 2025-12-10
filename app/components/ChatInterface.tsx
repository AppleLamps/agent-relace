'use client';

import { useState, useRef, useEffect } from 'react';
import MarkdownRenderer from './MarkdownRenderer';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  relevantFiles?: Array<{ filename: string; score: number }>;
}

interface ChatInterfaceProps {
  repoId: string;
  githubUrl: string;
  onDisconnect: () => void;
}

export default function ChatInterface({ repoId, githubUrl, onDisconnect }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    setError('');

    // Create a placeholder message for streaming (after user message is added)
    const streamingMessageId = messages.length + 1;
    let streamingContent = '';
    let relevantFiles: Array<{ filename: string; score: number }> = [];
    
    // Initialize placeholder assistant message
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: '',
        relevantFiles: [],
      },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repoId,
          message: currentInput,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          stream: true, // Enable streaming
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'metadata') {
                relevantFiles = data.relevantFiles || [];
              } else if (data.type === 'content') {
                streamingContent += data.content;
                // Update the streaming message in real-time
                setMessages((prev) => {
                  const updated = [...prev];
                  if (updated[streamingMessageId]) {
                    updated[streamingMessageId] = {
                      ...updated[streamingMessageId],
                      content: streamingContent,
                      relevantFiles,
                    };
                  } else {
                    // Create new assistant message if it doesn't exist
                    updated.push({
                      role: 'assistant',
                      content: streamingContent,
                      relevantFiles,
                    });
                  }
                  return updated;
                });
              } else if (data.type === 'done') {
                // Streaming complete
                break;
              } else if (data.type === 'error') {
                throw new Error(data.error || 'Streaming error');
              }
            } catch (parseError) {
              // Skip invalid JSON lines
              continue;
            }
          }
        }
      }

      // Finalize the message
      setMessages((prev) => {
        const updated = [...prev];
        if (updated[streamingMessageId]) {
          updated[streamingMessageId] = {
            ...updated[streamingMessageId],
            content: streamingContent,
            relevantFiles,
          };
        } else {
          updated.push({
            role: 'assistant',
            content: streamingContent,
            relevantFiles,
          });
        }
        return updated;
      });
    } catch (error: any) {
      setError(error.message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, I encountered an error: ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Relace Chat</h1>
            <p className="text-sm text-gray-500 truncate max-w-md">{githubUrl}</p>
          </div>
          <button
            onClick={onDisconnect}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-lg mb-2">👋 Welcome!</p>
              <p>Ask me anything about your codebase.</p>
              <p className="text-sm mt-2">Try: &quot;How does authentication work?&quot; or &quot;Show me the main entry point&quot;</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 shadow-sm border'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <MarkdownRenderer content={msg.content} />
                  </div>
                )}
                {msg.relevantFiles && msg.relevantFiles.length > 0 && (
                  <div className={`mt-3 text-xs ${
                    msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    <p className="font-semibold mb-1">Referenced files:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {msg.relevantFiles.slice(0, 5).map((file, i) => (
                        <li key={i} className="truncate">{file.filename}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                  <p className="text-gray-600">Thinking...</p>
                </div>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              {error}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white border-t p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your codebase..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

