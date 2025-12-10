# Project Structure

```
relace-chat-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── chat/
│   │   │   └── route.ts         # Chat endpoint (handles AI conversations)
│   │   ├── health/
│   │   │   └── route.ts         # Health check endpoint
│   │   └── repo/
│   │       └── create/
│   │           └── route.ts     # Create Relace repo from GitHub
│   ├── components/
│   │   └── ChatInterface.tsx    # Main chat UI component
│   ├── globals.css              # Global styles (Tailwind)
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (repo connection UI)
│
├── public/                       # Static assets
│   └── robots.txt               # SEO robots file
│
├── api-docs/                    # Relace API documentation (reference)
│
├── .env.example                 # Environment variables template
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore rules
├── DEPLOYMENT.md                # Vercel deployment guide
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.js            # PostCSS configuration
├── QUICKSTART.md                # Quick start guide
├── README.md                    # Main documentation
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── vercel.json                  # Vercel deployment configuration
```

## Key Files Explained

### API Routes

**`app/api/repo/create/route.ts`**

- Creates a Relace repository from a GitHub URL
- Enables semantic indexing (`auto_index: true`)
- Returns `repoId` for subsequent operations

**`app/api/chat/route.ts`**

- Main chat endpoint
- Uses Relace semantic retrieval to find relevant code
- Sends context to OpenAI for generating responses
- Returns AI response with referenced files

**`app/api/health/route.ts`**

- Simple health check endpoint
- Useful for monitoring and debugging

### Components

**`app/components/ChatInterface.tsx`**

- Chat UI with message history
- Shows referenced files in responses
- Handles loading states and errors
- Disconnect functionality

**`app/page.tsx`**

- Landing page for connecting GitHub repos
- URL validation
- Loading states during repo creation

### Configuration

**`next.config.js`**

- Next.js configuration
- Optimized for Vercel deployment

**`vercel.json`**

- Vercel-specific settings
- Build and install commands
- Region configuration

**`package.json`**

- Dependencies: `@relace-ai/relace`, `openai`, `next`, `react`
- Dev dependencies: TypeScript, Tailwind, ESLint

## Environment Variables

Required in `.env.local` (development) or Vercel (production):

- `RELACE_API_KEY` - Relace API key (starts with `rlc-`)
- `OPENAI_API_KEY` - OpenAI API key (starts with `sk-`)

## Build Process

1. **Development**: `npm run dev`
2. **Build**: `npm run build`
3. **Production**: `npm start`

## Deployment Flow

1. Code pushed to GitHub
2. Vercel detects changes
3. Runs `npm install`
4. Runs `npm run build`
5. Deploys to Vercel edge network

## API Flow

```
User → Frontend → API Route → Relace API → OpenAI API → Response
```

1. User enters GitHub URL
2. Frontend calls `/api/repo/create`
3. Relace creates and indexes repo
4. User asks question
5. Frontend calls `/api/chat`
6. Relace retrieves relevant code
7. OpenAI generates response
8. Frontend displays response
