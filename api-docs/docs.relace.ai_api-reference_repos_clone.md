---
url: "https://docs.relace.ai/api-reference/repos/clone"
title: "Clone Repo - Relace"
---

[Skip to main content](https://docs.relace.ai/api-reference/repos/clone#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Source Control

Clone Repo

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X GET https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000/clone \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Response

Copy

Ask AI

```
{
  "files": [\
    {\
      "filename": "src/main.py",\
      "content": "def main():\n    print('Hello World!')\n\nif __name__ == '__main__':\n    main()"\
    },\
    {\
      "filename": "README.md",\
      "content": "# My Project\n\nThis is a sample project."\
    },\
    {\
      "filename": "requirements.txt",\
      "content": "requests==2.28.1\nflask==2.2.2"\
    }\
  ]
}
```

GET

https://api.relace.run

/

v1

/

repo

/

{repo\_id}

/

clone

Try it

cURL

TypeScript SDK

Python SDK

Copy

Ask AI

```
curl -X GET https://api.relace.run/v1/repo/123e4567-e89b-12d3-a456-426614174000/clone \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Response

Copy

Ask AI

```
{
  "files": [\
    {\
      "filename": "src/main.py",\
      "content": "def main():\n    print('Hello World!')\n\nif __name__ == '__main__':\n    main()"\
    },\
    {\
      "filename": "README.md",\
      "content": "# My Project\n\nThis is a sample project."\
    },\
    {\
      "filename": "requirements.txt",\
      "content": "requests==2.28.1\nflask==2.2.2"\
    }\
  ]
}
```

Repos is now in Public Beta! Reach out to us at [info@relace.ai](mailto:info@relace.ai) if you have any questions or need help with the integration.

## [​](https://docs.relace.ai/api-reference/repos/clone\#path-parameters)  Path Parameters

[​](https://docs.relace.ai/api-reference/repos/clone#param-repo-id)

repo\_id

string

required

Repo ID

## [​](https://docs.relace.ai/api-reference/repos/clone\#response)  Response

[​](https://docs.relace.ai/api-reference/repos/clone#param-files)

files

array

Array of all files in the repository with their complete content

Show properties

[​](https://docs.relace.ai/api-reference/repos/clone#param-filename)

filename

string

Path to the file within the repo

[​](https://docs.relace.ai/api-reference/repos/clone#param-content)

content

string

Full content of the file

[Delete Repo](https://docs.relace.ai/api-reference/repos/delete) [Retrieve](https://docs.relace.ai/api-reference/repos/retrieve)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.