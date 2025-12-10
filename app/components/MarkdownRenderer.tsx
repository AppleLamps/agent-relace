'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopy = async (code: string, codeId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCodeId(codeId);
      setTimeout(() => setCopiedCodeId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Generate a simple hash for code block identification
  const getCodeId = (code: string): string => {
    return `code-${code.slice(0, 20).replace(/\s/g, '')}-${code.length}`;
  };
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          // Custom code block renderer with syntax highlighting
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeString = String(children).replace(/\n$/, '');
            const codeId = getCodeId(codeString);

            return !inline && match ? (
              <div className="relative my-4 rounded-xl overflow-hidden border border-gray-200">
                <div className="flex items-center justify-between bg-gray-900 px-4 py-2.5">
                  <span className="text-xs text-gray-400 font-mono uppercase tracking-wide">{language}</span>
                  <button
                    onClick={() => handleCopy(codeString, codeId)}
                    className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-800"
                    title="Copy code"
                  >
                    {copiedCodeId === codeId ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <SyntaxHighlighter
                  style={oneDark}
                  language={language}
                  PreTag="div"
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    borderRadius: 0,
                    background: '#1e1e1e',
                    fontSize: '13px',
                    lineHeight: '1.6',
                  }}
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code
                className="bg-gray-100 px-1.5 py-0.5 rounded-md text-[13px] font-mono text-pink-600 font-medium"
                {...props}
              >
                {children}
              </code>
            );
          },
          // Custom link renderer
          a({ node, href, children, ...props }: any) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 font-medium underline underline-offset-2 hover:text-gray-600 transition-colors"
                {...props}
              >
                {children}
              </a>
            );
          },
          // Custom heading renderers
          h1({ node, children, ...props }: any) {
            return (
              <h1 className="text-2xl font-semibold text-gray-900 mt-6 mb-4 tracking-tight" {...props}>
                {children}
              </h1>
            );
          },
          h2({ node, children, ...props }: any) {
            return (
              <h2 className="text-xl font-semibold text-gray-900 mt-5 mb-3 tracking-tight" {...props}>
                {children}
              </h2>
            );
          },
          h3({ node, children, ...props }: any) {
            return (
              <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2 tracking-tight" {...props}>
                {children}
              </h3>
            );
          },
          // Custom list renderers
          ul({ node, children, ...props }: any) {
            return (
              <ul className="list-disc list-outside my-3 space-y-1.5 ml-5 text-gray-700" {...props}>
                {children}
              </ul>
            );
          },
          ol({ node, children, ...props }: any) {
            return (
              <ol className="list-decimal list-outside my-3 space-y-1.5 ml-5 text-gray-700" {...props}>
                {children}
              </ol>
            );
          },
          // Custom paragraph renderer
          p({ node, children, ...props }: any) {
            return (
              <p className="my-3 leading-relaxed text-gray-700 text-[15px]" {...props}>
                {children}
              </p>
            );
          },
          // Custom blockquote renderer
          blockquote({ node, children, ...props }: any) {
            return (
              <blockquote
                className="border-l-4 border-gray-900 pl-4 my-4 italic text-gray-600 bg-gray-50 py-2 rounded-r-lg"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          // Custom table renderers
          table({ node, children, ...props }: any) {
            return (
              <div className="overflow-x-auto my-4 rounded-lg border border-gray-200">
                <table className="min-w-full border-collapse" {...props}>
                  {children}
                </table>
              </div>
            );
          },
          thead({ node, children, ...props }: any) {
            return (
              <thead className="bg-gray-50" {...props}>
                {children}
              </thead>
            );
          },
          th({ node, children, ...props }: any) {
            return (
              <th className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-900 text-sm" {...props}>
                {children}
              </th>
            );
          },
          td({ node, children, ...props }: any) {
            return (
              <td className="border-b border-gray-100 px-4 py-3 text-gray-700 text-sm" {...props}>
                {children}
              </td>
            );
          },
          // Custom horizontal rule
          hr({ node, ...props }: any) {
            return <hr className="my-4 border-gray-300" {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

