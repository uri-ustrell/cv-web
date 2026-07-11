import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/**
 * Server-rendered on Vercel (not a static export): middleware.ts issues a
 * per-request CSP nonce, which a static export can't do since no request
 * handler runs at serve time.
 */
const nextConfig: NextConfig = {
  // A stray lockfile in the home directory otherwise makes Next mis-infer
  // the workspace root.
  turbopack: {
    root: __dirname,
  },
}

export default withNextIntl(nextConfig)
