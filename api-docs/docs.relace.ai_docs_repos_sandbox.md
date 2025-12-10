---
url: "https://docs.relace.ai/docs/repos/sandbox"
title: "Sandboxes - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/repos/sandbox#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Guides

Sandboxes

On this page

- [Why use a Sandbox?](https://docs.relace.ai/docs/repos/sandbox#why-use-a-sandbox)
- [Modal Example](https://docs.relace.ai/docs/repos/sandbox#modal-example)
- [E2B Example](https://docs.relace.ai/docs/repos/sandbox#e2b-example)

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any
questions or need help with the integration.

## [​](https://docs.relace.ai/docs/repos/sandbox\#why-use-a-sandbox)  Why use a Sandbox?

Using a sandbox provides a safe, self-contained space for running code or programs without affecting your main system. This can be especially helpful for a coding agent that needs a controlled environment to work in.

### [​](https://docs.relace.ai/docs/repos/sandbox\#modal-example)  Modal Example

Here’s an easy Python example that shows how to create a [Modal](https://modal.com/docs/guide/sandbox) sandbox with a Relace repo.
In this code, we create a Modal sandbox, configure Git, and clone the Relace repo using the repo ID and Relace API key.

Make sure you run `pip install modal` to install the Modal package and `modal setup` to authenticate Modal before running the Python example:

Copy

Ask AI

```
import modal

app = modal.App.lookup("Sandbox-Example", create_if_missing=True)

repo_id = "REPO_ID"
relace_api_key = "RELACE_API_TOKEN"

# Configure the sandbox image with git
image = (
    modal.Image.debian_slim(python_version="3.13")
    .apt_install("git", "curl")
    .run_commands(
        "git config --global user.name 'Relace'",
        "git config --global user.email 'noreply@relace.ai'",
    )
    .workdir("/repo")
)

# Create the sandbox
sandbox = modal.Sandbox.create(image=image, app=app)

clone_url = f"https://token:{relace_api_key}@api.relace.run/v1/repo/{repo_id}.git"

# Run git clone inside the sandbox
clone_proc = sandbox.exec("git", "clone", clone_url, ".")
if clone_proc.wait() != 0:
    print("Clone failed:", clone_proc.stderr.read())
    raise Exception("Clone failed")

# Example command to list files in the cloned repo
ls_proc = sandbox.exec("ls", "-la")
print(ls_proc.stdout.read())

sandbox.terminate()
```

To run this example use: `python sandbox.py`Once your sandbox is created you run commands inside the sandbox using `sandbox.exec(...)` to test or experiment with the code in the cloned Relace repo.

### [​](https://docs.relace.ai/docs/repos/sandbox\#e2b-example)  E2B Example

Heres another example that shows how to create a sandbox with Relace repos using [E2B](https://e2b.dev/docs) with TypeScript.

Make sure you run `npm install @e2b/code-interpreter` to install E2B and set environment variable with your E2B API key before running the TypeScript example:

Copy

Ask AI

```
import { Sandbox } from "@e2b/code-interpreter";

// Create the sandbox
const sandbox = await Sandbox.create();

// Configure git
await sandbox.commands.run(`git config --global user.name 'Relace'`);
await sandbox.commands.run(`git config --global user.email 'noreply@relace.ai'`);

const token = "RELACE_API_KEY";
const repoId = "REPO_ID";
const repoDir = "./repo";

// Clone Relace repo inside the sandbox
const cloneResult = await sandbox.commands.run(
    `git clone https://token:${token}@api.relace.run/v1/repo/${repoId}.git ${repoDir}`
);

// Check for clone failure
if (cloneResult.exitCode !== 0) {
    console.error("Clone failed:", cloneResult.stderr);
    throw new Error(`Failed to clone repository: ${cloneResult.stderr}`);
}

// Example command to list files in the cloned repo
const files = await sandbox.commands.run(`ls -la ${repoDir}`);
console.log(files.stdout);
```

To run this example use `npx ts-node sandbox.ts`Once your sandbox is created you run commands inside the sandbox using `sandbox.commands.run(...)`to test or experiment with the code in the cloned Relace repo.For more details, see [Modal docs](https://modal.com/docs/guide/sandbox) or [E2B docs](https://e2b.dev/docs).

[GitHub Integration](https://docs.relace.ai/docs/repos/github-integration) [Overview](https://docs.relace.ai/docs/fast-agentic-search/agent)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.