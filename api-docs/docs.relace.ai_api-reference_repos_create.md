---
url: "https://docs.relace.ai/api-reference/repos/create"
title: "Create Repo - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/repos/create#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Source Control

Create Repo

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '{
    "source": {
      "type": "files",
      "files": [\
        {\
          "filename": "src/search.ts",\
          "content": "function findItem(array: Item[], targetId: string): Item | undefined {\n  for (let i = 0; i < array.length; i++) {\n    const item = array[i];\n    if (item.id === targetId) {\n      return item;\n    }\n  }\n  return undefined;\n}"\
        },\
        {\
          "filename": "src/types.ts",\
          "content": "interface Item {\n  id: string;\n  value: string;\n  metadata?: Record<string, unknown>;\n}"\
        }\
        # ... more files\
      ]
    },
    "metadata": {
      "name": "my-codebase",
      "id": "my-internal-id"
    }
  }'
```

Response

Copy

Ask AI

```
{
  "repo_id": "123e4567-e89b-12d3-a456-426614174000",
  "repo_head": "a1b2c3d4e5f6789012345678901234567890abcdef"
}
```

POST

https://api.relace.run

/

v1

/

repo

Try it

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
    -d '{
    "source": {
      "type": "files",
      "files": [\
        {\
          "filename": "src/search.ts",\
          "content": "function findItem(array: Item[], targetId: string): Item | undefined {\n  for (let i = 0; i < array.length; i++) {\n    const item = array[i];\n    if (item.id === targetId) {\n      return item;\n    }\n  }\n  return undefined;\n}"\
        },\
        {\
          "filename": "src/types.ts",\
          "content": "interface Item {\n  id: string;\n  value: string;\n  metadata?: Record<string, unknown>;\n}"\
        }\
        # ... more files\
      ]
    },
    "metadata": {
      "name": "my-codebase",
      "id": "my-internal-id"
    }
  }'
```

Response

Copy

Ask AI

```
{
  "repo_id": "123e4567-e89b-12d3-a456-426614174000",
  "repo_head": "a1b2c3d4e5f6789012345678901234567890abcdef"
}
```

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

## [​](https://docs.relace.ai/api-reference/repos/create\#request-body)  Request Body

[​](https://docs.relace.ai/api-reference/repos/create#param-source)

source

object

Optional object to initialize the repo from existing source

Show properties

[​](https://docs.relace.ai/api-reference/repos/create#param-type)

type

string

required

The source type: `"files"` for direct file upload, `"git"` for GitHub repo, or `"relace"` for Relace repo

- From Files

- From Git Repo

- From Relace Repo


[​](https://docs.relace.ai/api-reference/repos/create#param-files)

files

array

required

Array of file objects to include in the repo

Show properties

[​](https://docs.relace.ai/api-reference/repos/create#param-filename)

filename

string

required

The path and filename for the file

[​](https://docs.relace.ai/api-reference/repos/create#param-content)

content

string

required

The content of the file

[​](https://docs.relace.ai/api-reference/repos/create#param-url)

url

string

required

Git repo URL to clone from

[​](https://docs.relace.ai/api-reference/repos/create#param-branch)

branch

string

Specific branch to clone

[​](https://docs.relace.ai/api-reference/repos/create#param-shallow)

shallow

boolean

default:true

Whether to import using a shallow clone

Commit history is not preserved when this option is enabled, so operations that require in-tact history (e.g. GitHub sync) will not work.

[​](https://docs.relace.ai/api-reference/repos/create#param-repo-id)

repo\_id

string

required

Relace repo id to use as a template

[​](https://docs.relace.ai/api-reference/repos/create#param-copy-metadata)

copy\_metadata

boolean

Optional flag to keep the metadata of the repo you are cloning

[​](https://docs.relace.ai/api-reference/repos/create#param-copy-remote)

copy\_remote

boolean

Optional flag to keep the orginal github remote if present

[​](https://docs.relace.ai/api-reference/repos/create#param-metadata)

metadata

object

Optional object containing any key-value pairs for custom metadata about the
repo

[​](https://docs.relace.ai/api-reference/repos/create#param-auto-index)

auto\_index

boolean

default:false

Optional flag to enable automatic code indexing/embedding after repo creation and updates.

This parameter must be enabled for semantic retrieval to work.

## [​](https://docs.relace.ai/api-reference/repos/create\#response)  Response

[​](https://docs.relace.ai/api-reference/repos/create#param-repo-id-1)

repo\_id

string

Unique identifier for the newly created repo

[​](https://docs.relace.ai/api-reference/repos/create#param-repo-head)

repo\_head

string

Commit hash for the current repo head

[List Repos](https://docs.relace.ai/api-reference/repos/list) [Get Repo Details](https://docs.relace.ai/api-reference/repos/get)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.