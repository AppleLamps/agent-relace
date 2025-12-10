---
url: "https://docs.relace.ai/api-reference/repos/list"
title: "List Repos - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/repos/list#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Source Control

List Repos

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X GET "https://api.relace.run/v1/repo?page_size=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Response

Copy

Ask AI

```
{
  "items": [\
    {\
      "repo_id": "123e4567-e89b-12d3-a456-426614174000",\
      "created_at": "2024-01-15T10:30:00Z",\
      "updated_at": "2024-01-15T11:15:00Z",\
      "metadata": {\
        "name": "my-project",\
        "description": "A sample project"\
      },\
      "auto_index": false\
    }\
  ],
  "total_items": 1
}
```

GET

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
curl -X GET "https://api.relace.run/v1/repo?page_size=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Response

Copy

Ask AI

```
{
  "items": [\
    {\
      "repo_id": "123e4567-e89b-12d3-a456-426614174000",\
      "created_at": "2024-01-15T10:30:00Z",\
      "updated_at": "2024-01-15T11:15:00Z",\
      "metadata": {\
        "name": "my-project",\
        "description": "A sample project"\
      },\
      "auto_index": false\
    }\
  ],
  "total_items": 1
}
```

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

## [​](https://docs.relace.ai/api-reference/repos/list\#query-parameters)  Query Parameters

[​](https://docs.relace.ai/api-reference/repos/list#param-page-start)

page\_start

integer

Start index of the page (default: 0)

[​](https://docs.relace.ai/api-reference/repos/list#param-page-size)

page\_size

integer

Number of repos to return per page (default: 100, min: 1, max: 100)

[​](https://docs.relace.ai/api-reference/repos/list#param-order-by)

order\_by

string

Field to order results by (default: “created\_at”)

[​](https://docs.relace.ai/api-reference/repos/list#param-order-descending)

order\_descending

boolean

Whether to sort in descending order (default: false)

[​](https://docs.relace.ai/api-reference/repos/list#param-filter-metadata)

filter\_metadata

string

URL-encoded JSON map of metadata values to filter by

## [​](https://docs.relace.ai/api-reference/repos/list\#response)  Response

[​](https://docs.relace.ai/api-reference/repos/list#param-items)

items

array

Array of repo objects

Show properties

[​](https://docs.relace.ai/api-reference/repos/list#param-repo-id)

repo\_id

string

Unique identifier for the repo

[​](https://docs.relace.ai/api-reference/repos/list#param-created-at)

created\_at

string

Time when the repo was originally created (ISO 8601 timestamp)

[​](https://docs.relace.ai/api-reference/repos/list#param-updated-at)

updated\_at

string

Time when the repo was last modified (ISO 8601 timestamp)

[​](https://docs.relace.ai/api-reference/repos/list#param-metadata)

metadata

object

Custom key/value pairs associated with the repo

[​](https://docs.relace.ai/api-reference/repos/list#param-auto-index)

auto\_index

boolean

Whether the repo is configured to index source files for semantic retrieval

[​](https://docs.relace.ai/api-reference/repos/list#param-next-page)

next\_page

integer

Start index of the next page (omitted if no more pages)

[​](https://docs.relace.ai/api-reference/repos/list#param-total-items)

total\_items

integer

Total number of repos matching the query

[Embed Code](https://docs.relace.ai/api-reference/embed-code/embed) [Create Repo](https://docs.relace.ai/api-reference/repos/create)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.