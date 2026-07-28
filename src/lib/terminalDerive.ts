/**
 * Derives the data-driven terminal outputs from the same content the visual
 * sections render, so the terminal never duplicates (and never drifts from)
 * shared.json + the locale namespaces. Only flavor commands (help, sudo,
 * coffee, hello, konami) stay authored in terminal.json.
 */
import type { LocaleContent, SharedContent, TermLine } from '@/content/types'

/** Left column: padded to `width`, never truncated (overflow just shifts the row). */
const col = (value: string, width: number): string => value.padEnd(width)

/** Trailing prose, clipped so a single row stays terminal-sized. */
const clip = (value: string, max: number): string =>
  value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value

const stripProtocol = (url: string): string =>
  url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

/** First sentence of a segmented paragraph, used as the whoami one-liner. */
const firstSentence = (paragraph: { text: string }[]): string => {
  const full = paragraph.map((segment) => segment.text).join('')
  return (full.match(/^[\s\S]*?[.!?](?=\s|$)/)?.[0] ?? full).trim()
}

const jobLine = (org: string, role: string, years: string, color: TermLine['color']): TermLine => ({
  text: `${col(years, 13)}${col(org, 25)}${role}`,
  color,
})

export function deriveTerminalOutputs(
  content: LocaleContent,
  shared: SharedContent
): Record<string, TermLine[]> {
  const { profile, about, experience, education, projects, interests, contact, terminal } = content

  const whoami: TermLine[] = [
    { text: `${profile.nameLine1} ${profile.nameLine2}`, color: 'cyan' },
    { text: firstSentence(about.paragraphs[0] ?? []), color: 'text' },
    { text: profile.specialty, color: 'dim' },
    { text: profile.homeBase, color: 'dim' },
  ]

  const skills: TermLine[] = shared.skillGroups.map((group) => ({
    text: `${col(group.name.toLowerCase(), 14)}: ${group.items.map((item) => item.name).join(', ')}`,
    color: 'text',
  }))

  const now = experience.now.toLowerCase()
  const experienceLines: TermLine[] = [
    ...shared.jobs.map((job) =>
      jobLine(
        job.org,
        experience.jobs[job.id]?.role ?? '',
        `${job.start} - ${job.end ?? now}`,
        'text'
      )
    ),
    { text: experience.pastLivesTitle, color: 'dim' },
    ...shared.pastLives.map((life) =>
      jobLine(life.org, experience.pastLives[life.id] ?? '', life.years, 'dim')
    ),
  ]

  const educationLines: TermLine[] = shared.education.flatMap((entry) => {
    const copy = education.entries[entry.id]
    return [
      { text: `${col(entry.year, 13)}${copy?.org ?? ''}`, color: 'text' as const },
      { text: `${col('', 13)}${clip(copy?.degree ?? '', 58)}`, color: 'dim' as const },
    ]
  })

  const projectLines: TermLine[] = [
    ...shared.projects.map((project) => ({
      text: `${col(project.name, 26)}-> ${clip(projects.descriptions[project.id] ?? '', 44)}`,
      color: 'text' as const,
      href: project.demo ?? project.code,
    })),
    { text: stripProtocol(shared.links.github), color: 'cyan', href: shared.links.github },
  ]

  const contactLines: TermLine[] = [
    {
      text: `${col(terminal.labels.email, 8)}: ${shared.links.email}`,
      color: 'text',
      href: `mailto:${shared.links.email}`,
    },
    { text: `${col(terminal.labels.base, 8)}: ${contact.footerLocation}`, color: 'text' },
    {
      text: `${col(terminal.labels.languages, 8)}: ${terminal.labels.languagesValue}`,
      color: 'text',
    },
  ]

  const social: TermLine[] = [shared.links.github, shared.links.linkedin].map((url) => ({
    text: stripProtocol(url),
    color: 'cyan',
    href: url,
  }))

  // `buffs` mirrors the passive-skill cards, accent colors and demo links included.
  const buffs: TermLine[] = [
    { text: `▚ ${interests.title} ▚`, color: 'gold' },
    ...shared.interests.flatMap((entry) => {
      const card = interests.cards[entry.id]
      return [
        { text: card?.name ?? entry.id, color: entry.accent, href: entry.demo ?? undefined },
        { text: `  ${card?.body ?? ''}`, color: 'dim' as const },
      ]
    }),
  ]

  const ls: TermLine[] = [
    {
      text: [
        ...shared.sections.filter((s) => s.id !== 'terminal').map((s) => s.id),
        'contact',
      ].join('  '),
      color: 'cyan',
    },
  ]

  return {
    whoami,
    skills,
    experience: experienceLines,
    education: educationLines,
    projects: projectLines,
    contact: contactLines,
    social,
    buffs,
    ls,
  }
}
