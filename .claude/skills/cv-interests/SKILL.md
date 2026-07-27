---
name: cv-interests
description: >-
  Add, modify, or delete an interest / "passive skill" card (books, authors,
  off-clock buffs), or edit the section intro. Handles shared.json interests
  (accent) and the localized card name + body in en/ca/es interests.json. Use for
  "add an interest", "edit a passive skill card".
---

# Interests (passive skills)

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/shared.json` → `interests[]` (structure; order = display order)
- `src/content/{en,ca,es}/interests.json` → `cards[<id>]` (localized) + `intro`

## Templates

`shared.json` `interests[]` entry:

```jsonc
{ "id": "<slug>", "accent": "purple" }   // green|cyan|pink|gold|purple|red
```

Per-locale `interests.json` `cards[<id>]`:

```jsonc
{ "name": "+LATERAL THINKING", "body": "Edward de Bono — attack from the side." }
```

The file also has a section-level `intro` string (edit directly when asked to
change the section blurb).

## Ask the user

Required: card name (the `+TITLE` label), body (source locale). Optional: accent
(default `cyan`).

## Steps

- **Add**: pick an `id`; append `{ id, accent }` to `shared.json` `interests[]`;
  add `cards[<id>]` `{ name, body }` in en, translate to ca/es. (Author/proper
  names stay verbatim.)
- **Modify**: edit record / card / `intro` in place across all locales.
- **Delete**: remove from `shared.json` and `cards` in all three locales.

Validate: `npm run i18n:check && npm run lint && npm run test`.
