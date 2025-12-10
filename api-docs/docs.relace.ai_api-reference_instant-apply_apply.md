---
url: "https://docs.relace.ai/api-reference/instant-apply/apply"
title: "Apply Code - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/instant-apply/apply#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Instant Apply

Apply Code

cURL

cURL

Copy

Ask AI

```
curl --request POST \
  --url https://instantapply.endpoint.relace.run/v1/code/apply \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "initial_code": "function calculateTotal(items) {\n  let total = 0;\n  \n  for (const item of items) {\n    total += item.price * item.quantity;\n  }\n  \n  return total;\n}",
  "edit_snippet": "// ... keep existing code\n\nfunction applyDiscount(total, discountRules) {\n  let discountedTotal = total;\n  \n  if (discountRules.percentOff) {\n    discountedTotal -= (total * discountRules.percentOff / 100);\n  }\n  \n  if (discountRules.fixedAmount && discountRules.fixedAmount < discountedTotal) {\n    discountedTotal -= discountRules.fixedAmount;\n  }\n  \n  return Math.max(0, discountedTotal);\n}",
  "stream": false,
  "model": "relace-apply-3"
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
  "mergedCode": "function calculateTotal(items) {\n  let total = 0;\n  \n  for (const item of items) {\n    total += item.price * item.quantity;\n  }\n  \n  return total;\n}\n\nfunction applyDiscount(total, discountRules) {\n  let discountedTotal = total;\n  \n  if (discountRules.percentOff) {\n    discountedTotal -= (total * discountRules.percentOff / 100);\n  }\n  \n  if (discountRules.fixedAmount && discountRules.fixedAmount < discountedTotal) {\n    discountedTotal -= discountRules.fixedAmount;\n  }\n  \n  return Math.max(0, discountedTotal);\n}",
  "usage": {
    "prompt_tokens": 245,
    "completion_tokens": 187,
    "total_tokens": 432
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

apply

Try it

cURL

cURL

Copy

Ask AI

```
curl --request POST \
  --url https://instantapply.endpoint.relace.run/v1/code/apply \
  --header 'Authorization: Bearer <token>' \
  --header 'Content-Type: application/json' \
  --data '
{
  "initial_code": "function calculateTotal(items) {\n  let total = 0;\n  \n  for (const item of items) {\n    total += item.price * item.quantity;\n  }\n  \n  return total;\n}",
  "edit_snippet": "// ... keep existing code\n\nfunction applyDiscount(total, discountRules) {\n  let discountedTotal = total;\n  \n  if (discountRules.percentOff) {\n    discountedTotal -= (total * discountRules.percentOff / 100);\n  }\n  \n  if (discountRules.fixedAmount && discountRules.fixedAmount < discountedTotal) {\n    discountedTotal -= discountRules.fixedAmount;\n  }\n  \n  return Math.max(0, discountedTotal);\n}",
  "stream": false,
  "model": "relace-apply-3"
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
  "mergedCode": "function calculateTotal(items) {\n  let total = 0;\n  \n  for (const item of items) {\n    total += item.price * item.quantity;\n  }\n  \n  return total;\n}\n\nfunction applyDiscount(total, discountRules) {\n  let discountedTotal = total;\n  \n  if (discountRules.percentOff) {\n    discountedTotal -= (total * discountRules.percentOff / 100);\n  }\n  \n  if (discountRules.fixedAmount && discountRules.fixedAmount < discountedTotal) {\n    discountedTotal -= discountRules.fixedAmount;\n  }\n  \n  return Math.max(0, discountedTotal);\n}",
  "usage": {
    "prompt_tokens": 245,
    "completion_tokens": 187,
    "total_tokens": 432
  }
}
```

Relace apply runs at over 10,000 tok/s, making complicated code merges feel instantaneous.

## [​](https://docs.relace.ai/api-reference/instant-apply/apply\#models)  Models

We have deprecated all previous versions of the apply models in favor of `relace-apply-3`, which is more performant on accuracy, speed, and long context requests.

| Model | Speed | Max Input | Max Output |
| --- | --- | --- | --- |
| `relace-apply-3` | ~10k tokens/s | 128k tokens | 128k tokens |

## [​](https://docs.relace.ai/api-reference/instant-apply/apply\#openai-compatible-endpoint)  OpenAI Compatible Endpoint

If the Relace REST API is inconvenient, we also support an OpenAI compatible endpoint for our apply models.

Copy

Ask AI

```
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: 'YOUR_API_KEY',
  baseURL: 'https://instantapply.endpoint.relace.run/v1/apply',
});

