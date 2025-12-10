---
url: "https://docs.relace.ai/docs/repos/index-and-retrieve"
title: "Semantic Search - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/repos/index-and-retrieve#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Features

Semantic Search

On this page

- [Prerequisites](https://docs.relace.ai/docs/repos/index-and-retrieve#prerequisites)

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

## [​](https://docs.relace.ai/docs/repos/index-and-retrieve\#prerequisites)  Prerequisites

- [Sign up](https://app.relace.ai/) for a Relace account.
- Create an [API key](https://app.relace.ai/settings/api-keys).
- Connect to the Relace [GitHub App](https://docs.relace.ai/repos/github-integration).

1

Import GitHub Project

We’ll start by creating a new Relace Repo using GitHub as a `source`. We use GitHub as an easy example, but semantic search will work over any Relace Repo.

Copy

Ask AI

```
import { Relace } from "@relace-ai/relace";

const client = new Relace({ apiKey: "YOUR_API_KEY" });

const repo = await client.repo.create({
    source: {
        type: "git",
        url: "https://github.com/relace-ai/vite-template",
        branch: "main"
    },
    auto_index: true // Required for semantic search
});

const repoId = repo.repo_id;
console.log(`Repository created with ID: ${repoId}`);
```

Behind the scenes, we clone your repo and kick of an asychronous job to intelligently chunk and index the codebase with our [code embeddings](https://docs.relace.ai/embeddings/quickstart) model.This process is usually fast, but for very large repositories ( _i.e._ 100+ MB), it can take upwards of 5 minutes.

2

Perform Semantic Search

You can now use the `retrieve` endpoint to score files based on relevance to a query in natural language!

Copy

Ask AI

```
import { Relace } from "@relace-ai/relace";

const client = new Relace({ apiKey: "YOUR_API_KEY" });

const response = await client.repo.retrieve(repoId, {
    query: "Add a user profile component with avatar and edit functionality"
});

const results = response.results;
```

The response will be a list of objects that provide a relevance score for each file.

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

For more details, see our [API reference](https://docs.relace.ai/api-reference/repos/retrieve).

[Repo Tokens](https://docs.relace.ai/docs/repos/repo-tokens) [Onboarding](https://docs.relace.ai/docs/repos/onboarding)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.