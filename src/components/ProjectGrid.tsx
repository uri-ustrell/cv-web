import type { ProjectsContent, SharedContent, UiContent } from '@/content/types'
import styles from './ProjectGrid.module.css'

interface ProjectGridProps {
  projects: SharedContent['projects']
  copy: ProjectsContent
  ui: UiContent
}

export const ProjectGrid = ({ projects, copy, ui }: ProjectGridProps) => (
  <div className={styles.grid}>
    {projects.map((project) => (
      <article key={project.id} className={styles.card}>
        <div className={styles.head}>
          <div className={styles.name}>{project.name}</div>
          <span className={styles.tag}>{project.tag}</span>
        </div>
        <p className={styles.desc}>{copy.descriptions[project.id]}</p>
        <div className={styles.buttons}>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className={styles.playBtn}>
              {ui.playBtn}
            </a>
          )}
          <a href={project.code} target="_blank" rel="noreferrer" className={styles.codeBtn}>
            {ui.codeBtn}
          </a>
        </div>
      </article>
    ))}
  </div>
)
