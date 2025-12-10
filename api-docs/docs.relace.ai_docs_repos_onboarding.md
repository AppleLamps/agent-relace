---
url: "https://docs.relace.ai/docs/repos/onboarding"
title: "Onboarding - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/repos/onboarding#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Guides

Onboarding

On this page

- [Prerequisites](https://docs.relace.ai/docs/repos/onboarding#prerequisites)

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any
questions or need help with the integration.

## [​](https://docs.relace.ai/docs/repos/onboarding\#prerequisites)  Prerequisites

- [Sign up](https://app.relace.ai/) for a Relace account.
- Create an [API key](https://app.relace.ai/settings/api-keys).
- Install the Relace TypeScript SDK: `npm install @relace-ai/relace`

1

Transfer Existing Source to Relace

Start by transferring your existing repositories to Relace.

From GitHub

From Files

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });

const repo = await client.repo.create({
  source: {
    type: 'git',
    url: 'https://github.com/relace-ai/vite-template',
    branch: 'main',
  },
  auto_index: true, // Required for semantic search
  metadata: {}, // Optional: add any custom properties
});

console.log(`Repository created with ID: ${repo.repo_id}`);
```

Keep track of the Relace `repo_id` in your database for future reference. You can optionally include a `metadata` parameter to add any properties of repos you want to maintain.If you have a lot of repos to transfer, you’ll have to perform this step in batches. See the [policies section](https://docs.relace.ai/docs/policies#rate-limits) for information on rate limits.

2

Create New Relace Repos

For creating new repositories, we recommend using [Relace Templates](https://docs.relace.ai/docs/repos/relace-templates) to minimize repo creation latency. However, you can also use the same functions above.

From Relace

From GitHub

From Files

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });

const repo = await client.repo.create({
  source: {
    type: 'relace',
    repo_id: 'your-template-repo-id',
  },
  auto_index: true, // Required for semantic search
  metadata: {}, // Optional: add any custom properties
});

console.log(`Repository created with ID: ${repo.repo_id}`);
```

3

Integrate Repos with Your Agent

Now that your repositories live in Relace, you can integrate them with your agent’s local file system. You can fetch the stored files directly from our API without needing to setup git on your host:

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });

const repoFiles = await client.repo.clone(repoId);

// The response contains all files with their content
for (const file of repoFiles.files) {
  console.log(`File: ${file.filename}`);
  console.log(`Content: ${file.content.substring(0, 100)}...`); // First 100 characters
}
```

After your agent modifies files, push the changes back to Relace. You can either update specific files or overwrite all repository content.

Diff Mode

Overwrite Mode

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });

// Apply specific file operations using diff mode
const result = await client.repo.update(repoId, {
  source: {
    type: 'diff',
    operations: [\
      {\
        type: 'write',\
        filename: 'src/main.py',\
        content:\
          "def main():\n    print('Agent updated this function')\n    return True",\
      },\
      {\
        type: 'rename',\
        old_filename: 'src/helpers.ts',\
        new_filename: 'src/utils.ts',\
      },\
      {\
        type: 'delete',\
        filename: 'old-unused-file.py',\
      },\
    ],
  },
});

console.log(`Applied diff operations: ${JSON.stringify(result)}`);
```

The update operation will return a response with the new head of the repo:

Copy

Ask AI

```
{
  repo_id: "8d2e491a-935b-4872-b1fc-d9e84fba3c5d",
  repo_head: "7c5151736f4b4b1e68313201f9f24cb5da738ad3"
}
```

4

Use Built-In Semantic Retrieval

Repositories stored in Relace get automatically indexed with our code embedding model and are refreshed with each code update. Use the retrieve endpoint as an agent tool to score files based on relevance to a user query.

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });

const response = await client.repo.retrieve(repoId, {
  query: 'Add a user profile component with avatar and edit functionality',
});

const results = response.results;
```

You can parse the results the same way you do with direct calls to the reranker.

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

For more details, see our [API reference](https://docs.relace.ai/api-reference/introduction).

[Semantic Search](https://docs.relace.ai/docs/repos/index-and-retrieve) [Sync to Relace Repos](https://docs.relace.ai/docs/repos/sync)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.