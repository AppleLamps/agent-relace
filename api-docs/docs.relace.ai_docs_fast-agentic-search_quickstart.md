---
url: "https://docs.relace.ai/docs/fast-agentic-search/quickstart"
title: "Run on Repos - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/fast-agentic-search/quickstart#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Fast Agentic Search

Run on Repos

On this page

- [Prerequisites](https://docs.relace.ai/docs/fast-agentic-search/quickstart#prerequisites)

## [​](https://docs.relace.ai/docs/fast-agentic-search/quickstart\#prerequisites)  Prerequisites

- [Sign up](https://app.relace.ai/) for a Relace account.
- Create an [API key](https://app.relace.ai/settings/api-keys).
- Install the Relace TypeScript SDK: `npm install @relace-ai/relace`

1

Transfer Source Code to Relace

Start by transferring the repository you want to run FAS on to Relace.

From GitHub

From Files

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });

const repo = await client.repo.create({
  source: {
    type: 'git',
    url: 'https://github.com/relace-ai/vite-template',
    branch: 'main',
  },
  auto_index: true, // Required for semantic search
  metadata: {}, // Optional: add any custom properties
});

console.log(`Repository created with ID: ${repo.repo_id}`);
```

Keep track of the Relace `repo_id` in your database for future reference.You can optionally include a `metadata` parameter to retain any additional repository properties,
and set `auto_index: true` if you want to try out our [embeddings model](https://docs.relace.ai/api-reference/repos/retrieve).

2

Enable Fast Agentic Search

You can run FAS on any Relace Repo with:

TypeScript SDK

Relace API

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });

const result = await client.repo.search(repoId, {
  query: 'Where in the project are global styles and UI components defined?',
});

for await (const event of result) {
  console.log(event);
}
```

3

Parse Server-Sent Events from Response

The agent returns a Server-Sent Events (SSE) stream with real-time updates as parallel tool calls execute.

stream

Copy

Ask AI

```
event: started
data: {"prompt_id":"123e4567-e89b-12d3-a456-426614174000"}

event: agent
data: {"name":"relace-search","content":"I'll explore the codebase to understand where global styles and UI components are defined. Let me first get an overview of the project structure to identify relevant directories and files.\n\n"}

event: tool
data: {"name":"view_directory","path":"/repo"}

event: tool
data: {"name":"bash","command":"find /repo -type f -name \"*.css\" -o -name \"*.scss\" -o -name \"*.sass\" -o -name \"*.less\" | head -20"}

event: tool
data: {"name":"bash","command":"find /repo -type f -name \"*component*\" -o -name \"*ui*\" -o -name \"*style*\" | head -20"}

event: tool
data: {"name":"bash","command":"grep -r \"global.*style\\|style.*global\" /repo --include=\"*.js\" --include=\"*.ts\" --include=\"*.jsx\" --include=\"*.tsx\" | head -10"}

event: tool
data: {"name":"bash","command":"grep -r \"ThemeProvider\\|GlobalStyle\\|styled\\.\" /repo --include=\"*.js\" --include=\"*.ts\" --include=\"*.jsx\" --include=\"*.tsx\" | head -10"}

event: agent
data: {"name":"relace-search","content":"Based on the initial exploration, I can see this appears to be a React project with a structured component system. Let me dive deeper into the key areas that would contain global styles and UI components.\n\n"}

event: tool
data: {"name":"view_directory","path":"/repo/src/components"}

event: tool
data: {"name":"view_file","path":"/repo/src/index.css"}

event: tool
data: {"name":"view_directory","path":"/repo/src/components/ui"}

event: tool
data: {"name":"view_file","path":"/repo/src/main.tsx"}

event: tool
data: {"name":"bash","command":"find /repo/src -name \"*.css\" -o -name \"*.scss\" -o -name \"*.sass\" | xargs ls -la"}

event: agent
data: {"name":"relace-search","content":"Let me also check for any theme-related files and the main app structure to better understand how global styles and UI components are organized.\n\n"}

event: tool
data: {"name":"bash","command":"find /repo -name \"*theme*\" -type f"}

event: tool
data: {"name":"view_file","path":"/repo/src/hooks/use-theme.tsx"}

event: tool
data: {"name":"bash","command":"grep -r \"global.*style\\|style.*global\\|ThemeProvider\\|styled\\.\" /repo/src --include=\"*.tsx\" --include=\"*.ts\" | head -10"}

event: tool
data: {"name":"view_file","path":"/repo/src/App.tsx"}

event: tool
data: {"name":"bash","command":"ls -la /repo/src/components/"}

event: agent
data: {"name":"relace-search","content":"Based on my exploration of the codebase, I now have a clear understanding of where global styles and UI components are defined. Let me report back with my findings.\n\n"}

event: tool
data: {"name":"report_back","explanation":"Based on my exploration of the codebase, I've identified the key locations where global styles and UI components are defined:\n\n1. **Global Styles**: The global styles are defined in `/src/index.css`. ...","files":{"src/index.css":[[1,100]],"src/components/ui":[[1,100]],"src/hooks/use-theme.tsx":[[1,100]],"src/components/theme-toggle.tsx":[[1,50]],"src/App.tsx":[[1,20]]}}

event: done
data: {}
```

See all 86 lines

From the `report_back` tool, you can parse out relevant files and use them as context for your agent’s main LLM.

Copy

Ask AI

```
{
  "event": "tool",
  "data": {
    "name": "report_back",
    "explanation": "Based on my exploration of the codebase, I've identified the key locations where global styles and UI components are defined:\n\n1. **Global Styles**: The global styles are defined in `/src/index.css`. This file uses Tailwind CSS with custom CSS variables for themes and includes the standard Tailwind directives (@tailwind base; @tailwind components; @tailwind utilities). It also defines theme-specific variables for both light and dark modes.\n\n2. **UI Components**: The UI components are organized under `/src/components/ui/` directory. This follows a common pattern where each component is a separate file (like button.tsx, card.tsx, input.tsx, etc.) that exports reusable UI elements. These are likely built using shadcn/ui or a similar component library approach.\n\n3. **Theme Management**: The theme handling is implemented in `/src/hooks/use-theme.tsx` which provides a ThemeProvider context that manages light/dark/system themes and persists the user's preference. The main App component wraps everything in this ThemeProvider.\n\n4. **Additional Components**: There's also a theme toggle component at `/src/components/theme-toggle.tsx` that allows users to switch between themes.\n\nThe project appears to be using a modern React setup with Tailwind CSS for styling, organized component structure, and a theme management system.",
    "files": {
      "src/index.css": [[1, 100]],
      "src/components/ui": [[1, 100]],
      "src/hooks/use-theme.tsx": [[1, 100]],
      "src/components/theme-toggle.tsx": [[1, 50]],
      "src/App.tsx": [[1, 20]]
    }
  }
}
```

For more information and explanations of additional parameters see our [API reference](https://docs.relace.ai/api-reference/agents/fast-agentic-search).To use Fast Agentic Search outside of Relace Repos, you must create an [agent harness](https://docs.relace.ai/docs/fast-agentic-search/agent) that includes the specific tools the underlying model was trained with.

[Overview](https://docs.relace.ai/docs/fast-agentic-search/agent) [Integration](https://docs.relace.ai/docs/fast-agentic-search/integration)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.