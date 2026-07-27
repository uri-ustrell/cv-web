---
name: cv-about
description: >-
  Edit the about / LORE section — the bio paragraphs with accent-highlighted
  words. Locale-only (no shared.json). Handles adding, editing, reordering, or
  removing paragraphs across en/ca/es about.json. Use for "update my bio",
  "change the about text", "add a paragraph".
---

# About (lore)

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/{en,ca,es}/about.json` — no `shared.json` entry.

## Shape

```jsonc
{
  "title": "LORE",
  "paragraphs": [                       // TextSegment[][] — array of paragraphs
    [
      { "text": "A frontend-leaning dev with " },
      { "text": "6+ years", "accent": "gold" },   // highlighted run
      { "text": " shipping JS & TS at scale." }
    ]
  ]
}
```

A paragraph is an array of `TextSegment` (`{ text, accent?, href? }`). Split the
text into segments only where you need an accent color or a link; otherwise one
`{ text }` segment is fine. `accent` ∈ green|cyan|pink|gold|purple|red.

## Ask the user

The paragraph text (source locale) and which words/phrases to highlight (and in
what accent), or a link target. For edits, which paragraph.

## Steps

- **Add / edit / reorder / remove** paragraphs in en, then mirror the exact same
  structure (same paragraph count, same segment count per paragraph) in ca/es
  with translated `text`. Keep `accent`/`href` on the equivalent segment — move
  the highlight to the translated word that carries the same meaning.

Validate: `npm run i18n:check && npm run lint && npm run test`. Parity checks
array positions, so segment counts must match across locales.
