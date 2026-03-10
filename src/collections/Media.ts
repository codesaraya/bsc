import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*'],
  },
  admin: {
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'externalUrl',
      type: 'text',
      label: 'Eksterna URL putanja (Supabase)',
      admin: {
        description: 'Automatski popunjeno iz seed skripte — ne mijenjajte ručno.',
        condition: (data: any) => !!data?.externalUrl,
      },
    },
  ],
}
