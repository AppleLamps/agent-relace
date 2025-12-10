# Quick Start Guide

Get up and running in 5 minutes!

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:

```env
RELACE_API_KEY=rlc-your-key-here
OPENAI_API_KEY=sk-your-key-here
```

**Where to get API keys:**
- **Relace**: [app.relace.ai/settings/api-keys](https://app.relace.ai/settings/api-keys)
- **OpenAI**: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

## 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 4. Test the App

1. Enter a GitHub repository URL (e.g., `https://github.com/vercel/next.js`)
2. Click "Connect Repository"
3. Wait for indexing (may take a minute for large repos)
4. Start asking questions about the codebase!

## Example Questions

- "How does authentication work in this codebase?"
- "Show me the main entry point"
- "What testing framework is used?"
- "Explain the API structure"
- "Where are the configuration files?"

## Troubleshooting

**Repository not connecting?**
- Make sure the GitHub URL is public or you have access
- Check that your Relace API key is valid
- Review browser console for errors

**Chat not working?**
- Verify both API keys are set correctly
- Check that you have credits/quota available
- Review server logs in terminal

**Build errors?**
- Ensure Node.js 18+ is installed: `node --version`
- Delete `node_modules` and `.next`, then run `npm install` again

## Next Steps

- Deploy to Vercel: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- Customize the UI: Edit components in `app/components/`
- Add features: Extend API routes in `app/api/`

