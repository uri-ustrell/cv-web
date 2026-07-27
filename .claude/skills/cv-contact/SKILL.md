---
name: cv-contact
description: >-
  Edit the contact / GAME OVER section and footer — the closing line, button
  labels, and footer location. Locale-only, fixed schema (modify-only). Note:
  the actual email/github/linkedin URLs live in shared.json links. Use for "edit
  the contact copy", "change the footer".
---

# Contact

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/{en,ca,es}/contact.json` — copy only.
- The contact **URLs** (email, github, linkedin) are in `src/content/shared.json`
  → `links`. Edit those there if the user wants to change the actual addresses.

## Shape (fixed keys — modify-only)

```jsonc
{
  "title": "GAME OVER?",
  "line": "Nah — insert coin & let's build something. Continue?",
  "emailBtn": "✉ EMAIL",
  "githubBtn": "GITHUB",
  "linkedinBtn": "LINKEDIN",
  "footerLocation": "Sabadell, Catalonia"
}
```

## Ask the user

Which field(s) to change and the new value (source locale). For a new email /
profile URL, confirm the exact address (edited in `shared.json` `links`).

## Steps

- Edit the field(s) in en, translate to ca/es. Button labels often stay
  identical; `title`, `line`, `footerLocation` get translated.
- Don't add/remove keys (typed `ContactContent`).

Validate: `npm run i18n:check && npm run lint && npm run test`.
