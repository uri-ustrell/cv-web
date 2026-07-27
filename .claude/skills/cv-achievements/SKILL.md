---
name: cv-achievements
description: >-
  Edit achievement names and descriptions, or (code-coupled) add/remove an
  achievement. Text edits are pure content across en/ca/es achievements.json;
  adding/removing a key also requires editing ACHIEVEMENT_KEYS in
  src/lib/achievements.ts and the icon in shared.json. Use for "rename an
  achievement", "add a new achievement".
---

# Achievements

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/{en,ca,es}/achievements.json` → `{ <key>: { name, sub } }`
- `src/content/shared.json` → `achievementIcons[<key>]` (3-char icon string)
- `src/lib/achievements.ts` → `ACHIEVEMENT_KEYS` (**code — the source of truth for which keys exist**)

The keys are a typed union (`AchievementKey`). A key must appear in all of:
`ACHIEVEMENT_KEYS`, `achievementIcons`, and every locale's `achievements.json`.

## Shape

```jsonc
// {locale}/achievements.json
{ "boot": { "name": "GAME BOOTED", "sub": "You pressed start. Welcome, Player 1." } }
// shared.json
"achievementIcons": { "boot": "GO" }   // 3-char icon
```

## Modify text (pure content)

Edit `name` / `sub` in en, translate to ca/es. No code change. Then validate.

## Add an achievement (⚠ code-coupled)

Adding a key is NOT pure content. Do all of:

1. Add the key to `ACHIEVEMENT_KEYS` in `src/lib/achievements.ts`.
2. Add `achievementIcons[<key>]` (3-char icon) in `shared.json`.
3. Add `{ name, sub }` under the key in **all three** locale files.
4. Decide how it unlocks. Most achievements fire when a section scrolls into
   view via `shared.sections[].achKey`. If it should tie to a section, set that
   `achKey`; otherwise wire the `applyUnlock(...)` trigger in the relevant
   component/hook (grep for `applyUnlock`). `treasure`/`complete` are special
   (coins / end) — mirror their existing wiring if similar.
5. **Flag for human review** — this changes game logic. Run the full gate plus
   `npm run build`.

## Delete an achievement

Reverse of add: remove from `ACHIEVEMENT_KEYS`, `achievementIcons`, all locale
files, and any `achKey`/trigger reference. Flag for review.

## Validate

`npm run i18n:check && npm run lint && npm run test` (add `npm run build` for
add/delete).
