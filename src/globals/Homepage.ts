import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Početna Stranica',
  admin: { group: 'Stranice' },
  fields: [
    // ─── SEO / Meta ───
    { name: 'metaTitle', type: 'text', label: 'SEO Naslov (Tab Naziv)', defaultValue: 'BSC - Best Solution Company', localized: true },
    { name: 'metaDescription', type: 'textarea', label: 'SEO Opis', defaultValue: 'Specijalizirana digitalna štamparija u Sarajevu. UV štampa, brendiranje, tapete, 3D paneli i više.', localized: true },

    // ─── Hero Section ───
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Sekcija',
      fields: [
        { name: 'badge', type: 'text', label: 'Badge tekst', defaultValue: 'BSC Sarajevo', localized: true },
        { name: 'headingLine1', type: 'text', label: 'Naslov linija 1', defaultValue: 'Lider štampe velikih', localized: true },
        { name: 'headingLine2', type: 'text', label: 'Naslov linija 2', defaultValue: 'i megavelikih formata', localized: true },
        { name: 'description', type: 'textarea', label: 'Opis', localized: true },
        { name: 'ctaText', type: 'text', label: 'CTA tekst', defaultValue: 'Kontaktirajte nas', localized: true },
        { name: 'ctaLink', type: 'text', label: 'CTA link', defaultValue: '/contact' },
        { name: 'scrollText', type: 'text', label: 'Scroll tekst', defaultValue: 'Skrolajte dolje', localized: true },
        {
          name: 'backgroundImages',
          type: 'array',
          label: 'Pozadinske slike',
          fields: [
            { name: 'uploadedImage', type: 'upload', relationTo: 'media', label: 'Slika' },
          ],
        },
        {
          name: 'checklistItems',
          type: 'array',
          label: 'Checklist stavke',
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
        {
          name: 'featureCards',
          type: 'array',
          label: 'Feature kartice',
          maxRows: 3,
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'description', type: 'text', required: true, localized: true },
            { name: 'icon', type: 'select', label: 'Ikona', options: [
              { label: 'Award', value: 'Award' },
              { label: 'Sparkles', value: 'Sparkles' },
              { label: 'Shield', value: 'Shield' },
              { label: 'Star', value: 'Star' },
              { label: 'Zap', value: 'Zap' },
              { label: 'Heart', value: 'Heart' },
              { label: 'Target', value: 'Target' },
              { label: 'Gem', value: 'Gem' },
            ] },
            { name: 'color', type: 'text', label: 'CSS klase boje', defaultValue: 'bg-primary/10 text-primary' },
          ],
        },
      ],
    },
    // ─── Process Section ───
    {
      name: 'processSection',
      type: 'group',
      label: 'Proces Sekcija',
      fields: [
        {
          name: 'steps',
          type: 'array',
          label: 'Koraci',
          fields: [
            { name: 'icon', type: 'text', label: 'Ikona (palette/printer/truck/package/pencil)', defaultValue: 'palette' },
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'description', type: 'text', required: true, localized: true },
            { name: 'gradient', type: 'text', label: 'Gradient klase' },
          ],
        },
      ],
    },
    // ─── About Preview ───
    {
      name: 'aboutPreview',
      type: 'group',
      label: 'O Nama Pregled',
      fields: [
        { name: 'badge', type: 'text', defaultValue: 'O nama', localized: true },
        { name: 'heading', type: 'text', defaultValue: 'Best Solution Company', localized: true },
        { name: 'description', type: 'textarea', localized: true },
        { name: 'ctaText', type: 'text', defaultValue: 'Više o nama', localized: true },
        { name: 'ctaLink', type: 'text', defaultValue: '/about' },
        { name: 'statsNumber', type: 'text', defaultValue: '4650+', localized: true },
        { name: 'statsLabel', type: 'text', defaultValue: 'sretnih klijenata', localized: true },
        {
          name: 'images',
          type: 'array',
          label: 'Slike kolaža',
          fields: [
            { name: 'uploadedImage', type: 'upload', relationTo: 'media', label: 'Slika' },
            { name: 'alt', type: 'text', required: true, localized: true },
          ],
        },
        {
          name: 'featureCards',
          type: 'array',
          label: 'Feature kartice',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'description', type: 'text', required: true, localized: true },
            { name: 'icon', type: 'select', label: 'Ikona', options: [
              { label: 'Cpu', value: 'Cpu' },
              { label: 'Layers', value: 'Layers' },
              { label: 'Users', value: 'Users' },
            ] },
            { name: 'color', type: 'text', label: 'CSS klase boje (icon + bg)', defaultValue: 'text-primary bg-primary/10' },
            { name: 'border', type: 'text', label: 'CSS klasa obruba', defaultValue: 'border-primary/20' },
          ],
        },
      ],
    },
    // ─── Services Ticker ───
    {
      name: 'servicesTicker',
      type: 'group',
      label: 'Ticker Usluga',
      fields: [
        {
          name: 'services',
          type: 'array',
          label: 'Usluge',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'highlight', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    // ─── Services Showcase ───
    {
      name: 'servicesShowcase',
      type: 'group',
      label: 'Showcase Usluga',
      fields: [
        { name: 'badge', type: 'text', defaultValue: 'Direktan print', localized: true },
        { name: 'headingLine1', type: 'text', defaultValue: 'Vršimo direktan print na', localized: true },
        { name: 'headingLine2', type: 'text', defaultValue: 'UV / Ecosolvent / Latex', localized: true },
        { name: 'buttonText', type: 'text', defaultValue: 'Svi materijali', localized: true },
        { name: 'buttonLink', type: 'text', defaultValue: '/materials' },
        { name: 'featuresHeading', type: 'text', defaultValue: 'Prednost naše štamparije u odnosu na druge', localized: true },
        { name: 'readMoreText', type: 'text', defaultValue: 'Read Out More', localized: true },
        {
          name: 'services',
          type: 'array',
          label: 'Usluge',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'description', type: 'text', required: true, localized: true },
            { name: 'uploadedImage', type: 'upload', relationTo: 'media', label: 'Slika' },
            { name: 'href', type: 'text', required: true },
          ],
        },
        {
          name: 'features',
          type: 'array',
          label: 'Prednosti',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'description', type: 'text', required: true, localized: true },
            { name: 'icon', type: 'select', label: 'Ikona', options: [
              { label: 'Award', value: 'Award' },
              { label: 'Package', value: 'Package' },
              { label: 'MapPin', value: 'MapPin' },
              { label: 'ShoppingCart', value: 'ShoppingCart' },
              { label: 'Zap', value: 'Zap' },
              { label: 'Star', value: 'Star' },
              { label: 'Shield', value: 'Shield' },
            ] },
            { name: 'bg', type: 'text', label: 'Pozadina CSS klasa' },
            { name: 'ring', type: 'text', label: 'Ring CSS klasa' },
            { name: 'color', type: 'text', label: 'Boja ikone CSS klasa' },
          ],
        },
      ],
    },
    // ─── Materials Section ───
    {
      name: 'materialsSection',
      type: 'group',
      label: 'Materijali Sekcija',
      fields: [
        { name: 'badge', type: 'text', defaultValue: 'Naši materijali', localized: true },
        { name: 'title', type: 'text', defaultValue: 'Kvalitetni materijali', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        { name: 'linkText', type: 'text', defaultValue: 'Pogledajte sve materijale', localized: true },
        { name: 'linkHref', type: 'text', defaultValue: '/materials' },
        {
          name: 'materials',
          type: 'array',
          label: 'Materijali',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'description', type: 'text', required: true, localized: true },
            { name: 'uploadedImage', type: 'upload', relationTo: 'media', label: 'Slika' },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    // ─── Portfolio Section ───
    {
      name: 'portfolioSection',
      type: 'group',
      label: 'Portfolio Sekcija',
      fields: [
        { name: 'badge', type: 'text', defaultValue: 'Naši projekti', localized: true },
        { name: 'headingLine1', type: 'text', defaultValue: 'Pogledajte naše', localized: true },
        { name: 'headingLine2', type: 'text', defaultValue: 'izvedene projekte', localized: true },
        { name: 'ctaText', type: 'text', defaultValue: 'Kontaktirajte nas', localized: true },
        { name: 'ctaLink', type: 'text', defaultValue: '/contact' },
        {
          name: 'checklistItems',
          type: 'array',
          label: 'Checklist stavke',
          fields: [{ name: 'text', type: 'text', required: true, localized: true }],
        },
        {
          name: 'items',
          type: 'array',
          label: 'Portfolio stavke',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'photos', type: 'number' },
            { name: 'uploadedImage', type: 'upload', relationTo: 'media', label: 'Slika' },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    // ─── Clients Section ───
    {
      name: 'clientsSection',
      type: 'group',
      label: 'Klijenti Sekcija',
      fields: [
        { name: 'badge', type: 'text', defaultValue: 'Naši klijenti', localized: true },
        { name: 'title', type: 'text', defaultValue: 'Povjerenje vodećih kompanija', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        {
          name: 'clients',
          type: 'array',
          label: 'Klijenti',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'uploadedLogo', type: 'upload', relationTo: 'media', label: 'Logo' },
          ],
        },
      ],
    },
    // ─── Stats & Locations ───
    {
      name: 'statsSection',
      type: 'group',
      label: 'Statistike & Lokacije',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'BSC u brojevima — rezultati koji govore sami za sebe', localized: true },
        {
          name: 'stats',
          type: 'array',
          label: 'Statistike',
          fields: [
            { name: 'numericValue', type: 'number', required: true },
            { name: 'suffix', type: 'text', defaultValue: '+' },
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'gradient', type: 'text' },
            { name: 'dark', type: 'checkbox', defaultValue: false },
          ],
        },
        { name: 'locationsBadge', type: 'text', defaultValue: 'Naše lokacije', localized: true },
        { name: 'locationsHeadingLine1', type: 'text', defaultValue: 'Print Shop BSC', localized: true },
        { name: 'locationsHeadingLine2', type: 'text', defaultValue: 'Na tri lokacije', localized: true },
        { name: 'starburstText', type: 'text', defaultValue: 'Kvalitetna Štampa', localized: true },
        {
          name: 'locations',
          type: 'array',
          label: 'Lokacije',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'text', type: 'textarea', required: true, localized: true },
            { name: 'uploadedImage', type: 'upload', relationTo: 'media', label: 'Slika' },
          ],
        },
      ],
    },
    // ─── Certificates Section ───
    {
      name: 'certificatesSection',
      type: 'group',
      label: 'Certifikati Sekcija',
      fields: [
        { name: 'badge', type: 'text', defaultValue: 'Certifikati', localized: true },
        { name: 'heading', type: 'text', defaultValue: 'Šta nas čini posebnima?', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        {
          name: 'certificates',
          type: 'array',
          label: 'Certifikati',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'color', type: 'text', label: 'Boja (hex)' },
          ],
        },
      ],
    },
    // ─── Products Grid ───
    {
      name: 'productsGrid',
      type: 'group',
      label: 'Proizvodi Sekcija',
      fields: [
        { name: 'badge', type: 'text', defaultValue: 'Proizvodi', localized: true },
        { name: 'title', type: 'text', defaultValue: 'Nova rješenja iz naše radionice', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        { name: 'linkText', type: 'text', defaultValue: 'Pogledajte sve proizvode', localized: true },
        { name: 'linkHref', type: 'text', defaultValue: '/products' },
        {
          name: 'products',
          type: 'array',
          label: 'Proizvodi',
          fields: [
            { name: 'title', type: 'text', required: true, localized: true },
            { name: 'uploadedImage', type: 'upload', relationTo: 'media', label: 'Slika' },
            { name: 'category', type: 'text', required: true, localized: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },
    // ─── News Section ───
    {
      name: 'newsSection',
      type: 'group',
      label: 'Novosti Sekcija',
      fields: [
        { name: 'badge', type: 'text', defaultValue: 'Novosti', localized: true },
        { name: 'title', type: 'text', defaultValue: 'Budite u toku', localized: true },
        { name: 'subtitle', type: 'textarea', localized: true },
        { name: 'linkText', type: 'text', defaultValue: 'Sve novosti', localized: true },
        { name: 'linkHref', type: 'text', defaultValue: '/news' },
      ],
    },
    // ─── CTA Section ───
    {
      name: 'ctaSection',
      type: 'group',
      label: 'CTA Sekcija',
      fields: [
        { name: 'badge', type: 'text', defaultValue: 'Kontakt', localized: true },
        { name: 'headingLine1', type: 'text', defaultValue: 'Želite poslati upit,', localized: true },
        { name: 'headingLine2', type: 'text', defaultValue: 'zahtjev, narudžbu?', localized: true },
        { name: 'buttonText', type: 'text', defaultValue: 'Kontaktirajte nas', localized: true },
        { name: 'buttonLink', type: 'text', defaultValue: '/contact' },
        {
          name: 'floatingCards',
          type: 'array',
          label: 'Floating kartice',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'icon', type: 'select', label: 'Ikona', options: [
              { label: 'Printer', value: 'Printer' },
              { label: 'Image', value: 'Image' },
              { label: 'Palette', value: 'Palette' },
              { label: 'Tag', value: 'Tag' },
              { label: 'Frame', value: 'Frame' },
              { label: 'Brush', value: 'Brush' },
              { label: 'Layers', value: 'Layers' },
            ] },
            { name: 'color', type: 'text', label: 'Boja ikone CSS klasa', defaultValue: 'text-teal-600' },
            { name: 'bg', type: 'text', label: 'Pozadina CSS klasa', defaultValue: 'bg-white' },
            { name: 'className', type: 'text', label: 'Pozicija CSS klase' },
            { name: 'rotate', type: 'number', label: 'Rotacija (stepeni)', defaultValue: 0 },
          ],
        },
        {
          name: 'centerCard',
          type: 'group',
          label: 'Centralna kartica',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Branding', localized: true },
            { name: 'icon', type: 'select', label: 'Ikona', options: [
              { label: 'Layers', value: 'Layers' },
              { label: 'Printer', value: 'Printer' },
              { label: 'Palette', value: 'Palette' },
              { label: 'Image', value: 'Image' },
              { label: 'Brush', value: 'Brush' },
            ], defaultValue: 'Layers' },
            { name: 'gradient', type: 'text', label: 'Gradient CSS klase', defaultValue: 'from-teal-400 to-emerald-500' },
          ],
        },
      ],
    },
  ],
}
