---
url: "https://docs.relace.ai/api-reference/repos/retrieve"
title: "Retrieve - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/repos/retrieve#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Semantic Retrieval

Retrieve

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000/retrieve \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "authentication and user login functionality",
    "branch": "main",
    "score_threshold": 0.3,
    "token_limit": 30000,
    "include_content": true
  }'
```

Response

Copy

Ask AI

```
{
  "results": [\
    {\
      "filename": "src/auth.py",\
      "content": "def authenticate_user(username, password):\n    \"\"\"Authenticate user credentials against the database.\"\"\"\n    user = User.query.filter_by(username=username).first()\n    if user and bcrypt.check_password_hash(user.password_hash, password):\n        return user\n    return None",\
      "score": 0.94\
    },\
    {\
      "filename": "src/models/user.py",\
      "content": "class User(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    username = db.Column(db.String(80), unique=True, nullable=False)\n    password_hash = db.Column(db.String(128), nullable=False)",\
      "score": 0.87\
    }\
  ],
  "hash": "a3f82c1d4e9b6f028571d3a2c8e4b96f7d2e5a18",
  "pending_embeddings": 0
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

retrieve

Try it

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X POST https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000/retrieve \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "authentication and user login functionality",
    "branch": "main",
    "score_threshold": 0.3,
    "token_limit": 30000,
    "include_content": true
  }'
```

Response

Copy

Ask AI

```
{
  "results": [\
    {\
      "filename": "src/auth.py",\
      "content": "def authenticate_user(username, password):\n    \"\"\"Authenticate user credentials against the database.\"\"\"\n    user = User.query.filter_by(username=username).first()\n    if user and bcrypt.check_password_hash(user.password_hash, password):\n        return user\n    return None",\
      "score": 0.94\
    },\
    {\
      "filename": "src/models/user.py",\
      "content": "class User(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    username = db.Column(db.String(80), unique=True, nullable=False)\n    password_hash = db.Column(db.String(128), nullable=False)",\
      "score": 0.87\
    }\
  ],
  "hash": "a3f82c1d4e9b6f028571d3a2c8e4b96f7d2e5a18",
  "pending_embeddings": 0
}
```

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

## [​](https://docs.relace.ai/api-reference/repos/retrieve\#path-parameters)  Path Parameters

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-repo-id)

repo\_id

string

required

UUID of the target repo to retrieve over.

Target repo must be created with `auto_index: true` for semantic retrieval to work.

## [​](https://docs.relace.ai/api-reference/repos/retrieve\#request-body)  Request Body

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-query)

query

string

required

Natural language description of what you’re looking for

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-branch)

branch

string

Branch name to retrieve from. Returns results from the most recently indexed commit on the branch. Uses the default branch if neither `branch` nor `hash` is specified.

Updated indices may not be available immediately after an edit/push. If you require results to reflect a recent change, use the `hash` parameter with the branch HEAD.

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-hash)

hash

string

Specific commit hash to retrieve from. Returns `404` if the commit has not been indexed. In cases where you are retrieving over a recently pushed commit, retry on `404` errors with an exponential backoff.

Only “leaf” commits are indexed. Passing a commit that has never been a branch HEAD will permanently return `404`.

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-score-threshold)

score\_threshold

number

default:0.3

Minimum relevance score for results (0.0 to 1.0)

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-token-limit)

token\_limit

integer

default:30000

Maximum number of tokens to return across all results

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-include-content)

include\_content

boolean

default:false

Whether to include file content in the response. If false, only filenames and scores are returned.

## [​](https://docs.relace.ai/api-reference/repos/retrieve\#response)  Response

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-results)

results

array

Array of relevant files and code sections

Show properties

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-filename)

filename

string

Path to the file within the repo

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-score)

score

number

Relevance score between 0.0 and 1.0

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-content)

content

string

File content (only included when include\_content=true)

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-hash-1)

hash

string

Commit hash that was retrieved over

[​](https://docs.relace.ai/api-reference/repos/retrieve#param-pending-embeddings)

pending\_embeddings

integer

Number of embeddings currently in progress

Query time may be slower and results may be degraded when there is a large number of pending embeddings.

[Clone Repo](https://docs.relace.ai/api-reference/repos/clone) [Create Repo Token](https://docs.relace.ai/api-reference/repo_tokens/create)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.