import '@fontsource/press-start-2p'
import '@fontsource/vt323'
import '@/styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import type { ReactNode } from 'react'
import type { Locale } from '@/lib/locales'

/**
 * Shared <html>/<body> shell for both root layouts ((default) → en at `/`,
 * [locale] → ca/es). Two root layouts is what lets a static export serve the
 * default locale unprefixed without any middleware or redirect.
 */
export const BaseLayout = ({ locale, children }: { locale: Locale; children: ReactNode }) => (
  <html lang={locale}>
    <body>
      {children}
      <Analytics />
    </body>
  </html>
)
