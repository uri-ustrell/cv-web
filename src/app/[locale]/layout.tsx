import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import type { ReactNode } from 'react'
import { BaseLayout } from '@/components/BaseLayout'
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/lib/locales'
import { buildMetadata, viewport } from '@/lib/metadata'

/** Secondary locales only — English is served unprefixed by the (default) tree. */
const PREFIXED_LOCALES: Locale[] = ['ca', 'es']

export const dynamicParams = false

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }))
}

export { viewport }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata(isLocale(locale) ? locale : DEFAULT_LOCALE)
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE
  setRequestLocale(locale)
  return <BaseLayout locale={locale}>{children}</BaseLayout>
}
