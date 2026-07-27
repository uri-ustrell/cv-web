---
name: cv-experience-jobs
description: >-
  Add, modify, or delete a job / work-experience entry (the QUEST LOG cards) on
  the CV site. Handles the structural record in shared.json and the localized
  role + blurb copy in en/ca/es experience.json. Use for "add a job", "update my
  role at X", "remove the Y experience".
---

# Experience — jobs

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/shared.json` → `jobs[]` (structure; order = display order, newest first)
- `src/content/{en,ca,es}/experience.json` → `jobs[<id>]` (localized copy)

## Templates

`shared.json` `jobs[]` entry:

```jsonc
{
  "id": "<slug>",
  "org": "<COMPANY NAME>",
  "start": "<year>",
  "end": "<year>|null",        // null = ongoing ("NOW")
  "accent": "gold",             // green|cyan|pink|gold|purple|red
  "mainQuest": false,           // true = the ◆ MAIN QUEST highlight (usually current job)
  "size": "large",             // large = shows chips; small = compact
  "chipTint": "#9fd8ff",       // hex, or null (tints the tech chips)
  "chips": ["React", "Node"]   // tech tags; [] when size is small
}
```

Per-locale `experience.json` `jobs[<id>]`:

```jsonc
{
  "role": "<Job title>",
  "blurb": [
    { "text": "Plain sentence describing the work." },
    { "text": "PROJECTS", "href": "#projects" },   // optional in-text link
    { "text": " continues after the link." }
  ]
}
```

## Ask the user

Required: org name, start year, end year (or "now" → `null`), role title, blurb
(source locale). Optional (sensible defaults): accent (default `cyan`),
`mainQuest` (default `false`), `size` (default `large`), chips + `chipTint`
(default `[]` / `null`).

## Steps

- **Add**: pick an `id`; append the record to `shared.json` `jobs[]` in the
  right chronological position; add `jobs[<id>]` copy to en, then translate to
  ca/es. Only one job should have `mainQuest: true` — if the new one is the
  current highlight, unset it on the previous holder.
- **Modify**: edit the record and/or the localized copy in place across all
  locales; keep `blurb` array lengths identical across locales.
- **Delete**: remove the entry from `shared.json` and `jobs[<id>]` from all three
  locale files.

Then validate: `npm run i18n:check && npm run lint && npm run test`.
