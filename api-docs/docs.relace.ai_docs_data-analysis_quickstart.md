---
url: "https://docs.relace.ai/docs/data-analysis/quickstart"
title: "Quickstart - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/data-analysis/quickstart#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Data Analysis

Quickstart

On this page

- [Prerequisites](https://docs.relace.ai/docs/data-analysis/quickstart#prerequisites)

## [​](https://docs.relace.ai/docs/data-analysis/quickstart\#prerequisites)  Prerequisites

- [Sign up](https://app.relace.ai/) for a Relace account.
- Create an [API key](https://app.relace.ai/settings/api-keys).

1

Create Relace Repo from Template

We start by creating a Relace Repo with our public template repository for data analysis.

Copy

Ask AI

```
import requests

# Create a new repository from the base template
url = "https://api.relace.run/v1/repo"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

data = {
    "source": {
        "type": "git",
        "url": "https://github.com/squack-io/tailwind-vite-base",
        "branch": "main"
    }
}

response = requests.post(url, headers=headers, json=data)
repo = response.json()
repo_id = repo['repo_id']

print(f"Repository created with ID: {repo_id}")
```

This base repository is in Vite.js with support for React and Tailwind CSS. It can be forked and customized with custom themes & components.

2

Upload Structured Data

Next, we’ll upload our data files to the `public` folder of the Relace Repo.

Copy

Ask AI

```
# Upload your data file(s) to the repo
with open('./your_data_file.csv', 'rb') as f:
    file_data = f.read()

upload_url = f"https://api.relace.run/v1/repo/{repo_id}/file/public/your_data_file.csv"
upload_headers = {
    "Authorization": headers["Authorization"],
    "Content-Type": "application/octet-stream"
}

upload_response = requests.put(
    upload_url,
    headers=upload_headers,
    data=file_data
)

if upload_response.status_code in [200, 201]:
    print("Successfully uploaded your_data_file.csv")
else:
    print(f"Error uploading file: {upload_response.status_code}")
```

Relace agents are focused on codegen, so the files you upload should be structured data ( _i.e._ csv, json, etc). Any unstructured data like txt, docx, or xlsx files should only be included if they are small and can be read in one shot.

3

Run Analysis Agent

Now we’ll execute the analysis agent with a custom query and system prompt. The agent will analyze your data and create an interactive dashboard.

Copy

Ask AI

```
import json

# Define agent parameters
agent_name = "analysis-agent"
query = "Analyze the uploaded data to identify key trends, patterns, and insights. Create interactive visualizations and a comprehensive dashboard."

system_prompt = """You are a data analysis expert. Analyze the uploaded data files to:
1. Identify key patterns and trends in the data
2. Calculate relevant statistics and metrics
3. Create interactive visualizations using Chart.js or similar libraries
4. Build a comprehensive dashboard with multiple views
5. Highlight any notable anomalies or insights
Present your findings in a professional, business-focused format with clear visualizations."""

# Call the agent API with streaming enabled
agent_url = f"https://api.relace.run/v1/repo/{repo_id}/agent"
agent_payload = {
    "agent_name": agent_name,
    "agent_inputs": {
        "query": query,
        "system_prompt": system_prompt
    },
}

response = requests.post(
    agent_url,
    headers=headers,
    json=agent_payload,
    stream=True
)
```

The agent will return an SSE stream with execution events and tool calls as a response. See the [API reference](https://docs.relace.ai/api-reference/agents/analysis-agent) for more details about how to make use of it.

4

Access Your Dashboard

Once the agent completes execution, your interactive dashboard will be deployed and accessible via a public URL.

Copy

Ask AI

```
# The deployed site URL follows this pattern:
dashboard_url = f"https://{repo_id}.dev-server.relace.run"
print(f"Your dashboard is live at: {dashboard_url}")
```

The generated dashboard can be embedded as an iframe in other applications to easily view results.

Copy

Ask AI

```
<iframe
  src="https://your-repo-id.dev-server.relace.run"
  width="100%"
  height="600px"
  frameborder="0"
>
</iframe>
```

5

Iterate and Refine Visualization

You can continue refining your analysis by sending additional requests to the same repository:

Copy

Ask AI

```
# Send follow-up analysis requests
followup_query = "Add a time-series analysis view and export functionality for the data insights"

followup_payload = {
    "agent_name": agent_name,
    "agent_inputs": {
        "query": followup_query,
        "system_prompt": "Enhance the existing dashboard with additional analysis features and export capabilities."
    },
    "overrides": {}
}

followup_response = requests.post(
    agent_url,
    headers=headers,
    json=followup_payload,
    stream=True
)
```

[Integration](https://docs.relace.ai/docs/fast-agentic-search/integration)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.