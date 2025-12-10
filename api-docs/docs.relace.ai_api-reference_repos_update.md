---
url: "https://docs.relace.ai/api-reference/repos/update"
title: "Update Repo - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/repos/update#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Source Control

Update Repo

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000/update \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "source": {
      "type": "diff",
      "operations": [\
        {\
          "type": "write",\
          "filename": "src/search.ts",\
          "content": "function findItem(array: Item[], targetId: string): Item | undefined {\n  for (let i = 0; i < array.length; i++) {\n    const item = array[i];\n    if (item.id === targetId) {\n      return item;\n    }\n  }\n  return undefined;\n}"\
        },\
        {\
          "type": "rename",\
          "old_filename": "src/utils.ts",\
          "new_filename": "src/helpers.ts"\
        },\
        {\
          "type": "delete",\
          "filename": "old-file.js"\
        }\
      ]
    },
    "metadata": {
      "version": "2.1.0",
      "updated_by": "user123"
    }
  }'
```

Response

Copy

Ask AI

```
{
  "repo_head": "abc123def456",
  "repo_id": "123e4567-e89b-12d3-a456-426614174000",
  "changed_files": ["src/search.ts", "src/helpers.ts", "old-file.js"]
}
```

POST

https://api.relace.run

/

v1

/

repo

/

{repo\_id}

/

update

Try it

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000/update \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "source": {
      "type": "diff",
      "operations": [\
        {\
          "type": "write",\
          "filename": "src/search.ts",\
          "content": "function findItem(array: Item[], targetId: string): Item | undefined {\n  for (let i = 0; i < array.length; i++) {\n    const item = array[i];\n    if (item.id === targetId) {\n      return item;\n    }\n  }\n  return undefined;\n}"\
        },\
        {\
          "type": "rename",\
          "old_filename": "src/utils.ts",\
          "new_filename": "src/helpers.ts"\
        },\
        {\
          "type": "delete",\
          "filename": "old-file.js"\
        }\
      ]
    },
    "metadata": {
      "version": "2.1.0",
      "updated_by": "user123"
    }
  }'
```

Response

Copy

Ask AI

```
{
  "repo_head": "abc123def456",
  "repo_id": "123e4567-e89b-12d3-a456-426614174000",
  "changed_files": ["src/search.ts", "src/helpers.ts", "old-file.js"]
}
```

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

## [​](https://docs.relace.ai/api-reference/repos/update\#path-parameters)  Path Parameters

[​](https://docs.relace.ai/api-reference/repos/update#param-repo-id)

repo\_id

string

required

Repo ID

## [​](https://docs.relace.ai/api-reference/repos/update\#request-body)  Request Body

[​](https://docs.relace.ai/api-reference/repos/update#param-source)

source

object

Optional source for updating the repo content

Show properties

[​](https://docs.relace.ai/api-reference/repos/update#param-type)

type

string

required

Update type: `"git"` for Git sync, `"files"` to replace all repo content, or
`"diff"` for specific operations

- Git

- Files

- Diff


[​](https://docs.relace.ai/api-reference/repos/update#param-url)

url

string

required

Git repo URL to sync from

[​](https://docs.relace.ai/api-reference/repos/update#param-branch)

branch

string

Specific branch to sync (optional)

[​](https://docs.relace.ai/api-reference/repos/update#param-files)

files

array

required

Array of file objects that will completely replace the repo content. Any files not included will be deleted from the repo.

Show properties

[​](https://docs.relace.ai/api-reference/repos/update#param-filename)

filename

string

required

The path and filename for the file

[​](https://docs.relace.ai/api-reference/repos/update#param-content)

content

string

required

The content of the file

[​](https://docs.relace.ai/api-reference/repos/update#param-operations)

operations

array

required

Array of file operations to perform

Show properties

[​](https://docs.relace.ai/api-reference/repos/update#param-type-1)

type

string

required

Operation type: `"write"` to create/update, `"rename"` to change filename, or `"delete"` to remove

Show operation-specific properties

- Write

- Rename

- Delete


[​](https://docs.relace.ai/api-reference/repos/update#param-filename-1)

filename

string

required

The path and filename for the file

[​](https://docs.relace.ai/api-reference/repos/update#param-content-1)

content

string

required

The content of the file

[​](https://docs.relace.ai/api-reference/repos/update#param-old-filename)

old\_filename

string

required

The current path and filename

[​](https://docs.relace.ai/api-reference/repos/update#param-new-filename)

new\_filename

string

required

The new path and filename

[​](https://docs.relace.ai/api-reference/repos/update#param-filename-2)

filename

string

required

The path and filename to delete

[​](https://docs.relace.ai/api-reference/repos/update#param-metadata)

metadata

object

Optional object containing any key-value pairs, which overwrites any existing
metadata.

If neither `source` nor `metadata` is provided, you’ll receive a 422 error.

## [​](https://docs.relace.ai/api-reference/repos/update\#response)  Response

[​](https://docs.relace.ai/api-reference/repos/update#param-repo-id-1)

repo\_id

string

The repository ID that was updated

[​](https://docs.relace.ai/api-reference/repos/update#param-repo-head)

repo\_head

string

Commit hash for the updated repo head

[​](https://docs.relace.ai/api-reference/repos/update#param-changed-files)

changed\_files

array

Array of file paths that were modified

[Get Repo Details](https://docs.relace.ai/api-reference/repos/get) [Upload File](https://docs.relace.ai/api-reference/repos/upload)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.