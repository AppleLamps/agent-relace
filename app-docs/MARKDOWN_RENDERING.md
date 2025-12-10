# Markdown Rendering Implementation

This document explains how rich text Markdown rendering is implemented in the Relace Chat app.

## Overview

AI responses are rendered as rich text instead of raw Markdown, providing a better user experience with:
- **Formatted text**: Bold, italics, headings, lists
- **Syntax-highlighted code blocks**: With language tags and line numbers
- **Styled inline code**: Highlighted inline code snippets
- **Links**: Clickable external links
- **Tables**: Formatted tables
- **Security**: XSS protection via HTML sanitization

## Implementation

### Components

#### `MarkdownRenderer.tsx`

The main component that handles Markdown rendering:

```typescript
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
```

**Key Features:**

1. **react-markdown**: Core Markdown parser
2. **remark-gfm**: GitHub Flavored Markdown support (tables, strikethrough, etc.)
3. **rehype-sanitize**: HTML sanitization for XSS protection
4. **react-syntax-highlighter**: Syntax highlighting for code blocks

### Usage in ChatInterface

```typescript
import MarkdownRenderer from './MarkdownRenderer';

// In the message rendering:
{msg.role === 'user' ? (
  <p className="whitespace-pre-wrap break-words">{msg.content}</p>
) : (
  <div className="prose prose-sm max-w-none">
    <MarkdownRenderer content={msg.content} />
  </div>
)}
```

### Custom Components

The `MarkdownRenderer` uses custom component overrides for better styling:

#### Code Blocks

```typescript
code({ node, inline, className, children, ...props }: any) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');

  return !inline && match ? (
    <div className="relative my-4">
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
        <span className="text-xs text-gray-400 font-mono">{language}</span>
        <button onClick={() => navigator.clipboard.writeText(codeString)}>
          Copy
        </button>
      </div>
      <SyntaxHighlighter
        style={oneDark}
        language={language}
        showLineNumbers
        // ... other props
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className="bg-gray-100 px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}
```

**Features:**
- Language detection from code fence (e.g., ```typescript)
- Line numbers
- Copy button
- Dark theme styling
- Inline code styling

#### Links

```typescript
a({ node, href, children, ...props }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline"
    >
      {children}
    </a>
  );
}
```

**Security:**
- Opens in new tab (`target="_blank"`)
- Prevents tabnabbing (`rel="noopener noreferrer"`)
- Sanitized by `rehype-sanitize`

#### Headings, Lists, Tables

All standard Markdown elements are styled with Tailwind CSS classes for consistent appearance.

## Security

### XSS Protection

The `rehype-sanitize` plugin sanitizes HTML output, preventing XSS attacks:

```typescript
rehypePlugins={[rehypeSanitize]}
```

This removes:
- Script tags
- Event handlers
- Dangerous attributes
- Other potentially malicious content

### Safe Defaults

- Links open in new tabs with security attributes
- User input is sanitized before rendering
- Only safe HTML elements are allowed

## Styling

### Tailwind Prose Classes

The component uses Tailwind's prose classes for typography:

```typescript
<div className="prose prose-sm max-w-none">
  <MarkdownRenderer content={msg.content} />
</div>
```

### Custom CSS

Additional styling in `globals.css`:

```css
.markdown-content {
  @apply text-gray-800;
}

.markdown-content pre code {
  @apply block p-4;
}

.markdown-content pre {
  @apply bg-gray-900 text-gray-100 rounded-lg;
}
```

## Supported Markdown Features

- **Text formatting**: Bold (`**text**`), Italic (`*text*`)
- **Headings**: `# H1`, `## H2`, `### H3`
- **Lists**: Ordered and unordered
- **Code blocks**: With language tags and syntax highlighting
- **Inline code**: Styled code snippets
- **Links**: `[text](url)`
- **Blockquotes**: `> quote`
- **Tables**: GitHub Flavored Markdown tables
- **Horizontal rules**: `---`

## Example Output

### Input (Markdown):
```markdown
Here's some **bold text** and *italic text*.

```typescript
function hello() {
  console.log("Hello, World!");
}
```

Check out [this link](https://example.com).
```

### Output (Rendered):
- Bold and italic text properly formatted
- Code block with TypeScript syntax highlighting, line numbers, and copy button
- Clickable link that opens in a new tab

## Dependencies

```json
{
  "react-markdown": "^9.0.1",
  "rehype-sanitize": "^6.0.0",
  "remark-gfm": "^4.0.0",
  "react-syntax-highlighter": "^15.5.0",
  "@types/react-syntax-highlighter": "^15.5.11"
}
```

## Testing

To test the Markdown rendering:

1. Ask the AI a question that includes code examples
2. Verify code blocks are syntax-highlighted
3. Check that links are clickable and open in new tabs
4. Verify formatting (bold, italic, lists) renders correctly
5. Test copy button on code blocks

## Future Enhancements

Potential improvements:
- Code block language detection fallback
- More syntax highlighting themes
- Code block line highlighting
- Collapsible code blocks for long snippets
- Markdown editor for user input
- Copy-to-clipboard feedback animation

