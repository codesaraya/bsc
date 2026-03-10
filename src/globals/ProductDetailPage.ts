import type { GlobalConfig } from 'payload'

export const ProductDetailPage: GlobalConfig = {
  slug: 'product-detail-page',
  label: 'Stranica detalja proizvoda',
  fields: [
    // ─── Breadcrumbs ───
    { name: 'breadcrumbHome', type: 'text', label: 'Breadcrumb — Početna', defaultValue: 'Početna', localized: true },
    { name: 'breadcrumbProducts', type: 'text', label: 'Breadcrumb — Proizvodi', defaultValue: 'Proizvodi', localized: true },

    // ─── Category Page ([slug]) ───
    {
      name: 'categoryPage',
      type: 'group',
      label: 'Stranica kategorije',
      fields: [
        { name: 'availableTitle', type: 'text', label: 'Naslov dostupnih proizvoda', defaultValue: 'Dostupni Proizvodi', localized: true },
        { name: 'availableSubtitle', type: 'text', label: 'Podnaslov dostupnih proizvoda', defaultValue: 'Izaberite proizvod za detaljne informacije, galeriju i mogućnosti prilagodbe.', localized: true },
        { name: 'learnMoreText', type: 'text', label: 'Tekst — Saznaj više', defaultValue: 'Saznaj više', localized: true },
        { name: 'whyTitle', type: 'text', label: 'Naslov — Zašto odabrati', defaultValue: 'Zašto odabrati nas?', localized: true },
        { name: 'whySubtitle', type: 'text', label: 'Podnaslov — Zašto odabrati', defaultValue: 'Kvalitet, brzina i pouzdanost — naši temeljni principi od samog početka.', localized: true },
        {
          name: 'whyCards',
          type: 'array',
          label: 'Kartice prednosti',
          minRows: 0,
          maxRows: 8,
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'text', type: 'text', required: true, localized: true },
          ],
        },
        { name: 'ctaPrefix', type: 'text', label: 'CTA prefiks (npr. Zainteresirani ste za)', defaultValue: 'Zainteresirani ste za ovaj proizvod?', localized: true },
        { name: 'ctaDescription', type: 'text', label: 'CTA opis', defaultValue: 'Kontaktirajte nas za besplatnu ponudu i profesionalan savjet za vaš projekat.', localized: true },
        { name: 'ctaContactText', type: 'text', label: 'CTA dugme — kontakt', defaultValue: 'Kontakt', localized: true },
        { name: 'ctaPhoneText', type: 'text', label: 'CTA dugme — telefon', defaultValue: 'Pozovite nas', localized: true },
        { name: 'statCustomizableValue', type: 'text', label: 'Stat — prilagodljivo', defaultValue: '100%' },
        { name: 'statCustomizableLabel', type: 'text', label: 'Stat label — prilagodljivo', defaultValue: 'prilagodljivo', localized: true },
        { name: 'statDeliveryValue', type: 'text', label: 'Stat — isporuka', defaultValue: 'Brza' },
        { name: 'statDeliveryLabel', type: 'text', label: 'Stat label — isporuka', defaultValue: 'isporuka', localized: true },
        { name: 'exploreCategoriesTitle', type: 'text', label: 'Naslov — istražite kategorije', defaultValue: 'Istražite druge kategorije', localized: true },
        { name: 'exploreCategoriesSubtitle', type: 'text', label: 'Podnaslov — istražite kategorije', defaultValue: 'Pogledajte i ostale kategorije proizvoda iz naše ponude.', localized: true },
        { name: 'productsCountLabel', type: 'text', label: 'Broj proizvoda label', defaultValue: 'proizvoda', localized: true },
        { name: 'backToAllText', type: 'text', label: 'Tekst — nazad na sve', defaultValue: 'Nazad na sve proizvode', localized: true },
      ],
    },

    // ─── Item Page ([slug]/[item]) ───
    {
      name: 'itemPage',
      type: 'group',
      label: 'Stranica proizvoda (item)',
      fields: [
        { name: 'aboutTitle', type: 'text', label: 'Naslov — o proizvodu', defaultValue: 'O proizvodu', localized: true },
        { name: 'aboutParagraph1', type: 'textarea', label: 'O proizvodu — paragraf 1', defaultValue: 'Ovaj proizvod nudi profesionalna rješenja prilagođena vašim potrebama. Sa pažnjom prema detaljima i korištenjem najmodernijih tehnologija, garantujemo rezultate koji nadmašuju očekivanja.', localized: true },
        { name: 'aboutParagraph2', type: 'textarea', label: 'O proizvodu — paragraf 2', defaultValue: 'Naš stručni tim prati najnovije trendove u industriji, koristeći inovativne materijale i tehnike za kreiranje proizvoda koji ostavljaju trajan dojam.', localized: true },
        {
          name: 'uspCards',
          type: 'array',
          label: 'USP kartice',
          minRows: 0,
          maxRows: 6,
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'text', type: 'text', required: true, localized: true },
          ],
        },
        { name: 'whyTitle', type: 'text', label: 'Naslov — zašto izabrati nas', defaultValue: 'Zašto izabrati nas?', localized: true },
        {
          name: 'advantages',
          type: 'array',
          label: 'Lista prednosti',
          minRows: 0,
          maxRows: 10,
          fields: [
            { name: 'text', type: 'text', required: true, localized: true },
          ],
        },
        { name: 'viewAllText', type: 'text', label: 'Pogledaj sve proizvode', defaultValue: 'Pogledaj sve proizvode', localized: true },
        { name: 'processTitle', type: 'text', label: 'Naslov — proces izrade', defaultValue: 'Proces izrade', localized: true },
        { name: 'processSubtitle', type: 'text', label: 'Podnaslov — proces izrade', defaultValue: 'Od upita do gotovog proizvoda — transparentan i efikasan proces.', localized: true },
        {
          name: 'processSteps',
          type: 'array',
          label: 'Koraci procesa',
          minRows: 0,
          maxRows: 6,
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'text', type: 'text', required: true, localized: true },
          ],
        },
        { name: 'galleryTitle', type: 'text', label: 'Naslov galerije', defaultValue: 'Galerija', localized: true },
        { name: 'ctaPrefix', type: 'text', label: 'CTA prefiks', defaultValue: 'Zainteresirani za ovaj proizvod?', localized: true },
        { name: 'ctaDescription', type: 'text', label: 'CTA opis', defaultValue: 'Kontaktirajte nas za besplatnu ponudu i profesionalan savjet za vaš projekat.', localized: true },
        { name: 'ctaContactText', type: 'text', label: 'CTA dugme — kontakt', defaultValue: 'Kontakt', localized: true },
        { name: 'ctaPhoneText', type: 'text', label: 'CTA dugme — telefon', defaultValue: 'Pozovite nas', localized: true },
        { name: 'relatedTitle', type: 'text', label: 'Naslov — ostalo iz kategorije', defaultValue: 'Ostalo iz kategorije', localized: true },
        { name: 'relatedSubtitle', type: 'text', label: 'Podnaslov — ostalo iz kategorije', defaultValue: 'Istražite još {n} proizvoda iz iste kategorije.', localized: true },
        { name: 'exploreCategoriesTitle', type: 'text', label: 'Naslov — istražite kategorije', defaultValue: 'Istražite druge kategorije', localized: true },
        { name: 'exploreCategoriesSubtitle', type: 'text', label: 'Podnaslov — istražite kategorije', defaultValue: 'Pogledajte i ostale kategorije proizvoda iz naše ponude.', localized: true },
        { name: 'backText', type: 'text', label: 'Tekst — nazad', defaultValue: 'Nazad na', localized: true },
      ],
    },
  ],
}
