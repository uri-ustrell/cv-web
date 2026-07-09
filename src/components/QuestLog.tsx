import type { ExperienceContent, SharedContent } from '@/content/types'
import styles from './QuestLog.module.css'
import { Segments } from './Segments'

interface QuestLogProps {
  experience: ExperienceContent
  jobs: SharedContent['jobs']
  pastLives: SharedContent['pastLives']
}

const dates = (job: SharedContent['jobs'][number], nowLabel: string): string => {
  if (job.end === job.start) return job.start
  return `${job.start} → ${job.end ?? nowLabel}`
}

export const QuestLog = ({ experience, jobs, pastLives }: QuestLogProps) => {
  const largeJobs = jobs.filter((job) => job.size === 'large')
  const smallJobs = jobs.filter((job) => job.size === 'small')

  return (
    <div className={styles.stack}>
      {largeJobs.map((job) => {
        const copy = experience.jobs[job.id]
        return (
          <article
            key={job.id}
            className={styles.card}
            style={{ borderLeftColor: `var(--${job.accent})` }}
          >
            <div className={styles.head}>
              <div className={styles.org}>
                {job.org}{' '}
                {job.mainQuest && (
                  <span className={styles.mainQuest}>{experience.mainQuestTag}</span>
                )}
              </div>
              <div className={styles.dates}>{dates(job, experience.now)}</div>
            </div>
            <div className={styles.role}>{copy.role}</div>
            <p className={styles.blurb}>
              <Segments segments={copy.blurb} />
            </p>
            {job.chips.length > 0 && (
              <div className={styles.chips}>
                {job.chips.map((chip) => (
                  <span
                    key={chip}
                    className="chip"
                    style={job.chipTint ? { color: job.chipTint } : undefined}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </article>
        )
      })}

      <div className={styles.smallGrid}>
        {smallJobs.map((job) => {
          const copy = experience.jobs[job.id]
          return (
            <article
              key={job.id}
              className={`${styles.card} ${styles.cardSmall}`}
              style={{ borderLeftColor: `var(--${job.accent})` }}
            >
              <div className={styles.head}>
                <div className={styles.orgSmall}>{job.org}</div>
                <div className={styles.dates}>{dates(job, experience.now)}</div>
              </div>
              <div className={styles.roleSmall}>{copy.role}</div>
              <p className={styles.blurbSmall}>
                <Segments segments={copy.blurb} />
              </p>
            </article>
          )
        })}
      </div>

      <details className={styles.pastLives}>
        <summary className={styles.pastLivesSummary}>{experience.pastLivesTitle}</summary>
        <div className={styles.pastLivesList}>
          {pastLives.map((life) => (
            <div key={life.id} className={styles.pastLife}>
              <div>
                <span className={styles.pastLifeOrg}>{life.org}</span>{' '}
                <span className={styles.pastLifeRole}>— {experience.pastLives[life.id]}</span>
              </div>
              <div className={styles.pastLifeYears}>{life.years}</div>
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}
