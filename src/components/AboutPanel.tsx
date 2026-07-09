import type { AboutContent } from '@/content/types'
import styles from './AboutPanel.module.css'
import { Segments } from './Segments'

export const AboutPanel = ({ about }: { about: AboutContent }) => (
  <div className={styles.panel}>
    {about.paragraphs.map((paragraph, i) => {
      const key = `p-${i}-${paragraph[0]?.text.slice(0, 12)}`
      return (
        <p key={key} className={i === about.paragraphs.length - 1 ? styles.last : undefined}>
          <Segments segments={paragraph} />
        </p>
      )
    })}
  </div>
)
