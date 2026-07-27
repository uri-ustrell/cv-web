---
name: cv-skills
description: >-
  Add, modify, or delete a tech skill, a skill group, or a skill level (the SKILL
  TREE). Lives entirely in shared.json skillGroups — no per-locale translation.
  Use for "add a skill", "bump my React level", "add a new skill group",
  "remove skill X".
---

# Skills (skill tree)

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/shared.json` → `skillGroups[]` **only**. Skill names are
  code/tech labels — **no translation, no locale files touched.**

## Template

`shared.json` `skillGroups[]` entry:

```jsonc
{
  "id": "<slug>",             // e.g. frontend, backend, tooling
  "name": "FRONTEND",         // uppercase group label
  "items": [
    { "name": "React · Next.js", "lv": 9 },   // lv 1–10
    { "name": "TypeScript · JS", "lv": 9 }
  ]
}
```

Level → bar color (`skillBarColor` in `src/lib/achievements.ts`):
`lv ≥ 8` green, `lv ≥ 6` cyan, else gold. Keep `lv` in `1..10`.

## Ask the user

- Add an **item** to a group: group id/name, item name, level (1–10).
- Add a **group**: group id, label, and its items (name + level each).
- Change a **level**: which item, new level.

## Steps

- **Add item**: push `{ name, lv }` into the target group's `items`.
- **Add group**: append a `skillGroups[]` entry with its items.
- **Modify**: edit name/level in place.
- **Delete**: remove the item or the whole group.

This type needs no `i18n:check` change (single source), but still run the full
gate: `npm run i18n:check && npm run lint && npm run test`.
