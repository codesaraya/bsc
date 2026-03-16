import type { GlobalConfig } from 'payload'

export const InstructionsPage: GlobalConfig = {
  slug: 'instructions-page',
  label: 'Upute Stranica',
  admin: { group: 'Stranice' },
  fields: [
    // SEO
    { name: 'metaTitle', type: 'text', label: 'SEO Naslov (Tab Naziv)', defaultValue: 'Upute za pripremu - BSC', localized: true },
    { name: 'metaDescription', type: 'textarea', label: 'SEO Opis', defaultValue: 'Upute za pripremu fajlova za digitalnu štampu — formati, rezolucija, boje i više.', localized: true },
    // Hero
    { name: 'heroHeading', type: 'text', defaultValue: 'Upute za pripremu', localized: true },
    { name: 'heroSubtitle', type: 'textarea', localized: true },
    // Accepted formats
    {
      name: 'acceptedFormats',
      type: 'array',
      label: 'Prihvaćeni formati',
      fields: [{ name: 'format', type: 'text', required: true, localized: true }],
    },
    // Ratios
    {
      name: 'ratios',
      type: 'array',
      label: 'Omjeri',
      fields: [{ name: 'ratio', type: 'text', required: true, localized: true }],
    },
    // Resolutions
    {
      name: 'resolutions',
      type: 'array',
      label: 'Rezolucije',
      fields: [{ name: 'resolution', type: 'text', required: true, localized: true }],
    },
    // Prep tips
    {
      name: 'prepTips',
      type: 'array',
      label: 'Savjeti za pripremu',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
        { name: 'icon', type: 'select', label: 'Ikona', options: [
          { label: 'FileText', value: 'FileText' },
          { label: 'Palette', value: 'Palette' },
          { label: 'Image', value: 'Image' },
          { label: 'Layers', value: 'Layers' },
          { label: 'Type', value: 'Type' },
          { label: 'Scissors', value: 'Scissors' },
          { label: 'Ruler', value: 'Ruler' },
          { label: 'CheckCircle', value: 'CheckCircle' },
        ] },
      ],
    },
    // Downloads
    {
      name: 'downloads',
      type: 'array',
      label: 'Dokumenti za preuzimanje',
      fields: [
        { name: 'name', type: 'text', required: true, localized: true },
        { name: 'file', type: 'upload', relationTo: 'documents', label: 'PDF fajl' },
        { name: 'url', type: 'text', label: 'Ili eksterni link (ako nema uploada)' },
      ],
    },
    // Autograph section
    { name: 'autographTitle', type: 'text', defaultValue: 'Priprema za štampu autograma', localized: true },
    { name: 'autographDescription', type: 'textarea', localized: true },
    { name: 'autographFootnote', type: 'textarea', label: 'Napomena ispod opisa', localized: true },
    // Intro paragraph
    { name: 'introText', type: 'textarea', label: 'Uvodni paragraf o formatima', localized: true },
    // Ratios card
    { name: 'ratiosHeading', type: 'text', label: 'Naslov kartica omjera', defaultValue: 'Omjeri pripreme', localized: true },
    { name: 'ratiosDescription', type: 'textarea', label: 'Opis omjera', localized: true },
    { name: 'ratiosSuffix', type: 'text', label: 'Sufiks (itd.)', defaultValue: 'itd.', localized: true },
    // Resolutions card
    { name: 'resolutionsHeading', type: 'text', label: 'Naslov kartica rezolucija', defaultValue: 'Zahtjevi za rezoluciju', localized: true },
    { name: 'resolutionsDescription', type: 'textarea', label: 'Opis rezolucija', localized: true },
    { name: 'resolutionsSuffix', type: 'text', label: 'Sufiks (itd.)', defaultValue: 'itd.', localized: true },
    // Section titles
    {
      name: 'sections',
      type: 'array',
      label: 'Naslovi sekcija',
      fields: [
        { name: 'badge', type: 'text', localized: true },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
      ],
    },
    { name: 'downloadAllText', type: 'text', defaultValue: 'Preuzmi sve', localized: true },
    { name: 'downloadAllLink', type: 'text', label: 'Link za preuzimanje svih', defaultValue: '/contact' },
  ],
}
