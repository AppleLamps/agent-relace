---
url: "https://docs.relace.ai/docs/code-reranker/quickstart"
title: "Quickstart - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/code-reranker/quickstart#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Code Reranker

Quickstart

On this page

- [Overview](https://docs.relace.ai/docs/code-reranker/quickstart#overview)
- [Prerequisites](https://docs.relace.ai/docs/code-reranker/quickstart#prerequisites)

## [​](https://docs.relace.ai/docs/code-reranker/quickstart\#overview)  Overview

Given a user request for how to change a codebase, you want to retrieve only the files relevant to implementing that request.This is important for two reasons:

- Polluting the context window with irrelevant files makes the generated code worse.
- The fewer files you pass in, the more you save on input tokens.

We trained our reranker on hundreds of thousands of user query and code pairs to make it best in class for AI codegen applications.

## [​](https://docs.relace.ai/docs/code-reranker/quickstart\#prerequisites)  Prerequisites

- [Sign up](https://app.relace.ai/) for a Relace account.
- Create an [API key](https://app.relace.ai/settings/api-keys).

1

Prepare Your Query and Codebase

Define your user request and collect the files from your codebase that need to be ranked for relevance.

Copy

Ask AI

```
const userQuery = "Add a user profile component with avatar and edit functionality";
const codebaseFiles = [\
  { filename: "src/components/UserProfile.tsx", content: "..." },\
  { filename: "src/types/user.ts", content: "..." },\
  { filename: "src/components/Header.tsx", content: "..." },\
  // ... more files\
];
```

2

Call the Code Reranker API

Send your query and codebase to the reranker to get relevance scores for each file.

Copy

Ask AI

```
const url = "https://ranker.endpoint.relace.run/v2/code/rank";
const apiKey = "[YOUR_API_KEY]";

const headers = {
  "Authorization": `Bearer ${apiKey}`,
  "Content-Type": "application/json"
};

const data = {
  query: userQuery,
  codebase: codebaseFiles,
  token_limit: 150000,  // Set to your model's context limit with buffer room for system prompt
};

const response = await fetch(url, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(data)
});

const rankedFiles = await response.json();
```

3

Parse Ranked Results from Response

The API returns files ranked by relevance with scores between 0 and 1 up to the token limit you set.

Copy

Ask AI

```
[\
  {\
    "filename": "src/components/UserProfile.tsx",\
    "score": 0.9598\
  },\
  {\
    "filename": "src/types/user.ts",\
    "score": 0.0321\
  },\
  {\
    "filename": "src/components/Header.tsx",\
    "score": 0.0014\
  }\
]
```

We recommend additionally filtering out results with low relevance scores. See the [agent tool definition](https://docs.relace.ai/docs/code-reranker/agent) or [workflow guide](https://docs.relace.ai/docs/code-reranker/workflow) for specific recommendations based on your system.

[Agent Tool Definition](https://docs.relace.ai/docs/instant-apply/agent) [Workflow Guide](https://docs.relace.ai/docs/code-reranker/workflow)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.