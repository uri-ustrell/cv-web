'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { AchievementsContent, SharedContent } from '@/content/types'
import {
  ACHIEVEMENT_TOTAL,
  type AchievementKey,
  applyCoinCollect,
  applyUnlock,
  calcLevel,
  calcXpPct,
  COIN_TOTAL,
} from '@/lib/achievements'
import { type Beeper, createBeeper } from '@/lib/audio'

export interface Toast {
  uid: string
  icon: string
  name: string
  sub: string
}

export interface GameState {
  xpPct: number
  level: number
  achievementCount: number
  achievementTotal: number
  coins: number
  coinTotal: number
  collectedCoins: ReadonlySet<string>
  muted: boolean
  toasts: Toast[]
  unlock: (key: string) => void
  collectCoin: (id: string) => void
  toggleMute: () => void
  beep: (freq: number) => void
}

interface UseGameStateArgs {
  achievements: AchievementsContent
  icons: Record<AchievementKey, string>
  timings: SharedContent['timings']
  beeps: SharedContent['beeps']
}

export function useGameState({ achievements, icons, timings, beeps }: UseGameStateArgs): GameState {
  const [xpPct, setXpPct] = useState(0)
  const [unlocked, setUnlocked] = useState<ReadonlySet<AchievementKey>>(() => new Set())
  const [collectedCoins, setCollectedCoins] = useState<ReadonlySet<string>>(() => new Set())
  const [muted, setMuted] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  // Refs mirror state that callbacks need synchronously (idempotency guards,
  // mute gating inside stable callbacks).
  const unlockedRef = useRef(unlocked)
  const coinsRef = useRef(collectedCoins)
  const mutedRef = useRef(muted)
  const beeperRef = useRef<Beeper | null>(null)

  const beep = useCallback(
    (freq: number) => {
      if (mutedRef.current) return
      beeperRef.current = beeperRef.current ?? createBeeper(timings.beepDecayS)
      beeperRef.current.beep(freq)
    },
    [timings.beepDecayS]
  )

  const unlock = useCallback(
    (key: string) => {
      const next = applyUnlock(unlockedRef.current, key)
      if (!next) return
      unlockedRef.current = next
      setUnlocked(next)

      const achKey = key as AchievementKey
      const uid = `${achKey}-${Date.now()}`
      setToasts((prev) => [
        ...prev,
        {
          uid,
          icon: icons[achKey],
          name: achievements[achKey].name,
          sub: achievements[achKey].sub,
        },
      ])
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.uid !== uid))
      }, timings.toastMs)

      beep(
        achKey === 'treasure' || achKey === 'complete'
          ? beeps.achievementSpecial
          : beeps.achievement
      )
    },
    [achievements, icons, timings.toastMs, beeps.achievementSpecial, beeps.achievement, beep]
  )

  const collectCoin = useCallback(
    (id: string) => {
      const result = applyCoinCollect(coinsRef.current, id)
      if (!result) return
      coinsRef.current = result.collected
      setCollectedCoins(result.collected)
      beep(beeps.coin)
      if (result.unlocksTreasure) {
        window.setTimeout(() => unlock('treasure'), timings.treasureDelayMs)
      }
    },
    [beep, beeps.coin, timings.treasureDelayMs, unlock]
  )

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      mutedRef.current = !prev
      return !prev
    })
  }, [])

  // XP bar: scroll progress.
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      setXpPct(
        calcXpPct(doc.scrollTop || document.body.scrollTop, doc.scrollHeight, doc.clientHeight)
      )
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Section achievements: unlock when a [data-ach] section is ≥35% visible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= timings.observerThreshold) {
            const key = entry.target.getAttribute('data-ach')
            if (key) unlock(key)
          }
        }
      },
      { threshold: [timings.observerThreshold] }
    )
    for (const el of document.querySelectorAll('[data-ach]')) observer.observe(el)
    return () => observer.disconnect()
  }, [timings.observerThreshold, unlock])

  // Boot achievement fires shortly after load.
  useEffect(() => {
    const timer = window.setTimeout(() => unlock('boot'), timings.bootDelayMs)
    return () => window.clearTimeout(timer)
  }, [timings.bootDelayMs, unlock])

  return useMemo(
    () => ({
      xpPct,
      level: calcLevel(unlocked.size),
      achievementCount: unlocked.size,
      achievementTotal: ACHIEVEMENT_TOTAL,
      coins: collectedCoins.size,
      coinTotal: COIN_TOTAL,
      collectedCoins,
      muted,
      toasts,
      unlock,
      collectCoin,
      toggleMute,
      beep,
    }),
    [xpPct, unlocked, collectedCoins, muted, toasts, unlock, collectCoin, toggleMute, beep]
  )
}
