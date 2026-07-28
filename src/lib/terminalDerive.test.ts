import { describe, expect, it } from 'vitest'
import { getContent, shared } from '@/content'
import { LOCALES } from '@/lib/locales'
import { deriveTerminalOutputs } from './terminalDerive'

describe('deriveTerminalOutputs', () => {
  it.each(LOCALES)('mirrors the section content for %s', (locale) => {
    const content = getContent(locale)
    const outputs = deriveTerminalOutputs(content, shared)
    const textOf = (cmd: string) => outputs[cmd]?.map((line) => line.text).join('\n') ?? ''

    expect(outputs.whoami?.[0]?.text).toBe(
      `${content.profile.nameLine1} ${content.profile.nameLine2}`
    )
    // whoami's one-liner is the first sentence of the about/lore opener.
    const lore = content.about.paragraphs[0]?.map((segment) => segment.text).join('') ?? ''
    expect(lore.startsWith(outputs.whoami?.[1]?.text ?? '')).toBe(true)

    for (const group of shared.skillGroups) {
      for (const item of group.items) expect(textOf('skills')).toContain(item.name)
    }
    for (const job of shared.jobs) expect(textOf('experience')).toContain(job.org)
    for (const life of shared.pastLives) expect(textOf('experience')).toContain(life.org)
    for (const entry of shared.education) expect(textOf('education')).toContain(entry.year)
    for (const project of shared.projects) {
      expect(outputs.projects?.some((line) => line.href === (project.demo ?? project.code))).toBe(
        true
      )
    }
    for (const entry of shared.interests) {
      const card = content.interests.cards[entry.id]
      expect(textOf('buffs')).toContain(card?.name ?? '')
      expect(textOf('buffs')).toContain(card?.body ?? '')
    }
    expect(textOf('contact')).toContain(shared.links.email)
    expect(textOf('contact')).toContain(content.contact.footerLocation)
    expect(outputs.social?.map((line) => line.href)).toEqual([
      shared.links.github,
      shared.links.linkedin,
    ])
    for (const section of shared.sections) {
      if (section.id !== 'terminal') expect(textOf('ls')).toContain(section.id)
    }
  })

  it('marks ongoing jobs with the localized "now" label', () => {
    const content = getContent('ca')
    const outputs = deriveTerminalOutputs(content, shared)
    const ongoing = shared.jobs.filter((job) => job.end === null)
    expect(ongoing.length).toBeGreaterThan(0)
    for (const job of ongoing) {
      const line = outputs.experience?.find((l) => l.text.includes(job.org))
      expect(line?.text).toContain(content.experience.now.toLowerCase())
    }
  })
})
