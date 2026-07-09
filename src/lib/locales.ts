export const LOCALES = ['en', 'ca', 'es'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value)

/** Static-export-friendly path for a locale: default locale lives at `/`. */
export const localePath = (locale: Locale): string =>
  locale === DEFAULT_LOCALE ? '/' : `/${locale}/`
