'use client'

import { type KeyboardEvent, useEffect, useRef, useState } from 'react'
import type { TerminalSectionContent } from '@/content/types'
import { runCommand, type TerminalStats, type TermLine } from '@/lib/terminal'
import styles from './Terminal.module.css'

const BLANK_LINE: TermLine = { text: ' ', color: 'text' }

interface TerminalProps {
  content: TerminalSectionContent
  getStats: () => TerminalStats
  onFirstCommand: () => void
  beepEnter: () => void
  beepClear: () => void
}

export const Terminal = ({
  content,
  getStats,
  onFirstCommand,
  beepEnter,
  beepClear,
}: TerminalProps) => {
  const [lines, setLines] = useState<TermLine[]>(() => [...content.boot, BLANK_LINE])
  const [value, setValue] = useState('')
  const outputRef = useRef<HTMLDivElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on every output change
  useEffect(() => {
    const el = outputRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    const raw = value
    const result = runCommand(raw, content, getStats())
    if (result.kind === 'clear') {
      setLines([])
      setValue('')
      beepClear()
      onFirstCommand()
      return
    }
    const echo: TermLine = { text: raw.trim(), prompt: true }
    setLines((prev) => [...prev, echo, ...result.lines, BLANK_LINE])
    setValue('')
    beepEnter()
    onFirstCommand()
  }

  return (
    <div>
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <span className={`${styles.light} ${styles.lightRed}`} />
          <span className={`${styles.light} ${styles.lightGold}`} />
          <span className={`${styles.light} ${styles.lightGreen}`} />
          <span className={styles.windowTitle}>{content.windowTitle}</span>
        </div>
        <div className={styles.output} ref={outputRef}>
          {lines.map((line, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: append-only log, index is stable
            <div key={i} className={styles.line}>
              {line.prompt && <span className={styles.prompt}>{content.prompt} </span>}
              {line.href ? (
                <a
                  href={line.href}
                  target={line.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noreferrer"
                  className={`${styles.lineText} accent-${line.color ?? 'green'}`}
                >
                  {line.text}
                </a>
              ) : (
                <span
                  className={`${styles.lineText} ${line.prompt ? styles.echo : `accent-${line.color ?? 'green'}`}`}
                >
                  {line.text}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className={styles.inputRow}>
          <span className={styles.prompt}>{content.prompt}</span>
          <input
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={content.placeholder}
            spellCheck={false}
            autoComplete="off"
            aria-label={content.windowTitle}
          />
        </div>
      </div>
      <div className={styles.hint}>{content.hint}</div>
    </div>
  )
}
