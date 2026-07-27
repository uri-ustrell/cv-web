---
name: cv-education
description: >-
  Add, modify, or delete an education entry (the TRAINING GROUNDS list — degrees,
  courses, schools). Handles shared.json education (year) and the localized
  degree + org in en/ca/es education.json. Use for "add a degree", "edit my
  school", "remove a course".
---

# Education

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/shared.json` → `education[]` (structure; order = display order)
- `src/content/{en,ca,es}/education.json` → `entries[<id>]` (localized copy)

## Templates

`shared.json` `education[]` entry:

```jsonc
{ "id": "<slug>", "year": "2018" }   // year free text, e.g. "2015-2017"
```

Per-locale `education.json` `entries[<id>]`:

```jsonc
{ "degree": "BSc Psychology", "org": "Universitat Oberta de Catalunya" }
```

## Ask the user

Required: year(s), degree/title, organization (source locale).

## Steps

- **Add**: pick an `id`; append `{ id, year }` to `shared.json` `education[]`;
  add `entries[<id>]` `{ degree, org }` in en, translate to ca/es. (Institution
  names usually stay the same across locales; translate only the degree/type
  where it makes sense.)
- **Modify**: edit record / entry in place across all locales.
- **Delete**: remove from `shared.json` and `entries` in all three locales.

Validate: `npm run i18n:check && npm run lint && npm run test`.
