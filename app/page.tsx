'use client';

import { useState } from 'react';
import ChatInterface from './components/ChatInterface';

export default function Home() {
  const [repoId, setRepoId] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConnectRepo = async () => {
    if (!githubUrl.trim()) {
      setError('Please enter a GitHub URL');
      return;
    }

    // Validate GitHub URL format
    const githubUrlPattern = /^https?:\/\/(www\.)?github\.com\/[^\/]+\/[^\/]+/;
    if (!githubUrlPattern.test(githubUrl)) {
      setError('Invalid GitHub URL format. Expected: https://github.com/owner/repo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/repo/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ githubUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create repo');
      }

      setRepoId(data.repoId);
    } catch (err: any) {
      setError(err.message || 'Failed to connect repository');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setRepoId(null);
    setGithubUrl('');
    setError('');
  };

  if (repoId) {
    return <ChatInterface repoId={repoId} githubUrl={githubUrl} onDisconnect={handleDisconnect} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl shadow-gray-200/50 max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">Relace Chat</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Connect your GitHub repository and chat with AI about your codebase
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="github-url" className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
              GitHub Repository URL
            </label>
            <input
              id="github-url"
              type="text"
              value={githubUrl}
              onChange={(e) => {
                setGithubUrl(e.target.value);
                setError('');
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleConnectRepo();
                }
              }}
              placeholder="https://github.com/username/repo"
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent focus:bg-white transition-all duration-200 text-gray-900 placeholder-gray-400"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleConnectRepo}
            disabled={loading || !githubUrl.trim()}
            className="w-full px-4 py-3.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-all duration-200 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/25"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connecting...
              </span>
            ) : (
              'Connect Repository'
            )}
          </button>

          <div className="text-xs text-gray-400 text-center mt-6 space-y-1">
            <p>Your repository will be indexed for semantic search.</p>
            <p>This may take a few moments for large repositories.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

