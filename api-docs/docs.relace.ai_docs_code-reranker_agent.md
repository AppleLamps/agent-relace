---
url: "https://docs.relace.ai/docs/code-reranker/agent"
title: "Agent Tool Definition - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/code-reranker/agent#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Guides

Agent Tool Definition

On this page

- [Why use Agents?](https://docs.relace.ai/docs/code-reranker/agent#why-use-agents)
- [Agentic File Exploration](https://docs.relace.ai/docs/code-reranker/agent#agentic-file-exploration)
- [Relace Semantic Search Tool](https://docs.relace.ai/docs/code-reranker/agent#relace-semantic-search-tool)
- [Query Construction](https://docs.relace.ai/docs/code-reranker/agent#query-construction)
- [Token Limit and Score Threshold](https://docs.relace.ai/docs/code-reranker/agent#token-limit-and-score-threshold)
- [Mutiple Search Invocations](https://docs.relace.ai/docs/code-reranker/agent#mutiple-search-invocations)

Agents are continuously running LLMs that process user requests by calling a sequence of tools. Unlike workflows, they are fully autonomous and can be more flexible at coding.

## [​](https://docs.relace.ai/docs/code-reranker/agent\#why-use-agents)  Why use Agents?

Agents dynamically expand their context by calling tools that explore the codebase, run scripts, and make iterative changes. The are slower and more expensive to run, but can do much more if architected well.With the right choice of tools, you can optimize the steps the agent takes and cut down on latency/cost.

## [​](https://docs.relace.ai/docs/code-reranker/agent\#agentic-file-exploration)  Agentic File Exploration

Code agents start with a codebase file tree within context. They are equipped with a File View tool, which they use to explore relevant files to the user query before making any changes.This approach works well for small codebases. On large codebases, agents have to spend millions of tokens and several minutes traversing the repository before they can make progress.Semantic search is a useful first pass to shortcut some of the agentic exploration by narrowing down the search space. When used in addition to a standard File View and Grep tool, the agent can find all the relevant files faster and more cheaply.

## [​](https://docs.relace.ai/docs/code-reranker/agent\#relace-semantic-search-tool)  Relace Semantic Search Tool

Here’s an example tool definition and implementation for using semantic search as a first pass within agentic exploration:

Schema

Implementation

Copy

Ask AI

````
class SemanticSearchToolSchema(ToolSchema, name="find_relevant_files"):
    """Use this tool to search for files that are most relevant for a given task or question.
    The conversation history will be passed in with your query.

    - Call this tool ONE TIME, including all of your tasks/questions.
    - DO NOT call it multiple times before ending your turn.
    - Prefer this as the first step to explore or plan edits within a code repository.
    - Prefer this over using a bash command like `grep` or `find`.
    - Data files may be excluded from the search.

    The response will be a list of file paths and contents relative to the repository root, ordered from most relevant to least relevant. The format will look like this:

    path/to/file1
    ```
    file1 content...
    ```

    path/to/file2
    ```
    file2 content...
    ```
    """

    query: str = Field(
        ...,
        description="""Natural language description of what you are looking for in the repository.
        You can describe a particular change you want to make, a feature you want to implement, bug you are trying to fix, information you are searching for, etc.""",
    )
````

### [​](https://docs.relace.ai/docs/code-reranker/agent\#query-construction)  Query Construction

The query can be a short question to ask the codebase or a more detailed user conversation with the user request included.We recommend using the full conversation when using the semantic search as a first pass, and a more targeted question for subsequent calls.

Copy

Ask AI

```
query = (
    f"<conversation>{condensed_user_chat_log}</conversation>\n"
    f"<query>{query_text}</query>"
)
```

### [​](https://docs.relace.ai/docs/code-reranker/agent\#token-limit-and-score-threshold)  Token Limit and Score Threshold

For agents, it’s better to be conservative with the hyperparameters for the reranker. If necessary, the agent can additionally call File View and Grep tools .We recommend these defaults for a 200k token context limit agentic model like Claude 4 Sonnet:

Copy

Ask AI

```
score_threshold: float = 0.5
token_limit: int = 30_000
```

### [​](https://docs.relace.ai/docs/code-reranker/agent\#mutiple-search-invocations)  Mutiple Search Invocations

If you want to support multiple invocations of the semantic search tool, you’ll have to condense redundant files to avoid unecessary context pollution.For example, two similar queries might surface overlapping files:

- Query 1: “user authentication middleware” → `[auth.ts, middleware.ts, session.ts]`
- Query 2: “login validation logic” → `[auth.ts, validation.ts, session.ts]`

The actual list of files you want to pass to the agent is the union of both sets: `[auth.ts, middleware.ts, session.ts, validation.ts]`.You may also want to configure the tool implementation to allow the agent to pull additional files from the same query by increasing the `token_limit` or lowering the `score_threshold` on subsequent calls.

[Workflow Guide](https://docs.relace.ai/docs/code-reranker/workflow) [Quickstart](https://docs.relace.ai/docs/embeddings/quickstart)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.