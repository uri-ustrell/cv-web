import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { getContent, shared } from '@/content'
import type { Locale } from '@/lib/locales'
import { CvApp } from './CvApp'

const AVATAR_CANDIDATES = ['avatar.jpg', 'avatar.jpeg', 'avatar.png', 'avatar.webp']

/**
 * Build-time check: the owner drops `public/avatar.jpg` (or .png/…) into the
 * repo whenever it's ready. Until then the hero renders a "UU" placeholder
 * tile — the build never breaks on the missing asset.
 */
const findAvatarSrc = (): string | undefined => {
  const file = AVATAR_CANDIDATES.find((name) => existsSync(join(process.cwd(), 'public', name)))
  return file ? `/${file}` : undefined
}

/** Server component: bakes the locale's JSON content into the static HTML. */
export const CvPage = ({ locale }: { locale: Locale }) => (
  <CvApp locale={locale} content={getContent(locale)} shared={shared} avatarSrc={findAvatarSrc()} />
)
