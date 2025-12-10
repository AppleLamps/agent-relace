import { NextResponse } from 'next/server';
import { getRelaceClient, extractRelaceError } from '@/lib/relace-client';
import { validateGitHubUrl, validateBranchName } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    // Initialize Relace client (throws if API key is missing)
    const client = getRelaceClient();

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

    const { githubUrl, branch = 'main' } = body;
    
    // Validate GitHub URL
    const urlValidation = validateGitHubUrl(githubUrl);
    if (!urlValidation.valid) {
      return NextResponse.json(
        { error: urlValidation.error },
        { status: 400 }
      );
    }

    // Validate branch name
    if (!validateBranchName(branch)) {
      return NextResponse.json(
        { error: 'Invalid branch name' },
        { status: 400 }
      );
    }
    
    const { owner, repo } = urlValidation;
    if (!owner || !repo) {
      return NextResponse.json(
        { error: 'Invalid GitHub URL format. Expected https://github.com/{owner}/{repo}' },
        { status: 400 }
      );
    }
    const fullUrl = `https://github.com/${owner}/${repo}`;
    
    // Create Relace repo from GitHub
    const relaceRepo = await client.repo.create({
      source: {
        type: 'git',
        url: fullUrl,
        branch: branch,
      },
      auto_index: true, // Enable semantic search
      metadata: {
        github_url: githubUrl,
        owner,
        repo,
      },
    });
    
    return NextResponse.json({
      repoId: relaceRepo.repo_id,
      repoHead: relaceRepo.repo_head,
      success: true,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating repo:', error);
    
    // Extract structured error information
    const { code, message, status } = extractRelaceError(error);
    
    // Handle specific error cases
    if (status === 401) {
      return NextResponse.json(
        { error: 'Authentication failed. Please check your API key.' },
        { status: 401 }
      );
    }
    
    if (status === 403) {
      return NextResponse.json(
        { error: 'Insufficient permissions. Please check your API key permissions.' },
        { status: 403 }
      );
    }
    
    if (status === 422) {
      return NextResponse.json(
        { error: message || 'Invalid request. Please check your input.' },
        { status: 422 }
      );
    }
    
    if (status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Generic error response
    return NextResponse.json(
      { 
        error: message || 'Failed to create repository',
        code: code !== 'unknown_error' ? code : undefined,
      },
      { status: status >= 400 && status < 600 ? status : 500 }
    );
  }
}

