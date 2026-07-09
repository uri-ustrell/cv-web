# Handoff: Retro-Pixel Gamified Developer CV

## Overview
A single-page personal CV / portfolio for **Oriol "Uri" Ustrell**, a full-stack (frontend-leaning) JS/TS developer. The design is a retro 8-bit / arcade game: an interactive terminal you can type commands into, an XP bar that fills on scroll, unlockable achievements (toast pop-ups), and collectible coins. The goal is a memorable, playful CV that rewards visitors who like to explore.

## About the Design Files
The file in this bundle (`Uri Ustrell CV.dc.html`) is a **design reference created in HTML** — a working prototype showing the intended look and behavior. It is **not production code to ship directly**. It's authored as a "Design Component" (a custom streaming format), so don't copy it verbatim.

Your task: **recreate this design in a real codebase** using its established patterns. If you're starting fresh, **Next.js + React + TypeScript** is the natural fit (it matches Uri's own stack). Styling can be plain CSS/CSS-Modules or Tailwind — but keep the chunky pixel aesthetic (see Design Tokens). Ignore the `.dc.html` wrapper, `x-import`, `sc-for`, and `renderVals()` mechanics; those are prototype-only. Reproduce the **markup structure, styles, copy, and JS behavior** described below.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, and interactions are final. Recreate pixel-perfectly. Exact hex values, fonts, and pixel sizes are listed in Design Tokens.

## Screens / Views
It's a single scrolling page with a fixed HUD overlay. Max content width **1040px**, centered, 20px side padding. Body has 96px top padding to clear the fixed HUD.

### Fixed HUD (top bar, always visible)
- **Position**: `position: fixed; top/left/right: 0; z-index: 70`. Background `#1b1428`, `border-bottom: 4px solid #000`, drop shadow `0 5px 0 rgba(169,123,255,0.28)`.
- Inner row: max-width 1040px, flex, `gap:14px`, `padding:9px 16px`, `flex-wrap:wrap`.
- **Contents left→right**: 34×34 avatar tile ("UU", purple `#a97bff`, black border, inset shadow) · name "URI USTRELL" (Press Start 2P 10px) + "Full-Stack Dev" (VT323 15px, `#9a90b5`) · **LVL badge** (gold `#ffcf3f` bg, Press Start 2P 9px, shows live level) · **XP bar** (label "WORLD EXPLORED" + live %, a 14px-tall track `#0f0b18` with black border; fill is diagonal-striped green `repeating-linear-gradient(45deg,#5ef58a,#4bd67a)`, width = scroll %) · **★ achievements** count `x/10` (gold) · **$ coins** count `x/5` (gold) · **SND:ON/OFF** mute button.

