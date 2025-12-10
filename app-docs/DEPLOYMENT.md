# Deployment Guide for Vercel

This guide will help you deploy the Relace Chat app to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Relace API key
- OpenAI API key

## Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/yourusername/relace-chat-app.git
git branch -M main
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### 3. Configure Environment Variables

In your Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `RELACE_API_KEY` | `rlc-your-key-here` | Production, Preview, Development |
   | `OPENAI_API_KEY` | `sk-your-key-here` | Production, Preview, Development |

3. Click **Save**

### 4. Deploy

1. Vercel will automatically deploy when you push to main branch
2. Or click **"Deploy"** button in the dashboard
3. Wait for build to complete (usually 1-2 minutes)

### 5. Verify Deployment

1. Visit your deployment URL (e.g., `https://your-project.vercel.app`)
2. Test the health endpoint: `https://your-project.vercel.app/api/health`
3. Try connecting a GitHub repository

## Environment-Specific Deployments

Vercel supports three environments:
- **Production**: Deployed from `main` branch
- **Preview**: Deployed from pull requests
- **Development**: Local development with `vercel dev`

You can set different environment variables for each environment if needed.

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Ensure Node.js version is 18+ (set in project settings)
- Verify all dependencies are in `package.json`

### API Errors

- Verify environment variables are set correctly
- Check API keys are valid and have credits
- Review server logs in Vercel dashboard

### Repository Indexing Issues

- Large repos may take several minutes to index
- Check Relace API status
- Verify repository is public or you have proper access

## Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

## Monitoring

- View function logs in Vercel dashboard
- Monitor API usage in Relace and OpenAI dashboards
- Set up Vercel Analytics for user metrics

## Updating the App

Simply push changes to your main branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will automatically redeploy.

