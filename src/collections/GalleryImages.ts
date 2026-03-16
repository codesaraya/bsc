import type { CollectionConfig } from 'payload'

export const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  admin: {
    useAsTitle: 'title',
    group: 'Sadržaj',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Naslov',
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Materijal', value: 'material' },
        { label: 'Proizvod', value: 'product' },
      ],
      required: true,
      label: 'Tip',
    },
    {
      name: 'categorySlug',
      type: 'text',
      required: true,
      label: 'Slug kategorije',
    },
    {
      name: 'itemSlug',
      type: 'text',
      required: true,
      label: 'Slug stavke',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Slike',
      fields: [
        {
          name: 'uploadedImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Slika',
        },
      ],
    },
  ],
}
