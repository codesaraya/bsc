import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getLocale } from '@/lib/locale'
import InstructionsPageClient from './InstructionsPageClient'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config })
    const locale = await getLocale()
    const d = await payload.findGlobal({ slug: 'instructions-page' as any, locale } as any)
    return {
      title: (d as any)?.metaTitle || 'Upute za pripremu - BSC',
      description: (d as any)?.metaDescription || 'Upute za pripremu fajlova za digitalnu štampu — formati, rezolucija, boje i više.',
    }
  } catch {
    return {
      title: 'Upute za pripremu - BSC',
      description: 'Upute za pripremu fajlova za digitalnu štampu — formati, rezolucija, boje i više.',
    }
  }
}

export default async function InstructionsPage() {
  const payload = await getPayload({ config })
  const locale = await getLocale()
  let instructionsData: any = null
  try {
    instructionsData = await payload.findGlobal({ slug: 'instructions-page' as any, locale } as any)
  } catch (e) {
    // fallback to null – client component will use hardcoded defaults
  }
  return <InstructionsPageClient data={instructionsData} />
}
