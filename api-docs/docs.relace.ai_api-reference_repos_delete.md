---
url: "https://docs.relace.ai/api-reference/repos/delete"
title: "Delete Repo - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/repos/delete#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Source Control

Delete Repo

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X DELETE https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Response

Copy

Ask AI

```
204 No Content
```

DELETE

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
curl -X DELETE https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Response

Copy

Ask AI

```
204 No Content
```

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

## [​](https://docs.relace.ai/api-reference/repos/delete\#path-parameters)  Path Parameters

[​](https://docs.relace.ai/api-reference/repos/delete#param-repo-id)

repo\_id

string

required

UUID of the repo to delete

## [​](https://docs.relace.ai/api-reference/repos/delete\#response)  Response

This endpoint returns no content on successful deletion.

[Upload File](https://docs.relace.ai/api-reference/repos/upload) [Clone Repo](https://docs.relace.ai/api-reference/repos/clone)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.