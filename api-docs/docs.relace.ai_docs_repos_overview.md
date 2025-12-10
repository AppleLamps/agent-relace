---
url: "https://docs.relace.ai/docs/repos/overview"
title: "Overview - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/repos/overview#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Repos

Overview

On this page

- [Introduction](https://docs.relace.ai/docs/repos/overview#introduction)
- [Source Management for AI](https://docs.relace.ai/docs/repos/overview#source-management-for-ai)
- [Existing Alternatives](https://docs.relace.ai/docs/repos/overview#existing-alternatives)
- [Service limits](https://docs.relace.ai/docs/repos/overview#service-limits)
- [Integration complexity](https://docs.relace.ai/docs/repos/overview#integration-complexity)
- [Built-in Two-Stage Retrieval](https://docs.relace.ai/docs/repos/overview#built-in-two-stage-retrieval)
- [Next Steps](https://docs.relace.ai/docs/repos/overview#next-steps)

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

## [​](https://docs.relace.ai/docs/repos/overview\#introduction)  Introduction

Relace Repos is a fully managed version control system specifically designed for AI applications, offering:

- Lightweight read/write operations enabling easy integration with your backend.
- Semantic search that maintains low latency on large codebases.
- Multi-tenancy that scales to millions of repositories across thousands of users.
- Permissive rate limits that allow interactions across many repos simultaneously.
- Full git compatibility, allowing easy interactions from the git CLI.

## [​](https://docs.relace.ai/docs/repos/overview\#source-management-for-ai)  Source Management for AI

Building a scalable AI code editing application usually requires:

- Durable storage of source code
- Versioning, so that unsuccessful or undesired changes can be easily reverted
- Low-latency reads/writes on the working version of the code
- Support for automated interactions with thousands of isolated repos
- Integration with GitHub, to allow human developers to easily collaborate on the same code base

Relace Repos offers a centralized platform that satisfies all of these requirements, seamlessly integrated with our state-of-the-art embedding and retrieval models.

## [​](https://docs.relace.ai/docs/repos/overview\#existing-alternatives)  Existing Alternatives

Industry standard version control services like GitHub are designed primarily for human developers, which leads to some pain points for AI applications.

#### [​](https://docs.relace.ai/docs/repos/overview\#service-limits)  Service limits

Humans have low frequency manual interactions through websites and the git CLI. This results in relatively low limits that are insufficient for large scale automated AI applications:

- A single account/organization may not exceed [100,000 repos](https://docs.github.com/en/repositories/creating-and-managing-repositories/repository-limits#organization-and-account-limits)
- REST API requests may not exceed [5,000 per hour](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28#primary-rate-limit-for-authenticated-users) (15,000 for a GitHub app owned by an enterprise organization)

Most text-to-app systems treat each user application as a single repo, which leads to the repo limit being reached very quickly. Systems with many concurrent users will also hit the rate limit relatively quickly. Assuming that a single AI edit requires at least 2 API calls (pulling and pushing), your capacity would be ~2 requests per second.

#### [​](https://docs.relace.ai/docs/repos/overview\#integration-complexity)  Integration complexity

Human developer workflows are less constrained and more complex than a typical AI application. This leads to a system that requires many distinct steps to make a simple change to the code base:

1. Clone/checkout the repository locally
2. Edit the files
3. Stage and commit the changes
4. Push to the remote

Since commits are made locally, you must setup a git library or the git CLI on your host. Given that most AI workflows are run in a serverless or sandboxed environment, this also means that full source retrieval must happen every time you spin up the environment. This contributes to high cold-start latency, and often necessitates some sort of file caching strategy.A relatively simple workflow where an agent reads a code base and edits some files can quickly become a highly complex infrastructure problem.

## [​](https://docs.relace.ai/docs/repos/overview\#built-in-two-stage-retrieval)  Built-in Two-Stage Retrieval

Providing the right code context to your LLM is essential to produce the best results without sacrificing cost or latency. A reranker model offers the highest quality retrieval, but is computationally expensive to run (retrieval cost scales with the size of the code base). Pre-computing vector embeddings for code and using a vector similarity search for retrieval offers much faster/cheaper retrieval, but with lower accuracy. The best approach tends to be a hybrid system, where a vector search is used to provide a reduced set of candidate files for a reranker.Building this kind of system offers several challenges:

- Embedding and reranker models have a hard limit on the size of input files, which means large files need to be chunked
- Embeddings need to be stored in a vector database, and kept in sync with your source code
- Computing embeddings is slow; this means it must be done asynchronously, exposing potential race conditions

Relace Repos handles all of this complexity for you with our two-stage retrieval system:**Stage 1: Indexing**

- Large files are chunked into meaningful segments and passed to our optimized [Embeddings](https://docs.relace.ai/docs/embeddings/quickstart) model
- Embeddings are updated asynchronously as your codebase evolves.
- A vector similarity search over the stored embeddings is used to produce a set of candidate files for the reranker. Recently edited files that do not yet have stored embeddings are always included in the reranker input.

**Stage 2: Reranking**

- Candidate files from the first stage are passed to our [Code Reranker](https://docs.relace.ai/docs/code-reranker/overview) model
- Files are ranked by the model based on relevance to the input query
- Irrelevant code snippets are filtered out entirely

## [​](https://docs.relace.ai/docs/repos/overview\#next-steps)  Next Steps

For more details on how to set up Relace Repos as your agents source control system see our [onboarding guide](https://docs.relace.ai/docs/repos/onboarding).

[Quickstart](https://docs.relace.ai/docs/embeddings/quickstart) [Git Commands](https://docs.relace.ai/docs/repos/git-commands)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.