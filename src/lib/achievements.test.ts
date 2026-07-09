import { describe, expect, it } from 'vitest'
import {
  ACHIEVEMENT_KEYS,
  ACHIEVEMENT_TOTAL,
  type AchievementKey,
  applyCoinCollect,
  applyUnlock,
  calcLevel,
  calcXpPct,
  COIN_TOTAL,
  skillBarColor,
} from './achievements'

describe('calcLevel', () => {
  it('is 1 + unlocked count', () => {
    expect(calcLevel(0)).toBe(1)
    expect(calcLevel(3)).toBe(4)
    expect(calcLevel(ACHIEVEMENT_TOTAL)).toBe(11)
  })
})

describe('applyUnlock', () => {
  it('unlocks a known achievement', () => {
    const next = applyUnlock(new Set(), 'boot')
    expect(next).not.toBeNull()
    expect(next?.has('boot')).toBe(true)
  })

  it('is idempotent: a second unlock returns null', () => {
    const once = applyUnlock(new Set(), 'lore')
    expect(once).not.toBeNull()
    expect(applyUnlock(once as Set<AchievementKey>, 'lore')).toBeNull()
  })

  it('rejects unknown keys', () => {
    expect(applyUnlock(new Set(), 'not-a-thing')).toBeNull()
  })

  it('does not mutate the previous set', () => {
    const before = new Set<AchievementKey>()
    applyUnlock(before, 'boot')
    expect(before.size).toBe(0)
  })

  it('accepts every defined achievement key', () => {
    for (const key of ACHIEVEMENT_KEYS) {
      expect(applyUnlock(new Set(), key)).not.toBeNull()
    }
  })
})

describe('applyCoinCollect', () => {
  it('collects a new coin', () => {
    const result = applyCoinCollect(new Set(), 'hero')
    expect(result?.collected.has('hero')).toBe(true)
    expect(result?.unlocksTreasure).toBe(false)
  })

  it('ignores an already-collected coin', () => {
    expect(applyCoinCollect(new Set(['hero']), 'hero')).toBeNull()
  })

  it(`unlocks treasure on coin #${COIN_TOTAL} and only then`, () => {
    let collected: ReadonlySet<string> = new Set()
    const ids = ['hero', 'skills', 'experience', 'projects', 'interests']
    ids.forEach((id, i) => {
      const result = applyCoinCollect(collected, id)
      expect(result).not.toBeNull()
      if (!result) return
      expect(result.unlocksTreasure).toBe(i === COIN_TOTAL - 1)
      collected = result.collected
    })
    expect(collected.size).toBe(COIN_TOTAL)
  })
})

describe('calcXpPct', () => {
  it('maps scroll position to 0-100', () => {
    expect(calcXpPct(0, 2000, 1000)).toBe(0)
    expect(calcXpPct(500, 2000, 1000)).toBe(50)
    expect(calcXpPct(1000, 2000, 1000)).toBe(100)
  })

  it('clamps overscroll and handles unscrollable pages', () => {
    expect(calcXpPct(5000, 2000, 1000)).toBe(100)
    expect(calcXpPct(-50, 2000, 1000)).toBe(0)
    expect(calcXpPct(0, 800, 1000)).toBe(0)
  })
})

describe('skillBarColor', () => {
  it('follows the design thresholds', () => {
    expect(skillBarColor(9)).toBe('green')
    expect(skillBarColor(8)).toBe('green')
    expect(skillBarColor(7)).toBe('cyan')
    expect(skillBarColor(6)).toBe('cyan')
    expect(skillBarColor(5)).toBe('gold')
  })
})
