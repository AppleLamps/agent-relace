---
url: "https://docs.relace.ai/docs/repos/git-commands"
title: "Git Commands - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/repos/git-commands#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Features

Git Commands

On this page

- [Command Line Syntax](https://docs.relace.ai/docs/repos/git-commands#command-line-syntax)
- [Development Workflow](https://docs.relace.ai/docs/repos/git-commands#development-workflow)
- [Other Git Commands](https://docs.relace.ai/docs/repos/git-commands#other-git-commands)

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any
questions or need help with the integration.

Operations like `git clone`, `git push`, and `git pull` can be used natively with Relace Repos. Git is a convenient way to send/receive the minimal amount of necessary information for low overhead synchronization with your source of truth.We recommend using git for best performance.This guide assumes you’ve already [created a Relace Repo](https://docs.relace.ai/docs/api-reference/repos/create), and you’re trying to use it within a sandbox or other local file system. We go through two options — using git directly in the command line or within scripts via the Relace SDK.

## [​](https://docs.relace.ai/docs/repos/git-commands\#command-line-syntax)  Command Line Syntax

When using git directly from the command line, Relace Repos can be accessed using the following URL format:

Copy

Ask AI

```
https://token:YOUR_API_KEY@api.relace.run/v1/repo/YOUR_REPO_ID.git
```

Where:

- `YOUR_API_KEY` is your Relace API key
- `YOUR_REPO_ID` is the id of the repo you want to interact with

This url can be used with any standard git command, such as cloning:

Copy

Ask AI

```
git clone https://token:YOUR_API_KEY@api.relace.run/v1/repo/YOUR_REPO_ID.git
```

## [​](https://docs.relace.ai/docs/repos/git-commands\#development-workflow)  Development Workflow

1

Clone Relace Repo

Start by cloning the repo into your local environment.

Typescript SDK

CLI

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });

// Specify the path to clone the repository in
const repoPath = './repo_path';

// Clone a repository by Repo ID
await client.git(repoPath).clone({
  repoId: 'YOUR_REPO_ID',
  branch: 'main',
});
```

By default, the Relace SDK uses shallow clones for lowest latency. If you need
the full git history, you can explicity specify these parameters.

2

Stage, commit, and push all changes

After making changes to the files locally, you can push the changes back to the corresponding repo.

Typescript SDK

CLI

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });

// Stage all changes, commit, and push
await client
  .git('./repo_path')
  .add({ files : '.' })
  .commit({ message : 'Update components and documentation' })
  .push();
```

Make sure to include a `.gitignore` file
in your repo to avoid sending large files and binaries (like `node_modules/`,
`dist/`, etc.).

3

Pull latest changes before making more changes

Typescript SDK

CLI

Copy

Ask AI

```
import { Relace } from '@relace-ai/relace';

const client = new Relace({ apiKey: 'YOUR_API_KEY' });

// Pull the latest changes before continuing work
await client.git('./repo_path').pull();
```

## [​](https://docs.relace.ai/docs/repos/git-commands\#other-git-commands)  Other Git Commands

All standard git commands are supported with Relace Repos, including `git fetch`, `git checkout`, `git branch`, `git merge`, `git log`, and more. You can use Relace Repos just like any other git remote.For the complete API reference and additional repository operations, see the [Repos API Reference](https://docs.relace.ai/api-reference/repos/clone).

[Overview](https://docs.relace.ai/docs/repos/overview) [Relace Templates](https://docs.relace.ai/docs/repos/relace-templates)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.