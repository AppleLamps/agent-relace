# Markdown Rendering Example

This document shows how Markdown rendering works in the Relace Chat app with code examples.

## Basic Usage

The `MarkdownRenderer` component is used in `ChatInterface.tsx` to render AI responses:

```typescript
// app/components/ChatInterface.tsx
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

## Example: AI Response with Code

### Input (Raw Markdown from AI):

```markdown
Here's how authentication works in this codebase:

The main authentication logic is in `src/auth/login.ts`:

\`\`\`typescript
async function authenticateUser(username: string, password: string) {
  const user = await db.users.findByUsername(username);
  if (user && await bcrypt.compare(password, user.passwordHash)) {
    return generateToken(user);
  }
  throw new Error('Invalid credentials');
}
\`\`\`

**Key features:**
- Uses bcrypt for password hashing
- JWT tokens for session management
- Error handling for invalid credentials

Check the [documentation](https://example.com/docs) for more details.
```

### Output (Rendered):

The MarkdownRenderer will display:
- **Formatted text**: Bold text appears bold
- **Code block**: Syntax-highlighted TypeScript code with:
  - Language tag ("typescript")
  - Line numbers
  - Copy button
  - Dark theme styling
- **Bullet list**: Properly formatted list items
- **Link**: Clickable link that opens in new tab

## Component Structure

```typescript
// app/components/MarkdownRenderer.tsx
export default function MarkdownRenderer({ content, className = '' }) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          code: CustomCodeRenderer,
          a: CustomLinkRenderer,
          // ... other custom components
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
```

## Custom Code Block Renderer

```typescript
code({ node, inline, className, children, ...props }: any) {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');

  if (!inline && match) {
    // Code block with syntax highlighting
    return (
      <div className="relative my-4">
        <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
          <span className="text-xs text-gray-400 font-mono">{language}</span>
          <button onClick={() => handleCopy(codeString, codeId)}>
            {copiedCodeId === codeId ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <SyntaxHighlighter
          style={oneDark}
          language={language}
          showLineNumbers
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  } else {
    // Inline code
    return (
      <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-600">
        {children}
      </code>
    );
  }
}
```

## Security: HTML Sanitization

The `rehypeSanitize` plugin prevents XSS attacks:

```typescript
rehypePlugins={[rehypeSanitize]}
```

This automatically:
- Removes `<script>` tags
- Strips event handlers (`onclick`, `onerror`, etc.)
- Removes dangerous attributes
- Allows only safe HTML elements

## Testing Markdown Rendering

To test the rendering:

1. **Start the app**: `npm run dev`
2. **Connect a repository**: Enter a GitHub URL
3. **Ask a question**: "Show me example code for authentication"
4. **Verify rendering**:
   - Code blocks are syntax-highlighted
   - Copy button works
   - Links are clickable
   - Formatting (bold, lists) displays correctly

## Supported Languages

The syntax highlighter supports all languages supported by Prism.js, including:
- JavaScript/TypeScript
- Python
- Java
- C/C++
- Go
- Rust
- HTML/CSS
- SQL
- JSON
- YAML
- And many more...

## Styling Customization

To customize the appearance, modify:

1. **Component styles**: `app/components/MarkdownRenderer.tsx`
2. **Global CSS**: `app/globals.css`
3. **Syntax theme**: Change `oneDark` to another theme from `react-syntax-highlighter`

Available themes:
- `oneDark` (current)
- `oneLight`
- `vsDark`
- `vs2015`
- `github`
- And more...

## Troubleshooting

**Code blocks not highlighting?**
- Check that language is specified: ` ```typescript`
- Verify `react-syntax-highlighter` is installed
- Check browser console for errors

**Links not working?**
- Verify `rehypeSanitize` allows anchor tags
- Check that links have `http://` or `https://` protocol

**Styling issues?**
- Ensure Tailwind CSS is properly configured
- Check that `prose` classes are available
- Verify custom CSS in `globals.css` is loaded

