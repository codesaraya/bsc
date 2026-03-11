import { getPayloadClient } from '@/lib/payload'
import { articles as staticArticles, type NewsArticle } from '@/data/news'

export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'news-articles',
      sort: '-createdAt',
      limit: 100,
    })

    if (result.docs.length === 0) {
      return staticArticles
    }

    return result.docs.map((doc) => ({
      slug: doc.slug as string,
      title: doc.title as string,
      excerpt: doc.excerpt as string,
      content: (doc.contentMarkdown as string) || '',
      imageUrl: (doc.image as string) || '',
      date: doc.date as string,
      category: doc.category as string,
      author: doc.author as string,
      readTime: (doc.readTime as string) || '5 min čitanja',
    }))
  } catch {
    return staticArticles
  }
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'news-articles',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    if (result.docs.length > 0) {
      const doc = result.docs[0]
      return {
        slug: doc.slug as string,
        title: doc.title as string,
        excerpt: doc.excerpt as string,
        content: (doc.contentMarkdown as string) || '',
        imageUrl: (doc.image as string) || '',
        date: doc.date as string,
        category: doc.category as string,
        author: doc.author as string,
        readTime: (doc.readTime as string) || '5 min čitanja',
      }
    }

    // Fall back to static data
    return staticArticles.find((a) => a.slug === slug)
  } catch {
    return staticArticles.find((a) => a.slug === slug)
  }
}
