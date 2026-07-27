---
name: cv-projects
description: >-
  Add, modify, or delete a project / build (the LOOT & BUILDS cards). Handles the
  structural record in shared.json (name, tag, demo, code links) and the
  localized description in en/ca/es projects.json. Use for "add a project",
  "update the demo link", "remove project X".
---

# Projects

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/shared.json` → `projects[]` (structure; order = display order)
- `src/content/{en,ca,es}/projects.json` → `descriptions[<id>]` (localized string)

## Templates

`shared.json` `projects[]` entry:

```jsonc
{
  "id": "<slug>",
  "name": "<Project name>",
  "tag": "REACT·REDUX",        // short label chip (uppercase)
  "demo": "https://…"|null,    // live demo URL, or null (hides PLAY button)
  "code": "https://github.com/…"
}
```

Per-locale `projects.json` `descriptions[<id>]` — a single string:

```jsonc
"descriptions": { "<id>": "One-line description of the build." }
```

## Ask the user

Required: name, code URL, description (source locale). Optional: tag (short
label; default from the main tech), demo URL (default `null`).

## Steps

- **Add**: pick an `id`; append the record to `shared.json` `projects[]`; add
  `descriptions[<id>]` in en, translate to ca/es.
- **Modify**: edit record and/or description in place across all locales.
- **Delete**: remove from `shared.json` and `descriptions` in all three locales.

Validate: `npm run i18n:check && npm run lint && npm run test`.
