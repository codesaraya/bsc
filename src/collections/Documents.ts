import type { CollectionConfig } from 'payload'

export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Dokument', plural: 'Dokumenti' },
  admin: {
    useAsTitle: 'title',
    group: 'Mediji',
  },
  upload: {
    staticDir: 'public/documents',
    mimeTypes: ['application/pdf'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
}
