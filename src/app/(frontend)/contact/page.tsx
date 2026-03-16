import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getLocale } from '@/lib/locale'
import ContactPageClient from './ContactPageClient'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config })
    const locale = await getLocale()
    const d = await payload.findGlobal({ slug: 'contact-page' as any, locale } as any)
    return {
      title: (d as any)?.metaTitle || 'Kontakt - BSC',
      description: (d as any)?.metaDescription || 'Kontaktirajte BSC digitalnu štampu — lokacija, telefon, email i radno vrijeme.',
    }
  } catch {
    return {
      title: 'Kontakt - BSC',
      description: 'Kontaktirajte BSC digitalnu štampu — lokacija, telefon, email i radno vrijeme.',
    }
  }
}

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const locale = await getLocale()
  let contactData: any = null
  try {
    contactData = await payload.findGlobal({ slug: 'contact-page' as any, locale } as any)
  } catch (e) {
    // fallback to null – client component will use hardcoded defaults
  }
  return <ContactPageClient data={contactData} />
}
