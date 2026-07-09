import { CvPage } from '@/components/CvPage'
import { DEFAULT_LOCALE, isLocale } from '@/lib/locales'

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <CvPage locale={isLocale(locale) ? locale : DEFAULT_LOCALE} />
}
