---
url: "https://docs.relace.ai/docs/repos/github-integration"
title: "GitHub Integration - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/repos/github-integration#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Guides

GitHub Integration

On this page

- [Link Personal GitHub Repos](https://docs.relace.ai/docs/repos/github-integration#link-personal-github-repos)
- [Link Your GitHub App](https://docs.relace.ai/docs/repos/github-integration#link-your-github-app)
- [Sync to Relace from GitHub](https://docs.relace.ai/docs/repos/github-integration#sync-to-relace-from-github)

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

Relace Repos is designed to be the source control for your coding agent. You will likely need to integrate with GitHub if you want to support collaboration with human developers.There are two ways to set up a GitHub integration with Relace depending on whether you want to link to _personal_ GitHub repos or to _user_ repos via your GitHub app.

## [​](https://docs.relace.ai/docs/repos/github-integration\#link-personal-github-repos)  Link Personal GitHub Repos

You can provision access to repos belonging to you or your organization with the Relace GitHub App. Go to [GitHub settings](https://app.relace.ai/settings/integrations/github) on the Relace dashboard and choose the “Use Your Own Repos” option.![Use Your Own Repos option](https://mintcdn.com/relace/pIxvPvJFcm8QHi7x/images/relace_github_app.png?fit=max&auto=format&n=pIxvPvJFcm8QHi7x&q=85&s=f93d99bb06e454d2862b4e26a1e0357e)In the GitHub app installation flow, you can either allow full access or select specific repos to give Relace.

## [​](https://docs.relace.ai/docs/repos/github-integration\#link-your-github-app)  Link Your GitHub App

To give Relace access to your users’ GitHub repos, you need to maintain your own GitHub app. You can find documentation on [creating GitHub Apps](https://docs.github.com/en/apps/overview) in the GitHub documentation.Once you’ve registered and created your app, go to [GitHub settings](https://app.relace.ai/settings/integrations/github) on the Relace dashboard and choose the “Use Your GitHub App” option.![Use Your GitHub App option](https://mintcdn.com/relace/pIxvPvJFcm8QHi7x/images/personal_github_app.png?fit=max&auto=format&n=pIxvPvJFcm8QHi7x&q=85&s=37baba0d08058dbddad875706bf5c194)We’ll use the credentials you provide to pull relevant repos from users on your behalf.

## [​](https://docs.relace.ai/docs/repos/github-integration\#sync-to-relace-from-github)  Sync to Relace from GitHub

You can now initialize a Relace Repo by providing a url to a GitHub repo that Relace has been authorized to use.

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
    metadata: {} // Optional: add any custom properties
});

console.log(`Repository created with ID: ${repo.repo_id}`);
```

If the Relace Repo has not diverged from the GitHub source, you can sync the two in a similar way.

Copy

Ask AI

```
import { Relace } from "@relace-ai/relace";

const client = new Relace({ apiKey: "YOUR_API_KEY" });

const repo = await client.repo.update(repoId, {
    source: {
        type: "git",
        url: "https://github.com/relace-ai/vite-template",
        branch: "main"
    }
});

console.log(`Repository updated: ${repo.repo_id}`);
```

Reverse synchronization (pushing changes from Relace Repos back to GitHub) is
not currently supported but will be available in an upcoming release.

For more details on the GitHub related operations, see the [API reference](https://docs.relace.ai/api-reference/introduction).

[Sync to Relace Repos](https://docs.relace.ai/docs/repos/sync) [Sandboxes](https://docs.relace.ai/docs/repos/sandbox)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.

![Use Your Own Repos option](https://mintcdn.com/relace/pIxvPvJFcm8QHi7x/images/relace_github_app.png?w=1100&fit=max&auto=format&n=pIxvPvJFcm8QHi7x&q=85&s=1ec2443e237e16deaf41fad145b5f7da)

![Use Your GitHub App option](https://mintcdn.com/relace/pIxvPvJFcm8QHi7x/images/personal_github_app.png?w=1100&fit=max&auto=format&n=pIxvPvJFcm8QHi7x&q=85&s=c4985908d381f1e6271a380eb555048c)