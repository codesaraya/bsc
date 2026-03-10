import type { GlobalConfig } from 'payload'

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Postavke' },
  fields: [
    { name: 'logoUpload', type: 'upload', relationTo: 'media', label: 'Logo' },
    { name: 'logoAlt', type: 'text', label: 'Logo alt tekst', defaultValue: 'BSC - Best Solution Company', localized: true },
    { name: 'companyDescription', type: 'textarea', label: 'Opis kompanije', localized: true },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter',
      fields: [
        { name: 'headingLine1', type: 'text', defaultValue: 'Prijavite se na naše', localized: true },
        { name: 'headingLine2', type: 'text', defaultValue: 'novosti i obavještenja', localized: true },
        { name: 'placeholder', type: 'text', defaultValue: 'Vaša email adresa', localized: true },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Društvene mreže',
      fields: [
        { name: 'platform', type: 'select', options: ['facebook', 'twitter', 'linkedin', 'youtube', 'instagram', 'pinterest'], required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Kolone linkova',
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Naslov kolone', localized: true },
        {
          name: 'links',
          type: 'array',
          label: 'Linkovi',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Kontakt informacije',
      fields: [
        { name: 'address', type: 'text', defaultValue: 'Vrbanja 1, 71000 Sarajevo, BiH' },
        { name: 'email', type: 'text', defaultValue: 'info@bsc.ba' },
        { name: 'phone', type: 'text', defaultValue: '+387 33 123 456' },
      ],
    },
    { name: 'contactTitle', type: 'text', label: 'Naslov kontakt kolone', defaultValue: 'Kontakt info', localized: true },
    { name: 'copyrightText', type: 'text', label: 'Copyright tekst', defaultValue: 'BSC. Sva prava zadržana.', localized: true },
    {
      name: 'bottomLinks',
      type: 'array',
      label: 'Bottom linkovi',
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href', type: 'text', required: true },
      ],
    },
  ],
}
