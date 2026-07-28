import { describe, expect, it } from 'vitest'
import { getContent, shared } from '@/content'
import { runCommand, type TerminalContent, type TerminalStats } from './terminal'
import { deriveTerminalOutputs } from './terminalDerive'

const en = getContent('en')

const content: TerminalContent = {
  ...en.terminal,
  outputs: { ...en.terminal.outputs, ...deriveTerminalOutputs(en, shared) },
}

const stats: TerminalStats = {
  level: 3,
  achievements: 2,
  achievementsTotal: 10,
  coins: 1,
  coinsTotal: 5,
}

const linesOf = (cmd: string) => {
  const result = runCommand(cmd, content, stats)
  if (result.kind !== 'lines') throw new Error(`expected lines for '${cmd}', got ${result.kind}`)
  return result.lines
}

describe('runCommand', () => {
  it('returns the help table', () => {
    const lines = linesOf('help')
    expect(lines[0]).toEqual({ text: 'available commands:', color: 'gold' })
    expect(lines).toHaveLength(13)
  })

  it.each([
    ['whoami', 'Uri Ustrell'],
    ['skills', 'frontend      : '],
    ['experience', 'MANGO'],
    ['education', '2018'],
    ['contact', 'email   : uri.ustrell@proton.me'],
    ['social', 'github.com/uri-ustrell'],
    ['ls', 'about  skills  experience  projects  education  interests  contact'],
    ['sudo', 'visitor is not in the sudoers file.'],
    ['coffee', 'brewing... ERROR: coffee.exe stopped responding at 3am.'],
    ['hello', 'hey there, fellow traveler  o/'],
  ])("'%s' returns its content output", (cmd, firstLine) => {
    expect(linesOf(cmd)[0]?.text).toContain(firstLine)
  })

  it('renders project links with hrefs', () => {
    const lines = linesOf('projects')
    expect(lines[0]?.href).toBe('https://uri-ustrell.github.io/lamicro-comandes/')
    expect(lines.at(-1)?.href).toBe('https://github.com/uri-ustrell')
  })

  it('documents buffs in help and in the hint', () => {
    const helpText = linesOf('help')
      .map((line) => line.text)
      .join('\n')
    expect(helpText).toMatch(/buffs/)
    expect(en.terminal.hint).toMatch(/buffs/)
    expect(linesOf('buffs').length).toBeGreaterThan(1)
  })

  it.each([
    ['about', 'whoami'],
    ['passives', 'buffs'],
    ['interests', 'buffs'],
    ['work', 'experience'],
    ['links', 'social'],
    ['hi', 'hello'],
    ['hey', 'hello'],
    ['sudo su', 'sudo'],
  ])("alias '%s' matches '%s'", (alias, canonical) => {
    expect(linesOf(alias)).toEqual(linesOf(canonical))
  })

  it.each(['xp', 'stats', 'level'])("'%s' interpolates live stats", (cmd) => {
    const lines = linesOf(cmd)
    expect(lines).toHaveLength(1)
    expect(lines[0]?.text).toBe('LVL 3  ·  2/10 achievements  ·  1/5 coins')
    expect(lines[0]?.color).toBe('gold')
  })

  it.each(['konami', 'up up down down'])("'%s' activates the cheat", (cmd) => {
    expect(linesOf(cmd)[0]).toEqual({
      text: '★ CHEAT ACTIVATED: infinite curiosity enabled ★',
      color: 'pink',
    })
  })

  it.each(['clear', 'cls'])("'%s' clears the screen", (cmd) => {
    expect(runCommand(cmd, content, stats)).toEqual({ kind: 'clear' })
  })

  it('falls back on unknown commands', () => {
    const lines = linesOf('dance')
    expect(lines).toEqual([{ text: "command not found: dance  (try 'help')", color: 'red' }])
  })

  it('trims and lowercases input', () => {
    expect(linesOf('  HELP  ')).toEqual(linesOf('help'))
    expect(linesOf('SUDO SU')).toEqual(linesOf('sudo'))
  })

  it('returns no output lines for empty input', () => {
    expect(linesOf('')).toEqual([])
    expect(linesOf('   ')).toEqual([])
  })
})
