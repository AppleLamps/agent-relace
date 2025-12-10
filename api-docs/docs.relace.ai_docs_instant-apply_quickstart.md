---
url: "https://docs.relace.ai/docs/instant-apply/quickstart"
title: "Quickstart - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/instant-apply/quickstart#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Instant Apply

Quickstart

On this page

- [Overview](https://docs.relace.ai/docs/instant-apply/quickstart#overview)
- [Prerequisites](https://docs.relace.ai/docs/instant-apply/quickstart#prerequisites)

## [​](https://docs.relace.ai/docs/instant-apply/quickstart\#overview)  Overview

When using frontier models to edit your codebase, you’re paying premium rates for both valuable changes and unchanged sections alike.Instant apply is about the separation of concerns — use heavyweight models for new sections of code, and use a lightweight model to merge the new into the old.Using `relace-apply-3` running at 10k+ tok/s, this method is **over 3x faster and cheaper** than rewriting files from scratch.We explain how we train/inference the model to achieve these speeds in our [blog post](https://www.relace.ai/blog/relace-apply-3).

## [​](https://docs.relace.ai/docs/instant-apply/quickstart\#prerequisites)  Prerequisites

- [Sign up](https://app.relace.ai/) for a Relace account.
- Create an [API key](https://app.relace.ai/settings/api-keys).

1

Generate Code Snippets

Add instructions for formatting edits somewhere in the system prompt for your LLM of choice. See our [edit tool](https://docs.relace.ai/docs/instant-apply/agent) definition if you’re building an agent.

Copy

Ask AI

````
  - Abbreviate sections of the code in your response that will remain the same by replacing those sections with a comment like  "// ... rest of code ...", "// ... keep existing code ...", "// ... code remains the same".
  - Be precise with the location of these comments within your edit snippet. A less intelligent model will use the context clues you provide to accurately merge your edit snippet.
  - If applicable, it can help to include some concise information about the specific code segments you wish to retain "// ... keep calculateTotalFunction ... ".
  - If you plan on deleting a section, you must provide the context to delete it. Some options:
      1. If the initial code is ```code \n Block 1 \n Block 2 \n Block 3 \n code```, and you want to remove Block 2, you would output ```// ... keep existing code ... \n Block 1 \n  Block 3 \n // ... rest of code ...```.
      2. If the initial code is ```code \n Block \n code```, and you want to remove Block, you can also specify ```// ... keep existing code ... \n // remove Block \n // ... rest of code ...```.
  - You must use the comment format applicable to the specific code provided to express these truncations.
  - Preserve the indentation and code structure of exactly how you believe the final code will look (do not output lines that will not be in the final code after they are merged).
  - Be as length efficient as possible without omitting key context.
````

2

Merge with Instant Apply

Pass the abbreviated edit snippet along with the initial code to the Instant Apply endpoint.

Relace API

OpenAI Compatible

Copy

Ask AI

```
const url = "https://instantapply.endpoint.relace.run/v1/code/apply";
const apiKey = "[YOUR_API_KEY]";

const headers = {
  "Authorization": `Bearer ${apiKey}`,
  "Content-Type": "application/json"
};

const data = {
  initial_code: initialCode,
  edit_snippet: editSnippet,
};

const response = await fetch(url, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(data)
});

return await response.json();
```

3

Parse Final Code from Response

Collect the merged code from the response json.

Copy

Ask AI

```
{
  "mergedCode": mergedCode,
  "usage": {
    "prompt_tokens": promptTokens,
    "completion_tokens": completionTokens,
    "total_tokens": totalTokens
  }
}
```

For more information and explanation of additional parameters see our [API reference](https://docs.relace.ai/api-reference/instant-apply/apply).

[Introduction](https://docs.relace.ai/docs/introduction) [Workflow Guide](https://docs.relace.ai/docs/instant-apply/workflow)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.