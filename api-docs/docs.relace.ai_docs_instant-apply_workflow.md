---
url: "https://docs.relace.ai/docs/instant-apply/workflow"
title: "Workflow Guide - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/instant-apply/workflow#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Guides

Workflow Guide

On this page

- [Why use Workflows?](https://docs.relace.ai/docs/instant-apply/workflow#why-use-workflows)
- [Prompt Guide](https://docs.relace.ai/docs/instant-apply/workflow#prompt-guide)
- [System Prompt](https://docs.relace.ai/docs/instant-apply/workflow#system-prompt)
- [User Prompt](https://docs.relace.ai/docs/instant-apply/workflow#user-prompt)
- [Troubleshooting](https://docs.relace.ai/docs/instant-apply/workflow#troubleshooting)

We call code edit systems with of a series of hand-crafted prompts, “workflows”. It’s where you have a system prompt describing the conventions used for your application, and you pass in a set of relevant code files along with the user request as context to a model.This convention comes from Anthropic’s [blog post](https://www.anthropic.com/engineering/building-effective-agents) on building effective agents.

## [​](https://docs.relace.ai/docs/instant-apply/workflow\#why-use-workflows)  Why use Workflows?

Agents equipped with tool-calling are becoming more popular due to their flexibility. This flexibility comes at a cost though — they often spend a lot of time viewing files, running bash commands, and checking their work.Using a hand-crafted workflow requires more iteration on prompting & orchestration, but it can be many times faster. For prompt-to-app products, where latency can cause significant user frustration, the workflow approach is a strong option.

## [​](https://docs.relace.ai/docs/instant-apply/workflow\#prompt-guide)  Prompt Guide

When using Instant Apply with workflows, you should include the instructions for the formatting of the edit snippet somewhere in your system prompt.Here’s a prompting structure we’ve seen work well with Claude 4 Sonnet:

#### [​](https://docs.relace.ai/docs/instant-apply/workflow\#system-prompt)  System Prompt

Copy

Ask AI

````
Your job is to suggest modifications to a provided codebase to satisfy a user request.
Narrow your focus on the USER REQUEST and NOT other unrelated aspects of the code.
Changes should be formatted in a semantic edit snippet optimized to minimize regurgitation of existing code.

Here are the rules, follow them closely:

  - Abbreviate sections of the code in your response that will remain the same by replacing those sections with a comment like  "// ... rest of code ...", "// ... keep existing code ...", "// ... code remains the same".
  - Be very precise with the location of these comments within your edit snippet. A less intelligent model will use the context clues you provide to accurately merge your edit snippet.
  - If applicable, it can help to include some concise information about the specific code segments you wish to retain "// ... keep calculateTotalFunction ... ".
  - If you plan on deleting a section, you must provide the context to delete it. Some options:
      1. If the initial code is ```code \n Block 1 \n Block 2 \n Block 3 \n code```, and you want to remove Block 2, you would output ```// ... keep existing code ... \n Block 1 \n  Block 2 \n // ... rest of code ...```.
      2. If the initial code is ```code \n Block \n code```, and you want to remove Block, you can also specify ```// ... keep existing code ... \n // remove Block \n // ... rest of code ...```.
  - You must use the comment format applicable to the specific code provided to express these truncations.
  - Preserve the indentation and code structure of exactly how you believe the final code will look (do not output lines that will not be in the final code after they are merged).
  - Be as length efficient as possible without omitting key context.
````

#### [​](https://docs.relace.ai/docs/instant-apply/workflow\#user-prompt)  User Prompt

Copy

Ask AI

```
<user_request>
{user_request}
</user_request>

<existing_code>
{existing_code}
</existing_code>
```

## [​](https://docs.relace.ai/docs/instant-apply/workflow\#troubleshooting)  Troubleshooting

Depending on the complexity of your system prompt, you may need to adjust the placement or structure of the snippet generation instructions.We recommend using the Anthropic [workbench](https://console.anthropic.com/workbench) or the OpenAI [playground](https://platform.openai.com/playground) to iterate on your prompt until a few examples work. The goal is to strike a balance between brevity and contextualization of the `// ... rest of code ...` placeholders.

[Quickstart](https://docs.relace.ai/docs/instant-apply/quickstart) [Agent Tool Definition](https://docs.relace.ai/docs/instant-apply/agent)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.