const userMessage = `
<instruction>{instruction}</instruction>
<code>{initial_code}</code>
<update>{edit_snippet}</update>
`;

const response = await client.chat.completions.create({
  model: 'auto',
  messages: [\
    {\
      role: 'user',\
      content: userMessage,\
    },\
  ],
});
```

The user message must include `<code>` and `<update>` tags following the format above. The `<instruction>` tag is optional.

### [​](https://docs.relace.ai/api-reference/instant-apply/apply\#openrouter)  OpenRouter

Relace Apply is also available via OpenRouter’s OpenAI-compatible endpoint. See the [model page](https://openrouter.ai/relace/relace-apply-3) for current availability and details.The [performance](https://openrouter.ai/relace/relace-apply-3/performance) section of the model page shows our real-time throughput and latency numbers from customer requests.

## [​](https://docs.relace.ai/api-reference/instant-apply/apply\#fallbacks)  Fallbacks

We recommend using GPT-4.1-mini with [predictive edits](https://platform.openai.com/docs/guides/predicted-outputs) as a fallback. This option is 10-20x slower than Relace’s apply models, but it’s useful for redundancy.Relace apply models also return a `400` error code when input exceeds context limits (see table above). For these cases, GPT-4o-mini’s 1M token context window is a reliable fallback option.However, even frontier LLMs struggle with long context. We recommend proactive refactoring of files >32k tokens to improve output quality.

#### Authorizations

[​](https://docs.relace.ai/api-reference/instant-apply/apply#authorization-authorization)

Authorization

string

header

required

Relace API key Authorization header using the Bearer scheme.

#### Body

application/json

Initial code and edits to apply

[​](https://docs.relace.ai/api-reference/instant-apply/apply#body-initial-code)

initial\_code

string

required

The original code that needs to be modified

[​](https://docs.relace.ai/api-reference/instant-apply/apply#body-edit-snippet)

edit\_snippet

string

required

The code changes to be applied to the initial code

[​](https://docs.relace.ai/api-reference/instant-apply/apply#body-model)

model

enum<string>

default:relace-apply-3

Choice of apply model to use

Available options:

`relace-apply-3`

[​](https://docs.relace.ai/api-reference/instant-apply/apply#body-instruction)

instruction

string

Optional single line instruction for to disambiguate the edit snippet. _e.g._`Remove the captcha from the login page`

[​](https://docs.relace.ai/api-reference/instant-apply/apply#body-stream)

stream

boolean

default:false

Whether to stream the response back

[​](https://docs.relace.ai/api-reference/instant-apply/apply#body-relace-metadata)

relace\_metadata

object

Optional metadata for logging and tracking purposes.

#### Response

200

application/json

Code successfully applied

[​](https://docs.relace.ai/api-reference/instant-apply/apply#response-merged-code)

mergedCode

string

The merged code with the changes applied

[​](https://docs.relace.ai/api-reference/instant-apply/apply#response-usage)

usage

object

Token usage information for the request

Showchild attributes

[​](https://docs.relace.ai/api-reference/instant-apply/apply#response-usage-prompt-tokens)

usage.prompt\_tokens

integer

Number of tokens in the prompt

[​](https://docs.relace.ai/api-reference/instant-apply/apply#response-usage-completion-tokens)

usage.completion\_tokens

integer

Number of tokens in the completion

[​](https://docs.relace.ai/api-reference/instant-apply/apply#response-usage-total-tokens)

usage.total\_tokens

integer

Total number of tokens used

[Errors](https://docs.relace.ai/api-reference/errors) [Rank Code](https://docs.relace.ai/api-reference/code-reranker/rank-v2)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.