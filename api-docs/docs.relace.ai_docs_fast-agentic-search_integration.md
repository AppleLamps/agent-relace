---
url: "https://docs.relace.ai/docs/fast-agentic-search/integration"
title: "Integration - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/fast-agentic-search/integration#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Fast Agentic Search

Integration

On this page

- [Subagent Formatting](https://docs.relace.ai/docs/fast-agentic-search/integration#subagent-formatting)
- [Workflow](https://docs.relace.ai/docs/fast-agentic-search/integration#workflow)
- [Context hand-off](https://docs.relace.ai/docs/fast-agentic-search/integration#context-hand-off)
- [Tool Approach](https://docs.relace.ai/docs/fast-agentic-search/integration#tool-approach)
- [Tool Definition](https://docs.relace.ai/docs/fast-agentic-search/integration#tool-definition)
- [Merging the Output](https://docs.relace.ai/docs/fast-agentic-search/integration#merging-the-output)

There are two main optons to integrate Fast Agentic Search (FAS) into your agentic coding system.

1. Call FAS as a _preliminary_ subagent that collects context for the central agent.
2. Allow the central agent to call FAS as a file exploration tool at any point in its loop.

In both, it’s important to format FAS results in a way the central agent can make use of it.

## [​](https://docs.relace.ai/docs/fast-agentic-search/integration\#subagent-formatting)  Subagent Formatting

In this pattern, you run FAS _before_ the main agent loop starts. This is useful for “one-shot” tasks where the user’s intent is clearly to find or modify code (e.g., “Fix the bug in the auth service”).By pre-filling the context window with relevant file locations, you save the main agent from having to spend a turn asking for them.

### [​](https://docs.relace.ai/docs/fast-agentic-search/integration\#workflow)  Workflow

1. **Receive User Query**: “How is the user session duration calculated?”
2. **Run FAS**: Call `repo.search()` immediately with the user’s query.
3. **Hydrate Context**: Append the search results to the system prompt or user message.
4. **Run Main Agent**: The agent now has the answer in its context immediately.

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });
const repoId = 'YOUR_REPO_ID';

// 1. Receive query
const userQuery = 'How is the user session duration calculated?';

// 2. Run FAS in parallel or before the main LLM call
const searchResults = await client.repo.search({
  repoId: repoId,
  query: userQuery,
});

// 3. Inject into context
const contextWithSearch = `
  User Query: ${userQuery}

  [System Note: Automated Search Results]
  Fast Agentic Search found the following relevant code:
  ${formatResultsForLLM(searchResults)}
`;

// 4. Call Main Agent
const response = await llm.generate(contextWithSearch);
```

This approach reduces latency for the user, as they don’t have to wait for the agent to “think” about searching—the search happens automatically.

## [​](https://docs.relace.ai/docs/fast-agentic-search/integration\#context-hand-off)  Context hand-off

In this pattern, you convert FAS’s streaming output into a compressed trace format for LLM consumption.
Transforming the stream into this format reduces duplication of effort (viewing the same files over again).The compressed trace format condenses consecutive events into a compact structure:

- Assistant messages combine multiple tool calls into a single message.
- Tool messages reference their corresponding assistant message using a `tool_call_id`.

This makes it easier for your agent to consume results without processing every individual event, while still retaining full context.

Copy

Ask AI

```
import relace from '@relace-ai/relace';
import { randomUUID } from 'crypto';

interface ToolCall {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: Record<string, string>;
  };
}

interface ChatMessage {
  role: "assistant" | "tool" | "user";
  content?: string;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}

export async function convertStream(
  searchStream: AsyncIterable<relace.RepoAgentResponse>
): Promise<ChatMessage[]> {
  const messages: ChatMessage[] = [];
  const events: Array<{ event: string; data: relace.RepoAgentResponse['data'] }> = [];
  // First, collect all events
  for await (const event of searchStream) {
    events.push({ event: event.event ?? "", data: event.data });
  }

  let i = 0;
  while (i < events.length) {
    const { event, data } = events[i];

    if (event === "agent") {
      const toolCalls: ToolCall[] = [];

      // Look ahead to collect all consecutive "tool" events
      let j = i + 1;
      const toolCallIds = [];

      while (j < events.length && events[j].event === "tool") {
        const toolData = events[j].data;
        const toolId = `toolu-${randomUUID().replace(/-/g, '')}`;
        toolCallIds.push(toolId);

        // Extract all arguments except 'name'
        const { name, ...args } = toolData;

        toolCalls.push({
          id: toolId,
          type: "function",
          function: {
            name: toolData.name,
            arguments: args,
          },
        });
        j = j + 1;
      }

      // Create assistant message with tool calls
      const content = data.content ?? "";

      messages.push({
        role: "assistant",
        content,
        ...(toolCalls.length > 0 ? { tool_calls: toolCalls } : {}),
      });

      // Now create separate tool response messages
      for (let k = 0; k < toolCallIds.length; k++) {
        const toolId = toolCallIds[k];
        const toolEventIndex = i + 1 + k;

        const toolName = events[toolEventIndex].data.name;

        // Check if this is the final "report_back" tool
        const isReportBack = toolName === "report_back";

        let content = "[Tool response truncated for brevity]";
        if (isReportBack) {
          content = "Report back content added to history";
        }

        messages.push({
          role: "tool",
          tool_call_id: toolId,
          content: content,
        });
      }

      // Skip the tool events we just processed
      i = j;
    } else {
      i = i + 1;
    }
  }

  return messages;
}
```

See all 99 lines

Copy

Ask AI

```
const results = await client.repo.search(repoId, {
  query: 'Where is the button defined?'
});

const messages = await convertStream(results);

console.log(JSON.stringify(messages, null, 2));
```

Example output:

Copy

Ask AI

```
[\
  {\
    "role": "assistant",\
    "content": "I need to explore the codebase to understand where a button is defined. Since the user query is quite general (\"Where is the button defined?\"), I'll need to search for button-related code throughout the repository. Let me start by examining the overall structure of the repository to get a sense of what kind of application this is.\n",\
    "tool_calls": [\
      {\
        "id": "toolu-f2bedb4e7bad4ab695364aed579d660c",\
        "type": "function",\
        "function": {\
          "name": "view_directory",\
          "arguments": {\
            "path": "/repo"\
          }\
        }\
      },\
      {\
        "id": "toolu-0bccbbfcc9c8498b8152647de0edc7af",\
        "type": "function",\
        "function": {\
          "name": "bash",\
          "arguments": {\
            "command": "find /repo -type f -name \"*.js\" -o -name \"*.ts\" -o -name \"*.jsx\" -o -name \"*.tsx\" -o -name \"*.html\" -o -name \"*.css\" | head -20"\
          }\
        }\
      },\
      {\
        "id": "toolu-4771f98f6bf54be38b9f02081450a103",\
        "type": "function",\
        "function": {\
          "name": "bash",\
          "arguments": {\
            "command": "grep -r \"button\" /repo --include=\"*.js\" --include=\"*.ts\" --include=\"*.jsx\" --include=\"*.tsx\" --include=\"*.html\" --include=\"*.css\" | head -10"\
          }\
        }\
      },\
      {\
        "id": "toolu-bd5ef6d3130745e6ac0512a0fe94e918",\
        "type": "function",\
        "function": {\
          "name": "bash",\
          "arguments": {\
            "command": "grep -r \"<button\" /repo --include=\"*.js\" --include=\"*.ts\" --include=\"*.jsx\" --include=\"*.tsx\" --include=\"*.html\" | head -10"\
          }\
        }\
      }\
    ]\
  },\
  {\
    "role": "tool",\
    "tool_call_id": "toolu-f2bedb4e7bad4ab695364aed579d660c",\
    "content": "[Tool response truncated for brevity]"\
  },\
  {\
    "role": "tool",\
    "tool_call_id": "toolu-0bccbbfcc9c8498b8152647de0edc7af",\
    "content": "[Tool response truncated for brevity]"\
  },\
  {\
    "role": "tool",\
    "tool_call_id": "toolu-4771f98f6bf54be38b9f02081450a103",\
    "content": "[Tool response truncated for brevity]"\
  },\
  {\
    "role": "tool",\
    "tool_call_id": "toolu-bd5ef6d3130745e6ac0512a0fe94e918",\
    "content": "[Tool response truncated for brevity]"\
  },\
  {\
    "role": "assistant",\
    "content": "Based on the initial exploration, I can see this is a React/Tailwind CSS project with a components directory containing UI components. I notice there's a specific `button.tsx` file in the UI components directory which is likely where the button is defined. Let me examine this file more closely along with a few other relevant files to understand how buttons are implemented in this codebase.\n",\
    "tool_calls": [\
      {\
        "id": "toolu-c228de5bd0d240f6810689b76a5f8601",\
        "type": "function",\
        "function": {\
          "name": "view_file",\
          "arguments": {\
            "path": "/repo/src/components/ui/button.tsx"\
          }\
        }\
      },\
      {\
        "id": "toolu-899f6a67277f4e70aa705b734c44dd2a",\
        "type": "function",\
        "function": {\
          "name": "view_file",\
          "arguments": {\
            "path": "/repo/src/App.tsx"\
          }\
        }\
      },\
      {\
        "id": "toolu-62d6d2adeb2642a291871e1ff6f9f122",\
        "type": "function",\
        "function": {\
          "name": "bash",\
          "arguments": {\
            "command": "grep -r \"Button\" /repo/src --include=\"*.tsx\" --include=\"*.ts\" | head -10"\
          }\
        }\
      },\
      {\
        "id": "toolu-2703df916c7b4ae9a1362c7fd61fd44a",\
        "type": "function",\
        "function": {\
          "name": "view_directory",\
          "arguments": {\
            "path": "/repo/src/components/ui"\
          }\
        }\
      }\
    ]\
  },\
  {\
    "role": "tool",\
    "tool_call_id": "toolu-c228de5bd0d240f6810689b76a5f8601",\
    "content": "[Tool response truncated for brevity]"\
  },\
  {\
    "role": "tool",\
    "tool_call_id": "toolu-899f6a67277f4e70aa705b734c44dd2a",\
    "content": "[Tool response truncated for brevity]"\
  },\
  {\
    "role": "tool",\
    "tool_call_id": "toolu-62d6d2adeb2642a291871e1ff6f9f122",\
    "content": "[Tool response truncated for brevity]"\
  },\
  {\
    "role": "tool",\
    "tool_call_id": "toolu-2703df916c7b4ae9a1362c7fd61fd44a",\
    "content": "[Tool response truncated for brevity]"\
  },\
  {\
    "role": "assistant",\
    "content": "Based on my exploration of the codebase, I now have a clear understanding of where the button is defined. Let me report back with my findings.\n\n",\
    "tool_calls": [\
      {\
        "id": "toolu-daa404fc43544644953520bb2e48df3e",\
        "type": "function",\
        "function": {\
          "name": "report_back",\
          "arguments": {\
            "explanation": "I have identified that the button component is defined in `/src/components/ui/button.tsx`. This is a reusable UI component built with React and Tailwind CSS that follows the design system pattern. The file contains:\n\n1. A `buttonVariants` definition using `cva` (class-variance-authority) that defines different styles for the button (default, destructive, outline, secondary, ghost, link) and sizes (default, sm, lg, icon)\n2. A `ButtonProps` interface that extends React's ButtonHTMLAttributes and includes the variant and size properties\n3. The actual `Button` component implementation that uses `React.forwardRef` to properly handle refs\n4. Export statements for both the Button component and buttonVariants\n\nThe button component is imported and used in other parts of the application, such as in `/src/components/theme-toggle.tsx` where it's used as `<Button variant=\"outline\" size=\"icon\">`.\n\nThis is the main definition location for the button component in this codebase.",\
            "files": {\
              "src/components/ui/button.tsx": [\
                [\
                  1,\
                  52\
                ]\
              ]\
            }\
          }\
        }\
      }\
    ]\
  },\
  {\
    "role": "tool",\
    "tool_call_id": "toolu-daa404fc43544644953520bb2e48df3e",\
    "content": "Report back content added to history"\
  }\
]
```

See all 164 lines

## [​](https://docs.relace.ai/docs/fast-agentic-search/integration\#tool-approach)  Tool Approach

In this pattern, you expose FAS as a tool that your main agent can choose to invoke. This gives the agent autonomy to decide when it needs to search the codebase.This is ideal for multi-turn conversations where the agent might need to look up information dynamically based on intermediate reasoning.

### [​](https://docs.relace.ai/docs/fast-agentic-search/integration\#tool-definition)  Tool Definition

Define a tool (e.g., `search_codebase`) that wraps the FAS API.

Copy

Ask AI

```
// Example tool definition for your agent framework (e.g., LangChain, Vercel AI SDK)
const searchCodebaseTool = {
  name: 'search_codebase',
  description: 'Search the codebase for relevant files using natural language.',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description:
          'A natural language query describing what you are looking for.',
      },
    },
    required: ['query'],
  },
  execute: async ({ query }) => {
    const results = await client.repo.search(repoId, {
      query: query,
    });

    // Format the output for the model
    return formatResultsForLLM(results);
  },
};
```

### [​](https://docs.relace.ai/docs/fast-agentic-search/integration\#merging-the-output)  Merging the Output

When the tool returns, you should format the results into a concise string that the model can digest. This effectively simulates the `report_back` behavior of the search agent.

Copy

Ask AI

```
import { relace } from '@relace-ai/relace';

