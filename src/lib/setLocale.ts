'use server'

import { cookies } from 'next/headers'
import { LOCALE_COOKIE, type Locale } from './locale'

export async function setLocale(locale: Locale) {
  const cookieStore = await cookies()
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })
}
