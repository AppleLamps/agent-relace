---
url: "https://docs.relace.ai/docs/repos/relace-templates"
title: "Relace Templates - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/repos/relace-templates#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Features

Relace Templates

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

If you have a base repo as a starting point for your agent, it’s recommended to turn it into a template Relace repo.

1

Make a Template Repo

Create a Relace repo from your base codebase and save the `repo_id`:

From GitHub

From Files

Copy

Ask AI

```
import { Relace } from "@relace-ai/relace";

const client = new Relace({ apiKey: "YOUR_API_KEY" });

const templateRepo = await client.repo.create({
    source: {
        type: "git",
        url: "https://github.com/relace-ai/vite-template",
        branch: "main"
    },
    auto_index: true // Required for semantic search
});

const templateRepoId = templateRepo.repo_id;
console.log(`Template repository created with ID: ${templateRepoId}`);
```

2

Create Repo from Relace Template

Now you can use the saved `template_repo_id` to quickly create new Relace repos:

Copy

Ask AI

```
import { Relace } from "@relace-ai/relace";

const client = new Relace({ apiKey: "YOUR_API_KEY" });

const newRepo = await client.repo.create({
    source: {
        type: "relace",
        repo_id: templateRepoId,
    },
    auto_index: true, // Required for semantic search
    metadata: {} // Optional: add any custom properties
});

console.log(`New repository created with ID: ${newRepo.repo_id}`);
```

Repo creation with a Relace template is nearly instantaneous, as you no longer pay the latency cost of transferring these base files over the network.

[Git Commands](https://docs.relace.ai/docs/repos/git-commands) [Repo Tokens](https://docs.relace.ai/docs/repos/repo-tokens)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.