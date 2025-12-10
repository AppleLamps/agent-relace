---
url: "https://docs.relace.ai/api-reference/errors"
title: "Errors - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/errors#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

General

Errors

On this page

- [Error schema](https://docs.relace.ai/api-reference/errors#error-schema)
- [invalid\_parameter](https://docs.relace.ai/api-reference/errors#invalid-parameter)
- [validation\_error](https://docs.relace.ai/api-reference/errors#validation-error)
- [missing\_api\_key](https://docs.relace.ai/api-reference/errors#missing-api-key)
- [invalid\_api\_key](https://docs.relace.ai/api-reference/errors#invalid-api-key)
- [insufficient\_permissions](https://docs.relace.ai/api-reference/errors#insufficient-permissions)
- [not\_found](https://docs.relace.ai/api-reference/errors#not-found)
- [method\_not\_allowed](https://docs.relace.ai/api-reference/errors#method-not-allowed)
- [conflict](https://docs.relace.ai/api-reference/errors#conflict)
- [payload\_too\_large](https://docs.relace.ai/api-reference/errors#payload-too-large)
- [invalid\_template](https://docs.relace.ai/api-reference/errors#invalid-template)
- [invalid\_file\_format](https://docs.relace.ai/api-reference/errors#invalid-file-format)
- [missing\_required\_field](https://docs.relace.ai/api-reference/errors#missing-required-field)
- [resource\_locked](https://docs.relace.ai/api-reference/errors#resource-locked)
- [rate\_limit\_exceeded](https://docs.relace.ai/api-reference/errors#rate-limit-exceeded)
- [application\_error](https://docs.relace.ai/api-reference/errors#application-error)
- [internal\_server\_error](https://docs.relace.ai/api-reference/errors#internal-server-error)

## [​](https://docs.relace.ai/api-reference/errors\#error-schema)  Error schema

Below we have a list of specific error types you may encounter when using the Relace API. Each scenario has a message you will get from our API along with a brief troubleshooting tip.

## [​](https://docs.relace.ai/api-reference/errors\#invalid-parameter)  `invalid_parameter`

- **Status:** 400
- **Message:** The parameter must be a valid value.
- **Troubleshooting:** Check the value and make sure it’s valid.

## [​](https://docs.relace.ai/api-reference/errors\#validation-error)  `validation_error`

- **Status:** 400
- **Message:** We found an error with one or more fields in the request.
- **Troubleshooting:** The message will contain more details about what field and error were found.

## [​](https://docs.relace.ai/api-reference/errors\#missing-api-key)  `missing_api_key`

- **Status:** 401
- **Message:** Missing API key in the authorization header.
- **Troubleshooting:** Include the following header in the request: Authorization: Bearer YOUR\_API\_KEY.

## [​](https://docs.relace.ai/api-reference/errors\#invalid-api-key)  `invalid_api_key`

- **Status:** 401
- **Message:** API key is invalid.
- **Troubleshooting:** Make sure the API key is correct or generate a new API key in the dashboard.

## [​](https://docs.relace.ai/api-reference/errors\#insufficient-permissions)  `insufficient_permissions`

- **Status:** 403
- **Message:** API key lacks required permissions.
- **Troubleshooting:** Make sure the API key has necessary permissions for this operation.

## [​](https://docs.relace.ai/api-reference/errors\#not-found)  `not_found`

- **Status:** 404
- **Message:** The requested resource does not exist.
- **Troubleshooting:** Change your request URL to match a valid resource or check the resource ID.

## [​](https://docs.relace.ai/api-reference/errors\#method-not-allowed)  `method_not_allowed`

- **Status:** 405
- **Message:** Method is not allowed for the requested path.
- **Troubleshooting:** Change your API endpoint to use a valid method.

## [​](https://docs.relace.ai/api-reference/errors\#conflict)  `conflict`

- **Status:** 409
- **Message:** Request conflicts with the current state of the resource.
- **Troubleshooting:** Check the resource state and modify your request accordingly.

## [​](https://docs.relace.ai/api-reference/errors\#payload-too-large)  `payload_too_large`

- **Status:** 413
- **Message:** Request body exceeds size limits.
- **Troubleshooting:** Reduce the request size. Maximum file upload size is 50MB.

## [​](https://docs.relace.ai/api-reference/errors\#invalid-template)  `invalid_template`

- **Status:** 422
- **Message:** Invalid repository template URL.
- **Troubleshooting:** Make sure the template URL points to a valid Git repository.

## [​](https://docs.relace.ai/api-reference/errors\#invalid-file-format)  `invalid_file_format`

- **Status:** 422
- **Message:** File format is not supported for processing.
- **Troubleshooting:** Check supported file formats and ensure your file meets the requirements.

## [​](https://docs.relace.ai/api-reference/errors\#missing-required-field)  `missing_required_field`

- **Status:** 422
- **Message:** The request body is missing one or more required fields.
- **Troubleshooting:** Check the error message to see the list of missing fields.

## [​](https://docs.relace.ai/api-reference/errors\#resource-locked)  `resource_locked`

- **Status:** 423
- **Message:** The resource is temporarily locked by another operation.
- **Troubleshooting:** Wait and retry your request. The resource will be unlocked automatically.

## [​](https://docs.relace.ai/api-reference/errors\#rate-limit-exceeded)  `rate_limit_exceeded`

- **Status:** 429
- **Message:** Too many requests. Please limit the number of requests per minute.
- **Troubleshooting:** You should read the response headers and reduce the rate at which you request the API. Wait for the rate limit to reset or contact support to increase your limit.

## [​](https://docs.relace.ai/api-reference/errors\#application-error)  `application_error`

- **Status:** 500
- **Message:** An unexpected error occurred.
- **Troubleshooting:** Try the request again later. If the error does not resolve, check our status page for service updates.

## [​](https://docs.relace.ai/api-reference/errors\#internal-server-error)  `internal_server_error`

- **Status:** 500
- **Message:** An unexpected error occurred.
- **Troubleshooting:** Try the request again later. If the error does not resolve, check our status page for service updates.

[Introduction](https://docs.relace.ai/api-reference/introduction) [Apply Code](https://docs.relace.ai/api-reference/instant-apply/apply)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.