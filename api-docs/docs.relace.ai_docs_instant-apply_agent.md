---
url: "https://docs.relace.ai/docs/instant-apply/agent"
title: "Agent Tool Definition - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/instant-apply/agent#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Guides

Agent Tool Definition

On this page

- [Why use Agents?](https://docs.relace.ai/docs/instant-apply/agent#why-use-agents)
- [Relace Edit Tool](https://docs.relace.ai/docs/instant-apply/agent#relace-edit-tool)
- [Verifying Edits](https://docs.relace.ai/docs/instant-apply/agent#verifying-edits)

Agents are continuously running LLMs that process user requests by calling a sequence of tools. Unlike workflows, they are fully autonomous and can be more flexible at coding.

## [​](https://docs.relace.ai/docs/instant-apply/agent\#why-use-agents)  Why use Agents?

Agents dynamically expand their context by calling tools that explore the codebase, run scripts, and make iterative changes. The are slower and more expensive to run, but can do much more if architected well.With the right choice of tools, you can optimize the steps the agent takes and cut down on latency/cost.

## [​](https://docs.relace.ai/docs/instant-apply/agent\#relace-edit-tool)  Relace Edit Tool

Here’s a tool definition and implementation we’ve seen work well with Relace apply models:

Schema

Implementation

Copy

Ask AI

````
class RelaceEditToolSchema(ToolSchema, name="edit_file"):
    """Use this tool to propose an edit to an existing file or create a new file.

    If you are performing an edit follow these formatting rules:
    - Abbreviate sections of the code in your response that will remain the same by replacing those sections with a comment like  "// ... rest of code ...", "// ... keep existing code ...", "// ... code remains the same".
      - Be precise with the location of these comments within your edit snippet. A less intelligent model will use the context clues you provide to accurately merge your edit snippet.
      - If applicable, it can help to include some concise information about the specific code segments you wish to retain "// ... keep calculateTotalFunction ... ".
      - If you plan on deleting a section, you must provide the context to delete it. Some options:
          1. If the initial code is ```code \n Block 1 \n Block 2 \n Block 3 \n code```, and you want to remove Block 2, you would output ```// ... keep existing code ... \n Block 1 \n  Block 3 \n // ... rest of code ...```.
          2. If the initial code is ```code \n Block \n code```, and you want to remove Block, you can also specify ```// ... keep existing code ... \n // remove Block \n // ... rest of code ...```.
      - You must use the comment format applicable to the specific code provided to express these truncations.
      - Preserve the indentation and code structure of exactly how you believe the final code will look (do not output lines that will not be in the final code after they are merged).
      - Be as length efficient as possible without omitting key context.

    To create a new file, simply specify the content of the file in the `edit` field.
    """

    path: Path = Field(
        ...,
        description="""The target file to modify. You must use an absolute path""",
    )
    instruction: str = Field(
        ...,
        description="""A single sentence instruction describing the edit to be made.
        This helps guide the apply model in merging the changes correctly.
        Use first person perspective and focus on clarifying any ambiguous aspects of the edit.
        Keep it brief and avoid repeating information from previous messages.""",
    )
    edit: str = Field(
        ...,
        description="""
        Only include the exact code lines that need modification.
        Do not include any code that stays the same - those sections should be marked with comments appropriate for the language, like: `// ... existing code ...`
        """,
    )
````

### [​](https://docs.relace.ai/docs/instant-apply/agent\#verifying-edits)  Verifying Edits

We strongly recommend passing the code changes back to the agent in UDiff format. This allows the agent to verify that the changes match its intent and make any necessary corrections.

[Workflow Guide](https://docs.relace.ai/docs/instant-apply/workflow) [Quickstart](https://docs.relace.ai/docs/code-reranker/quickstart)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.