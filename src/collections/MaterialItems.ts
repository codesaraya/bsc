import type { CollectionConfig } from 'payload'

export const MaterialItems: CollectionConfig = {
  slug: 'material-items',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'slug', 'updatedAt'],
    group: 'Materijali',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Naziv materijala',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly identifikator (npr. pvc-naljepnice)',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'material-categories',
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
      name: 'longDescription1',
      type: 'textarea',
      localized: true,
      label: 'Duži opis — paragraf 1',
      admin: {
        description: 'Opcionalan prvi paragraf detaljnog opisa. Ako je prazno, koristi se globalni tekst sa stranice materijala.',
      },
    },
    {
      name: 'longDescription2',
      type: 'textarea',
      localized: true,
      label: 'Duži opis — paragraf 2',
      admin: {
        description: 'Opcionalan drugi paragraf detaljnog opisa. Ako je prazno, koristi se globalni tekst sa stranice materijala.',
      },
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
          label: 'Naslov',
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          localized: true,
          label: 'Opis',
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
