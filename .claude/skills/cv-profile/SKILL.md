---
name: cv-profile
description: >-
  Edit the hero / profile header fields — name, class, specialty, home base, the
  HP/MP flavor lines, and hero button labels. Locale-only, fixed schema
  (modify-only). Use for "change my title", "update the hero", "edit specialty".
---

# Profile (hero header)

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/{en,ca,es}/profile.json` — no `shared.json` entry.

## Shape (fixed keys — modify values, don't add/remove keys)

```jsonc
{
  "eyebrow": "▶ NEW GAME · PLAYER 1",
  "nameLine1": "Uri",
  "nameLine2": "Ustrell",
  "classLabel": "Class:",
  "classValue": "Full-Stack Developer",
  "specialty": "Specialty: TypeScript · React · Next.js · Node",
  "homeBase": "Home base: Sabadell, Catalonia 🌍",
  "hpLabel": "HP",
  "hpValue": "DÉU N'HI DO",          // Catalan flavor — keep verbatim unless asked
  "mpLabel": "MP",
  "mpValue": "CAFFEINE-FUELED",
  "pressStart": "▶ PRESS START",
  "github": "GITHUB",
  "linkedin": "LINKEDIN"
}
```

## Ask the user

Which field(s) to change and the new value (source locale).

## Steps

- Edit the field in en, then translate to ca/es. Keep symbols/emojis. `nameLine1`
  / `nameLine2` and button labels usually stay identical across locales; the
  `classValue`, `specialty`, `homeBase`, and MP/HP flavor lines get translated.
- Do not add or remove keys — the schema is typed (`ProfileContent`).

Validate: `npm run i18n:check && npm run lint && npm run test`.
