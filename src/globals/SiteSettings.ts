import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Postavke Stranice',
  admin: { group: 'Postavke' },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'BSC - Digitalna Štampa Sarajevo', label: 'Naziv stranice', localized: true },
    { name: 'siteDescription', type: 'textarea', label: 'Opis stranice', localized: true },
    { name: 'contactEmail', type: 'email', label: 'Kontakt email', defaultValue: 'info@bsc.ba' },
    { name: 'contactPhone', type: 'text', label: 'Kontakt telefon', defaultValue: '+387 33 123 456' },
    { name: 'address', type: 'textarea', label: 'Adresa', defaultValue: 'Sarajevo, Bosna i Hercegovina', localized: true },
    { name: 'workingHours', type: 'text', label: 'Radno vrijeme', defaultValue: 'Pon - Pet: 08:00 - 16:00', localized: true },
    {
      name: 'logos',
      type: 'group',
      label: 'Logotipi',
      fields: [
        { name: 'mainUpload', type: 'upload', relationTo: 'media', label: 'Glavni logo' },
        { name: 'navbarTopUpload', type: 'upload', relationTo: 'media', label: 'Navbar logo (vrh)' },
        { name: 'navbarScrolledUpload', type: 'upload', relationTo: 'media', label: 'Navbar logo (scrolled)' },
        { name: 'favicon', type: 'upload', relationTo: 'media', label: 'Favicon (ikona u tabu preglednika)' },
        { name: 'faviconApple', type: 'upload', relationTo: 'media', label: 'Apple Touch Icon (180x180)' },
      ],
    },
    {
      name: 'socialMedia',
      type: 'array',
      label: 'Društvene mreže',
      fields: [
        { name: 'platform', type: 'select', options: ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'pinterest'], required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'uiLabels',
      type: 'group',
      label: 'UI Tekstovi (kartice, galerija)',
      fields: [
        { name: 'productPlaceholder', type: 'text', label: 'Placeholder za proizvod (bez slike)', defaultValue: 'BSC Proizvod', localized: true },
        { name: 'productSubtitle', type: 'text', label: 'Podnaslov proizvod kartice', defaultValue: 'Personalizirano po vašoj mjeri', localized: true },
        { name: 'productCta', type: 'text', label: 'CTA na proizvod kartici', defaultValue: 'Saznajte više', localized: true },
        { name: 'materialPlaceholder', type: 'text', label: 'Placeholder za materijal (bez slike)', defaultValue: 'Slika materijala', localized: true },
        { name: 'materialCta', type: 'text', label: 'CTA na materijal kartici', defaultValue: 'Saznajte više', localized: true },
        { name: 'newsPlaceholder', type: 'text', label: 'Placeholder za članak (bez slike)', defaultValue: 'Slika članka', localized: true },
        { name: 'newsReadMore', type: 'text', label: 'Tekst "Pročitaj više" na vijestima', defaultValue: 'Pročitaj više →', localized: true },
        { name: 'galleryExample', type: 'text', label: 'Galerija: "Primjer" label', defaultValue: 'Primjer', localized: true },
        { name: 'galleryPhotos', type: 'text', label: 'Galerija: "fotografija" label', defaultValue: 'fotografija', localized: true },
        { name: 'galleryCarousel', type: 'text', label: 'Galerija: "Carousel" label', defaultValue: 'Carousel', localized: true },
        { name: 'galleryGrid', type: 'text', label: 'Galerija: "Grid" label', defaultValue: 'Grid', localized: true },
      ],
    },
  ],
}