async function formatResultsForLLM(
  searchStream: AsyncIterable<relace.RepoAgentResponse>
): Promise<string> {
  let files: [string, [number, number][]][] = [];

  // Consume the SSE stream
  for await (const event of searchStream) {
    // Look for the report_back tool event which contains the final results
    if (event.event === 'tool' && event.data?.name === 'report_back') {
      files = Object.entries(event.data.files);
    }
  }

  // Format the output
  if (!files || files.length === 0) {
    return 'No relevant files found.';
  }

  return (
    `Found ${files.length} relevant files:\n` +
    files
      .map(([filename, ranges]) => {
        const rangeStr = ranges
          .map(([start, end]) =>
            start === end ? `line ${start}` : `lines ${start}-${end}`
          )
          .join(', ');
        return `- ${filename} (${rangeStr})`;
      })
      .join('\n')
  );
}
```

Example output:

Copy

Ask AI

```
Found 6 relevant files:
- package.json (lines 1-50)
- src/App.tsx (lines 1-15)
- src/main.tsx (lines 1-15)
- src/components/theme-toggle.tsx (lines 1-35)
- index.html (lines 1-15)
- src/hooks/use-theme.tsx (lines 1-30)
```

[Run on Repos](https://docs.relace.ai/docs/fast-agentic-search/quickstart) [Quickstart](https://docs.relace.ai/docs/data-analysis/quickstart)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.