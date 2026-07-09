/**
 * Pure achievement / XP / coin logic. No React, no DOM — everything here is
 * unit-testable in isolation (see achievements.test.ts).
 */

export const ACHIEVEMENT_KEYS = [
  'boot',
  'hacker',
  'lore',
  'skill',
  'quest',
  'builder',
  'scholar',
  'thinker',
  'treasure',
  'complete',
] as const

export type AchievementKey = (typeof ACHIEVEMENT_KEYS)[number]

export const ACHIEVEMENT_TOTAL = ACHIEVEMENT_KEYS.length

export const COIN_TOTAL = 5

export const isAchievementKey = (key: string): key is AchievementKey =>
  (ACHIEVEMENT_KEYS as readonly string[]).includes(key)

/** Level shown in the HUD: 1 + achievements unlocked (matches the prototype). */
export const calcLevel = (unlockedCount: number): number => 1 + unlockedCount

/**
 * Idempotent unlock: returns the new set, or null when the key is unknown or
 * already unlocked (callers use null as "nothing happened, no toast/beep").
 */
export const applyUnlock = (
  unlocked: ReadonlySet<AchievementKey>,
  key: string
): Set<AchievementKey> | null => {
  if (!isAchievementKey(key) || unlocked.has(key)) return null
  return new Set([...unlocked, key])
}

/**
 * Collect a coin by id. Returns null when that coin was already collected.
 * `unlocksTreasure` flips true on the collection that reaches COIN_TOTAL.
 */
export const applyCoinCollect = (
  collected: ReadonlySet<string>,
  id: string
): { collected: Set<string>; unlocksTreasure: boolean } | null => {
  if (collected.has(id)) return null
  const next = new Set([...collected, id])
  return { collected: next, unlocksTreasure: next.size === COIN_TOTAL }
}

/** Scroll progress 0–100 for the HUD XP bar. */
export const calcXpPct = (
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number => {
  const max = scrollHeight - clientHeight
  if (max <= 0) return 0
  return Math.min(100, Math.max(0, Math.round((scrollTop / max) * 100)))
}

/** Skill bar color by level: lv≥8 green, lv≥6 cyan, else gold. */
export const skillBarColor = (lv: number): 'green' | 'cyan' | 'gold' =>
  lv >= 8 ? 'green' : lv >= 6 ? 'cyan' : 'gold'
