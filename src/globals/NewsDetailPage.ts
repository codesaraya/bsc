import type { GlobalConfig } from 'payload'

export const NewsDetailPage: GlobalConfig = {
  slug: 'news-detail-page',
  label: 'Stranica detalja vijesti',
  fields: [
    { name: 'breadcrumbHome', type: 'text', label: 'Breadcrumb — Početna', defaultValue: 'Početna', localized: true },
    { name: 'breadcrumbNews', type: 'text', label: 'Breadcrumb — Novosti', defaultValue: 'Novosti', localized: true },
    { name: 'featuredImagePlaceholder', type: 'text', label: 'Placeholder istaknute slike', defaultValue: 'Istaknuta slika', localized: true },
    { name: 'backToAllText', type: 'text', label: 'Tekst — nazad na sve', defaultValue: 'Nazad na sve članke', localized: true },
    { name: 'relatedTitle', type: 'text', label: 'Naslov — povezani članci', defaultValue: 'Povezani članci', localized: true },
    { name: 'readTimeUnit', type: 'text', label: 'Jedinica čitanja', defaultValue: 'min čitanja', localized: true },
  ],
}
