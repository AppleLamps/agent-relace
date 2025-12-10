---
url: "https://docs.relace.ai/api-reference/repo_tokens/get"
title: "Get Repo Token Details - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/repo_tokens/get#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Authentication

Get Repo Token Details

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X GET https://api.relace.run/v1/repo_token/rlcr-a1b2c3d4e5f67890abcdef1234567890abcdef12
```

Response

Copy

Ask AI

```
{
  "name": "my-token",
  "repo_ids": [\
    "123e4567-e89b-12d3-a456-426614174000",\
    "987fcdeb-51a2-43f7-b123-456789abcdef"\
  ]
}
```

GET

https://api.relace.run

/

v1

/

repo\_token

/

{token}

Try it

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X GET https://api.relace.run/v1/repo_token/rlcr-a1b2c3d4e5f67890abcdef1234567890abcdef12
```

Response

Copy

Ask AI

```
{
  "name": "my-token",
  "repo_ids": [\
    "123e4567-e89b-12d3-a456-426614174000",\
    "987fcdeb-51a2-43f7-b123-456789abcdef"\
  ]
}
```

## [​](https://docs.relace.ai/api-reference/repo_tokens/get\#path-parameters)  Path Parameters

[​](https://docs.relace.ai/api-reference/repo_tokens/get#param-token)

token

string

required

The repo token string to retrieve details for

## [​](https://docs.relace.ai/api-reference/repo_tokens/get\#response)  Response

[​](https://docs.relace.ai/api-reference/repo_tokens/get#param-name)

name

string

The name of the repo token

[​](https://docs.relace.ai/api-reference/repo_tokens/get#param-repo-ids)

repo\_ids

array

Array of repository UUIDs this token has access to

[Create Repo Token](https://docs.relace.ai/api-reference/repo_tokens/create) [Delete Repo Token](https://docs.relace.ai/api-reference/repo_tokens/delete)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.