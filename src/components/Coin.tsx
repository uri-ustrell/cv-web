'use client'

import styles from './Coin.module.css'

interface CoinProps {
  id: string
  title: string
  collected: boolean
  onCollect: (id: string) => void
  /** The hero coin sits slightly lower than the section-header coins. */
  placement?: 'hero' | 'section'
}

export const Coin = ({ id, title, collected, onCollect, placement = 'section' }: CoinProps) => (
  <button
    type="button"
    className={`${styles.coin} ${placement === 'hero' ? styles.hero : styles.section}`}
    style={collected ? { visibility: 'hidden' } : undefined}
    title={title}
    aria-label={title}
    onClick={() => onCollect(id)}
  >
    $
  </button>
)
