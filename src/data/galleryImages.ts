const materialGalleryMap: Record<string, string[]> = {}
const productGalleryMap: Record<string, string[]> = {}

function key(categorySlug: string, itemSlug: string): string {
  return `${categorySlug}/${itemSlug}`
}

export function getMaterialGalleryPhotos(categorySlug: string, itemSlug: string): string[] {
  return materialGalleryMap[key(categorySlug, itemSlug)] ?? []
}

export function getProductGalleryPhotos(categorySlug: string, itemSlug: string): string[] {
  return productGalleryMap[key(categorySlug, itemSlug)] ?? []
}
