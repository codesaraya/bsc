import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'O Nama Stranica',
  admin: { group: 'Stranice' },
  fields: [
    // SEO
    { name: 'metaTitle', type: 'text', label: 'SEO Naslov (Tab Naziv)', defaultValue: 'O Nama - BSC', localized: true },
    { name: 'metaDescription', type: 'textarea', label: 'SEO Opis', defaultValue: 'Saznajte više o BSC digitalnoj štampi — naša priča, tim i vrijednosti.', localized: true },
    // Hero
    { name: 'heroBadge', type: 'text', defaultValue: 'Više o nama', localized: true },
    { name: 'heroHeading', type: 'text', defaultValue: 'O nama', localized: true },
    { name: 'heroSubtitle', type: 'textarea', localized: true },
    { name: 'heroUploadedImage', type: 'upload', relationTo: 'media', label: 'Hero slika' },
    // Main content
    { name: 'heading', type: 'text', defaultValue: 'Specijalizirana digitalna', localized: true },
    { name: 'headingItalic', type: 'text', label: 'Naslov kurziv dio', defaultValue: 'štamparija', localized: true },
    { name: 'heroImageAlt', type: 'text', label: 'Hero slika alt tekst', defaultValue: 'BSC digitalna štampa', localized: true },
    { name: 'description1', type: 'textarea', label: 'Opis paragraf 1', localized: true },
    { name: 'description2', type: 'textarea', label: 'Opis paragraf 2', localized: true },
    {
      name: 'checklistItems',
      type: 'array',
      label: 'Checklist stavke',
      fields: [{ name: 'text', type: 'text', required: true, localized: true }],
    },
    { name: 'ctaText', type: 'text', defaultValue: 'Kontaktirajte nas', localized: true },
    { name: 'ctaLink', type: 'text', defaultValue: '/contact' },
    // Stats section titles
    { name: 'statsBadge', type: 'text', label: 'Statistike badge', defaultValue: 'O nama u brojkama', localized: true },
    { name: 'statsTitle', type: 'text', label: 'Statistike naslov', defaultValue: '"OD IDEJE DO GOTOVOG PROIZVODA"', localized: true },
    { name: 'statsSubtitle', type: 'text', label: 'Statistike podnaslov', defaultValue: 'Brojke koje odražavaju našu posvećenost i kvalitet.', localized: true },
    // Stats
    {
      name: 'stats',
      type: 'array',
      label: 'Statistike',
      fields: [
        { name: 'number', type: 'text', required: true, localized: true },
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'icon', type: 'select', label: 'Ikona', options: [
          { label: 'Users', value: 'Users' },
          { label: 'FolderCheck', value: 'FolderCheck' },
          { label: 'ImageIcon', value: 'ImageIcon' },
          { label: 'Phone', value: 'Phone' },
          { label: 'Briefcase', value: 'Briefcase' },
          { label: 'Printer', value: 'Printer' },
          { label: 'Award', value: 'Award' },
          { label: 'Star', value: 'Star' },
          { label: 'TrendingUp', value: 'TrendingUp' },
          { label: 'Heart', value: 'Heart' },
          { label: 'Target', value: 'Target' },
        ] },
      ],
    },
    // Advantages section titles
    { name: 'advantagesBadge', type: 'text', label: 'Prednosti badge', defaultValue: 'Zašto BSC', localized: true },
    { name: 'advantagesTitle', type: 'text', label: 'Prednosti naslov', defaultValue: 'Prednost naše štamparije u odnosu na druge', localized: true },
    { name: 'advantagesSubtitle', type: 'text', label: 'Prednosti podnaslov', defaultValue: 'Brzina, kvalitet, unikatnost i povoljnost — sve na jednom mjestu.', localized: true },
    // Advantages
    {
      name: 'advantages',
      type: 'array',
      label: 'Prednosti',
      fields: [
        { name: 'number', type: 'text', required: true, localized: true },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
        { name: 'icon', type: 'select', label: 'Ikona', options: [
          { label: 'Award', value: 'Award' },
          { label: 'Zap', value: 'Zap' },
          { label: 'Sparkles', value: 'Sparkles' },
          { label: 'Tag', value: 'Tag' },
          { label: 'Lightbulb', value: 'Lightbulb' },
          { label: 'DollarSign', value: 'DollarSign' },
          { label: 'Star', value: 'Star' },
          { label: 'Shield', value: 'Shield' },
          { label: 'Target', value: 'Target' },
          { label: 'Heart', value: 'Heart' },
        ] },
      ],
    },
    // Certificates section titles
    { name: 'certificatesBadge', type: 'text', label: 'Certifikati badge', defaultValue: 'Certifikati', localized: true },
    { name: 'certificatesTitle', type: 'text', label: 'Certifikati naslov', defaultValue: 'Šta nas čini posebnima?', localized: true },
    { name: 'certificatesSubtitle', type: 'textarea', label: 'Certifikati podnaslov', localized: true },
    // Satisfied clients text
    { name: 'satisfiedClientsText', type: 'text', label: 'Tekst "zadovoljnih klijenata"', defaultValue: 'zadovoljnih klijenata', localized: true },
    // Certificates
    {
      name: 'certificates',
      type: 'array',
      label: 'Certifikati',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'subtitle', type: 'text', localized: true },
      ],
    },
    // Decorative labels
    {
      name: 'decorativeLabels',
      type: 'array',
      label: 'Dekorativne oznake',
      fields: [{ name: 'label', type: 'text', required: true, localized: true }],
    },
  ],
}
