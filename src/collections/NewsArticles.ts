import type { CollectionConfig } from 'payload'

export const NewsArticles: CollectionConfig = {
  slug: 'news-articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Kratak opis',
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      label: 'Sadržaj',
    },
    {
      name: 'contentMarkdown',
      type: 'textarea',
      localized: true,
      label: 'Sadržaj (Markdown)',
      admin: {
        description: 'Alternativni sadržaj u Markdown formatu',
      },
    },
    {
      name: 'uploadedImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Slika',
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      label: 'Datum',
      admin: {
        description: 'npr. 20. feb 2026.',
      },
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      localized: true,
      label: 'Kategorija',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Autor',
      defaultValue: 'BSC Tim',
    },
    {
      name: 'readTime',
      type: 'text',
      localized: true,
      label: 'Vrijeme čitanja',
      defaultValue: '5 min čitanja',
    },
  ],
}
