---
url: "https://docs.relace.ai/api-reference/agents/fast-agentic-search"
title: "Fast Agentic Search - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/agents/fast-agentic-search#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Fast Agentic Search

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000/agent \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_name": "relace-search",
    "agent_inputs": {
      "query": "Where in the project are global styles and UI components defined?"
    },
    "continue": false
  }'
```

SSE Stream

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

POST

https://api.relace.run

/

v1

/

repo

/

{repo\_id}

/

agent

Try it

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000/agent \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_name": "relace-search",
    "agent_inputs": {
      "query": "Where in the project are global styles and UI components defined?"
    },
    "continue": false
  }'
```

SSE Stream

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

## [​](https://docs.relace.ai/api-reference/agents/fast-agentic-search\#path-parameters)  Path Parameters

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-repo-id)

repo\_id

string

required

Repo ID

## [​](https://docs.relace.ai/api-reference/agents/fast-agentic-search\#request-body)  Request Body

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-agent-inputs)

agent\_inputs

object

required

Input parameters for the agent

Show properties

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-query)

query

string

required

The query or question to process with the agent

## [​](https://docs.relace.ai/api-reference/agents/fast-agentic-search\#response)  Response

The agent returns a Server-Sent Events (SSE) stream with real-time updates as parallel tool calls execute.

### [​](https://docs.relace.ai/api-reference/agents/fast-agentic-search\#event-types)  Event Types

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-started)

started

event

Signals that the agent execution has begun

Show properties

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-prompt-id)

prompt\_id

string

Unique identifier for this agent execution session

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-agent)

agent

event

Contains agent reasoning, analysis, and text responses

Show properties

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-name)

name

string

Name of the agent (“relace-search”)

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-content)

content

string

The agent’s response content, reasoning, or analysis

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-tool)

tool

event

Reports tool usage and execution results. Tools can include file operations, bash commands, directory views, and specialized operations like `report_back`.

Show properties

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-name-1)

name

string

Name of the tool being used (e.g., “view\_directory”, “bash”, “view\_file”, “report\_back”)

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-path)

path

string

File or directory path (for file/directory operations)

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-command)

command

string

Shell command being executed (for bash tool)

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-explanation)

explanation

string

Detailed explanation of findings (for report\_back tool)

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-files)

files

object

Map of file paths to line ranges referenced in the explanation (for report\_back tool)

[​](https://docs.relace.ai/api-reference/agents/fast-agentic-search#param-done)

done

event

Signals that the agent execution has completed successfully

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.