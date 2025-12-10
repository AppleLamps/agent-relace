---
url: "https://docs.relace.ai/api-reference/repo_tokens/create"
title: "Create Repo Token - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/repo_tokens/create#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Authentication

Create Repo Token

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo_token \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-token",
    "repo_ids": [\
      "123e4567-e89b-12d3-a456-426614174000",\
      "987fcdeb-51a2-43f7-b123-456789abcdef"\
    ]
  }'
```

Response

Copy

Ask AI

```
{
  "name": "my-token",
  "token": "rlcr-a1b2c3d4e5f67890abcdef1234567890abcdef12",
  "repo_ids": [\
    "123e4567-e89b-12d3-a456-426614174000",\
    "987fcdeb-51a2-43f7-b123-456789abcdef"\
  ]
}
```

POST

https://api.relace.run

/

v1

/

repo\_token

Try it

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo_token \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-token",
    "repo_ids": [\
      "123e4567-e89b-12d3-a456-426614174000",\
      "987fcdeb-51a2-43f7-b123-456789abcdef"\
    ]
  }'
```

Response

Copy

Ask AI

```
{
  "name": "my-token",
  "token": "rlcr-a1b2c3d4e5f67890abcdef1234567890abcdef12",
  "repo_ids": [\
    "123e4567-e89b-12d3-a456-426614174000",\
    "987fcdeb-51a2-43f7-b123-456789abcdef"\
  ]
}
```

Repo tokens provide scoped read/write access to specific repositories. They can be used in place of your Relace API key for repo-specific operations.

Repo tokens are strongly recommended for use in sandboxed environments to prevent unintended access to other resources associated with your Relace account.

## [​](https://docs.relace.ai/api-reference/repo_tokens/create\#request-body)  Request Body

[​](https://docs.relace.ai/api-reference/repo_tokens/create#param-name)

name

string

required

A descriptive name for the token

[​](https://docs.relace.ai/api-reference/repo_tokens/create#param-repo-ids)

repo\_ids

array

required

Array of repository UUIDs that this token will have read/write access to

## [​](https://docs.relace.ai/api-reference/repo_tokens/create\#response)  Response

[​](https://docs.relace.ai/api-reference/repo_tokens/create#param-token)

token

string

The generated repo token value.

Tokens can only be referenced by this value; make sure to store it for future use.

[​](https://docs.relace.ai/api-reference/repo_tokens/create#param-name-1)

name

string

The name of the repo token

[​](https://docs.relace.ai/api-reference/repo_tokens/create#param-repo-ids-1)

repo\_ids

array

Array of repository UUIDs this token has read/write access to

## [​](https://docs.relace.ai/api-reference/repo_tokens/create\#using-repo-tokens)  Using Repo Tokens

Once created, repo tokens can be used as bearer tokens for authentication on any `/repo/{repo_id}` endpoint that they are scoped for:

Example Usage

Copy

Ask AI

```
# Use the repo token to search within an authorized repo
curl -X POST https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000/search \
  -H "Authorization: Bearer rlcr-a1b2c3d4e5f67890abcdef1234567890abcdef12" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "authentication logic"
  }'
```

[Retrieve](https://docs.relace.ai/api-reference/repos/retrieve) [Get Repo Token Details](https://docs.relace.ai/api-reference/repo_tokens/get)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.