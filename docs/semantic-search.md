# Semantic Search (Embeddings)

Store an embedding vector per entry and perform cosine similarity at query time.

## Data Shape
```ts
type Entry = {
  uid: string;
  createdAt: number;
  audioUrl?: string;
  transcript?: string;
  summary?: string;
  embedding?: number[];
};
```

## Flow
1. When saving/processing an entry, call `embed(text)`.
2. Store the vector on the document.
3. At search, embed the query and compute cosine similarity client-side or via Edge function.
