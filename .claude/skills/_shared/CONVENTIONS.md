# CV content conventions (shared)

Canonical rules every `cv-*` content skill relies on. Read this once per
editing session; each skill assumes it.

## Content model

Two layers, joined by a stable `id`:

1. **Structural, locale-independent** → `src/content/shared.json`.
   Arrays of records (jobs, projects, skillGroups, …). Array order = display
   order. Each record has an `id`.
2. **Copy, per-locale** → `src/content/<locale>/<namespace>.json`.
   Text keyed by the same `id` used in `shared.json`.

Components render by mapping over the `shared.json` arrays and looking up copy
by `id` (e.g. `experience.jobs[job.id]`). So adding/removing an entry is pure
content **as long as the id exists in `shared.json` AND in every locale file** —
no component code changes needed.

## Locales

- `LOCALES = ['en', 'ca', 'es']` (`src/lib/locales.ts`). `en` is the reference.
- Files: `src/content/en/*.json`, `src/content/ca/*.json`, `src/content/es/*.json`.
- **Parity is mandatory**: every key and array position present in `en` must
  exist in `ca` and `es`. CI gate: `npm run i18n:check`.

## Translation policy

The user supplies copy in ONE source locale (default `en`). The agent produces
`ca` and `es` itself. When translating:

- Preserve JSON structure exactly: same keys, same array lengths, same
  `TextSegment`/`TermLine` object shapes.
- Never translate: `href`, `accent`, `color`, URLs, `id`, hex colors, tech
  terms / proper nouns / product names, emojis, `{placeholder}` tokens.
- Keep the retro-gamer tone. Catalan and Spanish are the target audiences; the
  English source often already contains Catalan flavor words (e.g. "DÉU N'HI
  DO") — keep those verbatim where they're intentional flavor.
- Show the user the CA/ES you generated before writing if the copy is more than
  a line or two; otherwise just write and report.

## TextSegment (rich copy)

```jsonc
{ "text": "visible text", "accent": "gold", "href": "#projects" }
```

- `accent` (optional) ∈ `green | cyan | pink | gold | purple | red` — colors a run of text.
- `href` (optional) — turns the run into a link (`#anchor`, `mailto:`, or URL).
- A paragraph is `TextSegment[]`; `about.paragraphs` is `TextSegment[][]`.

## ids

Lowercase short slug, unique within its array (e.g. `mango`, `lamicro`).
When adding an entry, choose the id once and use the SAME id in `shared.json`
and in all three locale files.

## Validation (run after every change)

```bash
npm run i18n:check   # locale parity — must pass
npm run lint         # biome + tsc --noEmit
npm run test         # vitest (46 tests)
```

Optionally `npm run build` for a full production check. Run `npm run format`
(biome) to normalize JSON style (2-space indent) before validating.

Note on tooling: the `rtk` hook can garble Biome/lint output — trust exit
codes, and if output looks wrong re-run via `rtk proxy <cmd>`.

## Guardrails

- Never edit `.next/`, `out/`, or anything generated.
- Keep all three locales in parity on every change (add → add ×3, delete → delete ×3).
- Two content types are **code-coupled** — adding/removing entries requires a
  source edit, not just JSON:
  - **achievements** → `ACHIEVEMENT_KEYS` in `src/lib/achievements.ts`
  - **terminal commands** → `CONTENT_COMMANDS` / `ALIASES` in `src/lib/terminal.ts`
  Editing the *text* of an existing achievement/command is still pure content.
- Adding a whole new page **section** (a new block like skills/experience) is a
  code change (new component + wiring in `src/components/CvApp.tsx` and
  `shared.sections`) — out of scope for these content skills; flag it.
