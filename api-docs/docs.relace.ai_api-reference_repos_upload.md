---
url: "https://docs.relace.ai/api-reference/repos/upload"
title: "Upload File - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/repos/upload#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Source Control

Upload File

cURL

TypeScript

JavaScript

Next.js Example

Copy

Ask AI

```
curl -X PUT https://api.relace.run/v1/repo/3fa85f64-5717-4562-b3fc-2c963f66afa6/file/src/main.py \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/octet-stream" \
  --data-binary "def main():
    print('Hello World!')

if __name__ == '__main__':
    main()"
```

Response

Copy

Ask AI

```
{
  "repo_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "repo_head": "abc123def456789",
  "changed_files": ["src/main.py"]
}
```

PUT

https://api.relace.run

/

v1

/

repo

/

{repo\_id}

/

file

/

{file\_path}

Try it

cURL

TypeScript

JavaScript

Next.js Example

Copy

Ask AI

```
curl -X PUT https://api.relace.run/v1/repo/3fa85f64-5717-4562-b3fc-2c963f66afa6/file/src/main.py \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/octet-stream" \
  --data-binary "def main():
    print('Hello World!')

if __name__ == '__main__':
    main()"
```

Response

Copy

Ask AI

```
{
  "repo_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "repo_head": "abc123def456789",
  "changed_files": ["src/main.py"]
}
```

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

## [​](https://docs.relace.ai/api-reference/repos/upload\#path-parameters)  Path Parameters

[​](https://docs.relace.ai/api-reference/repos/upload#param-repo-id)

repo\_id

string

required

Repo ID

[​](https://docs.relace.ai/api-reference/repos/upload#param-file-path)

file\_path

string

required

Path to the file within the repository (URL encoded)

## [​](https://docs.relace.ai/api-reference/repos/upload\#request-body)  Request Body

The request body should contain the raw file content as binary data. Set the `Content-Type` header to `application/octet-stream`.

## [​](https://docs.relace.ai/api-reference/repos/upload\#response)  Response

Returns HTTP status `201 Created` on success.

[​](https://docs.relace.ai/api-reference/repos/upload#param-repo-id-1)

repo\_id

string

The repository ID that was updated

[​](https://docs.relace.ai/api-reference/repos/upload#param-repo-head)

repo\_head

string

Commit hash for the updated repo head

[​](https://docs.relace.ai/api-reference/repos/upload#param-changed-files)

changed\_files

array

Array of file paths that were modified

[Update Repo](https://docs.relace.ai/api-reference/repos/update) [Delete Repo](https://docs.relace.ai/api-reference/repos/delete)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.