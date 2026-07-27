---
name: cv-experience-pastlives
description: >-
  Add, modify, or delete a "past life" entry — the pre-code roles (media, sound,
  creative) listed under PAST LIVES in the quest log. Handles shared.json
  pastLives and the localized role string in en/ca/es experience.json. Use for
  "add a past life", "edit my old radio job".
---

# Experience — past lives

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/shared.json` → `pastLives[]` (structure; order = display order)
- `src/content/{en,ca,es}/experience.json` → `pastLives[<id>]` (localized role string)

## Templates

`shared.json` `pastLives[]` entry:

```jsonc
{ "id": "<slug>", "org": "<Org name>", "years": "2016 - 2017" }
```

Per-locale `experience.json` `pastLives[<id>]` — a single string:

```jsonc
"pastLives": { "<id>": "Audiovisual Coordinator" }
```

## Ask the user

Required: org name, years (free text, e.g. `"2014"` or `"2016 - 2017"`), role
title (source locale).

## Steps

- **Add**: pick an `id`; append `{ id, org, years }` to `shared.json`
  `pastLives[]`; add the role string under `pastLives[<id>]` in en, translate to
  ca/es.
- **Modify**: edit the record / role string in place across all locales.
- **Delete**: remove from `shared.json` and from `pastLives` in all three locales.

Validate: `npm run i18n:check && npm run lint && npm run test`.
