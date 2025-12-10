---
url: "https://docs.relace.ai/api-reference/introduction"
title: "Introduction - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/introduction#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

General

Introduction

On this page

- [Base URLs](https://docs.relace.ai/api-reference/introduction#base-urls)
- [Model Endpoints](https://docs.relace.ai/api-reference/introduction#model-endpoints)
- [Infrastructure Endpoints](https://docs.relace.ai/api-reference/introduction#infrastructure-endpoints)
- [Authentication](https://docs.relace.ai/api-reference/introduction#authentication)
- [Response Codes](https://docs.relace.ai/api-reference/introduction#response-codes)
- [Rate Limits](https://docs.relace.ai/api-reference/introduction#rate-limits)

## [​](https://docs.relace.ai/api-reference/introduction\#base-urls)  Base URLs

The Relace API is organized into two distinct domain patterns: `*.endpoint.relace.run` domains for direct AI model access, and `api.relace.run` for general infrastructure services including source control.

### [​](https://docs.relace.ai/api-reference/introduction\#model-endpoints)  Model Endpoints

Copy

Ask AI

```
https://*.endpoint.relace.run
```

To use our hosted models the url pattern follows the above convention — the \* is a placeholder for the series of model you are using. _e.g._`instantapply`, `ranker`, `embeddings`.

### [​](https://docs.relace.ai/api-reference/introduction\#infrastructure-endpoints)  Infrastructure Endpoints

Copy

Ask AI

```
https://api.relace.run
```

For accessing our infrastructure ( _e.g._ source control) you will use the routes specified in this API reference with our common base url.

## [​](https://docs.relace.ai/api-reference/introduction\#authentication)  Authentication

To authenticate you need to add an Authorization header with the contents of the header being your Relace API Key, which is a 32 digit key with with the prefix `rlc-`.

Copy

Ask AI

```
Authorization: Bearer rlc-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## [​](https://docs.relace.ai/api-reference/introduction\#response-codes)  Response Codes

Relace uses standard HTTP codes to indicate the success or failure of your requests.In general, 2xx HTTP codes correspond to success, 4xx codes are for user-related failures, and 5xx codes are for infrastructure issues.

| Status | Description |
| --- | --- |
| `200` | Successful request. |
| `201` | Resource created successfully. |
| `204` | Successful request, no content returned. |
| `400` | Check that the parameters were correct. |
| `401` | The API key used was missing or invalid. |
| `403` | The API key used was invalid or lacks permissions. |
| `404` | The resource was not found. |
| `423` | The resource is temporarily locked. |
| `429` | The rate limit was exceeded. |
| `5xx` | Indicates an error with Relace servers. |

Check [Error Codes](https://docs.relace.ai/api-reference/errors) for a comprehensive breakdown of all possible API errors.

## [​](https://docs.relace.ai/api-reference/introduction\#rate-limits)  Rate Limits

Rate limits vary by tier and range from 3 calls per minute for free testing access to unlimited calls for high-volume users. When you exceed your rate limit, you’ll receive a 429 response error code.See the full [rate limits table](https://docs.relace.ai/docs/policies#rate-limits) for detailed information about each tier’s limits.

[Errors](https://docs.relace.ai/api-reference/errors)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.