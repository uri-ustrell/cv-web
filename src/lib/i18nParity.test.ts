import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { compareLocales, flattenKeys, type Json } from './i18nParity'

describe('flattenKeys', () => {
  it('flattens nested objects with dot paths', () => {
    expect(flattenKeys({ a: { b: 1, c: 'x' } })).toEqual(['a.b', 'a.c'])
  })

  it('flattens arrays element-wise', () => {
    expect(flattenKeys({ list: [{ t: 'a' }, { t: 'b' }] })).toEqual(['list[0].t', 'list[1].t'])
  })
})

describe('compareLocales', () => {
  it('reports keys missing from a locale', () => {
    const divergences = compareLocales('en', {
      'ns.json': {
        en: { title: 'Hi', body: 'Text' },
        ca: { title: 'Hola' },
      },
    })
    expect(divergences).toHaveLength(1)
    expect(divergences[0]?.missing).toEqual(['body'])
    expect(divergences[0]?.extra).toEqual([])
  })

  it('reports extra keys and array length divergence', () => {
    const divergences = compareLocales('en', {
      'ns.json': {
        en: { lines: ['a', 'b'] },
        es: { lines: ['a', 'b', 'c'], bonus: true },
      },
    })
    expect(divergences[0]?.extra).toEqual(expect.arrayContaining(['lines[2]', 'bonus']))
  })

  it('returns nothing when locales match', () => {
    expect(
      compareLocales('en', {
        'ns.json': { en: { a: 1 }, ca: { a: 2 }, es: { a: 3 } },
      })
    ).toEqual([])
  })
})

describe('real content parity', () => {
  it('en, ca and es content files expose identical key sets', () => {
    const contentDir = join(process.cwd(), 'src/content')
    const locales = readdirSync(contentDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
    expect(locales).toEqual(expect.arrayContaining(['en', 'ca', 'es']))

    const namespaces: Record<string, Record<string, Json>> = {}
    for (const file of readdirSync(join(contentDir, 'en')).filter((f) => f.endsWith('.json'))) {
      namespaces[file] = {}
      for (const locale of locales) {
        namespaces[file][locale] = JSON.parse(
          readFileSync(join(contentDir, locale, file), 'utf-8')
        ) as Json
      }
    }

    expect(compareLocales('en', namespaces)).toEqual([])
  })
})
