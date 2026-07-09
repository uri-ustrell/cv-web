import { defineRouting } from 'next-intl/routing'
import { DEFAULT_LOCALE, LOCALES } from '@/lib/locales'

/**
 * `as-needed` keeps the default locale (en) at `/` with no prefix, while
 * ca/es live at `/ca` and `/es`. There is no middleware (static export), so
 * routing is fully resolved at build time via the app router structure.
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
})
