import type { GlobalConfig } from 'payload'

export const MaterialDetailPage: GlobalConfig = {
  slug: 'material-detail-page',
  label: 'Stranica detalja materijala',
  fields: [
    // ─── Breadcrumbs ───
    { name: 'breadcrumbHome', type: 'text', label: 'Breadcrumb — Početna', defaultValue: 'Početna', localized: true },
    { name: 'breadcrumbMaterials', type: 'text', label: 'Breadcrumb — Materijali', defaultValue: 'Materijali', localized: true },

    // ─── Category Page ([slug]) ───
    {
      name: 'categoryPage',
      type: 'group',
      label: 'Stranica kategorije',
      fields: [
        { name: 'availableTitle', type: 'text', label: 'Naslov dostupnih materijala', defaultValue: 'Dostupni Materijali', localized: true },
        { name: 'availableSubtitle', type: 'text', label: 'Podnaslov dostupnih materijala', defaultValue: 'Izaberite materijal za detaljne informacije, galeriju i specifikacije.', localized: true },
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
        { name: 'ctaPrefix', type: 'text', label: 'CTA prefiks (npr. Trebate print na)', defaultValue: 'Trebate print na nekom od ovih materijala?', localized: true },
        { name: 'ctaDescription', type: 'text', label: 'CTA opis', defaultValue: 'Kontaktirajte nas za besplatnu ponudu i savjet o najboljim materijalima za vaš projekat.', localized: true },
        { name: 'ctaContactText', type: 'text', label: 'CTA dugme — kontakt', defaultValue: 'Kontakt', localized: true },
        { name: 'ctaPhoneText', type: 'text', label: 'CTA dugme — telefon', defaultValue: 'Pozovite nas', localized: true },
        { name: 'statCustomizableValue', type: 'text', label: 'Stat — prilagodljivo', defaultValue: '100%' },
        { name: 'statCustomizableLabel', type: 'text', label: 'Stat label — prilagodljivo', defaultValue: 'prilagodljivo', localized: true },
        { name: 'statDeliveryValue', type: 'text', label: 'Stat — isporuka', defaultValue: 'Brza' },
        { name: 'statDeliveryLabel', type: 'text', label: 'Stat label — isporuka', defaultValue: 'isporuka', localized: true },
        { name: 'exploreCategoriesTitle', type: 'text', label: 'Naslov — istražite kategorije', defaultValue: 'Istražite druge kategorije', localized: true },
        { name: 'exploreCategoriesSubtitle', type: 'text', label: 'Podnaslov — istražite kategorije', defaultValue: 'Pogledajte i ostale tehnologije i materijale koje nudimo.', localized: true },
        { name: 'materialsCountLabel', type: 'text', label: 'Broj materijala label', defaultValue: 'materijala', localized: true },
        { name: 'backToAllText', type: 'text', label: 'Tekst — nazad na sve', defaultValue: 'Nazad na sve materijale', localized: true },
      ],
    },

    // ─── Item Page ([slug]/[item]) ───
    {
      name: 'itemPage',
      type: 'group',
      label: 'Stranica proizvoda (item)',
      fields: [
        { name: 'aboutTitle', type: 'text', label: 'Naslov — o materijalu', defaultValue: 'O materijalu', localized: true },
        { name: 'aboutParagraph1', type: 'textarea', label: 'O materijalu — paragraf 1', defaultValue: 'Ovaj materijal nudi izvanredne mogućnosti za vaš projekat. Sa bogatom teksturom i izuzetnom izdržljivošću, idealan je za profesionalne primjene u brendiranju, dekoraciji i signalizaciji.', localized: true },
        { name: 'aboutParagraph2', type: 'textarea', label: 'O materijalu — paragraf 2', defaultValue: 'Naš tim koristi najmoderniju tehnologiju za obradu materijala, osiguravajući precizne rezove, živopisne boje i dugotrajne rezultate koji nadmašuju očekivanja.', localized: true },
        {
          name: 'features',
          type: 'array',
          label: 'Ključne karakteristike',
          minRows: 0,
          maxRows: 8,
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'text', type: 'text', required: true, localized: true },
          ],
        },
        { name: 'advantagesTitle', type: 'text', label: 'Naslov — prednosti', defaultValue: 'Ključne prednosti', localized: true },
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
        { name: 'viewAllText', type: 'text', label: 'Pogledaj sve materijale', defaultValue: 'Pogledaj sve materijale', localized: true },
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
        { name: 'ctaPrefix', type: 'text', label: 'CTA prefiks', defaultValue: 'Trebate ovaj materijal?', localized: true },
        { name: 'ctaDescription', type: 'text', label: 'CTA opis', defaultValue: 'Kontaktirajte nas za besplatnu ponudu i savjet o najboljim materijalima za vaš projekat.', localized: true },
        { name: 'ctaContactText', type: 'text', label: 'CTA dugme — kontakt', defaultValue: 'Kontakt', localized: true },
        { name: 'ctaPhoneText', type: 'text', label: 'CTA dugme — telefon', defaultValue: 'Pozovite nas', localized: true },
        { name: 'relatedTitle', type: 'text', label: 'Naslov — ostali materijali', defaultValue: 'Ostali materijali u kategoriji', localized: true },
        { name: 'relatedSubtitle', type: 'text', label: 'Podnaslov — ostali materijali', defaultValue: 'Istražite još {n} materijala iz iste kategorije.', localized: true },
        { name: 'exploreCategoriesTitle', type: 'text', label: 'Naslov — istražite kategorije', defaultValue: 'Istražite druge kategorije', localized: true },
        { name: 'exploreCategoriesSubtitle', type: 'text', label: 'Podnaslov — istražite kategorije', defaultValue: 'Pogledajte i ostale tehnologije i materijale koje nudimo.', localized: true },
        { name: 'backText', type: 'text', label: 'Tekst — nazad', defaultValue: 'Nazad na', localized: true },
      ],
    },
  ],
}
