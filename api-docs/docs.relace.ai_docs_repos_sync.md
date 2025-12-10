---
url: "https://docs.relace.ai/docs/repos/sync"
title: "Sync to Relace Repos - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/repos/sync#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Guides

Sync to Relace Repos

On this page

- [Store Relace Repo Metadata](https://docs.relace.ai/docs/repos/sync#store-relace-repo-metadata)
- [Workflows](https://docs.relace.ai/docs/repos/sync#workflows)
- [Agents](https://docs.relace.ai/docs/repos/sync#agents)
- [Conclusion](https://docs.relace.ai/docs/repos/sync#conclusion)

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

If you are using Relace Repos with a separate source of truth, you’ll need to keep both systems in sync. That way, when you invoke a search tool, you are doing so on the fresh set of files.This guide assumes you use a database to keep track of your codebase history — whether it stores the full versioned code or GitHub URLs with commit hashes.

## [​](https://docs.relace.ai/docs/repos/sync\#store-relace-repo-metadata)  Store Relace Repo Metadata

After creating a Relace Repo, you’ll receive the `repo_id` and a `repo_head` in the response body. Calling the update route will return a new `repo_head` if the operation is successful.Each snapshot of a codebase in your database should also include these two Relace-specific fields. See our [API reference](https://docs.relace.ai/api-reference/repos/create) for more details on how to collect this metadata.

## [​](https://docs.relace.ai/docs/repos/sync\#workflows)  Workflows

Workflows have predetermined steps for codebase retrieval, and making changes to the underlying codebase.In the editing step, you must also update the corresponding Relace Repo to avoid retreiving over a stale set of files in the next step.There are two ways to do this, demonstrated in the code example below:

Overwrite Mode

Diff Mode

Copy

Ask AI

```
import { Relace } from "@relace-ai/relace";

const client = new Relace({ apiKey: "YOUR_API_KEY" });

// Use the repo_id from when you initially created the Relace Repo
const repoId = "your_existing_repo_id"; // Retrieved from database

// Overwrite all repository content
const result = await client.repo.update(repoId, {
    source: {
        type: "files",
        files: [\
            {\
                filename: "src/main.py",\
                content: "def main():\n    print('Agent completely rewrote this')\n    return True"\
            },\
            {\
                filename: "README.md",\
                content: "# Agent Updated Project\n\nThis project was updated by an AI agent."\
            }\
        ]
    }
});

// Save the new repo_head to your database for future operations
const newRepoHead = result.repo_head;

console.log(`Updated repository. New repo_head: ${newRepoHead}`);
```

For small repos, it can be convenient to use overwrite mode. This is akin to resaving all the files to a PostgreSQL database, and doesn’t require processing changes into individual operations.Diff mode is a more efficient option for large repos, where you’d like to avoid the network latency of passing all files again in an HTTP request.

## [​](https://docs.relace.ai/docs/repos/sync\#agents)  Agents

Unlike workflows, one agentic loop can call file editing and codebase retrieval tools multiple times quickly. This makes it challenging to maintain two source control systems in sync without incurring a latency penalty.We strongly recommend using the diff mode for agents to efficiently sync only the specific changes made by each edit tool call.Your agent will likely already have separate tool executions for different operations (rename, write, delete), and you can integrate Relace repo syncing directly into these tool implementations:

Schema

Implementation

Copy

Ask AI

```
class EditFileToolSchema(ToolSchema, name="edit_file"):
    path: Path = Field(
        ...,
        description="The target file to modify. Use an absolute path.",
    )
    content: str = Field(
        ...,
        description="The new content for the file.",
    )
    instruction: str = Field(
        ...,
        description="Brief description of the edit being made.",
    )

class DeleteFileToolSchema(ToolSchema, name="delete_file"):
    path: Path = Field(
        ...,
        description="The file to delete. Use an absolute path.",
    )

class RenameFileToolSchema(ToolSchema, name="rename_file"):
    old_path: Path = Field(
        ...,
        description="Current file path. Use an absolute path.",
    )
    new_path: Path = Field(
        ...,
        description="New file path. Use an absolute path.",
    )
```

Some agent implementations only perform semantic search as a first step (like a workflow). In these cases, it may be more efficient to accumulate all the changes and send them in a single API call at the end of the agent execution loop.

## [​](https://docs.relace.ai/docs/repos/sync\#conclusion)  Conclusion

We recommend fully integrating Relace Repos as your source of truth for reasons detailed in the [overview section](https://docs.relace.ai/docs/repos/overview).However, you can still reap the benefits of the two-stage retrieval built into Relace Repos without completely migrating your source control management system.

[Onboarding](https://docs.relace.ai/docs/repos/onboarding) [GitHub Integration](https://docs.relace.ai/docs/repos/github-integration)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.