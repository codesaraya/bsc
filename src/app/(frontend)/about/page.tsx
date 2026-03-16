import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getLocale } from '@/lib/locale'
import AboutPageClient from './AboutPageClient'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config })
    const locale = await getLocale()
    const d = await payload.findGlobal({ slug: 'about-page' as any, locale } as any)
    return {
      title: (d as any)?.metaTitle || 'O Nama - BSC',
      description: (d as any)?.metaDescription || 'Saznajte više o BSC digitalnoj štampi — naša priča, tim i vrijednosti.',
    }
  } catch {
    return {
      title: 'O Nama - BSC',
      description: 'Saznajte više o BSC digitalnoj štampi — naša priča, tim i vrijednosti.',
    }
  }
}

export default async function AboutPage() {
  const payload = await getPayload({ config })
  const locale = await getLocale()
  let aboutData: any = null
  let homepageData: any = null
  try {
    [aboutData, homepageData] = await Promise.all([
      payload.findGlobal({ slug: 'about-page' as any, locale } as any),
      payload.findGlobal({ slug: 'homepage' as any, locale } as any),
    ])
  } catch (e) {
    // fallback to null – client component will use hardcoded defaults
  }
  return <AboutPageClient data={aboutData} clientsData={homepageData?.clientsSection} />
}