### 1. Hero (`#hero`)
- **Purpose**: intro / "press start".
- **Layout**: one panel, flex row wrapping, `gap:34px`, centered. Panel style = the standard **pixel panel** (see tokens).
- **Components**:
  - **Avatar frame**: 180×180, black 4px border, inset `0 0 0 4px #a97bff`, `6px 6px 0` shadow, `#0f0b18` bg, floats gently (`floaty` keyframe, translateY ±7px, 5s). Contains a user-fillable image (drag-drop portrait). In production use an `<img>` with a pixelated placeholder.
  - Eyebrow "▶ NEW GAME · PLAYER 1" (Press Start 2P 8px, green `#5ef58a`).
  - **H1** "Oriol Ustrell" — Press Start 2P **30px**, line-height 1.35, color `#eae6f5`, `text-shadow: 4px 4px 0 #a97bff`.
  - "Class: **Full-Stack Developer**" (VT323 24px, cyan `#46d4e6`, value in gold).
  - "Specialty: TypeScript · React · Next.js · Node" and "Home base: Sabadell, Catalonia 🌍" (VT323 20px, `#9a90b5`).
  - **HP bar** (green `#5ef58a`, 100% width) labeled "HP / DÉU N'HI DO"; **MP bar** (cyan `#46d4e6`, 92%) labeled "MP / CAFFEINE-FUELED". 12px tall, black border, `#0f0b18` track, Press Start 2P 7px labels.
  - Buttons: "▶ PRESS START" (green, links to `#terminal`, blinks via `blink` keyframe), "GITHUB" (→ https://github.com/uri-ustrell), "LINKEDIN" (→ https://www.linkedin.com/in/uriustrell/). Button style: Press Start 2P 9px, black 3px border, `4px 4px 0 #000` shadow, padding `11px 14px`.
  - One **coin** (see Coins) absolutely positioned top-right of the section.

### 2. Terminal (`#terminal`)
- **Purpose**: interactive command explorer (headline gamification feature).
- **Section header** (reused pattern): number chip "01" (colored bg, black text, `3px 3px 0` shadow) + title "TERMINAL — type to explore" in Press Start 2P 13px, accent green.
- **Window**: `#0d0a15` bg, black 3px border, inset `0 0 0 3px #1e2a1e`, `8px 8px 0` shadow.
  - **Title bar**: `#1e2a1e`, three 12px traffic-light squares (red `#ff5c5c`, gold `#ffcf3f`, green `#5ef58a`) + "uri@cv:~" (Press Start 2P 8px).
  - **Output area**: `#0d0a15`, padding 16px, **height 280px**, `overflow-y:auto`, VT323 19px, line-height 1.35. Auto-scrolls to bottom on new output. Command echoes are prefixed with a pink `visitor@uri:~$ ` prompt. Links render as `<a>` (cyan `#46d4e6`).
  - **Input row**: pink `visitor@uri:~$` label + transparent text input, green `#5ef58a` text/caret, VT323 19px, placeholder "try: help".
- Hint line under it (VT323 16px, `#6a6188`): "commands: help · whoami · skills · projects · experience · education · contact · sudo · coffee · clear".
- See **Interactions → Terminal commands** for full behavior.

### 3. About / "LORE" (`#about`)
- Header "02 LORE" (cyan). One pixel panel, VT323 22px, line-height 1.5, `#d7d1ea`. Three paragraphs (exact copy):
  1. "A frontend-leaning full-stack dev with **6+ years** shipping JavaScript & TypeScript at scale. By day I build microfrontends, in-house CLIs and shared libraries; by night I'm still doing basically the same thing, but for fun."
  2. "Plot twist: I've got a **degree in Psychology** and a past life in audiovisual production and radio. Turns out understanding humans is a decent debugger for building things they'll actually use."
  3. "My philosophy comes from three mentors I never met: **de Bono** (think sideways), **Goldratt** (find the bottleneck), and **Bandler & Grinder** (mind the map, not the territory)."
  (Bold spans use gold/cyan/purple accents respectively — see the HTML.)

### 4. Skills / "SKILL TREE" (`#skills`)
- Header "03 SKILL TREE" (green). Responsive grid `repeat(auto-fit, minmax(280px,1fr))`, gap 18px. Three pixel-panel cards:
  - **FRONTEND**: React · Next.js (LV9), TypeScript · JS (LV9), SASS · CSS (LV8), Redux (LV8)
  - **BACKEND**: Node.js (LV8), PHP · Laravel (LV6), .NET · C# (LV5), SQL · MongoDB (LV7)
  - **TOOLING & ENV**: Microfrontends (LV9), Webpack · Rollup (LV8), Git · CI/Jenkins (LV8), In-house CLIs (LV9)
- Each skill = label (VT323 18px) + "LVn" (Press Start 2P 7px) + a 13px bar (`#0f0b18` track, black border) filled to `lv*10%`. **Bar color by level**: `lv≥8 → #5ef58a`, `lv≥6 → #46d4e6`, else `#ffcf3f`.
- One coin, top-right.

### 5. Experience / "QUEST LOG" (`#experience`)
- Header "04 QUEST LOG" (gold). Vertical stack, gap 16px. Each job = panel with a thick **left border** in an accent color, `6px 6px 0` shadow.
  - **MANGO** (left border gold) — "Senior Frontend Developer" — "2020 → NOW" — tag "◆ MAIN QUEST". Blurb about microfrontends, in-house Node CLI, shared libs, SSG. Tech chips: React 17, Next.js, Node, Jest · MSW, Webpack · Rollup, Jenkins, SASS.
  - **FREELANCE / OPEN SOURCE** (purple) — "JavaScript Developer · React · Redux · React Native" — "2019 → NOW" — links to `#projects`.
  - **ROBOTICS S.A.** (cyan) — "Full-Stack Developer" — "2019 → 2020" — .NET world. Chips: .NET · C#, VisualBasic, Razor MVC, jQuery, SQL.
  - **MARFEEL** (pink) — "Frontend Web Developer" — "2018 → 2019". Chips: TypeScript, Jasmine, PhantomJS, MongoDB, nginx.
  - Two smaller side-by-side cards (green border): **ADESSO SPAIN** "Laravel & Angular Dev" 2018; **CREATING LEARNING** "Moodle Front & Back" 2018.
  - **`<details>` "PAST LIVES (pre-code)"** — collapsible list: Eralgrup (Audiovisual Coordinator, 2016–2017), patatabrava.com (Online Ad Sales, 2014–2016), ACN (Journalism Intern, 2014), Emagister.com (Copywriter, 2013–2014), Concatel (Community Manager, 2013), Radio Sabadell 94.6 (Live Sound Technician, 2006–2011).
  - Job title text is cyan `#46d4e6`; dates green Press Start 2P 8px; tech chips = VT323 15px, `#2f2442` bg, 2px black border, tinted text.
  - One coin, top-right.

### 6. Projects / "LOOT & BUILDS" (`#projects`)
- Header "05 LOOT & BUILDS" (pink). Grid `repeat(auto-fit, minmax(260px,1fr))`, gap 16px. Each card = pixel panel with title (Press Start 2P 11px) + a small tag chip + description (VT323 18px, `#9a90b5`) + buttons.
  - **La Micro Comandes** (APP) — demo https://uri-ustrell.github.io/lamicro-comandes/ · code https://github.com/uri-ustrell/lamicro-comandes
  - **Paint** (REACT·REDUX) — demo https://uri-ustrell.github.io/paint-react-redux/ · code https://github.com/uri-ustrell/paint-react-redux
  - **Star Match Game** (GAME) — code https://github.com/uri-ustrell/react-star-match-game
  - **Holidays Calendar** (NEXT.JS) — code https://github.com/uri-ustrell/holidays-calendar-nextjs
  - **React E-commerce** (REACT) — code https://github.com/uri-ustrell/react-ecommerce
  - **Redux Thunk Boilerplate** (STARTER) — code https://github.com/uri-ustrell/boilerplate-init-react-redux-thunk
  - "▶ PLAY" button (green) only when a demo exists; "</> CODE" button (dark) always. Press Start 2P 8px.
  - One coin, top-right.

### 7. Education / "TRAINING GROUNDS" (`#education`)
- Header "06 TRAINING GROUNDS" (purple). Grid `repeat(auto-fit, minmax(240px,1fr))`, gap 16px, pixel-panel cards: year (Press Start 2P 8px, gold) + title (VT323 21px) + org (VT323 18px, `#9a90b5`).
  - 2018 — Web App Development — CFO Cal Molins (web tech & multimedia)
  - 2017 — Web App Development — Cal Molins (computer programming)
  - 2015–2017 — BSc Psychology — Universitat Oberta de Catalunya
  - 2015–2016 — NLP Master Practitioner — Institut Gestalt

### 8. Interests / "PASSIVE SKILLS" (`#interests`)
- Header "07 PASSIVE SKILLS" (cyan). One pixel panel, intro line, then grid `repeat(auto-fit, minmax(210px,1fr))` of 4 dark inset cards (`#1a1426`):
  - "+LATERAL THINKING" (purple) — Edward de Bono — attack the problem from the side.
  - "+THE GOAL" (green) — Eliyahu Goldratt — find and break the bottleneck.
  - "+NLP" (pink) — Bandler & Grinder — the map is not the territory.
  - "+CREATIVE ARTS" (gold) — Video, motion, live sound & radio — a past creative life.
  - One coin, top-right (the 5th / last coin).

### 9. Contact (`#contact`)
- Centered pixel panel. "GAME OVER?" (Press Start 2P 16px, gold, `text-shadow 3px 3px 0 #000`) + "Nah — insert coin & let's build something. Continue?" + buttons: ✉ EMAIL (mailto:uri.ustrell@gmail.com), GITHUB, LINKEDIN. Footer line "uri.ustrell@gmail.com · Sabadell, Catalonia · ES · CA · EN".

### Achievement toasts (fixed, bottom-right)
- `position:fixed; right:16px; bottom:16px; z-index:90`. Stack of cards, `gap:10px`, `pointer-events:none`. Each: `#1b1428` bg, black 3px border, `5px 5px 0` shadow + gold glow. "★ ACHIEVEMENT UNLOCKED" (Press Start 2P 7px gold) + a gold icon chip + name (Press Start 2P 9px) + sub-line (VT323 15px). Enters via `toastin` keyframe (slide from right, 0.34s). Auto-dismisses after **3.8s**.

### CRT overlay
- Full-screen fixed div, `z-index:80`, `pointer-events:none`, repeating horizontal scanlines: `repeating-linear-gradient(0deg, rgba(0,0,0,0.16) 0 1px, transparent 2px 3px)`, `mix-blend-mode:multiply`, subtle `flick` opacity animation (4s).

## Interactions & Behavior

### XP bar (scroll progress)
On window scroll, compute `pct = round(scrollTop / (scrollHeight - clientHeight) * 100)`, clamp 0–100. Set the HUD XP fill width to that %, transition `width .25s`.

### Achievements (10 total)
Each maps to a section via a `data-ach` key; unlocked when the section scrolls ≥35% into view (use `IntersectionObserver`, threshold 0.35). Unlock is idempotent (once only). On unlock: push a toast (auto-remove after 3.8s), increment count, play a beep. **Level = 1 + number of achievements unlocked** (so LVL 1→11 as you explore... cap display at the 10 achievements; here max shown is 11, or clamp to 10 if you prefer — match the prototype's `1 + unlockedCount`).

| key | section | name | sub-line | icon |
|-----|---------|------|----------|------|
| boot | hero (fires ~600ms after load) | GAME BOOTED | You pressed start. Welcome, Player 1. | GO |
| hacker | first terminal command | HACKERMAN | You used the terminal. Respect. | HAX |
| lore | about | LORE MASTER | Read the backstory. | LOR |
| skill | skills | SKILL TREE | Inspected the build. | SKL |
| quest | experience | QUEST LOGGER | Opened the quest log. | QST |
| builder | projects | MASTER BUILDER | Browsed the loot. | BLD |
| scholar | education | SCHOLAR | Visited the training grounds. | EDU |
| thinker | interests | DEEP THINKER | Found the passive skills. | MND |
| treasure | all 5 coins collected | TREASURE HUNTER | Collected all 5 coins! | $$$ |
| complete | contact | COMPLETIONIST | You reached the end. GG. | 100 |

### Coins (5 total)
A spinning gold coin (26px circle, radial-gradient `#fff3b0→#ffcf3f→#c78a1a`, `coinspin` rotateY 1.6s, glow) is absolutely positioned in each of: hero, skills, experience, projects, interests. Clicking one: hide it, increment coin count, beep. On the 5th, unlock the `treasure` achievement. Each coin only counts once.

### Terminal commands
Read the trimmed, lowercased input on **Enter**. Echo the command with the pink prompt, then append the output lines, then a blank line, and auto-scroll to bottom. First-ever command unlocks `hacker`. Commands:
- `help` — list all commands.
- `whoami` / `about` — name, title, one-liner.
- `skills` — frontend / backend / tooling summary.
- `experience` / `work` — MANGO, Freelance, Robotics, Marfeel + note about creative past.
- `projects` — La Micro Comandes & Paint (as links) + github link.
- `education` — Cal Molins, UOC, Institut Gestalt.
- `contact` — email (mailto link), location, languages.
- `social` / `links` — github + linkedin links.
- `ls` — "about  skills  experience  projects  education  interests  contact".
- `sudo` — "visitor is not in the sudoers file. This incident has been reported. (jk)" (red).
- `coffee` — "brewing... ERROR: coffee.exe stopped responding at 3am. classic frontend behaviour."
- `hello`/`hi`/`hey` — "hey there, fellow traveler  o/".
- `xp`/`stats`/`level` — live level, achievements x/10, coins x/5.
- `konami` / `up up down down` — "★ CHEAT ACTIVATED: infinite curiosity enabled ★" (pink).
- `clear` / `cls` — wipe the output.
- anything else — "command not found: <cmd>  (try 'help')" (red).

### Sound (8-bit beeps)
Synthesize with the Web Audio API — no audio files. Square-wave oscillator, gain ~0.04, exponential ramp to silence over ~0.13s. Frequencies: achievements 880Hz (treasure/complete 1320Hz), coin 1180Hz, terminal enter 720Hz, clear 660Hz. The **SND** button toggles a `muted` flag that gates all beeps. Create/resume the `AudioContext` lazily on first interaction (autoplay policy).

### Motion / keyframes
`blink` (Press Start button, 1.4s step-end), `floaty` (avatar, ±7px, 5s), `coinspin` (rotateY 360°, 1.6s linear), `toastin` (slide-in 0.34s), `flick` (CRT opacity, 4s), plus the striped XP fill.

## State Management
- `xpPct` (number) — from scroll.
- `unlocked` (set/map of achievement keys) — drives level, HUD count, toasts.
- `toasts` (array of {uid, name, sub, icon}) — transient, auto-pruned after 3.8s.
- `coins` (number 0–5).
- `muted` (boolean).
- `termValue` (controlled input string) + `termLines` (array of {text, color, href?, prompt?}).
- No data fetching — all content is static (list it as local data/constants).

## Design Tokens
**Colors**
- Backgrounds: page `#16121f` (with radial `#241a38→#16121f`), panel `#20182e`, panel-inset/dark `#1a1426`, HUD `#1b1428`, deep well `#0f0b18`, terminal `#0d0a15`, terminal-chrome `#1e2a1e`, chip `#2f2442`.
- Text: primary `#eae6f5`, body `#d7d1ea`, muted `#9a90b5`, faint `#6a6188`.
- Accents: green `#5ef58a` (+ `#4bd67a` stripe), cyan `#46d4e6`, pink/magenta `#ff5c8a`, gold `#ffcf3f`, purple `#a97bff`, red `#ff6b6b` / `#ff5c5c`, terminal-dim `#7fae7f`.
- Borders: solid `3px`/`4px` black `#000` everywhere; the chunky look comes from black borders + hard offset shadows, no blur.

**Typography** (Google Fonts)
- **Press Start 2P** — headings, HUD, labels, buttons (used 7–30px; it's tiny, so treat 7–8px as "caption").
- **VT323** — body, terminal, descriptions (15–24px).
- `a` default color `#46d4e6`, hover `#ffcf3f`.

**Pixel panel (reusable)**: `background:#20182e; border:3px solid #000; box-shadow: inset 0 0 0 3px #2f2442, 6–10px 6–10px 0 rgba(0,0,0,0.5); padding:18–26px;`

**Shadows**: hard offset only — `4px 4px 0 #000`, `6px 6px 0 rgba(0,0,0,0.5)`, `8–10px 8–10px 0 rgba(0,0,0,0.55)`. No blurred shadows anywhere.

**Radius**: 0 everywhere (sharp pixel corners) — **except** coins (`50%`) and the avatar tile in the HUD.

**Spacing**: section vertical rhythm ~46px between sections; content max-width 1040px; card grids use `auto-fit, minmax(240–280px, 1fr)` with 16–18px gaps.

## Assets
- **Fonts**: Press Start 2P + VT323 from Google Fonts (`https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap`).
- **Avatar**: no image shipped — a drag-drop placeholder in the prototype. In production, provide a real portrait rendered with `image-rendering: pixelated` (optionally run it through a pixel-art filter for theme).
- **Icons/emoji**: minimal — a 🌍 in the hero and ✉ on the email button; everything else is CSS/Unicode geometry. Achievement icons are 2–3-letter text badges, not image icons.
- **No image files** are required otherwise. No audio files (beeps are synthesized).

## Files
- `Uri Ustrell CV.dc.html` — the full design reference (all screens + behavior). Open it in a browser to see the live prototype. Treat it as the source of truth for exact markup, styles, and the JS logic (terminal command outputs, achievement wiring, beep frequencies).

## Suggested build steps (Next.js + TS example)
1. `app/page.tsx` — the page; components: `<Hud>`, `<Hero>`, `<Terminal>`, `<Section>` (reused header + panel), `<SkillCard>`, `<QuestCard>`, `<ProjectCard>`, `<ToastStack>`, `<Coin>`, `<CrtOverlay>`.
2. Global CSS: import fonts, define keyframes + body reset + the color variables as CSS custom properties; make a `.panel` / `.chip` / `.btn` set of utility classes from the tokens above.
3. A `useGameState` hook (or small context) holding `unlocked`, `coins`, `muted`, `xpPct`, `toasts`; expose `unlock(key)`, `collectCoin(id)`, `runCommand(str)`, `beep(freq)`.
4. `IntersectionObserver` in a `useEffect` to wire section achievements; scroll listener for XP.
5. Keep all copy/data in a `data.ts` module so it's editable.
