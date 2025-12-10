# Relace Chat - AI Codebase Assistant

A production-ready Next.js web application that enables developers to connect their GitHub repositories and interact with AI-powered code analysis. Built with Relace's specialized semantic code search and OpenRouter's multi-model LLM gateway.

## Overview

Relace Chat combines the power of **Relace's codebase-specific search** with **OpenRouter's flexible AI models** to provide intelligent code analysis and Q&A. The application features real-time streaming responses, automatic model fallbacks, and a modern, responsive UI with rich Markdown rendering.

## Key Features

### Core Functionality
- 🔗 **GitHub Integration** - Connect any public or private GitHub repository
- 🔍 **Semantic Code Search** - Powered by Relace's two-stage retrieval system (embeddings + reranker)
- 💬 **Intelligent Q&A** - Ask questions about your codebase and get context-aware answers
- 📁 **File References** - See which files are referenced in each response with relevance scores

### User Experience
- ⚡ **Streaming Responses** - Real-time token streaming for immediate feedback
- ✨ **Rich Markdown Rendering** - Formatted text, code blocks, lists, and tables
- 🎨 **Syntax Highlighting** - Code blocks with language detection, line numbers, and copy functionality
- 🔒 **Security** - XSS protection via HTML sanitization

### Reliability & Performance
- 🔄 **Automatic Model Fallbacks** - Seamless failover to backup models (Claude, GPT-4, Gemini)
- 🛡️ **Zero Completion Insurance** - Ensures responses complete even if primary model fails
- 📊 **Large Context Support** - Handles up to 500k tokens of code context
- ⚡ **Optimized Retrieval** - Leverages Grok-4.1-fast's 2M token context window

## Architecture

### Technology Stack

**Frontend:**
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React Markdown for rich text rendering
- React Syntax Highlighter for code display

**Backend:**
- Next.js API Routes
- Relace API for semantic code search
- OpenRouter API for LLM inference
- Server-Sent Events (SSE) for streaming

### System Flow

```
User Input
    ↓
GitHub Repository → Relace Repo Creation & Indexing
    ↓
User Question → Relace Semantic Retrieval (finds relevant code)
    ↓
Code Context + Question → OpenRouter (Grok-4.1-fast with fallbacks)
    ↓
Streaming Response → Frontend (real-time rendering)
```

### Key Components

- **Relace API**: Specialized codebase search using embeddings and reranking
- **OpenRouter**: Multi-model LLM gateway with automatic failover
- **Primary Model**: `x-ai/grok-4.1-fast` (2M context, 30k output)
- **Fallback Models**: Claude 3.5 Sonnet, GPT-4 Turbo, Gemini Pro 1.5

## Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Relace API Key** - [Get one here](https://app.relace.ai/settings/api-keys)
- **OpenRouter API Key** - [Get one here](https://openrouter.ai/keys)

## Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd relace-chat-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
# Relace API Key (required)
RELACE_API_KEY=rlc-your-relace-api-key-here

# OpenRouter API Key (required)
OPENROUTER_API_KEY=sk-or-v1-your-openrouter-api-key-here

# App URL for OpenRouter headers (optional, defaults to localhost)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Environment Variables**
   - Navigate to Project Settings → Environment Variables
   - Add the following:
     - `RELACE_API_KEY` - Your Relace API key
     - `OPENROUTER_API_KEY` - Your OpenRouter API key
     - `NEXT_PUBLIC_APP_URL` - Your production URL (optional)

4. **Deploy**
   - Vercel will automatically deploy on push to main
   - Your app will be live at `https://your-project.vercel.app`

### Other Platforms

This application can be deployed to any platform that supports Next.js:
- **Netlify** - Supports Next.js with zero configuration
- **Railway** - Simple deployment with environment variable support
- **AWS Amplify** - Full Next.js SSR support
- **Docker** - Use the included Dockerfile (if available)

## API Reference

### Endpoints

#### `POST /api/repo/create`
Creates a Relace repository from a GitHub URL.

**Request Body:**
```json
{
  "githubUrl": "https://github.com/owner/repo",
  "branch": "main"
}
```

**Response:**
```json
{
  "repoId": "uuid",
  "repoHead": "commit-hash",
  "success": true
}
```

#### `POST /api/chat`
Handles chat requests with streaming support.

**Request Body:**
```json
{
  "repoId": "uuid",
  "message": "How does authentication work?",
  "conversationHistory": [],
  "stream": true
}
```

**Response (Streaming):**
- Server-Sent Events (SSE) format
- `type: metadata` - Contains relevant files
- `type: content` - Streaming token chunks
- `type: done` - Completion signal

**Response (Non-Streaming):**
```json
{
  "response": "AI-generated response",
  "relevantFiles": [
    {
      "filename": "src/auth.ts",
      "score": 0.94
    }
  ],
  "tokenUsage": {
    "prompt_tokens": 5000,
    "completion_tokens": 1500,
    "total_tokens": 6500
  },
  "pendingEmbeddings": 0
}
```

#### `GET /api/health`
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Project Structure

```
relace-chat-app/
├── app/
│   ├── api/                    # API Routes
│   │   ├── chat/
│   │   │   └── route.ts       # Chat endpoint with streaming
│   │   ├── health/
│   │   │   └── route.ts       # Health check endpoint
│   │   └── repo/
│   │       └── create/
│   │           └── route.ts   # Repository creation
│   ├── components/             # React Components
│   │   ├── ChatInterface.tsx  # Main chat UI
│   │   └── MarkdownRenderer.tsx # Markdown rendering component
│   ├── lib/                    # Utility Libraries
│   │   ├── relace-client.ts   # Relace API client wrapper
│   │   └── validation.ts      # Input validation utilities
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/                    # Static assets
│   └── robots.txt
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## Environment Variables

| Variable | Description | Required | Format |
|----------|-------------|----------|--------|
| `RELACE_API_KEY` | Relace API key for code search | Yes | `rlc-...` |
| `OPENROUTER_API_KEY` | OpenRouter API key for LLM access | Yes | `sk-or-v1-...` |
| `NEXT_PUBLIC_APP_URL` | App URL for OpenRouter headers | No | `https://...` |

## How It Works

### 1. Repository Connection
Users provide a GitHub repository URL. The application:
- Validates the URL format
- Creates a Relace repository via API
- Enables automatic indexing (`auto_index: true`)
- Returns a repository ID for subsequent operations

### 2. Semantic Code Search
When a user asks a question:
- Relace performs two-stage retrieval:
  - **Stage 1**: Vector similarity search using embeddings
  - **Stage 2**: Reranking with code-specific model
- Retrieves up to 500k tokens of relevant code context
- Returns files with relevance scores

### 3. AI Response Generation
The retrieved code context is sent to OpenRouter:
- **Primary Model**: Grok-4.1-fast (2M context window)
- **Fallbacks**: Claude 3.5 Sonnet → GPT-4 Turbo → Gemini Pro 1.5
- **Streaming**: Tokens stream in real-time via SSE
- **Completion**: Fallbacks ensure response completes even if primary model fails

### 4. Response Rendering
- Markdown content is parsed and rendered
- Code blocks are syntax-highlighted with copy functionality
- File references are displayed with relevance scores
- Responses update in real-time during streaming

## Troubleshooting

### Repository Not Indexing
- **Symptom**: 404 errors when querying a newly created repository
- **Solution**: 
  - Wait 1-2 minutes for indexing to complete
  - Check `pending_embeddings` count in API response
  - Verify `auto_index: true` was set during creation
  - Retry with exponential backoff (handled automatically)

### API Authentication Errors
- **Symptom**: 401 Unauthorized errors
- **Solution**:
  - Verify API keys are correctly set in environment variables
  - Check API key format (Relace: `rlc-...`, OpenRouter: `sk-or-v1-...`)
  - Ensure keys have not expired or been revoked
  - Verify keys have necessary permissions

### Rate Limiting
- **Symptom**: 429 Too Many Requests errors
- **Solution**:
  - Reduce request frequency
  - Check OpenRouter credit balance
  - Implement client-side rate limiting
  - Consider upgrading OpenRouter plan

### Streaming Issues
- **Symptom**: Incomplete or broken streaming responses
- **Solution**:
  - Check browser console for errors
  - Verify SSE support in browser
  - Check network connectivity
  - Review API response headers

### Build Errors
- **Symptom**: Build failures on Vercel or local
- **Solution**:
  - Ensure Node.js 18+ is installed
  - Run `npm install` to update dependencies
  - Check for TypeScript errors: `npm run lint`
  - Verify all environment variables are set

## Development

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Code Quality

- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Next.js recommended configuration
- **Prettier**: Code formatting (if configured)

## Security Considerations

- **API Keys**: Never commit API keys to version control
- **XSS Protection**: All HTML output is sanitized via `rehype-sanitize`
- **Input Validation**: All user inputs are validated and sanitized
- **HTTPS**: Always use HTTPS in production
- **Rate Limiting**: Consider implementing rate limiting for production use

## Performance

- **Code Retrieval**: Optimized for large codebases (up to 500k tokens)
- **Streaming**: Reduces perceived latency with real-time token delivery
- **Caching**: Consider implementing response caching for frequently asked questions
- **CDN**: Static assets served via Vercel's CDN

## Limitations

- **Repository Size**: Very large repositories may take longer to index
- **Context Window**: Limited by model's context window (2M tokens for Grok)
- **Rate Limits**: Subject to OpenRouter and Relace API rate limits
- **Cost**: API usage incurs costs based on token consumption

## Contributing

Contributions are welcome! Please ensure:
- Code follows TypeScript best practices
- All tests pass (if applicable)
- Documentation is updated
- Changes are backward compatible

## License

MIT License - see LICENSE file for details

## Support & Resources

### Documentation
- **Relace API**: [docs.relace.ai](https://docs.relace.ai)
- **OpenRouter API**: [openrouter.ai/docs](https://openrouter.ai/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)

### Model Information
- **Grok-4.1-fast**: [x.ai/grok](https://x.ai/grok)
- **OpenRouter Models**: [openrouter.ai/models](https://openrouter.ai/models)

### Community
- **Relace**: [relace.ai](https://relace.ai)
- **OpenRouter**: [openrouter.ai](https://openrouter.ai)

---

Built with ❤️ using Relace and OpenRouter
