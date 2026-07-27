---
name: cv-terminal
description: >-
  Edit the interactive terminal — command outputs, boot lines, hint, prompt, and
  the not-found/stats templates. Editing existing command text is pure content
  across en/ca/es terminal.json; adding a NEW command is code-coupled
  (CONTENT_COMMANDS / ALIASES in src/lib/terminal.ts). Use for "edit the whoami
  output", "add a terminal command", "change the boot text".
---

# Terminal

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/{en,ca,es}/terminal.json` → outputs and chrome
- `src/lib/terminal.ts` → `CONTENT_COMMANDS` (set of valid commands) + `ALIASES`
  (**code — a command only runs if it's in this set**)

## Shape

```jsonc
{
  "title": "TERMINAL — type to explore",
  "windowTitle": "uri@cv:~",
  "prompt": "visitor@uri:~$",
  "placeholder": "try: help",
  "hint": "commands: help · whoami · skills · …",   // keep in sync with real commands
  "boot": [ { "text": "booting …", "color": "green" } ],   // TermLine[]
  "outputs": {
    "whoami": [ { "text": "Oriol 'Uri' Ustrell", "color": "cyan" } ]
  },
  "stats": "LVL {level}  ·  {ach}/{achTotal} achievements  ·  {coins}/{coinTotal} coins",
  "notFound": "command not found: {cmd}  (try 'help')"
}
```

`TermLine` = `{ text, color?, href?, prompt? }`. `color` ∈
`green|cyan|pink|gold|purple|dim|text|red`. Placeholders `{level} {ach}
{achTotal} {coins} {coinTotal} {cmd}` are interpolated by code — never translate
or alter them.

## Edit existing output / boot / hint (pure content)

Edit the `TermLine[]` in en (keep array length + `color`/`href`), translate
`text` to ca/es. Keep terminal-y phrasing. No code change.

## Add a new command (⚠ code-coupled)

1. Add the command name to `CONTENT_COMMANDS` in `src/lib/terminal.ts` (and any
   aliases to `ALIASES`).
2. Add `outputs[<cmd>]` (a `TermLine[]`) in **all three** locale files.
3. Update the `hint` string (and `help` output, if listed there) in all locales.
4. Run the full gate plus `npm run build`; flag the code edit for review.

Special commands (`clear`, `xp`/`stats`) are handled in code, not via `outputs`.

## Validate

`npm run i18n:check && npm run lint && npm run test`.
