import { Relace } from '@relace-ai/relace';

/**
 * Creates and returns a Relace client instance
 * Throws an error if API key is not configured
 */
export function getRelaceClient(): Relace {
  const apiKey = process.env.RELACE_API_KEY;

  if (!apiKey) {
    throw new Error('RELACE_API_KEY is not configured.');
  }

  // Validate full API key format: rlc- prefix followed by alphanumeric characters (minimum 32 chars after prefix)
  if (!apiKey.startsWith('rlc-') || !/^rlc-[a-zA-Z0-9]{32,}$/.test(apiKey)) {
    throw new Error('Invalid RELACE_API_KEY format. Expected format: rlc-<32+ alphanumeric characters>.');
  }

  return new Relace({ apiKey });
}

/**
 * Relace API error response structure
 */
export interface RelaceError {
  error?: {
    code?: string;
    message?: string;
    details?: any;
  };
  message?: string;
}

/**
 * Checks if an error is a Relace API error
 */
export function isRelaceError(error: any): error is RelaceError {
  return error && (error.error || error.message);
}

/**
 * Extracts error information from a Relace API error
 */
export function extractRelaceError(error: any): { code: string; message: string; status: number } {
  if (isRelaceError(error)) {
    const errorCode = error.error?.code || 'unknown_error';
    const errorMessage = error.error?.message || error.message || 'An error occurred.';

    // Map error codes to HTTP status codes
    const statusMap: Record<string, number> = {
      missing_api_key: 401,
      invalid_api_key: 401,
      insufficient_permissions: 403,
      not_found: 404,
      method_not_allowed: 405,
      conflict: 409,
      payload_too_large: 413,
      invalid_template: 422,
      invalid_file_format: 422,
      missing_required_field: 422,
      resource_locked: 423,
      rate_limit_exceeded: 429,
      application_error: 500,
      internal_server_error: 500,
    };

    return {
      code: errorCode,
      message: errorMessage,
      status: statusMap[errorCode] || 500,
    };
  }

  // Handle HTTP response errors
  if (error.response) {
    const status = error.response.status || 500;
    const data = error.response.data || {};
    return {
      code: data.error?.code || `http_${status}`,
      message: data.error?.message || data.message || error.message || 'An error occurred.',
      status,
    };
  }

  // Generic error
  return {
    code: 'unknown_error',
    message: error.message || 'An unexpected error occurred.',
    status: 500,
  };
}

