---
url: "https://docs.relace.ai/api-reference/agents/analysis-agent"
title: "Analysis Agent - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/agents/analysis-agent#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Analysis Agent

cURL

Python

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000/agent \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_name": "code-analyzer",
    "agent_inputs": {
      "query": "Analyze user engagement data and create visualization plots",
      "system_prompt": "Generate comprehensive data analysis with matplotlib/plotly visualizations"
    },
    "overrides": {}
  }'
```

SSE Stream

Copy

Ask AI

```
event: started
data: {"prompt_id": "prompt_123e4567-e89b-12d3-a456-426614174000"}

event: agent
data: {"content": "I'll analyze the user engagement data and create visualization plots.", "type": "reasoning"}

event: tool
data: {"tool_name": "data_analyzer", "content": "Loading dataset with 10,000 records", "status": "started"}

event: tool
data: {"tool_name": "data_analyzer", "content": "Analysis complete. Found key patterns in engagement data.", "status": "completed"}

event: agent
data: {"content": "Analysis shows 65% higher engagement on weekends with peak activity between 2-4 PM.", "type": "response"}

event: tool
data: {"tool_name": "plot_generator", "content": "Generating engagement trend visualization", "status": "started"}

event: committed
data: {"files": ["plots/engagement_trends.png", "analysis/engagement_report.md"], "message": "Add engagement analysis and visualization plots"}

event: build
data: {"event": "start", "output": "Building visualization components..."}

event: build
data: {"event": "pass", "output": "Build completed successfully"}

event: deployed
data: {"status": "success", "url": "https://app.relace.ai/repo/123e4567/viz"}

event: done
data: {"summary": "Successfully analyzed engagement data and generated 2 visualization plots"}
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

Python

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000/agent \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_name": "code-analyzer",
    "agent_inputs": {
      "query": "Analyze user engagement data and create visualization plots",
      "system_prompt": "Generate comprehensive data analysis with matplotlib/plotly visualizations"
    },
    "overrides": {}
  }'
```

SSE Stream

Copy

Ask AI

```
event: started
data: {"prompt_id": "prompt_123e4567-e89b-12d3-a456-426614174000"}

event: agent
data: {"content": "I'll analyze the user engagement data and create visualization plots.", "type": "reasoning"}

event: tool
data: {"tool_name": "data_analyzer", "content": "Loading dataset with 10,000 records", "status": "started"}

event: tool
data: {"tool_name": "data_analyzer", "content": "Analysis complete. Found key patterns in engagement data.", "status": "completed"}

event: agent
data: {"content": "Analysis shows 65% higher engagement on weekends with peak activity between 2-4 PM.", "type": "response"}

event: tool
data: {"tool_name": "plot_generator", "content": "Generating engagement trend visualization", "status": "started"}

event: committed
data: {"files": ["plots/engagement_trends.png", "analysis/engagement_report.md"], "message": "Add engagement analysis and visualization plots"}

event: build
data: {"event": "start", "output": "Building visualization components..."}

event: build
data: {"event": "pass", "output": "Build completed successfully"}

event: deployed
data: {"status": "success", "url": "https://app.relace.ai/repo/123e4567/viz"}

event: done
data: {"summary": "Successfully analyzed engagement data and generated 2 visualization plots"}
```

## [​](https://docs.relace.ai/api-reference/agents/analysis-agent\#path-parameters)  Path Parameters

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-repo-id)

repo\_id

string

required

Repo ID

## [​](https://docs.relace.ai/api-reference/agents/analysis-agent\#request-body)  Request Body

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-agent-name)

agent\_name

string

required

Name of the predefined agent to run

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-agent-inputs)

agent\_inputs

object

required

Input parameters for the agent

Show properties

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-query)

query

string

required

The query or question to process with the agent

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-system-prompt)

system\_prompt

string

Custom system prompt to guide the agent’s behavior

## [​](https://docs.relace.ai/api-reference/agents/analysis-agent\#response)  Response

The agent returns a **Server-Sent Events (SSE) stream** with real-time updates from tool calls. The various event types indicate different stages of execution.

### [​](https://docs.relace.ai/api-reference/agents/analysis-agent\#event-types)  Event Types

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-started)

started

event

Signals that the agent execution has begun

Show properties

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-prompt-id)

prompt\_id

string

Unique identifier for this agent execution session

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-agent)

agent

event

Contains agent reasoning, analysis, and text responses

Show properties

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-content)

content

string

The agent’s response content or reasoning

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-type)

type

string

Type of agent message (e.g., “reasoning”, “response”)

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-tool)

tool

event

Reports tool usage and execution results

Show properties

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-tool-name)

tool\_name

string

Name of the tool being used

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-content-1)

content

string

Tool execution details or results

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-status)

status

string

Tool execution status (e.g., “started”, “completed”)

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-committed)

committed

event

Indicates code changes have been made to the repository

Show properties

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-files)

files

array

List of files that were modified

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-message)

message

string

Commit message describing the changes

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-build)

build

event

Reports build process status and results

Show properties

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-event)

event

string

Build event type: “start”, “pass”, or “fail”

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-output)

output

string

Build output or error messages

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-test)

test

event

Reports test execution status and results

Show properties

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-event-1)

event

string

Test event type: “start”, “pass”, or “fail”

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-output-1)

output

string

Test output or results

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-deployed)

deployed

event

Signals that changes have been deployed/visualizations updated

Show properties

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-status-1)

status

string

Deployment status

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-url)

url

string

URL to view the deployed changes

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-prompt-error)

prompt\_error

event

Reports errors that occurred during agent execution

Show properties

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-error)

error

string

Error message describing what went wrong

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-code)

code

string

Error code for programmatic handling

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-done)

done

event

Signals that the agent execution has completed successfully

Show properties

[​](https://docs.relace.ai/api-reference/agents/analysis-agent#param-summary)

summary

string

Summary of what was accomplished

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.