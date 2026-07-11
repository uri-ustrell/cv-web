import '@fontsource/press-start-2p/index.css'
import '@fontsource/vt323/index.css'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { headers } from 'next/headers'
import type { ReactNode } from 'react'
import type { Locale } from '@/lib/locales'

/**
 * Shared <html>/<body> shell for both root layouts ((default) → en at `/`,
 * [locale] → ca/es). Two root layouts is what lets the default locale be
 * served unprefixed without a redirect.
 *
 * The `headers()` call is otherwise unused here, but reading it opts this
 * route into per-request dynamic rendering — required for src/proxy.ts's
 * CSP nonce to land on Next's inline hydration scripts. Without it these
 * pages stay statically prerendered at build time, baking in stale/absent
 * nonces and getting blocked by the CSP at runtime.
 */
export const BaseLayout = async ({ locale, children }: { locale: Locale; children: ReactNode }) => {
  await headers()

  return (
    <html lang={locale}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
