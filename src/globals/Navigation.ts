import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigacija',
  admin: { group: 'Postavke' },
  fields: [
    { name: 'ctaText', type: 'text', label: 'CTA dugme tekst', defaultValue: 'Kontaktirajte nas', localized: true },
    { name: 'ctaLink', type: 'text', label: 'CTA dugme link', defaultValue: '/contact' },
    { name: 'viewAllText', type: 'text', label: 'Tekst "Pogledaj sve"', defaultValue: 'Pogledaj sve →', localized: true },
    {
      name: 'languages',
      type: 'array',
      label: 'Jezici',
      fields: [
        { name: 'code', type: 'text', required: true },
        { name: 'active', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Stavke navigacije',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Naziv', localized: true },
        { name: 'href', type: 'text', required: true, label: 'Link' },
        { name: 'hasMegaMenu', type: 'checkbox', label: 'Ima mega meni', defaultValue: false },
        {
          name: 'columns',
          type: 'array',
          label: 'Kolone mega menija',
          admin: { condition: (data, siblingData) => siblingData?.hasMegaMenu },
          fields: [
            { name: 'title', type: 'text', required: true, label: 'Naslov kolone', localized: true },
            { name: 'href', type: 'text', required: true, label: 'Link kolone' },
            {
              name: 'items',
              type: 'array',
              label: 'Stavke',
              fields: [
                { name: 'name', type: 'text', required: true, localized: true },
                { name: 'slug', type: 'text', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
