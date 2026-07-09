import type { ContactContent, SharedContent, UiContent } from '@/content/types'
import { type Locale, localePath } from '@/lib/locales'
import styles from './ContactPanel.module.css'

/** Footer order matches the design copy: "… · ES · CA · EN". */
const FOOTER_LOCALES: Locale[] = ['es', 'ca', 'en']

interface ContactPanelProps {
  contact: ContactContent
  ui: UiContent
  links: SharedContent['links']
  locale: Locale
}

export const ContactPanel = ({ contact, ui, links, locale }: ContactPanelProps) => (
  <section id="contact" data-ach="complete" className={styles.section}>
    <div className={styles.panel}>
      <div className={styles.title}>{contact.title}</div>
      <div className={styles.line}>{contact.line}</div>
      <div className={styles.buttons}>
        <a href={`mailto:${links.email}`} className={`btn btnPrimary ${styles.btnPad}`}>
          {contact.emailBtn}
        </a>
        <a
          href={links.github}
          target="_blank"
          rel="noreferrer"
          className={`btn btnDark ${styles.btnPad}`}
        >
          {contact.githubBtn}
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noreferrer"
          className={`btn btnDark ${styles.btnPad}`}
        >
          {contact.linkedinBtn}
        </a>
      </div>
      <div className={styles.footer}>
        {links.email} · {contact.footerLocation} ·{' '}
        {FOOTER_LOCALES.map((lang, i) => (
          <span key={lang}>
            {i > 0 && ' · '}
            {lang === locale ? (
              <span className={styles.langCurrent}>{ui.langNames[lang]}</span>
            ) : (
              <a href={localePath(lang)} className={styles.langLink}>
                {ui.langNames[lang]}
              </a>
            )}
          </span>
        ))}
      </div>
    </div>
  </section>
)
