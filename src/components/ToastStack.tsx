'use client'

import type { Toast } from '@/hooks/useGameState'
import styles from './ToastStack.module.css'

interface ToastStackProps {
  toasts: Toast[]
  title: string
}

export const ToastStack = ({ toasts, title }: ToastStackProps) => (
  <div className={styles.stack} role="status" aria-live="polite">
    {toasts.map((toast) => (
      <div key={toast.uid} className={styles.toast}>
        <div className={styles.title}>{title}</div>
        <div className={styles.body}>
          <span className={styles.icon}>{toast.icon}</span>
          <div>
            <div className={styles.name}>{toast.name}</div>
            <div className={styles.sub}>{toast.sub}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
)
