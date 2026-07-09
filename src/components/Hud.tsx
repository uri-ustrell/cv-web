'use client'

import type { UiContent } from '@/content/types'
import styles from './Hud.module.css'

interface HudProps {
  ui: UiContent
  level: number
  xpPct: number
  achievementCount: number
  achievementTotal: number
  coins: number
  coinTotal: number
  muted: boolean
  onToggleMute: () => void
}

export const Hud = ({
  ui,
  level,
  xpPct,
  achievementCount,
  achievementTotal,
  coins,
  coinTotal,
  muted,
  onToggleMute,
}: HudProps) => (
  <header className={styles.hud}>
    <div className={styles.row}>
      <div className={styles.avatarTile}>UU</div>
      <div className={styles.identity}>
        <div className={styles.name}>{ui.hudName}</div>
        <div className={styles.subtitle}>{ui.hudSubtitle}</div>
      </div>
      <div className={styles.lvlBadge}>
        {ui.lvlLabel} {level}
      </div>
      <div className={styles.xpWrap}>
        <div className={styles.xpLabels}>
          <span>{ui.xpLabel}</span>
          <span>{xpPct}%</span>
        </div>
        <div className={styles.xpTrack}>
          <div className={styles.xpFill} style={{ width: `${xpPct}%` }} />
        </div>
      </div>
      <div className={styles.counter}>
        ★ {achievementCount}/{achievementTotal}
      </div>
      <div className={styles.counter}>
        $ {coins}/{coinTotal}
      </div>
      <button type="button" className={styles.sndBtn} onClick={onToggleMute}>
        {muted ? ui.sndOff : ui.sndOn}
      </button>
    </div>
  </header>
)
