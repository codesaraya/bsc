import type { CollectionConfig } from 'payload'

export const ProductItems: CollectionConfig = {
  slug: 'product-items',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'slug', 'updatedAt'],
    group: 'Proizvodi',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Naziv proizvoda',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Slug',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'product-categories',
      required: true,
      label: 'Kategorija',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Opis',
    },
    {
      name: 'uploadedImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Slika',
    },
    {
      name: 'galleryImages',
      type: 'array',
      label: 'Galerija slika',
      fields: [
        {
          name: 'uploadedImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Slika',
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: 'Karakteristike',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Ikona (Lucide ime)',
        },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Redoslijed sortiranja',
    },
  ],
}
