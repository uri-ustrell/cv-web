import type { SharedContent } from '@/content/types'
import { skillBarColor } from '@/lib/achievements'
import styles from './SkillGrid.module.css'

export const SkillGrid = ({ groups }: { groups: SharedContent['skillGroups'] }) => (
  <div className={styles.grid}>
    {groups.map((group) => (
      <div key={group.id} className={styles.card}>
        <div className={styles.groupName}>{group.name}</div>
        {group.items.map((skill) => (
          <div key={skill.name} className={styles.skill}>
            <div className={styles.skillHead}>
              <span className={styles.skillName}>{skill.name}</span>
              <span className={styles.skillLv}>LV{skill.lv}</span>
            </div>
            <div className={styles.track}>
              <div
                className={styles.fill}
                style={{
                  width: `${skill.lv * 10}%`,
                  background: `var(--${skillBarColor(skill.lv)})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
)
