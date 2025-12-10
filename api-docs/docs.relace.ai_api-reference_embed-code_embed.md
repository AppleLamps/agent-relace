---
url: "https://docs.relace.ai/api-reference/embed-code/embed"
title: "Embed Code - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/embed-code/embed#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Embeddings Model

Embed Code

cURL

cURL

Copy

Ask AI

```
curl --request POST \
  --url https://instantapply.endpoint.relace.run/v1/code/embed \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "relace-embed-v1",
  "input": [\
    "input 1",\
    "input 2"\
  ],
  "output_dtype": "float"
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
    [\
      {\
        "index": 0,\
        "embedding": [\
          0.123,\
          0.456,\
          0.789\
        ]\
      },\
      {\
        "index": 1,\
        "embedding": [\
          0.234,\
          0.567,\
          0.89\
        ]\
      }\
    ]\
  ],
  "usage": {
    "total_tokens": 8
  }
}
```

POST

https://instantapply.endpoint.relace.runhttps://ranker.endpoint.relace.runhttps://embeddings.endpoint.relace.runhttps://api.relace.run

/

v1

/

code

/

embed

Try it

cURL

cURL

Copy

Ask AI

```
curl --request POST \
  --url https://instantapply.endpoint.relace.run/v1/code/embed \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "model": "relace-embed-v1",
  "input": [\
    "input 1",\
    "input 2"\
  ],
  "output_dtype": "float"
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
    [\
      {\
        "index": 0,\
        "embedding": [\
          0.123,\
          0.456,\
          0.789\
        ]\
      },\
      {\
        "index": 1,\
        "embedding": [\
          0.234,\
          0.567,\
          0.89\
        ]\
      }\
    ]\
  ],
  "usage": {
    "total_tokens": 8
  }
}
```

#### Authorizations

[​](https://docs.relace.ai/api-reference/embed-code/embed#authorization-authorization)

Authorization

string

header

required

Relace API key Authorization header using the Bearer scheme.

#### Body

application/json

Codebase context for embedding

[​](https://docs.relace.ai/api-reference/embed-code/embed#body-model)

model

string

The model to use for embedding

[​](https://docs.relace.ai/api-reference/embed-code/embed#body-input)

input

string\[\]

Array of strings to embed

[​](https://docs.relace.ai/api-reference/embed-code/embed#body-output-dtype)

output\_dtype

enum<string>

default:float

Data type of the output embedding vectors. The `binary` quantization results in more compact embeddings with only a small loss in retrieval performance. See [HuggingFace blog post](https://huggingface.co/blog/embedding-quantization#binary-quantization) for details.

Available options:

`float`,

`binary`

#### Response

200

application/json

Codebase embedded successfully

[​](https://docs.relace.ai/api-reference/embed-code/embed#response-results)

results

object\[\]

Array of embeddings of the input strings

Showchild attributes

[​](https://docs.relace.ai/api-reference/embed-code/embed#response-results-items-index)

results.index

integer

Index of the input string in the request

[​](https://docs.relace.ai/api-reference/embed-code/embed#response-results-items-embedding)

results.embedding

array

Embedding vector of the input string

[​](https://docs.relace.ai/api-reference/embed-code/embed#response-usage)

usage

object

Token usage information for the request

Showchild attributes

[​](https://docs.relace.ai/api-reference/embed-code/embed#response-usage-total-tokens)

usage.total\_tokens

integer

Total number of tokens used

Example:

`8`

[Rank Code](https://docs.relace.ai/api-reference/code-reranker/rank-v2) [List Repos](https://docs.relace.ai/api-reference/repos/list)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.