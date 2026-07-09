import type { AchievementKey } from '@/lib/achievements'
import type { TermColor, TermLine } from '@/lib/terminal'
import type { Locale } from '@/lib/locales'

export type Accent = 'green' | 'cyan' | 'pink' | 'gold' | 'purple' | 'red'

/** A run of text, optionally accent-colored and/or linked. */
export interface TextSegment {
  text: string
  accent?: string
  href?: string
}

export interface ProfileContent {
  eyebrow: string
  nameLine1: string
  nameLine2: string
  classLabel: string
  classValue: string
  specialty: string
  homeBase: string
  hpLabel: string
  hpValue: string
  mpLabel: string
  mpValue: string
  pressStart: string
  github: string
  linkedin: string
}

export interface AboutContent {
  title: string
  paragraphs: TextSegment[][]
}

export interface SkillsContent {
  title: string
}

export interface JobCopy {
  role: string
  blurb: TextSegment[]
}

export interface ExperienceContent {
  title: string
  mainQuestTag: string
  now: string
  jobs: Record<string, JobCopy>
  pastLivesTitle: string
  pastLives: Record<string, string>
}

export interface ProjectsContent {
  title: string
  descriptions: Record<string, string>
}

export interface EducationContent {
  title: string
  entries: Record<string, { degree: string; org: string }>
}

export interface InterestsContent {
  title: string
  intro: string
  cards: Record<string, { name: string; body: string }>
}

export interface ContactContent {
  title: string
  line: string
  emailBtn: string
  githubBtn: string
  linkedinBtn: string
  footerLocation: string
}

export interface TerminalSectionContent {
  title: string
  windowTitle: string
  prompt: string
  placeholder: string
  hint: string
  boot: TermLine[]
  outputs: Record<string, TermLine[]>
  stats: string
  notFound: string
}

export type AchievementsContent = Record<AchievementKey, { name: string; sub: string }>

export interface UiContent {
  metaTitle: string
  metaDescription: string
  hudName: string
  hudSubtitle: string
  lvlLabel: string
  xpLabel: string
  sndOn: string
  sndOff: string
  toastTitle: string
  coinTitleFirst: string
  coinTitle: string
  coinTitleLast: string
  playBtn: string
  codeBtn: string
  avatarAlt: string
  langNames: Record<Locale, string>
}

export interface LocaleContent {
  profile: ProfileContent
  about: AboutContent
  skills: SkillsContent
  experience: ExperienceContent
  projects: ProjectsContent
  education: EducationContent
  interests: InterestsContent
  contact: ContactContent
  terminal: TerminalSectionContent
  achievements: AchievementsContent
  ui: UiContent
}

export interface SharedContent {
  links: { github: string; linkedin: string; email: string }
  skillGroups: { id: string; name: string; items: { name: string; lv: number }[] }[]
  jobs: {
    id: string
    org: string
    start: string
    end: string | null
    accent: Accent
    mainQuest: boolean
    size: 'large' | 'small'
    chipTint: string | null
    chips: string[]
  }[]
  pastLives: { id: string; org: string; years: string }[]
  projects: {
    id: string
    name: string
    tag: string
    demo: string | null
    code: string
  }[]
  education: { id: string; year: string }[]
  interests: { id: string; accent: Accent }[]
  achievementIcons: Record<AchievementKey, string>
  coinSections: string[]
  sections: { id: string; num: string; accent: Accent; achKey: AchievementKey }[]
  timings: {
    toastMs: number
    bootDelayMs: number
    treasureDelayMs: number
    beepDecayS: number
    observerThreshold: number
  }
  beeps: {
    achievement: number
    achievementSpecial: number
    coin: number
    terminalEnter: number
    terminalClear: number
  }
  mpPct: number
}

export type { TermColor, TermLine }
