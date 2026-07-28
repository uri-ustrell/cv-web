/**
 * Pure terminal command parser. All human-readable output comes from the
 * locale's terminal.json content; this module only maps commands (and their
 * aliases) to that content and interpolates live stats.
 */

export type TermColor = 'green' | 'cyan' | 'pink' | 'gold' | 'purple' | 'dim' | 'text' | 'red'

export interface TermLine {
  text: string
  color?: TermColor
  href?: string
  /** Rendered with the pink `visitor@uri:~$` prefix (command echoes). */
  prompt?: boolean
}

export interface TerminalContent {
  outputs: Record<string, TermLine[]>
  stats: string
  notFound: string
}

export interface TerminalStats {
  level: number
  achievements: number
  achievementsTotal: number
  coins: number
  coinsTotal: number
}

export type CommandResult = { kind: 'lines'; lines: TermLine[] } | { kind: 'clear' }

const ALIASES: Record<string, string> = {
  about: 'whoami',
  work: 'experience',
  links: 'social',
  hi: 'hello',
  hey: 'hello',
  'sudo su': 'sudo',
  stats: 'xp',
  level: 'xp',
  'up up down down': 'konami',
  cls: 'clear',
  passives: 'buffs',
  interests: 'buffs',
}

const CONTENT_COMMANDS = new Set([
  'help',
  'whoami',
  'skills',
  'experience',
  'projects',
  'education',
  'contact',
  'social',
  'ls',
  'buffs',
  'sudo',
  'coffee',
  'hello',
  'konami',
])

const interpolateStats = (template: string, stats: TerminalStats): string =>
  template
    .replaceAll('{level}', String(stats.level))
    .replaceAll('{ach}', String(stats.achievements))
    .replaceAll('{achTotal}', String(stats.achievementsTotal))
    .replaceAll('{coins}', String(stats.coins))
    .replaceAll('{coinTotal}', String(stats.coinsTotal))

export function runCommand(
  raw: string,
  content: TerminalContent,
  stats: TerminalStats
): CommandResult {
  const typed = raw.trim().toLowerCase()
  if (typed === '') return { kind: 'lines', lines: [] }

  const cmd = ALIASES[typed] ?? typed
  if (cmd === 'clear') return { kind: 'clear' }
  if (cmd === 'xp') {
    return {
      kind: 'lines',
      lines: [{ text: interpolateStats(content.stats, stats), color: 'gold' }],
    }
  }
  const output = CONTENT_COMMANDS.has(cmd) ? content.outputs[cmd] : undefined
  if (output) return { kind: 'lines', lines: output }

  return {
    kind: 'lines',
    lines: [{ text: content.notFound.replaceAll('{cmd}', typed), color: 'red' }],
  }
}
