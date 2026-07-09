# Build Prompt: uriustrell.dev — Retro-Pixel Gamified CV

This is a ready-to-develop implementation prompt. Hand this file to a coding agent (or follow it yourself) to build the project end to end. All product/architecture decisions below were made explicitly by the project owner (Uri) — do not deviate from them without checking back.

## 1. What you're building

A single-page, retro 8-bit/arcade-styled personal CV for Oriol "Uri" Ustrell, built as a **100% static Next.js site** (no backend, no API routes, no server runtime at request time). All content is pre-rendered at build time from local JSON files. Deployed on Vercel, served as static files, custom domain **uriustrell.dev**.

The design is fully specified in [`design_handoff_pixel_cv/README.md`](./design_handoff_pixel_cv/README.md) (and the working HTML prototype `Uri Ustrell CV.dc.html` in the same folder). **That README is the source of truth for markup structure, copy, colors, typography, spacing, and JS behavior.** Read it in full before starting. This prompt tells you *how* to build it (stack, architecture, process); the design doc tells you *what* to build (pixel-exact spec). Do not copy the `.dc.html` file's markup — it's a prototype-only streaming format. Reproduce the structure/behavior it describes, not its file.

Keep `design_handoff_pixel_cv/` in the repo as committed reference documentation (do not delete it, do not gitignore it).

## 2. Reference architecture

Mirror the architecture, conventions, and workflow patterns of `/Users/03761952/oriol/the-strength-period` (a sibling repo), adapted from Vite+React-Router SPA to Next.js static export. Specifically carry over:

- Trunk-based git flow: single `main` branch, conventional commits, CI gate on push, no PR requirement.
- Biome for lint + format (not ESLint/Prettier).
- Vitest + Testing Library for unit tests.
- Path alias `@/` → `src/`.
- Named exports only (default exports only where Next requires them — pages/layouts).
- `.nvmrc` pinning Node, `npm` as package manager.
- A `vercel.json` with strict CSP headers.
- Self-hosted fonts via `@fontsource/*` packages (no external font CDN requests) — same pattern the reference repo uses for Inter/Fira Code/Space Grotesk.

Do **not** carry over: IndexedDB, Zustand, Zod, React Router, PWA, the exercises data pipeline, or any of the fitness-app-specific domain code. Those are irrelevant to a static CV.

## 3. Decisions already made (do not re-ask, do not change)

