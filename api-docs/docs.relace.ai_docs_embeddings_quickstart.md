---
url: "https://docs.relace.ai/docs/embeddings/quickstart"
title: "Quickstart - Relace"
---

[Skip to main content](https://docs.relace.ai/docs/embeddings/quickstart#content-area)

[Relace home page![light logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/light.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=94e8259db61cf3ff8092930a089cb6e3)![dark logo](https://mintcdn.com/relace/1ZQZvfGMxZqjQ7h5/logo/dark.svg?fit=max&auto=format&n=1ZQZvfGMxZqjQ7h5&q=85&s=6e190522144ef6e74d427dcd426e5dde)](https://relace.ai/)

Search...

Ctrl K

Search...

Navigation

Embeddings Model

Quickstart

On this page

- [Prerequisites](https://docs.relace.ai/docs/embeddings/quickstart#prerequisites)
- [Example: Storing Embeddings](https://docs.relace.ai/docs/embeddings/quickstart#example%3A-storing-embeddings)
- [Example: Semantic Search with a User Query](https://docs.relace.ai/docs/embeddings/quickstart#example%3A-semantic-search-with-a-user-query)

## [​](https://docs.relace.ai/docs/embeddings/quickstart\#prerequisites)  Prerequisites

- [Sign up](https://app.relace.ai/) for a Relace account.
- Create an [API key](https://app.relace.ai/settings/api-keys).

1

Prepare Your Inputs

Decide what code snippets or text you want to embed. You can embed multiple strings in a single request.

Copy

Ask AI

```
const inputs = [\
  "def add(a, b): return a + b",\
  "class User: pass",\
  // ... more code or text\
];
```

2

Call the Embeddings API

Send your inputs to the embeddings endpoint to get vector representations.

Copy

Ask AI

```
const url = "https://embeddings.endpoint.relace.run/v1/code/embed";
const apiKey = "[YOUR_API_KEY]";

const headers = {
  "Authorization": `Bearer ${apiKey}`,
  "Content-Type": "application/json"
};

const data = {
  model: "relace-embed-v1",
  input: inputs,
  // Optional: output_dtype: "float"  // or "binary"
};

const response = await fetch(url, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(data)
});

const embeddings = await response.json();
```

3

Parse Embedding Results

The API returns an array of embeddings, one for each input string, and usage info.

Copy

Ask AI

```
{
  "results": [\
    { "index": 0, "embedding": [0.123, 0.456, 0.789] },\
    { "index": 1, "embedding": [0.234, 0.567, 0.89] }\
  ],
  "usage": {
    "total_tokens": 8
  }
}
```

For more details and options, see the [API reference](https://docs.relace.ai/api-reference/embed-code/embed).

4

Store and Search with a Vector Database

Once you have your embeddings, you can store them in a vector database such as [Turbopuffer](https://turbopuffer.com/) or [Pinecone](https://www.pinecone.io/). These databases are designed for efficient similarity search over large collections of vectors.

### [​](https://docs.relace.ai/docs/embeddings/quickstart\#example:-storing-embeddings)  Example: Storing Embeddings

Most vector databases let you upsert (insert or update) vectors with an ID and metadata:

Copy

Ask AI

```
import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Pinecone (example)
const pinecone = new Pinecone({ apiKey: "[PINECONE_API_KEY]" });
const index = pinecone.index("my-embeddings-index");

// Prepare vectors for upsert
const vectors = embeddings.results.map(r => ({
  id: `code-${r.index}`,
  values: r.embedding,
  metadata: { source: inputs[r.index] }
}));

// Upsert to Pinecone
await index.upsert(vectors);
```

Turbopuffer and other vector databases have similar APIs for inserting vectors.

### [​](https://docs.relace.ai/docs/embeddings/quickstart\#example:-semantic-search-with-a-user-query)  Example: Semantic Search with a User Query

To search, embed the user query using the same API, then query the vector database for the most similar vectors (using cosine similarity or the database’s default metric):

Copy

Ask AI

```
// Embed the user query
const query = "How do I add two numbers?";
const queryData = {
  model: "relace-embed-v1",
  input: [query]
};

const queryResponse = await fetch(url, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(queryData)
});

const queryResult = await queryResponse.json();
const queryEmbedding = queryResult.results[0].embedding;

// Query Pinecone for similar code
const results = await index.query({
  vector: queryEmbedding,
  topK: 5,
  includeMetadata: true
});

for (const match of results.matches) {
  console.log(`Score: ${match.score}, Source: ${match.metadata.source}`);
}
```

This will return the most relevant code snippets or documents from your database, ranked by similarity to the user query.For more details, see the [Turbopuffer docs](https://turbopuffer.com/docs) or [Pinecone docs](https://docs.pinecone.io/).

[Agent Tool Definition](https://docs.relace.ai/docs/code-reranker/agent) [Overview](https://docs.relace.ai/docs/repos/overview)

Ctrl+I

Assistant

Responses are generated using AI and may contain mistakes.