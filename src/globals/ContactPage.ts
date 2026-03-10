import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Kontakt Stranica',
  admin: { group: 'Stranice' },
  fields: [
    // SEO
    { name: 'metaTitle', type: 'text', label: 'SEO Naslov (Tab Naziv)', defaultValue: 'Kontakt - BSC', localized: true },
    { name: 'metaDescription', type: 'textarea', label: 'SEO Opis', defaultValue: 'Kontaktirajte BSC digitalnu štampu — lokacija, telefon, email i radno vrijeme.', localized: true },
    // Hero
    { name: 'heroBadge', type: 'text', defaultValue: 'Želimo surađivati s vama', localized: true },
    { name: 'heroHeading', type: 'text', defaultValue: 'Kako vam možemo pomoći', localized: true },
    { name: 'heroDescription', type: 'textarea', localized: true },
    // Contact cards
    {
      name: 'contactCards',
      type: 'array',
      label: 'Kontakt kartice',
      fields: [
        { name: 'type', type: 'select', options: ['address', 'phone', 'email', 'hours'], required: true },
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'value', type: 'textarea', required: true, localized: true },
        {
          name: 'lines',
          type: 'array',
          label: 'Strukturirane linije (opcija za telefon/sate)',
          fields: [
            { name: 'label', type: 'text', localized: true },
            { name: 'content', type: 'text', required: true, localized: true },
          ],
        },
      ],
    },
    // Form
    {
      name: 'form',
      type: 'group',
      label: 'Forma',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Pišite nam o vašem projektu', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'nameLabel', type: 'text', defaultValue: 'Vaše ime', localized: true },
        { name: 'namePlaceholder', type: 'text', defaultValue: 'Vaše puno ime', localized: true },
        { name: 'phoneLabel', type: 'text', defaultValue: 'Telefon', localized: true },
        { name: 'phonePlaceholder', type: 'text', defaultValue: 'Vaš broj telefona', localized: true },
        { name: 'emailLabel', type: 'text', defaultValue: 'Email', localized: true },
        { name: 'emailPlaceholder', type: 'text', defaultValue: 'your@email.com', localized: true },
        { name: 'budgetLabel', type: 'text', defaultValue: 'Odaberite budžet', localized: true },
        { name: 'messageLabel', type: 'text', defaultValue: 'Opišite projekat', localized: true },
        { name: 'messagePlaceholder', type: 'text', defaultValue: 'Recite nam nešto o vašem projektu...', localized: true },
        { name: 'submitText', type: 'text', defaultValue: 'Pošaljite poruku', localized: true },
        { name: 'successMessage', type: 'text', label: 'Poruka uspješnog slanja', defaultValue: 'Hvala na vašoj poruci! Javit ćemo vam se uskoro.', localized: true },
        { name: 'nameRequired', type: 'text', label: 'Validacija: ime obavezno', defaultValue: 'Ime je obavezno', localized: true },
        { name: 'emailRequired', type: 'text', label: 'Validacija: email obavezan', defaultValue: 'Email je obavezan', localized: true },
        { name: 'emailInvalid', type: 'text', label: 'Validacija: neispravan email', defaultValue: 'Neispravan email format', localized: true },
      ],
    },
    // Budget options
    {
      name: 'budgetOptions',
      type: 'array',
      label: 'Opcije budžeta',
      fields: [{ name: 'label', type: 'text', required: true, localized: true }],
    },
    // Equipment
    {
      name: 'equipment',
      type: 'array',
      label: 'Oprema',
      fields: [{ name: 'name', type: 'text', required: true, localized: true }],
    },
    // Map
    { name: 'mapUrl', type: 'textarea', label: 'Google Maps embed URL' },
    { name: 'quoteText', type: 'text', defaultValue: 'Od ideje do gotovog proizvoda', localized: true },
    { name: 'quoteDescription', type: 'textarea', label: 'Opis ispod citata', localized: true },
    // Form badge
    { name: 'formBadge', type: 'text', label: 'Badge iznad forme', defaultValue: 'Pišite nam', localized: true },
    // Equipment
    { name: 'equipmentHeading', type: 'text', label: 'Naslov opreme', defaultValue: 'Naša oprema', localized: true },
    { name: 'equipmentSuffix', type: 'textarea', label: 'Tekst sufiks opreme', localized: true },
  ],
}
