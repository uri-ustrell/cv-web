import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

/**
 * All copy is delivered to components as build-time JSON props (see
 * src/content), so no message catalogs are registered here — this config
 * only resolves the active locale for next-intl's static rendering.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale
  return { locale, messages: {} }
})
