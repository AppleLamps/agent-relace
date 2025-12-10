---
url: "https://docs.relace.ai/api-reference/code-reranker/rank-v2"
title: "Rank Code - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/code-reranker/rank-v2#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Code Reranker

Rank Code

cURL

cURL

Copy

Ask AI

```
curl --request POST \
  --url https://instantapply.endpoint.relace.run/v2/code/rank \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "query": "Optimize the search function for better performance with large arrays",
  "codebase": [\
    {\
      "filename": "src/search.ts",\
      "content": "function findItem(array: Item[], targetId: string): Item | undefined {\\n  for (let i = 0; i < array.length; i++) {\\n    const item = array[i];\\n    if (item.id === targetId) {\\n      return item;\\n}\\n}\\n  return undefined;\\n}"\
    }\
  ],
  "token_limit": 100000
}
'
```

200

400

401

404

429

500

Copy

Ask AI

```
{
  "results": [\
    {\
      "filename": "src/search.ts",\
      "score": 0.953125\
    }\
  ],
  "usage": {
    "total_tokens": 96
  }
}
```

POST

https://instantapply.endpoint.relace.runhttps://ranker.endpoint.relace.runhttps://embeddings.endpoint.relace.runhttps://api.relace.run

/

v2

/

code

/

rank

Try it

cURL

cURL

Copy

Ask AI

```
curl --request POST \
  --url https://instantapply.endpoint.relace.run/v2/code/rank \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "query": "Optimize the search function for better performance with large arrays",
  "codebase": [\
    {\
      "filename": "src/search.ts",\
      "content": "function findItem(array: Item[], targetId: string): Item | undefined {\\n  for (let i = 0; i < array.length; i++) {\\n    const item = array[i];\\n    if (item.id === targetId) {\\n      return item;\\n}\\n}\\n  return undefined;\\n}"\
    }\
  ],
  "token_limit": 100000
}
'
```

200

400

401

404

429

500

Copy

Ask AI

```
{
  "results": [\
    {\
      "filename": "src/search.ts",\
      "score": 0.953125\
    }\
  ],
  "usage": {
    "total_tokens": 96
  }
}
```

#### Authorizations

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#authorization-authorization)

Authorization

string

header

required

Relace API key Authorization header using the Bearer scheme.

#### Body

application/json

Query and codebase context for relevance scoring

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#body-query)

query

string

required

The natural language query describing the problem to solve

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#body-codebase)

codebase

object\[\]

required

An array of files with their content, providing context for the query

Showchild attributes

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#body-codebase-items-filename)

codebase.filename

string

required

The name of the file including its path

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#body-codebase-items-content)

codebase.content

string

required

The content of the file

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#body-token-limit)

token\_limit

integer

default:100000

required

Maximum token limit for the response

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#body-relace-metadata)

relace\_metadata

object

Optional metadata for logging and tracking purposes. Removed before forwarding to origin server.

#### Response

200

application/json

Codebase reranked successfully

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#response-results)

results

object\[\]

Array of files ranked by relevance to the query, with their scores

Showchild attributes

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#response-results-items-filename)

results.filename

string

required

The name of the file including its path

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#response-results-items-score)

results.score

number<float>

required

The relevance score for this file (between 0 and 1)

Example:

```
[\
  {\
    "filename": "src/search.ts",\
    "score": 0.953125\
  }\
]
```

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#response-usage)

usage

object

Token usage information for the request

Showchild attributes

[​](https://docs.relace.ai/api-reference/code-reranker/rank-v2#response-usage-total-tokens)

usage.total\_tokens

integer

Total number of tokens used

Example:

`96`

[Apply Code](https://docs.relace.ai/api-reference/instant-apply/apply) [Embed Code](https://docs.relace.ai/api-reference/embed-code/embed)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.