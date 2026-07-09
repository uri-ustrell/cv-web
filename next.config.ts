import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/**
 * Fully static export: no server runtime, no API routes, no ISR.
 * `trailingSlash` makes the export emit `/ca/index.html` (etc.) so the site
 * is deployable to any static host without rewrite rules.
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // A stray lockfile in the home directory otherwise makes Next mis-infer
  // the workspace root.
  turbopack: {
    root: __dirname,
  },
}

export default withNextIntl(nextConfig)
