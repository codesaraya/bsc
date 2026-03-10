import type { CollectionConfig } from 'payload'

export const ProductCategories: CollectionConfig = {
  slug: 'product-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Proizvodi',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Naziv kategorije',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Opis',
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      label: 'Tailwind gradient klase',
      admin: {
        description: 'npr. from-violet-500 to-purple-700',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Redoslijed sortiranja',
    },
  ],
}
