import type { GlobalConfig } from 'payload'

export const ProductsPage: GlobalConfig = {
  slug: 'products-page',
  label: 'Proizvodi Stranica',
  admin: { group: 'Stranice' },
  fields: [
    // Hero
    { name: 'heroBadge', type: 'text', label: 'Hero badge', defaultValue: 'Naši Proizvodi', localized: true },
    { name: 'heroHeading', type: 'text', label: 'Hero naslov', defaultValue: 'Proizvodi & Usluge', localized: true },
    { name: 'heroSubtitle', type: 'textarea', label: 'Hero podnaslov', localized: true },
    // Quick stats
    {
      name: 'quickStats',
      type: 'array',
      label: 'Brze statistike',
      maxRows: 5,
      fields: [
        { name: 'value', type: 'text', required: true, localized: true },
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'isDynamic', type: 'checkbox', label: 'Dinamička vrijednost (koristi broj kategorija/proizvoda)' },
      ],
    },
    // Categories section
    { name: 'categoriesBadge', type: 'text', defaultValue: 'Kategorije', localized: true },
    { name: 'categoriesTitle', type: 'text', defaultValue: 'Odaberite Kategoriju', localized: true },
    { name: 'categoriesSubtitle', type: 'text', defaultValue: 'Svaka kategorija nudi specijalizirana rješenja za vaše potrebe.', localized: true },
    { name: 'viewAllProductsText', type: 'text', label: 'Tekst za "Pogledaj sve"', defaultValue: 'Pogledaj sve proizvode', localized: true },
    { name: 'itemCountLabel', type: 'text', label: 'Label za broj stavki (npr. proizvoda)', defaultValue: 'proizvoda', localized: true },
    { name: 'moreText', type: 'text', label: 'Tekst za "+N više"', defaultValue: 'više', localized: true },
    // Why choose us
    { name: 'whyBadge', type: 'text', defaultValue: 'Prednosti', localized: true },
    { name: 'whyTitle', type: 'text', defaultValue: 'Zašto odabrati nas?', localized: true },
    { name: 'whySubtitle', type: 'text', defaultValue: 'Kvalitet, brzina i pouzdanost — naši temeljni principi od samog početka.', localized: true },
    {
      name: 'whyCards',
      type: 'array',
      label: 'Prednosti kartice',
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'text', type: 'textarea', required: true, localized: true },
      ],
    },
    // CTA
    { name: 'ctaHeading', type: 'text', defaultValue: 'Trebate profesionalna rješenja?', localized: true },
    { name: 'ctaDescription', type: 'textarea', localized: true },
    { name: 'ctaButtonText', type: 'text', defaultValue: 'Kontakt', localized: true },
    { name: 'ctaButtonLink', type: 'text', defaultValue: '/contact' },
    { name: 'ctaPhoneText', type: 'text', defaultValue: 'Pozovite nas', localized: true },
    // SEO
    { name: 'metaTitle', type: 'text', label: 'SEO Naslov', defaultValue: 'Proizvodi - BSC', localized: true },
    { name: 'metaDescription', type: 'textarea', label: 'SEO Opis', localized: true },
  ],
}
