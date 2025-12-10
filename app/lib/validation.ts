/**
 * Validates a GitHub URL format
 */
export function validateGitHubUrl(url: string): { valid: boolean; error?: string; owner?: string; repo?: string } {
  if (!url || typeof url !== 'string') {
    return { valid: false, error: 'GitHub URL is required' };
  }
  
  // Support both https://github.com and github.com formats
  const githubUrlPattern = /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+?)(?:\.git)?(?:\/.*)?$/;
  const match = url.match(githubUrlPattern);
  
  if (!match) {
    return { 
      valid: false, 
      error: 'Invalid GitHub URL format. Expected: https://github.com/owner/repo' 
    };
  }
  
  const [, owner, repo] = match;
  
  // Remove .git suffix if present
  const cleanRepo = repo.replace(/\.git$/, '');
  
  return { valid: true, owner, repo: cleanRepo };
}

/**
 * Validates a UUID format (for repoId)
 */
export function validateUUID(uuid: string): boolean {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(uuid);
}

/**
 * Validates a branch name
 */
export function validateBranchName(branch: string): boolean {
  if (!branch || typeof branch !== 'string') {
    return false;
  }
  
  // Basic branch name validation (Git allows more, but this covers common cases)
  const branchPattern = /^[a-zA-Z0-9._/-]+$/;
  return branchPattern.test(branch) && branch.length <= 255;
}

