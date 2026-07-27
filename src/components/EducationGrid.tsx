import type { EducationContent, SharedContent } from '@/content/types'
import styles from './EducationGrid.module.css'

interface EducationGridProps {
  entries: SharedContent['education']
  copy: EducationContent
}

export const EducationGrid = ({ entries, copy }: EducationGridProps) => (
  <div className={styles.grid}>
    {entries.map((entry) => (
      <article key={entry.id} className={styles.card}>
        <div className={styles.year}>{entry.year}</div>
        <div className={styles.degree}>{copy.entries[entry.id].degree}</div>
        <div className={styles.org}>{copy.entries[entry.id].org}</div>
        {copy.entries[entry.id].description ? (
          <div className={styles.description}>{copy.entries[entry.id].description}</div>
        ) : null}
      </article>
    ))}
  </div>
)
