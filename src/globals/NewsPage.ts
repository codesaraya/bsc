import type { GlobalConfig } from 'payload'

export const NewsPage: GlobalConfig = {
  slug: 'news-page',
  label: 'Novosti Stranica',
  admin: { group: 'Stranice' },
  fields: [
    // Hero
    { name: 'heroHeading', type: 'text', label: 'Hero naslov', defaultValue: 'Najnovije vijesti', localized: true },
    { name: 'heroSubtitle', type: 'textarea', label: 'Hero podnaslov', localized: true },
    // Featured article
    { name: 'featuredImagePlaceholder', type: 'text', defaultValue: 'Istaknuta slika', localized: true },
    { name: 'readArticleText', type: 'text', defaultValue: 'Pročitaj članak', localized: true },
    // Category pills
    { name: 'allCategoryText', type: 'text', defaultValue: 'Sve', localized: true },
    // Newsletter
    { name: 'newsletterHeading', type: 'text', defaultValue: 'Ne propustite novosti', localized: true },
    { name: 'newsletterDescription', type: 'textarea', localized: true },
    { name: 'newsletterPlaceholder', type: 'text', defaultValue: 'Unesite vaš email', localized: true },
    { name: 'newsletterButtonText', type: 'text', defaultValue: 'Pretplatite se', localized: true },
    // SEO
    { name: 'metaTitle', type: 'text', label: 'SEO Naslov', defaultValue: 'Novosti - BSC', localized: true },
    { name: 'metaDescription', type: 'textarea', label: 'SEO Opis', localized: true },
  ],
}
