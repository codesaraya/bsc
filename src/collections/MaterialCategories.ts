import type { CollectionConfig } from 'payload'

export const MaterialCategories: CollectionConfig = {
  slug: 'material-categories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Materijali',
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
      admin: {
        description: 'URL-friendly identifikator (npr. uv-ecosolvent-latex)',
      },
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
        description: 'npr. from-cyan-500 to-blue-600',
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
