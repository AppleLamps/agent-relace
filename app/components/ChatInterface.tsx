'use client';

import { useState, useRef, useEffect } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import SettingsModal from './SettingsModal';
import { MODEL_CONFIG } from '../lib/constants';

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

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
      title="Copy response"
      aria-label={copied ? 'Copied to clipboard' : 'Copy response to clipboard'}
    >
      {copied ? (
        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

export default function ChatInterface({ repoId, githubUrl, onDisconnect }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(MODEL_CONFIG.PRIMARY_MODEL);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    textareaRef.current?.focus();
  };

  const handleClearChat = () => {
    setMessages([]);
    setError('');
  };

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
          model: selectedModel, // Pass selected model
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
    <div className="flex flex-col h-screen bg-gray-50/50">
      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        currentModel={selectedModel}
        onModelChange={setSelectedModel}
      />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-100 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">Relace Chat</h1>
            <p className="text-xs text-gray-400 truncate max-w-md font-mono">{githubUrl}</p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {messages.length > 0 && (
              <button
                onClick={handleClearChat}
                className="p-2 text-gray-600 hover:text-red-600 border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all duration-200"
                aria-label="Clear chat"
                title="Clear chat"
                disabled={loading}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              aria-label="Settings"
              title="Settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <button
              onClick={onDisconnect}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 && !loading && (
            <div className="text-center mt-20 px-4">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-900 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                Welcome to Relace Chat
              </h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm">
                Ask me anything about your codebase. I can help with code reviews, explanations, bug fixes, and more.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {[
                  'Review my latest changes',
                  'Explain how authentication works',
                  'Find potential bugs in the codebase',
                  'Suggest improvements for performance',
                ].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-4 text-sm text-left text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    <span className="block font-medium">{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-red-900 mb-1">Error</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >
              {/* Only render if user message OR assistant message has content */}
              {(msg.role === 'user' || msg.content) && (
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-2xl ${msg.role === 'user'
                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/10 p-5'
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 relative group'
                    }`}
                >
                  {msg.role === 'assistant' && (
                    <CopyButton content={msg.content} />
                  )}
                  <div className={msg.role === 'assistant' ? 'p-5' : ''}>
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">{msg.content}</p>
                    ) : (
                      <div className="prose prose-sm max-w-none prose-gray">
                        <MarkdownRenderer content={msg.content} />
                      </div>
                    )}
                    {msg.relevantFiles && msg.relevantFiles.length > 0 && (
                      <div className={`mt-4 pt-3 text-xs border-t ${msg.role === 'user' ? 'text-gray-300 border-gray-700' : 'text-gray-400 border-gray-100'
                        }`}>
                        <p className="font-medium mb-2 uppercase tracking-wide text-[10px]">Referenced files</p>
                        <ul className="space-y-1">
                          {msg.relevantFiles.slice(0, 5).map((file, i) => (
                            <li key={i} className="truncate font-mono text-[11px] opacity-80">{file.filename}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && messages.length > 0 && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <p className="text-gray-500 text-sm">Thinking...</p>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Input Form */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent pointer-events-none">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto pointer-events-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-900/5 border border-gray-200 overflow-hidden">
            <div className="flex gap-2 p-2 items-end">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your codebase..."
                className="flex-1 px-4 py-3 bg-transparent focus:outline-none text-gray-900 placeholder-gray-400 text-[15px] resize-none min-h-[52px] max-h-[200px]"
                rows={1}
                disabled={loading}
                aria-label="Message input"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed font-medium transition-all duration-200 text-sm shadow-lg shadow-gray-900/20 flex-shrink-0"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
            <div className="px-4 pb-2.5 text-xs text-gray-400">
              Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600 font-mono">Shift+Enter</kbd> for new line
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

