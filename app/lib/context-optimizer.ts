/**
 * Utilities for optimizing context building for large repositories
 */

export interface OptimizedContextResult {
    context: string;
    filesIncluded: number;
    totalCharacters: number;
    wasTruncated: boolean;
    truncationReason?: string;
}

/**
 * Estimates token count from character count (rough approximation)
 * Most LLMs use ~4 characters per token on average
 */
export function estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
}

/**
 * Prioritizes files by relevance score and size efficiency
 * Returns files sorted by score but limited by reasonable file size
 */
export function prioritizeFiles(
    files: Array<{ filename: string; content?: string; score: number }>,
    maxFiles: number = 100,
    avgFileSizeLimit: number = 15000 // ~60k tokens per large file
): Array<{ filename: string; content?: string; score: number; priority: number }> {
    return files
        .filter(f => f.content) // Only files with content
        .map(file => ({
            ...file,
            // Priority based on relevance score and reasonable file size
            // Longer files get slightly lower priority to balance coverage
            priority: file.score - (file.content?.length || 0) / avgFileSizeLimit * 0.1,
        }))
        .sort((a, b) => b.priority - a.priority)
        .slice(0, maxFiles);
}

/**
 * Builds optimized code context with intelligent file selection
 * Stops adding files when soft limit is reached or hard limit is about to be exceeded
 * Applies compression if needed to stay within limits
 */
export function buildOptimizedContext(
    files: Array<{ filename: string; content?: string; score: number }>,
    options: {
        maxFiles?: number;
        softLimit?: number;
        hardLimit?: number;
        filenamePrefix?: string;
        enableCompression?: boolean;
    } = {}
): OptimizedContextResult {
    const maxFiles = options.maxFiles || 100;
    const softLimit = options.softLimit || 1000000;
    const hardLimit = options.hardLimit || 1500000;
    const filenamePrefix = options.filenamePrefix || '// File:';
    const enableCompression = options.enableCompression !== false;

    if (!files || files.length === 0) {
        return {
            context: 'No relevant files found. Please try rephrasing your question.',
            filesIncluded: 0,
            totalCharacters: 0,
            wasTruncated: false,
        };
    }

    // Prioritize files for optimal context building
    const prioritizedFiles = prioritizeFiles(files, maxFiles);

    const contextParts: string[] = [];
    let currentLength = 0;
    let filesIncluded = 0;
    let wasTruncated = false;
    let truncationReason: string | undefined;

    for (const file of prioritizedFiles) {
        if (!file.content) continue;

        // Estimate size with formatting overhead
        const fileEntry = `${filenamePrefix} ${file.filename}\n${file.content}\n\n---\n\n`;
        const estimatedSize = currentLength + fileEntry.length;

        // Stop if adding this file would exceed hard limit
        if (estimatedSize > hardLimit) {
            wasTruncated = true;
            truncationReason = 'Hard limit (1.5M chars) reached';
            break;
        }

        // If past soft limit, only add if we have very few files
        if (currentLength > softLimit && filesIncluded > 3) {
            wasTruncated = true;
            truncationReason = 'Soft limit (1M chars) reached with sufficient coverage';
            break;
        }

        contextParts.push(fileEntry);
        currentLength = estimatedSize;
        filesIncluded++;
    }

    let finalContext = contextParts.join('') || 'No relevant files found. Please try rephrasing your question.';
    let compressionApplied = false;

    // Apply compression if context exceeds soft limit and compression is enabled
    if (enableCompression && currentLength > softLimit) {
        const compressedContext = compressContext(finalContext, 'medium');
        const compressedLength = compressedContext.length;

        // Use compression if it saves significant space (at least 20%)
        if (compressedLength < currentLength * 0.8) {
            finalContext = compressedContext;
            currentLength = compressedLength;
            compressionApplied = true;
            console.info(`Context compressed: ${currentLength} chars (saved ${currentLength - compressedLength} chars)`);
        }
    }

    return {
        context: finalContext,
        filesIncluded,
        totalCharacters: currentLength,
        wasTruncated,
        truncationReason,
    };
}

/**
 * Compresses context by removing common patterns to reduce token usage
 * Useful for very large files (e.g., minified code, large data files)
 */
export function compressContext(text: string, compressionLevel: 'low' | 'medium' | 'high' = 'medium'): string {
    let result = text;

    if (compressionLevel === 'low' || compressionLevel === 'medium') {
        // Remove excessive whitespace
        result = result.replace(/\n\s*\n\s*\n+/g, '\n\n');
        // Remove comments (optional for medium compression)
        if (compressionLevel === 'medium') {
            result = result.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
        }
    }

    if (compressionLevel === 'medium' || compressionLevel === 'high') {
        // Remove excessive indentation on empty lines
        result = result.replace(/^[ \t]+$/gm, '');
    }

    if (compressionLevel === 'high') {
        // Remove all comments
        result = result
            .replace(/\/\/.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/<!--[\s\S]*?-->/g, '');
        // Compress multiple spaces to single space (except indentation)
        result = result.replace(/([^\n])  +/g, '$1 ');
    }

    return result;
}
