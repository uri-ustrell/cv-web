import type { ReactNode } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { BaseLayout } from '@/components/BaseLayout'
import { DEFAULT_LOCALE } from '@/lib/locales'
import { buildMetadata, viewport } from '@/lib/metadata'

export const metadata = buildMetadata(DEFAULT_LOCALE)
export { viewport }

export default function DefaultLocaleLayout({ children }: { children: ReactNode }) {
  setRequestLocale(DEFAULT_LOCALE)
  return <BaseLayout locale={DEFAULT_LOCALE}>{children}</BaseLayout>
}
