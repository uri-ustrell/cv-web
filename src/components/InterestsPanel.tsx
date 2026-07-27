import type { InterestsContent, SharedContent, UiContent } from '@/content/types'
import styles from './InterestsPanel.module.css'
import { PlayButton } from './PlayButton'

interface InterestsPanelProps {
  interests: SharedContent['interests']
  copy: InterestsContent
  ui: UiContent
}

export const InterestsPanel = ({ interests, copy, ui }: InterestsPanelProps) => (
  <div className={styles.panel}>
    <p className={styles.intro}>{copy.intro}</p>
    <div className={styles.grid}>
      {interests.map((interest) => (
        <div key={interest.id} className={styles.card}>
          <div className={styles.name} style={{ color: `var(--${interest.accent})` }}>
            {copy.cards[interest.id].name}
          </div>
          <div className={styles.body}>{copy.cards[interest.id].body}</div>
          {interest.demo && (
            <div className={styles.buttons}>
              <PlayButton href={interest.demo} label={ui.playBtn} />
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)
