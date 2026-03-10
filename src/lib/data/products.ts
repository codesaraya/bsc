import { getPayloadClient } from '@/lib/payload'
import { productCategories as staticCategories, type ProductCategory, type ProductItem } from '@/data/products'
import { getProductGalleryPhotos as staticGalleryPhotos } from '@/data/galleryImages'

export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const payload = await getPayloadClient()
    const categoriesResult = await payload.find({
      collection: 'product-categories',
      sort: 'sortOrder',
      limit: 100,
    })

    if (categoriesResult.docs.length === 0) {
      return staticCategories
    }

    const categories: ProductCategory[] = []

    for (const cat of categoriesResult.docs) {
      const itemsResult = await payload.find({
        collection: 'product-items',
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

export async function getProductCategoryBySlug(slug: string): Promise<ProductCategory | undefined> {
  const categories = await getProductCategories()
  return categories.find((c) => c.slug === slug)
}

export async function getProductItem(
  categorySlug: string,
  itemSlug: string
): Promise<{ category: ProductCategory; item: ProductItem } | undefined> {
  const category = await getProductCategoryBySlug(categorySlug)
  if (!category) return undefined
  const item = category.items.find((i) => i.slug === itemSlug)
  if (!item) return undefined
  return { category, item }
}

export async function getProductGalleryPhotos(
  categorySlug: string,
  itemSlug: string
): Promise<string[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'gallery-images',
      where: {
        and: [
          { type: { equals: 'product' } },
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

export async function getAllProductItemParams(): Promise<{ slug: string; item: string }[]> {
  const categories = await getProductCategories()
  return categories.flatMap((cat) =>
    cat.items.map((i) => ({ slug: cat.slug, item: i.slug }))
  )
}
