import type { InterestsContent, SharedContent } from '@/content/types'
import styles from './InterestsPanel.module.css'

interface InterestsPanelProps {
  interests: SharedContent['interests']
  copy: InterestsContent
}

export const InterestsPanel = ({ interests, copy }: InterestsPanelProps) => (
  <div className={styles.panel}>
    <p className={styles.intro}>{copy.intro}</p>
    <div className={styles.grid}>
      {interests.map((interest) => (
        <div key={interest.id} className={styles.card}>
          <div className={styles.name} style={{ color: `var(--${interest.accent})` }}>
            {copy.cards[interest.id].name}
          </div>
          <div className={styles.body}>{copy.cards[interest.id].body}</div>
        </div>
      ))}
    </div>
  </div>
)
