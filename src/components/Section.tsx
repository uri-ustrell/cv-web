import type { ReactNode } from 'react'
import type { Accent, SharedContent } from '@/content/types'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  achKey: string
  num: string
  accent: Accent
  title: string
  children: ReactNode
  coin?: ReactNode
  /** The terminal sits closer to the hero (34px vs the 46px rhythm). */
  tight?: boolean
}

/** Numbered section header + content wrapper (the reused design pattern). */
export const Section = ({
  id,
  achKey,
  num,
  accent,
  title,
  children,
  coin,
  tight,
}: SectionProps) => (
  <section id={id} data-ach={achKey} className={`${styles.section} ${tight ? styles.tight : ''}`}>
    <h2 className={`${styles.header} accent-${accent}`}>
      <span className={styles.numChip} style={{ background: `var(--${accent})` }}>
        {num}
      </span>{' '}
      {title}
    </h2>
    {children}
    {coin}
  </section>
)

export const sectionMeta = (shared: SharedContent, id: string) => {
  const meta = shared.sections.find((s) => s.id === id)
  if (!meta) throw new Error(`Unknown section id: ${id}`)
  return meta
}
