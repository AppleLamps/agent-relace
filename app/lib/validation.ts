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
 * Returns consistent structure matching GitHub URL validation pattern
 */
export function validateUUID(uuid: string): { valid: boolean; error?: string; value?: string } {
  if (!uuid || typeof uuid !== 'string') {
    return { valid: false, error: 'UUID is required' };
  }

  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (!uuidPattern.test(uuid)) {
    return { valid: false, error: 'Invalid UUID format. Expected: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' };
  }

  return { valid: true, value: uuid.toLowerCase() };
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

/**
 * Sanitizes user input to prevent injection attacks
 * Removes or escapes characters that could be used for prompt injection
 */
export function sanitizeUserInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Remove control characters and other potentially dangerous sequences
  let sanitized = input
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .trim();

  // Limit consecutive newlines to prevent prompt injection via formatting
  sanitized = sanitized.replace(/\n{3,}/g, '\n\n');

  return sanitized;
}

/**
 * Detects potential injection attack patterns in input
 */
export function detectInjectionPatterns(input: string): { detected: boolean; pattern?: string } {
  if (!input || typeof input !== 'string') {
    return { detected: false };
  }

  const injectionPatterns = [
    /system\s*:/gi,
    /ignore\s+instructions/gi,
    /roleplay\s+as/gi,
    /pretend\s+to\s+be/gi,
    /you\s+are\s+now/gi,
    /forget\s+your/gi,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(input)) {
      return { detected: true, pattern: pattern.source };
    }
  }

  return { detected: false };
}

