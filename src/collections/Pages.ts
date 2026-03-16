import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Sadržaj',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Naslov stranice',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Sadržaj',
    },
    {
      name: 'metaTitle',
      type: 'text',
      label: 'SEO naslov',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'SEO opis',
    },
  ],
}
