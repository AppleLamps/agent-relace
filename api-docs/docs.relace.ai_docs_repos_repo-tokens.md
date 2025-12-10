---
url: "https://docs.relace.ai/docs/repos/repo-tokens"
title: "Repo Tokens - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/repos/repo-tokens#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Features

Repo Tokens

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any
questions or need help with the integration.

Repo tokens provide scoped read/write access to specific repositories. They can be used in place of your Relace API key for repo-specific operations.

1

Creating a Repo Token

Start by creating a repo token that grants access to one or more of your Relace repos.

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });

const result = await client.repoToken.create({
    name: "my-token",
    repo_ids: [\
        "123e4567-e89b-12d3-a456-426614174000",\
        "987fcdeb-51a2-43f7-b123-456789abcdef"\
    ]
});

const repoToken = result.token;
console.log("Repo Token:", repoToken);
```

Keep track of the generated token as it will not be shown again. You can use this token to access the specified repos.

Repo tokens are strongly recommended for use in [sandboxed environments](https://docs.relace.ai/docs/repos/sandbox) to prevent unintended access to other resources associated with your Relace account.

2

Using Git Commands

When using [git commands](https://docs.relace.ai/docs/repos/git-commands) to interact with your Relace repos, you can use the repo token in place of your API key in the clone URL:

Typescript SDK

CLI

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_REPO_TOKEN' });

// Specify the path to clone the repository in
const repoPath = './repo_path';

// Clone a repository by Repo ID
await client.git(repoPath).clone({
    repoId: 'YOUR_REPO_ID',
    branch: 'main',
});
```

3

Using with Agents

When using a coding agent you can now use the repo token in place of your Relace API key:

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_REPO_TOKEN' });

// Overwrite all repository content
const result = await client.repo.update(repoId, {
  source: {
    type: 'files',
    files: [\
      {\
        filename: 'src/main.py',\
        content:\
          "def main():\n    print('Agent completely rewrote this')\n    return True",\
      },\
      {\
        filename: 'README.md',\
        content:\
          '# Agent Updated Project\n\nThis project was updated by an AI agent.',\
      },\
    ],
  },
});

console.log(`Overwrote repository: ${JSON.stringify(result)}`);
```

4

Delete your Repo Tokens

You can delete repo tokens when they are no longer needed. For example, after a [sandboxed session](https://docs.relace.ai/docs/repos/sandbox) is complete to ensure the token cannot be used again:

Copy

Ask AI

```
import { Relace } from "@relace-ai/relace";

const client = new Relace();

const token = "rlcr-a1b2c3d4e5f67890abcdef1234567890abcdef12";
await client.repoToken.delete(token);
console.log("Repo token deleted successfully");
```

[Relace Templates](https://docs.relace.ai/docs/repos/relace-templates) [Semantic Search](https://docs.relace.ai/docs/repos/index-and-retrieve)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.