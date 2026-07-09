/**
 * Structural parity comparison between locale content objects.
 * Arrays are flattened element-wise so a locale with fewer list items
 * (e.g. a missing terminal output line) is reported as a divergence.
 */

export type Json = string | number | boolean | null | { [k: string]: Json } | Json[]

const isRecord = (v: Json): v is { [k: string]: Json } =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

export function flattenKeys(value: Json, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => flattenKeys(item, prefix ? `${prefix}[${i}]` : `[${i}]`))
  }
  if (isRecord(value)) {
    const entries = Object.entries(value)
    if (entries.length === 0) return prefix ? [prefix] : []
    return entries.flatMap(([key, v]) => flattenKeys(v, prefix ? `${prefix}.${key}` : key))
  }
  return prefix ? [prefix] : []
}

export interface ParityDivergence {
  locale: string
  namespace: string
  missing: string[]
  extra: string[]
}

/**
 * Compare each locale's namespace object against the reference locale.
 * Returns one divergence entry per (locale, namespace) that differs.
 */
export function compareLocales(
  reference: string,
  namespaces: Record<string, Record<string, Json>>
): ParityDivergence[] {
  const divergences: ParityDivergence[] = []
  for (const [namespace, byLocale] of Object.entries(namespaces)) {
    const referenceValue = byLocale[reference]
    if (referenceValue === undefined) {
      throw new Error(`Reference locale '${reference}' missing namespace '${namespace}'`)
    }
    const referenceKeys = new Set(flattenKeys(referenceValue))
    for (const [locale, value] of Object.entries(byLocale)) {
      if (locale === reference) continue
      const localeKeys = new Set(flattenKeys(value))
      const missing = [...referenceKeys].filter((k) => !localeKeys.has(k))
      const extra = [...localeKeys].filter((k) => !referenceKeys.has(k))
      if (missing.length > 0 || extra.length > 0) {
        divergences.push({ locale, namespace, missing, extra })
      }
    }
  }
  return divergences
}
