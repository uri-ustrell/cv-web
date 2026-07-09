# uriustrell.dev — Retro-Pixel Gamified CV

A single-page, retro 8-bit/arcade-styled personal CV for **Oriol "Uri" Ustrell**, built as a 100% static Next.js site: scroll-driven XP bar, unlockable achievements, collectible coins, an interactive terminal, and synthesized Web Audio beeps — all hydrating on top of statically exported HTML.

The visual/behavioral spec lives in [`design_handoff_pixel_cv/README.md`](./design_handoff_pixel_cv/README.md) (committed reference documentation — keep it).

## Architecture

```
src/content/**/*.json          # copy per locale (en/ca/es) + shared structural data
        │
        ▼  imported at module scope (build time — no runtime fetch)
src/components/CvPage.tsx      # server component: bakes content into props
        │
        ▼
src/components/CvApp.tsx       # 'use client': HUD, terminal, achievements, coins, sound
        │
        ▼  next build (output: 'export')
out/index.html, out/ca/…, out/es/…   # plain static files, deployable anywhere
```

- **No server runtime**: no API routes, no ISR, no middleware. `next build` emits per-route static HTML (`/`, `/ca/`, `/es/`).
- **i18n**: `next-intl` routing config with `localePrefix: 'as-needed'` — English at `/` (via the `(default)` route group), Catalan/Spanish at `/ca/`/`/es/` (via `[locale]` + `generateStaticParams`). The language switcher is plain static links in the footer.
- **Game logic**: pure functions in `src/lib/` (terminal parser, achievement/XP/level math) wired into React by `src/hooks/useGameState.ts`.
- **Styling**: plain CSS — design tokens as CSS custom properties in `src/styles/globals.css`, component-scoped CSS Modules.
- **Fonts**: self-hosted via `@fontsource/press-start-2p` and `@fontsource/vt323` (no external font CDN — the CSP forbids it).
- **Analytics**: `@vercel/analytics` only.

## Prerequisites

- Node (pinned in [`.nvmrc`](./.nvmrc)) — `nvm use`
- npm

## Quick start

```bash
nvm use
npm ci
npm run dev        # http://localhost:3000
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Static export to `out/` |
| `npm run lint` | Biome lint + `tsc --noEmit` |
| `npm run format` / `format:check` | Biome format (write / verify) |
| `npm test` | Vitest (terminal parser, achievement/XP logic, i18n parity) |
| `npm run i18n:check` | Fails if `ca`/`es` content JSON diverges from `en` keys |

## Tech stack

Next.js (App Router, `output: 'export'`) · TypeScript · next-intl · CSS Modules · Biome · Vitest + Testing Library · GitHub Actions · Vercel

## Content editing

All copy lives in `src/content/<locale>/*.json` (one file per CV section); locale-independent data (dates, links, skill levels, chip lists, timings) lives in `src/content/shared.json`. Keep key sets identical across locales — CI runs the parity check.

## Avatar

Drop a portrait at `public/avatar.jpg` (or `.png`/`.jpeg`/`.webp`) and rebuild — it renders pixelated inside the hero frame. Until then a "UU" placeholder tile shows; the build never breaks on the missing file.

## Deploy (Vercel)

Push to `main` — Vercel builds the static export. `vercel.json` sets a strict CSP (`default-src 'self'`; no external calls except same-origin Vercel Analytics at `/_vercel/insights/script.js`, which satisfies `script-src 'self'`).

### Custom domain (manual, one-time)

`uriustrell.dev` must be attached by hand — it is not scriptable:

1. Vercel dashboard → Project → Settings → Domains → add `uriustrell.dev`.
2. At the registrar, point DNS to Vercel (A `76.76.21.21` or the CNAME Vercel shows).
3. Wait for DNS + certificate provisioning.

## Git flow

Trunk-based: single `main` branch, conventional commits, CI gate on every push, no PR requirement.

## License

[MIT](./LICENSE)
