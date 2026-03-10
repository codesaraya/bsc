import { getPayloadClient } from '@/lib/payload'
import { categories as staticCategories, type MaterialCategory, type MaterialItem } from '@/data/materials'
import { getMaterialGalleryPhotos as staticGalleryPhotos } from '@/data/galleryImages'

export async function getMaterialCategories(): Promise<MaterialCategory[]> {
  try {
    const payload = await getPayloadClient()
    const categoriesResult = await payload.find({
      collection: 'material-categories',
      sort: 'sortOrder',
      limit: 100,
    })

    if (categoriesResult.docs.length === 0) {
      return staticCategories
    }

    const categories: MaterialCategory[] = []

    for (const cat of categoriesResult.docs) {
      const itemsResult = await payload.find({
        collection: 'material-items',
        where: {
          category: { equals: cat.id },
        },
        sort: 'sortOrder',
        limit: 100,
      })

      categories.push({
        title: cat.title as string,
        slug: cat.slug as string,
        description: cat.description as string,
        color: cat.color as string,
        items: itemsResult.docs.map((item) => ({
          name: item.name as string,
          slug: item.slug as string,
          description: item.description as string,
          image: (item.image as string) || undefined,
        })),
      })
    }

    return categories
  } catch {
    return staticCategories
  }
}

export async function getMaterialCategoryBySlug(slug: string): Promise<MaterialCategory | undefined> {
  const categories = await getMaterialCategories()
  return categories.find((c) => c.slug === slug)
}

export async function getMaterialItem(
  categorySlug: string,
  itemSlug: string
): Promise<{ category: MaterialCategory; item: MaterialItem } | undefined> {
  const category = await getMaterialCategoryBySlug(categorySlug)
  if (!category) return undefined
  const item = category.items.find((i) => i.slug === itemSlug)
  if (!item) return undefined
  return { category, item }
}

export async function getMaterialGalleryPhotos(
  categorySlug: string,
  itemSlug: string
): Promise<string[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'gallery-images',
      where: {
        and: [
          { type: { equals: 'material' } },
          { categorySlug: { equals: categorySlug } },
          { itemSlug: { equals: itemSlug } },
        ],
      },
      limit: 1,
    })

    if (result.docs.length > 0 && result.docs[0].images) {
      const images = result.docs[0].images as Array<{ imagePath?: string | null }>
      return images
        .map((img) => img.imagePath)
        .filter((p): p is string => !!p)
    }

    return staticGalleryPhotos(categorySlug, itemSlug)
  } catch {
    return staticGalleryPhotos(categorySlug, itemSlug)
  }
}

export async function getAllMaterialItemParams(): Promise<{ slug: string; item: string }[]> {
  const categories = await getMaterialCategories()
  return categories.flatMap((cat) =>
    cat.items.map((i) => ({ slug: cat.slug, item: i.slug }))
  )
}
