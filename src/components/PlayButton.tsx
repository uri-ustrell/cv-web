import styles from './PlayButton.module.css'

interface PlayButtonProps {
  href: string
  label: string
}

export const PlayButton = ({ href, label }: PlayButtonProps) => (
  <a href={href} target="_blank" rel="noreferrer" className={styles.playBtn}>
    {label}
  </a>
)
