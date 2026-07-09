/**
 * i18n parity checker.
 *
 * Loads every namespace JSON for each locale under `src/content/<locale>/`
 * and reports keys (including array positions) present in one locale but
 * missing in another. Exits 1 on any divergence so CI can gate on it.
 *
 * Usage: `npm run i18n:check`
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { compareLocales, type Json } from '../src/lib/i18nParity'

const CONTENT_DIR = join(process.cwd(), 'src/content')
const REFERENCE_LOCALE = 'en'

const locales = readdirSync(CONTENT_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

if (!locales.includes(REFERENCE_LOCALE)) {
  console.error(`[i18n:check] Reference locale '${REFERENCE_LOCALE}' not found.`)
  process.exit(1)
}

const namespaceFiles = readdirSync(join(CONTENT_DIR, REFERENCE_LOCALE)).filter((f) =>
  f.endsWith('.json')
)

let problems = 0
const namespaces: Record<string, Record<string, Json>> = {}

for (const file of namespaceFiles) {
  namespaces[file] = {}
  for (const locale of locales) {
    try {
      const raw = readFileSync(join(CONTENT_DIR, locale, file), 'utf-8')
      namespaces[file][locale] = JSON.parse(raw) as Json
    } catch (err) {
      problems++
      console.error(`[i18n:check] ${locale}/${file} failed to load:`, (err as Error).message)
    }
  }
}

for (const divergence of compareLocales(REFERENCE_LOCALE, namespaces)) {
  problems++
  console.error(`\n[i18n:check] ${divergence.locale}/${divergence.namespace} diverges:`)
  for (const key of divergence.missing) console.error(`  - missing: ${key}`)
  for (const key of divergence.extra) console.error(`  + extra:   ${key}`)
}

if (problems === 0) {
  console.log(
    `[i18n:check] OK — ${locales.length} locales, ${namespaceFiles.length} namespaces in parity.`
  )
  process.exit(0)
}

console.error(`\n[i18n:check] Found ${problems} divergence(s).`)
process.exit(1)