| Area | Decision |
|---|---|
| Framework | Next.js, App Router, TypeScript, `output: 'export'` (fully static export — no server, no API routes, no ISR/revalidation) |
| Styling | Plain CSS with CSS Modules (not Tailwind). Design tokens as CSS custom properties in a global stylesheet. |
| i18n | Full i18n: **en (default), ca, es**. English copy is transcribed verbatim from the design doc. ca/es are AI-translated during the build — translate faithfully, keep the playful/gamified tone, keep proper nouns (company names, tech names, mentor names) untranslated. |
| Lint/format | Biome (mirror the reference repo's `biome.json`, adapted paths) |
| Testing | Vitest + Testing Library. Cover: terminal command parser, achievement/XP/level calculation logic, i18n content-parity check. |
| Deploy | Vercel, static export |
| Domain | Custom domain **uriustrell.dev** (DNS/domain-purchase is a manual dashboard step, not automatable — call it out, don't attempt it) |
| Git flow | Trunk-based, `main` only, conventional commits, GitHub Actions CI on push to main |
| GitHub remote | Create the remote and push. `gh repo create uri-ustrell/cv-web --public --source=. --remote=origin` then `git push -u origin main`. |
| PWA | No |
| Analytics | Vercel Analytics (`@vercel/analytics`) only. No other tracking. |
| Security headers | Strict CSP in `vercel.json`, adapted for a static site with zero external calls except same-origin Vercel Analytics |
| License | MIT |
| Package manager / Node | `npm`. Pin `.nvmrc` to the current Node LTS at scaffold time — run `node -v` and use that; don't hardcode a guessed version. |
| Content structure | Split JSON files per CV section (see §6), not one monolith file |
| Avatar | Owner will drop a portrait file into the repo. Build against a documented path/placeholder (see §7) — don't block on the real file being present. |
| Design reference folder | Keep `design_handoff_pixel_cv/` committed in the repo |
| Repo location/name | `/Users/03761952/oriol/cv-web` (already exists, currently holds only the design handoff folder), public repo named `cv-web` |

## 4. Important interpretation: "100% static" ≠ "no interactivity"

The design requires real client-side behavior: scroll-driven XP bar, `IntersectionObserver`-driven achievement unlocks, an interactive terminal with a command parser, clickable coins, synthesized Web Audio beeps, toast animations. **"100% static" means the build output is static HTML/CSS/JS files with no server runtime, no API routes, and no request-time data fetching** — not "no JavaScript." All of the above ships as client-side React (`'use client'` components) that hydrates on top of statically-exported HTML, exactly like the reference repo's Vite SPA. All content these components render is baked in at build time from the JSON files in §6 — nothing is fetched at runtime.

## 5. i18n routing (static-export-compatible)

`next-i18next` does not work with `output: 'export'` + App Router. Use **`next-intl`**, which supports static export via `generateStaticParams`. Concretely:

- Route structure: `src/app/[locale]/page.tsx`, with `generateStaticParams()` returning `[{locale:'en'}, {locale:'ca'}, {locale:'es'}]`.
- Use `localePrefix: 'as-needed'` so the default locale (`en`) is served at `/` with no prefix, and `ca`/`es` live at `/ca` and `/es`. This avoids needing any request-time locale detection/redirect (which a static export cannot do — no middleware server).
- Language switcher: plain static `<a href="/">`, `<a href="/ca">`, `<a href="/es">` links — no client-side redirect logic needed.
- Add an i18n parity check script (mirror the reference repo's `scripts/checkI18nParity.ts`) that fails CI if any locale's JSON content files are missing keys present in the others.

## 6. Content layer (static JSON, rendered at build)

Two tiers, so structural data (dates, links, colors, levels) isn't duplicated three times:

```
src/content/
  shared.json              # locale-independent: skill levels, job dates, tech chip lists,
                            # project/social links, education years, achievement icon codes,
                            # coin section ids, design token values used in JS (e.g. keyframe timings)
  en/
    profile.json            # hero copy: name, title, class/specialty/home-base lines, button labels
    about.json               # "LORE" — 3 paragraphs
    skills.json               # section intro copy (labels come from shared.json)
    experience.json           # "QUEST LOG" — job blurbs, past-lives list copy
    projects.json             # "LOOT & BUILDS" — card titles/descriptions
    education.json            # "TRAINING GROUNDS" copy
    interests.json            # "PASSIVE SKILLS" — 4 cards copy
    contact.json               # "GAME OVER?" copy, footer line
    terminal.json              # all terminal command outputs, hint line, placeholder text
    achievements.json          # achievement names/sub-lines (10 entries)
    ui.json                     # HUD labels, button labels, misc UI strings
  ca/  (same file set, translated)
  es/  (same file set, translated)
```

Import these JSON files directly in server components / at module scope (`import profile from '@/content/en/profile.json'` selected by locale param) — do not `fetch()` them client-side. This satisfies "rendered during the build" exactly.

Transcribe the English content verbatim from `design_handoff_pixel_cv/README.md` §"Screens / Views" (exact copy is given there, including bold-span accent colors). Do not paraphrase or improve it — the owner confirmed the design doc's copy is final.

## 7. Avatar image

- Expected path: `public/avatar.jpg` (or `.png` — accept whichever the owner drops in).
- Render via `<img>` with `image-rendering: pixelated`, inside the 180×180 avatar frame per design tokens.
- Until the real file exists, fall back to a simple placeholder (solid `#0f0b18` tile with "UU" initials, matching the HUD avatar tile style) so the build never breaks on a missing asset. Do not spend time generating a fake photo — just don't crash.

## 8. Design tokens (also in the design doc — repeated here for convenience)

**Colors** — backgrounds: page `#16121f` (radial `#241a38→#16121f`), panel `#20182e`, panel-inset `#1a1426`, HUD `#1b1428`, deep well `#0f0b18`, terminal `#0d0a15`, terminal-chrome `#1e2a1e`, chip `#2f2442`. Text: primary `#eae6f5`, body `#d7d1ea`, muted `#9a90b5`, faint `#6a6188`. Accents: green `#5ef58a`/`#4bd67a`, cyan `#46d4e6`, pink `#ff5c8a`, gold `#ffcf3f`, purple `#a97bff`, red `#ff6b6b`/`#ff5c5c`. Borders: solid black `#000`, 3–4px, hard offset shadows only (no blur) — `4px 4px 0 #000`, `6px 6px 0 rgba(0,0,0,.5)`, `8–10px 8–10px 0 rgba(0,0,0,.55)`.

**Typography** — `Press Start 2P` (headings/HUD/labels/buttons, 7–30px) and `VT323` (body/terminal/descriptions, 15–24px). Self-host both via `@fontsource/press-start-2p` and `@fontsource/vt323` (check npm for the exact VT323 fontsource package name; if it doesn't exist, self-host the two `.woff2` files under `public/fonts/` and `@font-face` them — do **not** load from `fonts.googleapis.com`, that would violate the `font-src 'self'` CSP).

**Panel primitive**: `background:#20182e; border:3px solid #000; box-shadow: inset 0 0 0 3px #2f2442, 6–10px 6–10px 0 rgba(0,0,0,.5); padding:18–26px;`. Radius 0 everywhere except coins (`50%`) and HUD avatar tile.

Full per-section pixel values (exact px sizes, per-component colors, animation keyframes, achievement table, terminal command list, coin behavior, sound frequencies) are in the design doc — implement those exactly, don't re-derive them here.

## 9. Responsiveness (explicit requirement)

The design doc describes a fixed 1040px-max desktop layout. **The owner requires the whole page to be genuinely responsive**, not just "doesn't break." At minimum:

- HUD row must wrap sanely on narrow viewports (it already has `flex-wrap:wrap` — verify XP bar/label don't overflow on mobile widths).
- Hero panel (flex row, wraps) must stack cleanly on mobile — avatar frame, then text, then buttons.
- Grids (`auto-fit, minmax(...)`) already reflow by design — verify at 320–420px widths cards don't clip text.
- Press Start 2P is a wide pixel font — reduce heading/button font sizes on small breakpoints (e.g. `clamp()` or a `@media (max-width: 480px)` step-down) so the 30px H1 and 9–13px section headers don't overflow or force horizontal scroll.
- Terminal window: fixed 280px output height is fine on mobile, but confirm the input row and traffic-light title bar don't overflow horizontally.
- Test at minimum: 375px (mobile), 768px (tablet), 1280px+ (desktop), using the dev-server preview tools, not just eyeballing.

## 10. Component breakdown

`src/app/[locale]/page.tsx` composes: `<Hud>`, `<Hero>`, `<Terminal>`, `<Section>` (reusable numbered header + panel wrapper), `<SkillCard>`, `<QuestCard>`, `<ProjectCard>`, `<EducationCard>`, `<InterestCard>`, `<ToastStack>`, `<Coin>`, `<CrtOverlay>`, `<ContactPanel>`.

State/behavior lives in a `useGameState` hook (client-side): `unlocked` (Set of achievement keys), `coins` (number 0–5), `muted` (boolean), `xpPct` (number), `toasts` (array, auto-pruned after 3.8s), `termLines`/`termValue` (terminal state). Exposes `unlock(key)`, `collectCoin(id)`, `runCommand(str)`, `beep(freq)`. Wire scroll listener (XP) and `IntersectionObserver` (section achievements, threshold 0.35) in `useEffect`s. Extract the terminal command parser and the achievement/level math (`level = 1 + unlockedCount`) as pure, independently testable functions — these are exactly what the Vitest tests in §11 should cover.

## 11. Testing

Mirror the reference repo's Vitest + Testing Library setup (`vitest.config.ts`, jsdom environment, `@testing-library/jest-dom`). Cover:

- Terminal command parser: every command in the design doc's command table, plus the "unknown command" fallback, plus the konami/easter-egg cases.
- Achievement/XP/level pure functions: unlock idempotency, level = 1 + unlockedCount, coin-collection triggering the `treasure` achievement on the 5th coin.
- i18n parity script: fails if `ca`/`es` content JSON is missing any key present in `en`.

No component/integration tests required beyond that — keep it proportionate to a static CV, not the fitness app's test depth.

## 12. Vercel config

`vercel.json` with CSP headers adapted from the reference repo, but tightened since this site makes zero external network calls except same-origin Vercel Analytics:

```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self';
```

No `rewrites` block needed (no `/api/*`, and Next static export handles routing itself) — verify whether Next's static export needs an explicit SPA-fallback rewrite for `[locale]` routes; if `next build` with `output:'export'` already emits per-route static HTML files (`/`, `/ca/index.html`, `/es/index.html`), no fallback rewrite is needed.

Wire `@vercel/analytics`'s `<Analytics />` in the root layout; if its script is blocked by the CSP `script-src 'self'` (it's typically served same-origin via `/_vercel/insights/script.js` on Vercel, which should already satisfy `'self'`), verify in the deployed preview and adjust CSP only if actually broken — don't pre-emptively loosen it.

Custom domain `uriustrell.dev`: this is a manual step in the Vercel dashboard (add domain, update DNS at the registrar) — document it in the README, don't attempt to script it.

## 13. Repo scaffolding checklist (execution order)

1. `npx create-next-app@latest` in `/Users/03761952/oriol/cv-web` — TypeScript, App Router, no Tailwind, no `src/` prompt override issues (use `src/` layout), ESLint prompt: decline (Biome replaces it).
2. Remove default Next boilerplate (default page, default CSS).
3. Add Biome: copy/adapt the reference repo's `biome.json` (same formatter/linter settings, adjust `files.includes` for this project's paths). Add `npm run lint` (`biome lint .` + `tsc --noEmit`), `npm run format` / `format:check`.
4. Install: `next-intl`, `@fontsource/press-start-2p`, VT323 fontsource (or manual `@font-face`), `@vercel/analytics`, dev deps `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`.
5. Configure `next.config.ts` for `output: 'export'` + `next-intl` plugin.
6. Set `tsconfig.json` path alias `@/*` → `src/*`.
7. Build `src/app/[locale]/layout.tsx` + `page.tsx`, `generateStaticParams`, global CSS with design tokens as CSS custom properties + `.panel`/`.chip`/`.btn` shared classes (CSS Modules for component-scoped styles, global vars file for tokens).
8. Author `src/content/**` JSON per §6 — English transcribed verbatim from the design doc, then AI-translate to `ca`/`es`.
9. Build components per §10, `useGameState` hook, terminal parser, achievement/XP logic as pure functions in `src/lib/`.
10. Avatar per §7.
11. Responsive pass per §9.
12. `vercel.json` per §12.
13. Vitest setup + tests per §11.
14. GitHub Actions CI: `.github/workflows/ci.yml` mirroring the reference repo's job (checkout, setup-node via `.nvmrc`, `npm ci`, `npm run lint`, `npm run format:check`, i18n parity check, `npm test`, `npm run build`) — trigger on push to `main` (and `pull_request`, harmless to leave even without a PR requirement).
15. `README.md` mirroring the reference repo's structure: overview, architecture diagram (content JSON → build → static HTML), prerequisites, quick start, dev commands, tech stack, custom-domain note, license.
16. `LICENSE` (MIT).
17. Git identity, init, first commit — use the same identity as the reference repo (`the-strength-period`): name `uri-ustrell`, email `uri.ustrell@gmail.com`. Set it locally (repo-scoped, don't touch global config):

   ```bash
   git init
   git config user.name "uri-ustrell"
   git config user.email "uri.ustrell@gmail.com"
   git add .
   git commit -m "feat: initial scaffold of retro-pixel gamified CV"
   ```

   Then create the remote and push:

   ```bash
   gh repo create uri-ustrell/cv-web --public --source=. --remote=origin
   git push -u origin main
   ```

## 14. Non-goals / hard constraints

- No API routes, no server actions requiring request-time execution, no ISR/revalidation, no middleware that requires a server.
- No CMS, no runtime `fetch()` for content — everything from `src/content/**` JSON at build time.
- No Tailwind, no IndexedDB, no Zustand/Zod, no React Router, no PWA.
- No analytics beyond `@vercel/analytics`.
- No external font/script CDN requests (self-hosted only, to satisfy the CSP).
- `next build` must succeed as a pure static export deployable to any static host, even though it's actually deployed to Vercel.

## 15. Acceptance checklist

- [ ] `npm run build` produces a static export with no server runtime warnings.
- [ ] All three locales (`/`, `/ca`, `/es`) render with parity-checked, fully translated content.
- [ ] Design fidelity matches `design_handoff_pixel_cv/README.md` section-by-section (colors, fonts, spacing, copy).
- [ ] Verified responsive at 375px / 768px / 1280px+ with no horizontal scroll or clipped text.
- [ ] XP bar, achievements (10), coins (5), terminal (all listed commands), toasts, CRT overlay, and sound all function as specified.
- [ ] `npm run lint`, `npm run format:check`, `npm test`, i18n parity check, and `npm run build` all pass in CI.
- [ ] CSP header active, no console CSP violations in the deployed preview.
- [ ] Vercel Analytics loads without CSP errors.
- [ ] Avatar falls back gracefully if `public/avatar.*` is absent.
- [ ] `LICENSE` (MIT) and README present; `design_handoff_pixel_cv/` still committed.
