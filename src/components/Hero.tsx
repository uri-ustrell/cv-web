'use client'

import { useState } from 'react'
import type { ProfileContent, SharedContent, UiContent } from '@/content/types'
import { Coin } from './Coin'
import styles from './Hero.module.css'

interface HeroProps {
  profile: ProfileContent
  ui: UiContent
  links: SharedContent['links']
  mpPct: number
  avatarSrc?: string
  coinCollected: boolean
  onCollectCoin: (id: string) => void
  coinTitle: string
}

export const Hero = ({
  profile,
  ui,
  links,
  mpPct,
  avatarSrc,
  coinCollected,
  onCollectCoin,
  coinTitle,
}: HeroProps) => {
  const [avatarBroken, setAvatarBroken] = useState(false)
  const showAvatar = avatarSrc !== undefined && !avatarBroken

  return (
    <section id="hero" data-ach="boot" className={styles.section}>
      <div className={styles.panel}>
        <div className={styles.avatarFrame}>
          {showAvatar ? (
            // biome-ignore lint/performance/noImgElement: next/image needs a server/loader — this is a static export
            <img
              src={avatarSrc}
              alt={ui.avatarAlt}
              className={styles.avatarImg}
              onError={() => setAvatarBroken(true)}
            />
          ) : (
            <div className={styles.avatarPlaceholder} role="img" aria-label={ui.avatarAlt}>
              UU
            </div>
          )}
        </div>
        <div className={styles.body}>
          <div className={styles.eyebrow}>{profile.eyebrow}</div>
          <h1 className={styles.title}>
            {profile.nameLine1}
            <br />
            {profile.nameLine2}
          </h1>
          <div className={styles.classLine}>
            {profile.classLabel} <span className={styles.classValue}>{profile.classValue}</span>
          </div>
          <div className={styles.metaLine}>{profile.specialty}</div>
          <div className={styles.metaLine}>{profile.homeBase}</div>

          <div className={styles.bars}>
            <div>
              <div className={styles.barLabels}>
                <span className={styles.hpLabel}>{profile.hpLabel}</span>
                <span className={styles.barValue}>{profile.hpValue}</span>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.hpFill} />
              </div>
            </div>
            <div>
              <div className={styles.barLabels}>
                <span className={styles.mpLabel}>{profile.mpLabel}</span>
                <span className={styles.barValue}>{profile.mpValue}</span>
              </div>
              <div className={styles.barTrack}>
                <div className={styles.mpFill} style={{ width: `${mpPct}%` }} />
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            <a href="#terminal" className={`btn btnPrimary ${styles.blink}`}>
              {profile.pressStart}
            </a>
            <a href={links.github} target="_blank" rel="noreferrer" className="btn btnDark">
              {profile.github}
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="btn btnDark">
              {profile.linkedin}
            </a>
          </div>
        </div>
      </div>
      <Coin
        id="hero"
        title={coinTitle}
        collected={coinCollected}
        onCollect={onCollectCoin}
        placement="hero"
      />
    </section>
  )
}
