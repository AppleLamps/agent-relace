---
url: "https://docs.relace.ai/api-reference/repos/get"
title: "Get Repo Details - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/repos/get#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Source Control

Get Repo Details

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X GET https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Response

Copy

Ask AI

```
{
  "repo_id": "123e4567-e89b-12d3-a456-426614174000",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T11:15:00Z",
  "metadata": {
    "name": "my-project",
    "description": "A sample project"
  },
  "auto_index": true
}
```

GET

https://api.relace.run

/

v1

/

repo

/

{repo\_id}

Try it

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X GET https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Response

Copy

Ask AI

```
{
  "repo_id": "123e4567-e89b-12d3-a456-426614174000",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T11:15:00Z",
  "metadata": {
    "name": "my-project",
    "description": "A sample project"
  },
  "auto_index": true
}
```

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

## [​](https://docs.relace.ai/api-reference/repos/get\#path-parameters)  Path Parameters

[​](https://docs.relace.ai/api-reference/repos/get#param-repo-id)

repo\_id

string

required

UUID of the repo to retrieve

## [​](https://docs.relace.ai/api-reference/repos/get\#response)  Response

[​](https://docs.relace.ai/api-reference/repos/get#param-repo-id-1)

repo\_id

string

Unique identifier for the repo

[​](https://docs.relace.ai/api-reference/repos/get#param-created-at)

created\_at

string

Time when the repo was originally created (ISO 8601 timestamp)

[​](https://docs.relace.ai/api-reference/repos/get#param-updated-at)

updated\_at

string

Time when the repo was last modified (ISO 8601 timestamp)

[​](https://docs.relace.ai/api-reference/repos/get#param-metadata)

metadata

object

Custom key/value pairs associated with the repo

[​](https://docs.relace.ai/api-reference/repos/get#param-auto-index)

auto\_index

boolean

Whether the repo is configured to index source files for semantic retrieval

[Create Repo](https://docs.relace.ai/api-reference/repos/create) [Update Repo](https://docs.relace.ai/api-reference/repos/update)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.