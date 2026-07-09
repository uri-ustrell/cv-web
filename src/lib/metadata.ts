import type { Metadata, Viewport } from 'next'
import { getContent } from '@/content'
import { type Locale, localePath } from './locales'

export const SITE_URL = 'https://uriustrell.dev'

export const buildMetadata = (locale: Locale): Metadata => {
  const ui = getContent(locale).ui
  return {
    metadataBase: new URL(SITE_URL),
    title: ui.metaTitle,
    description: ui.metaDescription,
    alternates: {
      canonical: localePath(locale),
      languages: {
        en: '/',
        ca: '/ca/',
        es: '/es/',
      },
    },
    openGraph: {
      title: ui.metaTitle,
      description: ui.metaDescription,
      url: localePath(locale),
      siteName: 'uriustrell.dev',
      type: 'website',
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#16121f',
}
