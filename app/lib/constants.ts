/**
 * Configuration constants for the chat API
 */

// Retrieval configuration
export const RETRIEVAL_CONFIG = {
    /** Maximum tokens to retrieve from the repository for context (Grok supports 2M context) */
    TOKEN_LIMIT: 1500000,
    /** Minimum similarity score threshold for retrieved files */
    SCORE_THRESHOLD: 0.3,
    /** Maximum conversation history entries to include */
    MAX_CONVERSATION_HISTORY: 50,
    /** Maximum files to include in context (prevents memory exhaustion) */
    MAX_CONTEXT_FILES: 100,
    /** Soft limit for context size in characters before optimization */
    SOFT_CONTEXT_LIMIT: 1000000,
    /** Hard limit for context size in characters */
    HARD_CONTEXT_LIMIT: 1500000,
};

// Message validation
export const MESSAGE_VALIDATION = {
    /** Maximum length for user messages */
    MAX_MESSAGE_LENGTH: 5000,
    /** Maximum pending embeddings before warning */
    MAX_PENDING_EMBEDDINGS_WARNING: 100,
};

// Model configuration
export const MODEL_CONFIG = {
    /** Primary LLM model to use */
    PRIMARY_MODEL: 'x-ai/grok-4.1-fast',
    /** Temperature for generation */
    TEMPERATURE: 0.7,
    /** Maximum output tokens for Grok-4.1-fast */
    MAX_OUTPUT_TOKENS: 30000,
    /** Fallback models in order of preference */
    FALLBACK_MODELS: [
        'anthropic/claude-3.5-sonnet',
        'openai/gpt-4-turbo',
        'google/gemini-pro-1.5',
    ],
};

// Retry configuration
export const RETRY_CONFIG = {
    /** Maximum number of retry attempts */
    MAX_RETRIES: 3,
    /** Initial delay in milliseconds */
    INITIAL_DELAY_MS: 1000,
};

// Security configuration
export const SECURITY_CONFIG = {
    /** Regular expression patterns for detecting potential injection attacks */
    INJECTION_PATTERNS: [
        /system\s*:/gi, // Attempts to override system role
        /ignore\s+instructions/gi, // Attempts to bypass instructions
        /roleplay\s+as/gi, // Role manipulation attempts
    ],
    /** Maximum conversation history content length to prevent memory exhaustion */
    MAX_HISTORY_CONTENT_LENGTH: 50000,
};
