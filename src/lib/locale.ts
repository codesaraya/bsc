import { cookies } from 'next/headers'

export type Locale = 'bs' | 'en'
export const DEFAULT_LOCALE: Locale = 'bs'
export const LOCALE_COOKIE = 'bsc-locale'

/**
 * Read locale preference from cookies (server-side).
 * Call this in server components / page.tsx files.
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const raw = cookieStore.get(LOCALE_COOKIE)?.value
  if (raw === 'en' || raw === 'bs') return raw
  return DEFAULT_LOCALE
}
