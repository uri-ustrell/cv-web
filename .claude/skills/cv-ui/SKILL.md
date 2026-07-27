---
name: cv-ui
description: >-
  Edit global UI chrome — SEO meta title/description, the HUD name/subtitle,
  level/XP labels, sound toggle, achievement-toast title, coin prompts, PLAY/CODE
  buttons, avatar alt text, language names. Locale-only, fixed schema. Use for
  "change the meta title", "edit the HUD label", "update coin text".
---

# UI (chrome / labels / SEO)

Shared rules: `.claude/skills/_shared/CONVENTIONS.md`.

## Files

- `src/content/{en,ca,es}/ui.json` — no `shared.json` entry.

## Shape (fixed keys — modify-only)

```jsonc
{
  "metaTitle": "Uri Ustrell — Full-Stack Developer",        // SEO <title>
  "metaDescription": "Retro 8-bit gamified CV …",           // SEO meta description
  "hudName": "URI USTRELL",
  "hudSubtitle": "Full-Stack Dev",
  "lvlLabel": "LVL",
  "xpLabel": "WORLD EXPLORED",
  "sndOn": "SND:ON",
  "sndOff": "SND:OFF",
  "toastTitle": "★ ACHIEVEMENT UNLOCKED",
  "coinTitleFirst": "a wild coin appears! collect it",
  "coinTitle": "collect!",
  "coinTitleLast": "last one!",
  "playBtn": "▶ PLAY",
  "codeBtn": "</> CODE",
  "avatarAlt": "Pixel portrait of Uri Ustrell",
  "langNames": { "en": "EN", "ca": "CA", "es": "ES" }
}
```

## Ask the user

Which field(s) and the new value. `metaTitle` / `metaDescription` are
SEO-sensitive — keep them accurate and keyword-relevant per locale.

## Steps

- Edit in en, translate to ca/es. Short symbol labels (`LVL`, `SND:ON`,
  `langNames`) usually stay identical; meta text, subtitles, and coin prompts get
  translated.
- Don't add/remove keys (typed `UiContent`). `langNames` keys must stay exactly
  `en`/`ca`/`es`.

Validate: `npm run i18n:check && npm run lint && npm run test`.
