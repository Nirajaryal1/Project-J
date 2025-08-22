# AI Summarization

Summarize transcripts or raw text with `summarize(text, style)` using OpenAI or Gemini.

## Prompt Template
```
Summarize this journal in a {style} format with bullet highlights and 1 action item:

{text}
```

## API Route Outline (Next.js App Router)
- `src/app/api/summarize/route.ts` calls your provider.
- Keep keys in `.env.local`.
- Return `{ summary }` JSON.
