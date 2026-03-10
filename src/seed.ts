import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Recursively inject `id` values from bsData into enData so that
 * Payload matches existing array rows instead of creating new ones.
 */
function injectIds(bsData: any, enData: any): any {
  if (Array.isArray(bsData) && Array.isArray(enData)) {
    return enData.map((enItem, i) => {
      const bsItem = bsData[i]
      if (!bsItem || typeof bsItem !== 'object') return enItem
      const merged: any = { ...enItem }
      if (bsItem.id) merged.id = bsItem.id
      for (const key of Object.keys(merged)) {
        if (bsItem[key] !== undefined) {
          merged[key] = injectIds(bsItem[key], merged[key])
        }
      }
      return merged
    })
  }
  if (
    bsData && typeof bsData === 'object' && !Array.isArray(bsData) &&
    enData && typeof enData === 'object' && !Array.isArray(enData)
  ) {
    const merged: any = { ...enData }
    for (const key of Object.keys(merged)) {
      if (bsData[key] !== undefined) {
        merged[key] = injectIds(bsData[key], merged[key])
      }
    }
    return merged
  }
  return enData
}

async function seed() {
  const payload = await getPayload({ config })
  console.log('🌱 Starting comprehensive seed...')

  // ──────────────────────────────────────────────
  // MEDIA HELPER — create media entries with externalUrl
  // ──────────────────────────────────────────────
  const mediaCache = new Map<string, number>()
  // 1x1 transparent PNG placeholder (68 bytes)
  const PIXEL = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64')
  async function m(path: string, alt?: string): Promise<number> {
    if (mediaCache.has(path)) return mediaCache.get(path)!
    const doc = await payload.create({
      collection: 'media',
      data: { alt: alt || path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/%20/g, ' ') || 'Image', externalUrl: path } as any,
      file: { data: PIXEL, mimetype: 'image/png', name: `ph-${mediaCache.size}.png`, size: PIXEL.length },
    })
    mediaCache.set(path, doc.id as number)
    return doc.id as number
  }

  // ──────────────────────────────────────────────
  // CLEAR EXISTING DATA
  // ──────────────────────────────────────────────
  console.log('🗑️  Clearing existing data...')

  const collections = [
    'gallery-images',
    'news-articles',
    'material-items',
    'product-items',
    'material-categories',
    'product-categories',
    'users',
    'media',
    'documents',
    'pages',
  ] as const

  for (const slug of collections) {
    const existing = await payload.find({ collection: slug, limit: 1000 })
    for (const doc of existing.docs) {
      try {
        await payload.delete({ collection: slug, id: doc.id })
      } catch (_e) {
        // already deleted (cascade)
      }
    }
    console.log(`   Cleared ${slug}`)
  }

  // ──────────────────────────────────────────────
  // CREATE ADMIN USER
  // ──────────────────────────────────────────────
  console.log('👤 Creating admin user...')
  await payload.create({
    collection: 'users',
    data: {
      email: 'admin@bsc.ba',
      password: 'admin123',
      name: 'BSC Admin',
      role: 'admin',
    },
  })

  // ══════════════════════════════════════════════
  // SEED GLOBALS
  // ══════════════════════════════════════════════

  // ──────────────────────────────────────────────
  // 1. HOMEPAGE
  // ──────────────────────────────────────────────
  console.log('🏠 Seeding Homepage (BS)...')
  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      metaTitle: 'BSC - Best Solution Company',
      metaDescription: 'Specijalizirana digitalna štamparija u Sarajevu. UV štampa, brendiranje, tapete, 3D paneli i više.',
      hero: {
        badge: 'BSC Sarajevo',
        headingLine1: 'Lider štampe velikih',
        headingLine2: 'i megavelikih formata',
        description: 'Osnovna prednost naše štamparije nad konkurencijom je brzina i kvalitet u svim procesima štampe. Specijalizovana štamparija opremljena modernim digitalnim mašinama.',
        ctaText: 'Kontaktirajte nas',
        ctaLink: '/contact',
        scrollText: 'Skrolajte dolje',
        backgroundImages: [
          { uploadedImage: await m('/Hero/wallpaper1.jpg') },
          { uploadedImage: await m('/Hero/wallpaper2.jpg') },
          { uploadedImage: await m('/Hero/wallpaper3.jpg') },
        ],
        checklistItems: [
          { text: 'Digitalna štampa velikih i malih formata najnovijom UV tehnologijom' },
          { text: 'Priprema za štampu, dizajn, dorada i montaža' },
        ],
        featureCards: [
          { title: 'Kvalitet', description: 'Kvalitetan print na svim vrstama medija od papira, vinila, cerada i raznih materijala.', icon: 'Award', color: 'bg-primary/10 text-primary' },
          { title: 'Brzina', description: 'Brzina u svim procesima, od idejnog rješenja do realizacije štampe i montaže.', icon: 'Zap', color: 'bg-primary/10 text-primary' },
          { title: 'Unikatnost', description: 'Sa savremenom tehnologijom nudimo široki spektar unikatnih proizvoda.', icon: 'Sparkles', color: 'bg-pink-100 text-pink-500' },
        ],
      },
      processSection: {
        steps: [
          { icon: 'palette', title: 'Dizajn & Priprema', description: 'Od idejnog rješenja do probnog uzorka — kreativni tim priprema vaš projekat.', gradient: 'from-pink-400 to-rose-400' },
          { icon: 'printer', title: 'Štampa & Dorada', description: 'UV, Latex i Ecosolvent tehnologija za vrhunski kvalitet na svim materijalima.', gradient: 'from-amber-400 to-yellow-400' },
          { icon: 'truck', title: 'Dostava & Montaža', description: 'Brza dostava i profesionalna montaža gotovih grafičkih proizvoda.', gradient: 'from-primary to-teal-400' },
        ],
      },
      aboutPreview: {
        badge: 'O nama',
        heading: 'Best Solution Company',
        description: 'BSC je specijalizovana štamparija osnovana 2012. godine sinergijom sa firmom MMC Studio koji posluje od 1997. u Sarajevu. Opremljeni smo najnovijim digitalnim UV mašinama. Osim UV tehnologije koristimo latex i ecosolvent mašine u izradi naših visoko kvalitetnih proizvoda (MUTOH, HP, SUMA, XEROX, CANON).',
        ctaText: 'Više o nama',
        ctaLink: '/about',
        statsNumber: '4650+',
        statsLabel: 'sretnih klijenata',
        images: [
          { uploadedImage: await m('/Products/Brendiranje%20Poslovnih%20Prostora/Brendiranje%20poslovnih%20prostora.jpg'), alt: 'Brendiranje prostora' },
          { uploadedImage: await m('/Products/Wall%20Art/wall%20art.jpg'), alt: 'Wall Art' },
          { uploadedImage: await m('/Products/Wallscape/wallscape.jpg'), alt: 'Wallscape' },
        ],
        featureCards: [
          { title: 'UV LED Tehnologija', description: 'UV LED mašina širine štampe 3,2m — jedina na ovim prostorima.', icon: 'Cpu', color: 'text-primary bg-primary/10', border: 'border-primary/20' },
          { title: 'Print na sve materijale', description: 'UV DILLI štampa na staklo, plexy, alubond, forex, MDF, drvo i još mnogo toga.', icon: 'Layers', color: 'text-amber-500 bg-amber-50', border: 'border-amber-200' },
        ],
      },
      servicesTicker: {
        services: [
          { label: 'UV Štampa', highlight: false },
          { label: 'Brendiranje', highlight: true },
          { label: 'Tapete', highlight: false },
          { label: 'Veliki Formati', highlight: true },
          { label: '3D Paneli', highlight: true },
          { label: 'Alubond', highlight: false },
          { label: 'Ecosolvent', highlight: true },
        ],
      },
      servicesShowcase: {
        badge: 'Direktan print',
        headingLine1: 'Vršimo direktan print na',
        headingLine2: 'UV / Ecosolvent / Latex',
        buttonText: 'Svi materijali',
        buttonLink: '/materials',
        featuresHeading: 'Prednost naše štamparije u odnosu na druge',
        readMoreText: 'Read Out More',
        services: [
          { title: 'Ecosolvent štampa', description: 'Ecosolvent print za unutrašnju i vanjsku upotrebu.', uploadedImage: await m('/Materials/PVC%20Naljepnice/pvc%20naljepnice.jpg'), href: '/materials/uv-ecosolvent-latex' },
          { title: 'Print na staklo', description: 'UV direktan print na staklene površine svih dimenzija.', uploadedImage: await m('/Materials/Staklo/staklo.jpg'), href: '/materials/uv-direktni-print/staklo' },
          { title: 'Print na drvo', description: 'Kvalitetan print na drvene podloge i MDF ploče.', uploadedImage: await m('/Materials/Drvo/Drvo.jpg'), href: '/materials/uv-direktni-print/drvo' },
          { title: 'Print na metal', description: 'Trajni UV print na metalne i alubond površine.', uploadedImage: await m('/Materials/Alu%20Bond/alu%20bond.jpg'), href: '/materials/uv-direktni-print/alu-bond' },
          { title: 'Print na plastiku', description: 'Print na plexy, forex i sve vrste plastike.', uploadedImage: await m('/Materials/Forex/forex.jpg'), href: '/materials/uv-direktni-print/forex' },
          { title: 'Print na keramiku', description: 'Precizni printovi na keramičke pločice i podloge.', uploadedImage: await m('/Materials/Kapaline/kapaline.jpg'), href: '/materials/uv-direktni-print' },
          { title: 'Print na kožu', description: 'Unikatni printovi na kožne proizvode i materijale.', uploadedImage: await m('/Materials/Ko%C5%BEa/ko%C5%BEa.jpg'), href: '/materials/laser/koza' },
          { title: 'Latex štampa', description: 'Visokokvalitetni printovi latex tehnologijom.', uploadedImage: await m('/Products/Banneri/banneri.jpg'), href: '/materials/uv-ecosolvent-latex' },
        ],
        features: [
          { title: 'Kvalitet', description: 'Kvalitetan print na svim vrstama medija od papira, vinila, cerada i raznih materijala.', icon: 'Award', bg: 'bg-amber-50', ring: 'ring-amber-100', color: 'text-amber-500' },
          { title: 'Brzina', description: 'Brzina i kvalitet u svim procesima, od idejnog rješenja do montaže i servisa.', icon: 'Package', bg: 'bg-blue-50', ring: 'ring-blue-100', color: 'text-blue-500' },
          { title: 'Unikatnost', description: 'Sa savremenom tehnologijom slijedimo trendove i nudimo široki spektar unikatnih proizvoda.', icon: 'MapPin', bg: 'bg-emerald-50', ring: 'ring-emerald-100', color: 'text-emerald-500' },
          { title: 'Povoljnost', description: 'Od ideje do završnog proizvoda, dostave i montaže, sve po povoljnim cijenama.', icon: 'ShoppingCart', bg: 'bg-cyan-50', ring: 'ring-cyan-100', color: 'text-cyan-500' },
        ],
      },
      materialsSection: {
        badge: 'Naši materijali',
        title: 'Kvalitetni materijali',
        subtitle: 'Koristimo samo najkvalitetnije materijale kako bi vaši printovi izgledali besprijekorno i trajali dugo.',
        linkText: 'Pogledajte sve materijale',
        linkHref: '/materials',
        materials: [
          { title: 'Forex', description: 'Print na forex PVC ploče — lagane, izdržljive i idealne za unutrašnje i vanjske znakove, displeje i dekoracije.', uploadedImage: await m('/Materials/Forex/forex8.jpg'), href: '/materials/uv-direktni-print/forex' },
          { title: 'PVC Naljepnice', description: 'Visokokvalitetne PVC naljepnice za brendiranje, dekoraciju i signalizaciju. Otporne na UV zračenje, vodu i habanje.', uploadedImage: await m('/Materials/PVC%20Naljepnice/pvc%20naljepnice5.jpg'), href: '/materials/uv-ecosolvent-latex/pvc-naljepnice' },
          { title: 'Canvas', description: 'Premium canvas materijal za umjetničke reprodukcije, foto printove i dekorativne zidne slike.', uploadedImage: await m('/Materials/Canvas/canvas3.jpg'), href: '/materials/uv-ecosolvent-latex/canvas' },
        ],
      },
      portfolioSection: {
        badge: 'Naši projekti',
        headingLine1: 'Pogledajte naše',
        headingLine2: 'izvedene projekte',
        ctaText: 'Kontaktirajte nas',
        ctaLink: '/contact',
        checklistItems: [
          { text: 'UV LED mašina velikog formata širine štampe 3,2m' },
          { text: 'Print na sve pločaste materijale (staklo, plexy, alubond, forex, MDF, drvo)' },
          { text: 'Latex i ecosolvent mašine najvišeg kvaliteta' },
        ],
        items: [
          { title: 'Wallscape', photos: 30, uploadedImage: await m('/Products/Wallscape/wallscape5.jpg'), href: '/products/outdoor-indoor/wallscape' },
          { title: 'Brendiranje vozila', photos: 29, uploadedImage: await m('/Products/Brandiranje%20Vozila/brandiranje%20vozila10.jpg'), href: '/products/brendiranje/vozila' },
          { title: 'Brendiranje predmeta', photos: 22, uploadedImage: await m('/Products/Brendiranje%20Predmeta/Brendiranje%20predmeta3.jpg'), href: '/products/brendiranje/predmeta' },
          { title: 'Brendiranje prostora', photos: 20, uploadedImage: await m('/Products/Brendiranje%20Poslovnih%20Prostora/Brendiranje%20poslovnih%20prostora5.jpg'), href: '/products/brendiranje/poslovnih-stambenih-prostora' },
        ],
      },
      clientsSection: {
        badge: 'Naši klijenti',
        title: 'Povjerenje vodećih kompanija',
        subtitle: 'Ponosni smo na saradnju s vrhunskim brendovima i kompanijama širom regije.',
        clients: [
          { name: 'Coca-Cola', uploadedLogo: await m('/Clients/cocacola.jpg') },
          { name: 'dm', uploadedLogo: await m('/Clients/dm.jpg') },
          { name: 'BH Telecom', uploadedLogo: await m('/Clients/bhtelecom.jpg') },
          { name: 'Bingo', uploadedLogo: await m('/Clients/bingo.jpg') },
          { name: 'Samsung', uploadedLogo: await m('/Clients/samsung.jpg') },
          { name: 'Telemach', uploadedLogo: await m('/Clients/telemach.jpg') },
          { name: 'Mtel', uploadedLogo: await m('/Clients/mtel.jpg') },
          { name: 'Raiffeisen', uploadedLogo: await m('/Clients/raiffhaisen.jpg') },
          { name: 'Strabag', uploadedLogo: await m('/Clients/strabag.jpg') },
          { name: 'Mercator', uploadedLogo: await m('/Clients/mercator.jpg') },
          { name: 'Konzum', uploadedLogo: await m('/Clients/konzum.jpg') },
          { name: 'Palmolive', uploadedLogo: await m('/Clients/palmolive.jpg') },
          { name: 'Samsonite', uploadedLogo: await m('/Clients/samsonite.jpg') },
          { name: 'Bosnalijek', uploadedLogo: await m('/Clients/bosnalijek.jpg') },
          { name: 'Hemofarm', uploadedLogo: await m('/Clients/hemofarm.jpg') },
          { name: 'Intesa', uploadedLogo: await m('/Clients/intesa.jpg') },
          { name: 'Nova Banka', uploadedLogo: await m('/Clients/novabanka.jpg') },
          { name: 'Orbico', uploadedLogo: await m('/Clients/orbico.jpg') },
          { name: 'Penny', uploadedLogo: await m('/Clients/penny.jpg') },
          { name: 'Kraš', uploadedLogo: await m('/Clients/krash.jpg') },
          { name: 'ArcelorMittal', uploadedLogo: await m('/Clients/arcelor.jpg') },
          { name: 'Avaz', uploadedLogo: await m('/Clients/avaz.jpg') },
          { name: 'BBI', uploadedLogo: await m('/Clients/bbi.jpg') },
          { name: 'SCC', uploadedLogo: await m('/Clients/scc.jpg') },
          { name: 'Skenderija', uploadedLogo: await m('/Clients/skenderija.jpg') },
          { name: 'Tehnomag', uploadedLogo: await m('/Clients/tehnomag.jpg') },
          { name: 'Akta', uploadedLogo: await m('/Clients/akta.jpg') },
          { name: 'Altermedia', uploadedLogo: await m('/Clients/altermedia.jpg') },
          { name: 'B2B', uploadedLogo: await m('/Clients/b2b.jpg') },
          { name: 'Balu', uploadedLogo: await m('/Clients/balu.jpg') },
          { name: 'BB Sport', uploadedLogo: await m('/Clients/bb-sport.jpg') },
          { name: 'CMS', uploadedLogo: await m('/Clients/cms.jpg') },
          { name: 'Domod', uploadedLogo: await m('/Clients/domod.jpg') },
          { name: 'Euro Plakat', uploadedLogo: await m('/Clients/euro-plakat.jpg') },
          { name: 'Eurobit', uploadedLogo: await m('/Clients/eurobit.jpg') },
          { name: 'Face', uploadedLogo: await m('/Clients/face.jpg') },
          { name: 'FDS', uploadedLogo: await m('/Clients/fds.jpg') },
          { name: 'Hepok', uploadedLogo: await m('/Clients/hepok.jpg') },
          { name: 'Herbal Spa', uploadedLogo: await m('/Clients/herbal-spa.jpg') },
          { name: 'Inovine', uploadedLogo: await m('/Clients/inovine.jpg') },
          { name: 'JetDirect', uploadedLogo: await m('/Clients/jetdirect.jpg') },
          { name: 'Kimono', uploadedLogo: await m('/Clients/kimono.jpg') },
          { name: 'Kuehne+Nagel', uploadedLogo: await m('/Clients/kuene.jpg') },
          { name: 'Lampica', uploadedLogo: await m('/Clients/lampica.jpg') },
          { name: 'Link Group', uploadedLogo: await m('/Clients/linkgroup.jpg') },
          { name: 'LRC', uploadedLogo: await m('/Clients/lrc.jpg') },
          { name: 'Metromedia', uploadedLogo: await m('/Clients/metromedia.jpg') },
          { name: 'Milcos', uploadedLogo: await m('/Clients/milcos.jpg') },
          { name: 'Navigare', uploadedLogo: await m('/Clients/navigare.jpg') },
          { name: 'NDI', uploadedLogo: await m('/Clients/ndi.jpg') },
          { name: 'Office', uploadedLogo: await m('/Clients/office.jpg') },
          { name: 'Plaza', uploadedLogo: await m('/Clients/plaza.jpg') },
          { name: 'Poljine', uploadedLogo: await m('/Clients/poljine.jpg') },
          { name: 'Sarajevo', uploadedLogo: await m('/Clients/sarajevo.jpg') },
          { name: 'Simeco', uploadedLogo: await m('/Clients/simeco.jpg') },
          { name: 'Sinkro', uploadedLogo: await m('/Clients/sinkro.jpg') },
          { name: 'Slatko Slano', uploadedLogo: await m('/Clients/slatko-slano.jpg') },
          { name: 'Surlan', uploadedLogo: await m('/Clients/surlan.jpg') },
          { name: 'Telegroup', uploadedLogo: await m('/Clients/telegroup.jpg') },
          { name: 'UN', uploadedLogo: await m('/Clients/un.jpg') },
        ],
      },
      statsSection: {
        heading: 'BSC u brojevima — rezultati koji govore sami za sebe',
        stats: [
          { numericValue: 4650, suffix: '+', label: 'Sretnih klijenata', gradient: 'from-[#FDDDE6] via-[#FBE9ED] to-[#FDDDE6]/40', dark: false },
          { numericValue: 3790, suffix: '+', label: 'Završenih projekata', gradient: 'from-[#E3E8EF] via-[#EDF1F5] to-[#E3E8EF]/40', dark: false },
          { numericValue: 5580, suffix: '+', label: 'Fotografija', gradient: 'from-[#B2DFDB] via-[#C8EBE8] to-[#B2DFDB]/40', dark: false },
          { numericValue: 8580, suffix: '+', label: 'Tel. poziva', gradient: 'from-[#1A1464] via-[#251a80] to-[#1A1464]', dark: true },
        ],
        locationsBadge: 'Naše lokacije',
        locationsHeadingLine1: 'Print Shop BSC',
        locationsHeadingLine2: 'Na tri lokacije',
        starburstText: 'Kvalitetna Štampa',
        locations: [
          { title: 'BSC Sarajevo City Centar', text: 'Naša glavna poslovnica u srcu Sarajeva. Posjetite nas za konsultacije, pregled uzoraka i narudžbe svih vrsta štampe.', uploadedImage: await m('/SCC.jpg') },
          { title: 'BSC Budakovići', text: 'Proizvodni pogon opremljen najmodernijim UV LED i latex mašinama za štampu velikih i megavelikih formata.', uploadedImage: await m('/BUDAKOVICI.jpg') },
          { title: 'BSC BBI Centar Sarajevo', text: 'Print Shop lokacija u BBI Centru. Brza izrada vizitki, letaka, postera i ostalih grafičkih proizvoda.', uploadedImage: await m('/BBI.jpg') },
        ],
      },
      certificatesSection: {
        badge: 'Certifikati',
        heading: 'Šta nas čini posebnima?',
        subtitle: 'Koristimo najnoviju tehnologiju, istovremeno brinući o okolišu. Certifikati koje posjedujemo odraz su naše posvećenosti kvaliteti!',
        certificates: [
          { title: 'ICS 27001\nInformacijska sigurnost', color: '#8BC34A' },
          { title: 'ICS 50001\nUpravljanje energijom', color: '#42A5F5' },
          { title: 'ICS 9001\nUpravljanje kvalitetom', color: '#FF9800' },
          { title: 'ICS 14001\nUpravljanje okolišem', color: '#E91E63' },
        ],
      },
      productsGrid: {
        badge: 'Proizvodi',
        title: 'Nova rješenja iz naše radionice',
        subtitle: 'Istražite naše najpopularnije proizvode koje smo kreirali za naše klijente.',
        linkText: 'Pogledajte sve proizvode',
        linkHref: '/products',
        products: [
          { title: 'Tapete', uploadedImage: await m('/Products/Tapete/tapete.jpg'), category: 'Dekoracija', href: '/products/home-and-office/wall-art' },
          { title: '3D Zidni Paneli', uploadedImage: await m('/Products/3D%20zidni%20paneli/3dzidni.jpg'), category: 'Dekoracija', href: '/products/home-and-office/3d-zidni-paneli' },
          { title: 'Billboard', uploadedImage: await m('/Products/Bilbord/bilbord.jpg'), category: 'Brendiranje', href: '/products/outdoor-indoor/billboard' },
        ],
      },
      newsSection: {
        badge: 'Novosti',
        title: 'Budite u toku',
        subtitle: 'Pročitajte najnovije vijesti, savjete i aktuelnosti iz svijeta digitalne štampe.',
        linkText: 'Sve novosti',
        linkHref: '/news',
      },
      ctaSection: {
        badge: 'Kontakt',
        headingLine1: 'Želite poslati upit,',
        headingLine2: 'zahtjev, narudžbu?',
        buttonText: 'Kontaktirajte nas',
        buttonLink: '/contact',
        floatingCards: [
          { label: 'UV Štampa', icon: 'Printer', color: 'text-teal-600', bg: 'bg-white', className: 'w-20 h-20 top-4 right-32', rotate: -8 },
          { label: 'Tapete', icon: 'Image', color: 'text-blue-600', bg: 'bg-blue-50', className: 'w-28 h-24 top-6 right-4', rotate: 6 },
          { label: 'Dizajn', icon: 'Palette', color: 'text-purple-600', bg: 'bg-purple-50', className: 'w-24 h-20 top-20 right-48', rotate: -4 },
          { label: 'Naljepnice', icon: 'Tag', color: 'text-amber-600', bg: 'bg-amber-50', className: 'w-22 h-20 top-[160px] right-52', rotate: -6 },
          { label: '3D Paneli', icon: 'Frame', color: 'text-rose-600', bg: 'bg-rose-50', className: 'w-20 h-20 bottom-12 right-36', rotate: 8 },
          { label: 'Alubond', icon: 'Brush', color: 'text-gray-700', bg: 'bg-gray-100', className: 'w-24 h-22 bottom-8 right-8', rotate: -5 },
        ],
        centerCard: {
          label: 'Branding',
          icon: 'Layers',
          gradient: 'from-teal-400 to-emerald-500',
        },
      },
    },
  })

  console.log('🏠 Seeding Homepage (EN)...')
  const bsHomepage = await payload.findGlobal({ slug: 'homepage' as any } as any) as any
  await payload.updateGlobal({
    slug: 'homepage',
    locale: 'en',
    data: injectIds(bsHomepage, {
      metaTitle: 'BSC - Best Solution Company',
      metaDescription: 'Specialized digital printing company in Sarajevo. UV printing, branding, wallpapers, 3D panels and more.',
      hero: {
        badge: 'BSC Sarajevo',
        headingLine1: 'Leader in large',
        headingLine2: 'and mega format printing',
        description: 'The main advantage of our printing company over the competition is speed and quality in all printing processes. A specialized printing company equipped with modern digital machines.',
        ctaText: 'Contact us',
        scrollText: 'Scroll down',
        backgroundImages: [
          { uploadedImage: await m('/Hero/wallpaper1.jpg') },
          { uploadedImage: await m('/Hero/wallpaper2.jpg') },
          { uploadedImage: await m('/Hero/wallpaper3.jpg') },
        ],
        checklistItems: [
          { text: 'Digital printing of large and small formats with the latest UV technology' },
          { text: 'Print preparation, design, finishing and installation' },
        ],
        featureCards: [
          { title: 'Quality', description: 'Quality printing on all types of media from paper, vinyl, tarpaulins and various materials.', icon: 'Award', color: 'bg-primary/10 text-primary' },
          { title: 'Speed', description: 'Speed in all processes, from concept to print realization and installation.', icon: 'Zap', color: 'bg-primary/10 text-primary' },
          { title: 'Uniqueness', description: 'With modern technology we offer a wide range of unique products.', icon: 'Sparkles', color: 'bg-pink-100 text-pink-500' },
        ],
      },
      processSection: {
        steps: [
          { icon: 'palette', title: 'Design & Preparation', description: 'From concept to proof — our creative team prepares your project.', gradient: 'from-pink-400 to-rose-400' },
          { icon: 'printer', title: 'Printing & Finishing', description: 'UV, Latex and Ecosolvent technology for premium quality on all materials.', gradient: 'from-amber-400 to-yellow-400' },
          { icon: 'truck', title: 'Delivery & Installation', description: 'Fast delivery and professional installation of finished graphic products.', gradient: 'from-primary to-teal-400' },
        ],
      },
      aboutPreview: {
        badge: 'About us',
        heading: 'Best Solution Company',
        description: 'BSC is a specialized printing company founded in 2012 in synergy with MMC Studio, operating since 1997 in Sarajevo. We are equipped with the latest digital UV machines. In addition to UV technology, we use latex and ecosolvent machines to produce our high-quality products (MUTOH, HP, SUMA, XEROX, CANON).',
        ctaText: 'Learn more',
        statsNumber: '4650+',
        statsLabel: 'happy clients',
        images: [
          { uploadedImage: await m('/Products/Brendiranje%20Poslovnih%20Prostora/Brendiranje%20poslovnih%20prostora.jpg'), alt: 'Space branding' },
          { uploadedImage: await m('/Products/Wall%20Art/wall%20art.jpg'), alt: 'Wall Art' },
          { uploadedImage: await m('/Products/Wallscape/wallscape.jpg'), alt: 'Wallscape' },
        ],
        featureCards: [
          { title: 'UV LED Technology', description: 'UV LED machine with 3.2m print width — the only one in the region.', icon: 'Cpu', color: 'text-primary bg-primary/10', border: 'border-primary/20' },
          { title: 'Print on all materials', description: 'UV DILLI printing on glass, plexiglass, alubond, forex, MDF, wood and much more.', icon: 'Layers', color: 'text-amber-500 bg-amber-50', border: 'border-amber-200' },
        ],
      },
      servicesTicker: {
        services: [
          { label: 'UV Printing', highlight: false },
          { label: 'Branding', highlight: true },
          { label: 'Wallpapers', highlight: false },
          { label: 'Large Formats', highlight: true },
          { label: '3D Panels', highlight: true },
          { label: 'Alubond', highlight: false },
          { label: 'Ecosolvent', highlight: true },
        ],
      },
      servicesShowcase: {
        badge: 'Direct printing',
        headingLine1: 'We perform direct printing on',
        headingLine2: 'UV / Ecosolvent / Latex',
        buttonText: 'All materials',
        featuresHeading: 'Our printing advantage over others',
        readMoreText: 'Read Out More',
        services: [
          { title: 'Ecosolvent printing', description: 'Ecosolvent print for indoor and outdoor use.', uploadedImage: await m('/Materials/PVC%20Naljepnice/pvc%20naljepnice.jpg'), href: '/materials/uv-ecosolvent-latex' },
          { title: 'Print on glass', description: 'UV direct printing on glass surfaces of all dimensions.', uploadedImage: await m('/Materials/Staklo/staklo.jpg'), href: '/materials/uv-direktni-print/staklo' },
          { title: 'Print on wood', description: 'Quality printing on wooden substrates and MDF boards.', uploadedImage: await m('/Materials/Drvo/Drvo.jpg'), href: '/materials/uv-direktni-print/drvo' },
          { title: 'Print on metal', description: 'Durable UV print on metal and alubond surfaces.', uploadedImage: await m('/Materials/Alu%20Bond/alu%20bond.jpg'), href: '/materials/uv-direktni-print/alu-bond' },
          { title: 'Print on plastic', description: 'Printing on plexiglass, forex and all types of plastic.', uploadedImage: await m('/Materials/Forex/forex.jpg'), href: '/materials/uv-direktni-print/forex' },
          { title: 'Print on ceramics', description: 'Precise prints on ceramic tiles and substrates.', uploadedImage: await m('/Materials/Kapaline/kapaline.jpg'), href: '/materials/uv-direktni-print' },
          { title: 'Print on leather', description: 'Unique prints on leather products and materials.', uploadedImage: await m('/Materials/Ko%C5%BEa/ko%C5%BEa.jpg'), href: '/materials/laser/koza' },
          { title: 'Latex printing', description: 'High-quality prints with latex technology.', uploadedImage: await m('/Products/Banneri/banneri.jpg'), href: '/materials/uv-ecosolvent-latex' },
        ],
        features: [
          { title: 'Quality', description: 'Quality printing on all types of media from paper, vinyl, tarpaulins and various materials.', icon: 'Award', bg: 'bg-amber-50', ring: 'ring-amber-100', color: 'text-amber-500' },
          { title: 'Speed', description: 'Speed and quality in all processes, from concept to installation and service.', icon: 'Package', bg: 'bg-blue-50', ring: 'ring-blue-100', color: 'text-blue-500' },
          { title: 'Uniqueness', description: 'With modern technology we follow trends and offer a wide range of unique products.', icon: 'MapPin', bg: 'bg-emerald-50', ring: 'ring-emerald-100', color: 'text-emerald-500' },
          { title: 'Affordability', description: 'From idea to finished product, delivery and installation, all at affordable prices.', icon: 'ShoppingCart', bg: 'bg-cyan-50', ring: 'ring-cyan-100', color: 'text-cyan-500' },
        ],
      },
      materialsSection: {
        badge: 'Our materials',
        title: 'Quality materials',
        subtitle: 'We use only the highest quality materials so your prints look flawless and last long.',
        linkText: 'View all materials',
        materials: [
          { title: 'Forex', description: 'Printing on forex PVC boards — lightweight, durable and ideal for indoor and outdoor signs, displays and decorations.', uploadedImage: await m('/Materials/Forex/forex8.jpg'), href: '/materials/uv-direktni-print/forex' },
          { title: 'PVC Stickers', description: 'High-quality PVC stickers for branding, decoration and signage. Resistant to UV radiation, water and wear.', uploadedImage: await m('/Materials/PVC%20Naljepnice/pvc%20naljepnice5.jpg'), href: '/materials/uv-ecosolvent-latex/pvc-naljepnice' },
          { title: 'Canvas', description: 'Premium canvas material for art reproductions, photo prints and decorative wall pictures.', uploadedImage: await m('/Materials/Canvas/canvas3.jpg'), href: '/materials/uv-ecosolvent-latex/canvas' },
        ],
      },
      portfolioSection: {
        badge: 'Our projects',
        headingLine1: 'Check out our',
        headingLine2: 'completed projects',
        ctaText: 'Contact us',
        checklistItems: [
          { text: 'UV LED large format machine with 3.2m print width' },
          { text: 'Print on all board materials (glass, plexiglass, alubond, forex, MDF, wood)' },
          { text: 'Highest quality latex and ecosolvent machines' },
        ],
        items: [
          { title: 'Wallscape', photos: 30, uploadedImage: await m('/Products/Wallscape/wallscape5.jpg'), href: '/products/outdoor-indoor/wallscape' },
          { title: 'Vehicle Branding', photos: 29, uploadedImage: await m('/Products/Brandiranje%20Vozila/brandiranje%20vozila10.jpg'), href: '/products/brendiranje/vozila' },
          { title: 'Object Branding', photos: 22, uploadedImage: await m('/Products/Brendiranje%20Predmeta/Brendiranje%20predmeta3.jpg'), href: '/products/brendiranje/predmeta' },
          { title: 'Space Branding', photos: 20, uploadedImage: await m('/Products/Brendiranje%20Poslovnih%20Prostora/Brendiranje%20poslovnih%20prostora5.jpg'), href: '/products/brendiranje/poslovnih-stambenih-prostora' },
        ],
      },
      clientsSection: {
        badge: 'Our clients',
        title: 'Trusted by leading companies',
        subtitle: 'We are proud of our cooperation with top brands and companies across the region.',
        clients: [
          { name: 'Coca-Cola', uploadedLogo: await m('/Clients/cocacola.jpg') },
          { name: 'dm', uploadedLogo: await m('/Clients/dm.jpg') },
          { name: 'BH Telecom', uploadedLogo: await m('/Clients/bhtelecom.jpg') },
          { name: 'Bingo', uploadedLogo: await m('/Clients/bingo.jpg') },
          { name: 'Samsung', uploadedLogo: await m('/Clients/samsung.jpg') },
          { name: 'Telemach', uploadedLogo: await m('/Clients/telemach.jpg') },
          { name: 'Mtel', uploadedLogo: await m('/Clients/mtel.jpg') },
          { name: 'Raiffeisen', uploadedLogo: await m('/Clients/raiffhaisen.jpg') },
          { name: 'Strabag', uploadedLogo: await m('/Clients/strabag.jpg') },
          { name: 'Mercator', uploadedLogo: await m('/Clients/mercator.jpg') },
          { name: 'Konzum', uploadedLogo: await m('/Clients/konzum.jpg') },
          { name: 'Palmolive', uploadedLogo: await m('/Clients/palmolive.jpg') },
          { name: 'Samsonite', uploadedLogo: await m('/Clients/samsonite.jpg') },
          { name: 'Bosnalijek', uploadedLogo: await m('/Clients/bosnalijek.jpg') },
          { name: 'Hemofarm', uploadedLogo: await m('/Clients/hemofarm.jpg') },
          { name: 'Intesa', uploadedLogo: await m('/Clients/intesa.jpg') },
          { name: 'Nova Banka', uploadedLogo: await m('/Clients/novabanka.jpg') },
          { name: 'Orbico', uploadedLogo: await m('/Clients/orbico.jpg') },
          { name: 'Penny', uploadedLogo: await m('/Clients/penny.jpg') },
          { name: 'Kraš', uploadedLogo: await m('/Clients/krash.jpg') },
          { name: 'ArcelorMittal', uploadedLogo: await m('/Clients/arcelor.jpg') },
          { name: 'Avaz', uploadedLogo: await m('/Clients/avaz.jpg') },
          { name: 'BBI', uploadedLogo: await m('/Clients/bbi.jpg') },
          { name: 'SCC', uploadedLogo: await m('/Clients/scc.jpg') },
          { name: 'Skenderija', uploadedLogo: await m('/Clients/skenderija.jpg') },
          { name: 'Tehnomag', uploadedLogo: await m('/Clients/tehnomag.jpg') },
          { name: 'Akta', uploadedLogo: await m('/Clients/akta.jpg') },
          { name: 'Altermedia', uploadedLogo: await m('/Clients/altermedia.jpg') },
          { name: 'B2B', uploadedLogo: await m('/Clients/b2b.jpg') },
          { name: 'Balu', uploadedLogo: await m('/Clients/balu.jpg') },
          { name: 'BB Sport', uploadedLogo: await m('/Clients/bb-sport.jpg') },
          { name: 'CMS', uploadedLogo: await m('/Clients/cms.jpg') },
          { name: 'Domod', uploadedLogo: await m('/Clients/domod.jpg') },
          { name: 'Euro Plakat', uploadedLogo: await m('/Clients/euro-plakat.jpg') },
          { name: 'Eurobit', uploadedLogo: await m('/Clients/eurobit.jpg') },
          { name: 'Face', uploadedLogo: await m('/Clients/face.jpg') },
          { name: 'FDS', uploadedLogo: await m('/Clients/fds.jpg') },
          { name: 'Hepok', uploadedLogo: await m('/Clients/hepok.jpg') },
          { name: 'Herbal Spa', uploadedLogo: await m('/Clients/herbal-spa.jpg') },
          { name: 'Inovine', uploadedLogo: await m('/Clients/inovine.jpg') },
          { name: 'JetDirect', uploadedLogo: await m('/Clients/jetdirect.jpg') },
          { name: 'Kimono', uploadedLogo: await m('/Clients/kimono.jpg') },
          { name: 'Kuehne+Nagel', uploadedLogo: await m('/Clients/kuene.jpg') },
          { name: 'Lampica', uploadedLogo: await m('/Clients/lampica.jpg') },
          { name: 'Link Group', uploadedLogo: await m('/Clients/linkgroup.jpg') },
          { name: 'LRC', uploadedLogo: await m('/Clients/lrc.jpg') },
          { name: 'Metromedia', uploadedLogo: await m('/Clients/metromedia.jpg') },
          { name: 'Milcos', uploadedLogo: await m('/Clients/milcos.jpg') },
          { name: 'Navigare', uploadedLogo: await m('/Clients/navigare.jpg') },
          { name: 'NDI', uploadedLogo: await m('/Clients/ndi.jpg') },
          { name: 'Office', uploadedLogo: await m('/Clients/office.jpg') },
          { name: 'Plaza', uploadedLogo: await m('/Clients/plaza.jpg') },
          { name: 'Poljine', uploadedLogo: await m('/Clients/poljine.jpg') },
          { name: 'Sarajevo', uploadedLogo: await m('/Clients/sarajevo.jpg') },
          { name: 'Simeco', uploadedLogo: await m('/Clients/simeco.jpg') },
          { name: 'Sinkro', uploadedLogo: await m('/Clients/sinkro.jpg') },
          { name: 'Slatko Slano', uploadedLogo: await m('/Clients/slatko-slano.jpg') },
          { name: 'Surlan', uploadedLogo: await m('/Clients/surlan.jpg') },
          { name: 'Telegroup', uploadedLogo: await m('/Clients/telegroup.jpg') },
          { name: 'UN', uploadedLogo: await m('/Clients/un.jpg') },
        ],
      },
      statsSection: {
        heading: 'BSC in numbers — results that speak for themselves',
        stats: [
          { numericValue: 4650, suffix: '+', label: 'Happy clients', gradient: 'from-[#FDDDE6] via-[#FBE9ED] to-[#FDDDE6]/40', dark: false },
          { numericValue: 3790, suffix: '+', label: 'Completed projects', gradient: 'from-[#E3E8EF] via-[#EDF1F5] to-[#E3E8EF]/40', dark: false },
          { numericValue: 5580, suffix: '+', label: 'Photographs', gradient: 'from-[#B2DFDB] via-[#C8EBE8] to-[#B2DFDB]/40', dark: false },
          { numericValue: 8580, suffix: '+', label: 'Phone calls', gradient: 'from-[#1A1464] via-[#251a80] to-[#1A1464]', dark: true },
        ],
        locationsBadge: 'Our locations',
        locationsHeadingLine1: 'Print Shop BSC',
        locationsHeadingLine2: 'In three locations',
        starburstText: 'Quality Printing',
        locations: [
          { title: 'BSC Sarajevo City Center', text: 'Our main office in the heart of Sarajevo. Visit us for consultations, sample viewing and orders for all types of printing.', uploadedImage: await m('/SCC.jpg') },
          { title: 'BSC Budakovići', text: 'Production facility equipped with state-of-the-art UV LED and latex machines for printing large and mega formats.', uploadedImage: await m('/BUDAKOVICI.jpg') },
          { title: 'BSC BBI Center Sarajevo', text: 'Print Shop location in BBI Center. Fast production of business cards, flyers, posters and other graphic products.', uploadedImage: await m('/BBI.jpg') },
        ],
      },
      certificatesSection: {
        badge: 'Certificates',
        heading: 'What makes us special?',
        subtitle: 'We use the latest technology while caring for the environment. The certificates we hold reflect our commitment to quality!',
        certificates: [
          { title: 'ICS 27001\nInformation Security', color: '#8BC34A' },
          { title: 'ICS 50001\nEnergy Management', color: '#42A5F5' },
          { title: 'ICS 9001\nQuality Management', color: '#FF9800' },
          { title: 'ICS 14001\nEnvironmental Management', color: '#E91E63' },
        ],
      },
      productsGrid: {
        badge: 'Products',
        title: 'New solutions from our workshop',
        subtitle: 'Explore our most popular products created for our clients.',
        linkText: 'View all products',
        products: [
          { title: 'Wallpapers', uploadedImage: await m('/Products/Tapete/tapete.jpg'), category: 'Decoration', href: '/products/home-and-office/wall-art' },
          { title: '3D Wall Panels', uploadedImage: await m('/Products/3D%20zidni%20paneli/3dzidni.jpg'), category: 'Decoration', href: '/products/home-and-office/3d-zidni-paneli' },
          { title: 'Billboard', uploadedImage: await m('/Products/Bilbord/bilbord.jpg'), category: 'Branding', href: '/products/outdoor-indoor/billboard' },
        ],
      },
      newsSection: {
        badge: 'News',
        title: 'Stay up to date',
        subtitle: 'We always follow new trends and gladly share new approaches with our clients.',
        linkText: 'All news',
      },
      ctaSection: {
        badge: 'Contact',
        headingLine1: 'Want to send an inquiry,',
        headingLine2: 'request, or order?',
        buttonText: 'Contact us',
        floatingCards: [
          { label: 'UV Printing', icon: 'Printer', color: 'text-teal-600', bg: 'bg-white', className: 'w-20 h-20 top-4 right-32', rotate: -8 },
          { label: 'Wallpapers', icon: 'Image', color: 'text-blue-600', bg: 'bg-blue-50', className: 'w-28 h-24 top-6 right-4', rotate: 6 },
          { label: 'Design', icon: 'Palette', color: 'text-purple-600', bg: 'bg-purple-50', className: 'w-24 h-20 top-20 right-48', rotate: -4 },
          { label: 'Stickers', icon: 'Tag', color: 'text-amber-600', bg: 'bg-amber-50', className: 'w-22 h-20 top-[160px] right-52', rotate: -6 },
          { label: '3D Panels', icon: 'Frame', color: 'text-rose-600', bg: 'bg-rose-50', className: 'w-20 h-20 bottom-12 right-36', rotate: 8 },
          { label: 'Alubond', icon: 'Brush', color: 'text-gray-700', bg: 'bg-gray-100', className: 'w-24 h-22 bottom-8 right-8', rotate: -5 },
        ],
        centerCard: {
          label: 'Branding',
          icon: 'Layers',
          gradient: 'from-teal-400 to-emerald-500',
        },
      },
    }),
  })

  // ──────────────────────────────────────────────
  // 2. SITE SETTINGS
  // ──────────────────────────────────────────────
  console.log('⚙️  Seeding SiteSettings (BS)...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'BSC - Best Solution Company',
      siteDescription: 'Vaš partner za digitalnu štampu velikog formata u Sarajevu.',
      contactEmail: 'info@bsc.ba',
      contactPhone: '+387 33 571 111',
      address: 'Sarajevo, Bosna i Hercegovina',
      workingHours: 'Pon - Pet: 08:00 - 16:00',
      logos: {
        mainUpload: await m('/logo.png'),
        navbarTopUpload: await m('/bsc-logo-white-top.png'),
        navbarScrolledUpload: await m('/bsc-logo-white.png'),
        favicon: await m('/logo.png'),
      },
      socialMedia: [
        { platform: 'facebook', url: 'https://www.facebook.com/bscsarajevo' },
        { platform: 'instagram', url: 'https://www.instagram.com/bsc_sarajevo' },
      ],
      uiLabels: {
        productPlaceholder: 'BSC Proizvod',
        productSubtitle: 'Personalizirano po vašoj mjeri',
        productCta: 'Saznajte više',
        materialPlaceholder: 'Slika materijala',
        materialCta: 'Saznajte više',
        newsPlaceholder: 'Slika članka',
        newsReadMore: 'Pročitaj više →',
        galleryExample: 'Primjer',
        galleryPhotos: 'fotografija',
        galleryCarousel: 'Carousel',
        galleryGrid: 'Grid',
      },
    },
  })

  console.log('⚙️  Seeding SiteSettings (EN)...')
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      siteName: 'BSC - Best Solution Company',
      siteDescription: 'Your partner for large format digital printing in Sarajevo.',
      contactEmail: 'info@bsc.ba',
      contactPhone: '+387 33 571 111',
      address: 'Sarajevo, Bosnia and Herzegovina',
      workingHours: 'Mon - Fri: 08:00 - 16:00',
      logos: {
        mainUpload: await m('/logo.png'),
        navbarTopUpload: await m('/bsc-logo-white-top.png'),
        navbarScrolledUpload: await m('/bsc-logo-white.png'),
        favicon: await m('/logo.png'),
      },
      socialMedia: [
        { platform: 'facebook', url: 'https://www.facebook.com/bscsarajevo' },
        { platform: 'instagram', url: 'https://www.instagram.com/bsc_sarajevo' },
      ],
      uiLabels: {
        productPlaceholder: 'BSC Product',
        productSubtitle: 'Customized to your needs',
        productCta: 'Learn more',
        materialPlaceholder: 'Material image',
        materialCta: 'Learn more',
        newsPlaceholder: 'Article image',
        newsReadMore: 'Read more →',
        galleryExample: 'Example',
        galleryPhotos: 'photos',
        galleryCarousel: 'Carousel',
        galleryGrid: 'Grid',
      },
    },
  })

  // ──────────────────────────────────────────────
  // 3. NAVIGATION
  // ──────────────────────────────────────────────
  console.log('🧭 Seeding Navigation (BS)...')
  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      ctaText: 'Kontaktirajte nas',
      ctaLink: '/contact',
      viewAllText: 'Pogledaj sve →',
      languages: [
        { code: 'bs', active: true },
        { code: 'en', active: true },
      ],
      items: [
        { label: 'Početna', href: '/', hasMegaMenu: false, columns: [] },
        {
          label: 'Materijali', href: '/materials', hasMegaMenu: true,
          columns: [
            {
              title: 'UV / ECOSOLVENT / LATEX', href: '/materials/uv-ecosolvent-latex',
              items: [
                { name: 'PVC Naljepnice', slug: 'pvc-naljepnice' },
                { name: 'One Way Vision', slug: 'one-way-vision' },
                { name: 'Back Light', slug: 'back-light' },
                { name: 'Banner / Textilni Banner / Flag', slug: 'banner-textilni-banner-flag' },
                { name: 'Cerade / Kamionske', slug: 'cerade-kamionske' },
                { name: 'Canvas', slug: 'canvas' },
                { name: 'Tapete', slug: 'tapete' },
                { name: 'Podna Grafika', slug: 'podna-grafika' },
                { name: 'Poster Papir', slug: 'poster-papir' },
              ],
            },
            {
              title: 'UV DIREKTNI PRINT', href: '/materials/uv-direktni-print',
              items: [
                { name: 'Staklo', slug: 'staklo' },
                { name: 'Drvo', slug: 'drvo' },
                { name: 'Forex', slug: 'forex' },
                { name: 'Plexiglass', slug: 'plexiglass' },
                { name: 'Kapaline', slug: 'kapaline' },
                { name: 'Alu Bond', slug: 'alu-bond' },
                { name: 'MDF', slug: 'mdf' },
              ],
            },
            {
              title: 'CNC', href: '/materials/cnc',
              items: [
                { name: 'MDF', slug: 'mdf' },
                { name: 'Iverica', slug: 'iverica' },
                { name: 'Špera', slug: 'spera' },
                { name: 'Aluminij', slug: 'aluminij' },
                { name: 'Forex / Plastika', slug: 'forex-plastika' },
                { name: 'Plexiglass', slug: 'plexiglass' },
                { name: 'Medijapan', slug: 'medijapan' },
                { name: 'Drvo', slug: 'drvo' },
                { name: 'Plastični Karton / Akyplac', slug: 'plasticni-karton-akyplac' },
              ],
            },
            {
              title: 'LASER', href: '/materials/laser',
              items: [
                { name: 'Kapafix', slug: 'kapafix' },
                { name: 'Plexiglass', slug: 'plexiglass' },
                { name: 'Koža', slug: 'koza' },
                { name: 'Papir / Karton', slug: 'papir-karton' },
                { name: 'Špera / Drvo', slug: 'spera-drvo' },
              ],
            },
          ],
        },
        {
          label: 'Proizvodi', href: '/products', hasMegaMenu: true,
          columns: [
            {
              title: 'BRENDIRANJE', href: '/products/brendiranje',
              items: [
                { name: 'Poslovnih / Stambenih Prostora', slug: 'poslovnih-stambenih-prostora' },
                { name: 'Vozila', slug: 'vozila' },
                { name: 'Predmeta', slug: 'predmeta' },
                { name: 'Stajališta', slug: 'stajalista' },
              ],
            },
            {
              title: 'OUTDOOR I INDOOR', href: '/products/outdoor-indoor',
              items: [
                { name: 'Wallscape', slug: 'wallscape' },
                { name: 'Billboard', slug: 'billboard' },
                { name: 'Banneri', slug: 'banneri' },
                { name: 'Cerade / Kamionske', slug: 'cerade-kamionske' },
                { name: 'Mesh', slug: 'mesh' },
                { name: 'City Light', slug: 'city-light' },
                { name: 'Svijetleće Reklame', slug: 'svijetlece-reklame' },
              ],
            },
            {
              title: 'HOME AND OFFICE', href: '/products/home-and-office',
              items: [
                { name: 'Home Dekor / Assesoar', slug: 'home-dekor-assesoar' },
                { name: 'Wall Art', slug: 'wall-art' },
                { name: '3D Zidni Paneli', slug: '3d-zidni-paneli' },
                { name: 'Pregrade', slug: 'pregrade' },
                { name: 'Informativne Oznake', slug: 'informativne-oznake' },
                { name: 'Info Display', slug: 'info-display' },
                { name: 'Kancelarijski Materijal', slug: 'kancelarijski-materijal' },
              ],
            },
            {
              title: 'PROMO / POS', href: '/products/promo-pos',
              items: [
                { name: 'Štandovi', slug: 'standovi' },
                { name: 'Plex Stalaže', slug: 'plex' },
                { name: 'Sajamski Elementi', slug: 'sajamski-elementi' },
                { name: 'Vobleri / Table Tent', slug: 'vobleri-table-tent' },
                { name: 'Senzormatici', slug: 'senzormatici' },
                { name: 'Showcard', slug: 'showcard' },
              ],
            },
          ],
        },
        { label: 'O nama', href: '/about', hasMegaMenu: false, columns: [] },
        { label: 'Novosti', href: '/news', hasMegaMenu: false, columns: [] },
        { label: 'Upute', href: '/instructions', hasMegaMenu: false, columns: [] },
      ],
    },
  })

  console.log('🧭 Seeding Navigation (EN)...')
  const bsNavigation = await payload.findGlobal({ slug: 'navigation' as any } as any) as any
  await payload.updateGlobal({
    slug: 'navigation',
    locale: 'en',
    data: injectIds(bsNavigation, {
      ctaText: 'Contact us',
      viewAllText: 'View all →',
      languages: [
        { code: 'bs', active: true },
        { code: 'en', active: true },
      ],
      items: [
        { label: 'Home', href: '/', hasMegaMenu: false, columns: [] },
        {
          label: 'Materials', href: '/materials', hasMegaMenu: true,
          columns: [
            {
              title: 'UV / ECOSOLVENT / LATEX', href: '/materials/uv-ecosolvent-latex',
              items: [
                { name: 'PVC Stickers', slug: 'pvc-naljepnice' },
                { name: 'One Way Vision', slug: 'one-way-vision' },
                { name: 'Back Light', slug: 'back-light' },
                { name: 'Banner / Textile Banner / Flag', slug: 'banner-textilni-banner-flag' },
                { name: 'Tarpaulins / Truck Covers', slug: 'cerade-kamionske' },
                { name: 'Canvas', slug: 'canvas' },
                { name: 'Wallpapers', slug: 'tapete' },
                { name: 'Floor Graphics', slug: 'podna-grafika' },
                { name: 'Poster Paper', slug: 'poster-papir' },
              ],
            },
            {
              title: 'UV DIRECT PRINT', href: '/materials/uv-direktni-print',
              items: [
                { name: 'Glass', slug: 'staklo' },
                { name: 'Wood', slug: 'drvo' },
                { name: 'Forex', slug: 'forex' },
                { name: 'Plexiglass', slug: 'plexiglass' },
                { name: 'Kapaline', slug: 'kapaline' },
                { name: 'Alu Bond', slug: 'alu-bond' },
                { name: 'MDF', slug: 'mdf' },
              ],
            },
            {
              title: 'CNC', href: '/materials/cnc',
              items: [
                { name: 'MDF', slug: 'mdf' },
                { name: 'Chipboard', slug: 'iverica' },
                { name: 'Plywood', slug: 'spera' },
                { name: 'Aluminium', slug: 'aluminij' },
                { name: 'Forex / Plastic', slug: 'forex-plastika' },
                { name: 'Plexiglass', slug: 'plexiglass' },
                { name: 'MDF Board', slug: 'medijapan' },
                { name: 'Wood', slug: 'drvo' },
                { name: 'Plastic Cardboard / Akyplac', slug: 'plasticni-karton-akyplac' },
              ],
            },
            {
              title: 'LASER', href: '/materials/laser',
              items: [
                { name: 'Kapafix', slug: 'kapafix' },
                { name: 'Plexiglass', slug: 'plexiglass' },
                { name: 'Leather', slug: 'koza' },
                { name: 'Paper / Cardboard', slug: 'papir-karton' },
                { name: 'Plywood / Wood', slug: 'spera-drvo' },
              ],
            },
          ],
        },
        {
          label: 'Products', href: '/products', hasMegaMenu: true,
          columns: [
            {
              title: 'BRANDING', href: '/products/brendiranje',
              items: [
                { name: 'Business / Residential Spaces', slug: 'poslovnih-stambenih-prostora' },
                { name: 'Vehicles', slug: 'vozila' },
                { name: 'Objects', slug: 'predmeta' },
                { name: 'Bus Stops', slug: 'stajalista' },
              ],
            },
            {
              title: 'OUTDOOR & INDOOR', href: '/products/outdoor-indoor',
              items: [
                { name: 'Wallscape', slug: 'wallscape' },
                { name: 'Billboard', slug: 'billboard' },
                { name: 'Banners', slug: 'banneri' },
                { name: 'Tarpaulins / Truck Covers', slug: 'cerade-kamionske' },
                { name: 'Mesh', slug: 'mesh' },
                { name: 'City Light', slug: 'city-light' },
                { name: 'Light-up Signage', slug: 'svijetlece-reklame' },
              ],
            },
            {
              title: 'HOME AND OFFICE', href: '/products/home-and-office',
              items: [
                { name: 'Home Decor / Accessories', slug: 'home-dekor-assesoar' },
                { name: 'Wall Art', slug: 'wall-art' },
                { name: '3D Wall Panels', slug: '3d-zidni-paneli' },
                { name: 'Partitions', slug: 'pregrade' },
                { name: 'Informational Signs', slug: 'informativne-oznake' },
                { name: 'Info Display', slug: 'info-display' },
                { name: 'Office Supplies', slug: 'kancelarijski-materijal' },
              ],
            },
            {
              title: 'PROMO / POS', href: '/products/promo-pos',
              items: [
                { name: 'Stands', slug: 'standovi' },
                { name: 'Plex Shelves', slug: 'plex' },
                { name: 'Exhibition Elements', slug: 'sajamski-elementi' },
                { name: 'Wobblers / Table Tent', slug: 'vobleri-table-tent' },
                { name: 'Sensormats', slug: 'senzormatici' },
                { name: 'Showcard', slug: 'showcard' },
              ],
            },
          ],
        },
        { label: 'About us', href: '/about', hasMegaMenu: false, columns: [] },
        { label: 'News', href: '/news', hasMegaMenu: false, columns: [] },
        { label: 'Instructions', href: '/instructions', hasMegaMenu: false, columns: [] },
      ],
    }),
  })

  // ──────────────────────────────────────────────
  // 4. FOOTER
  // ──────────────────────────────────────────────
  console.log('🦶 Seeding Footer (BS)...')
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      logoUpload: await m('/logo.png'),
      logoAlt: 'BSC - Best Solution Company',
      companyDescription: 'Best Solution Company — specijalizirana digitalna štamparija u Sarajevu. Od ideje do gotovog proizvoda, dostave i montaže.',
      newsletter: {
        headingLine1: 'Prijavite se na naše',
        headingLine2: 'novosti i obavještenja',
        placeholder: 'Vaša email adresa',
      },
      socialLinks: [
        { platform: 'facebook', url: 'https://www.facebook.com/bscsarajevo' },
        { platform: 'twitter', url: 'https://www.twitter.com' },
        { platform: 'linkedin', url: 'https://www.linkedin.com' },
        { platform: 'youtube', url: 'https://www.youtube.com' },
      ],
      columns: [
        {
          title: 'Korisni linkovi',
          links: [
            { label: 'Brendiranje', href: '/products/brendiranje' },
            { label: 'Materijali za štampu', href: '/materials/uv-ecosolvent-latex' },
            { label: 'UV direktni print', href: '/materials/uv-direktni-print' },
            { label: 'Promo / POS', href: '/products/promo-pos' },
            { label: 'Outdoor i Indoor', href: '/products/outdoor-indoor' },
          ],
        },
        {
          title: 'Stranice',
          links: [
            { label: 'Kontakt', href: '/contact' },
            { label: 'O nama', href: '/about' },
            { label: 'Novosti', href: '/news' },
            { label: 'Upute za pripremu', href: '/instructions' },
            { label: 'Home & Office', href: '/products/home-and-office' },
          ],
        },
      ],
      contactInfo: {
        address: 'Vrbanja 1, 71000 Sarajevo, BiH',
        email: 'info@bsc.ba',
        phone: '+387 33 123 456',
      },
      copyrightText: 'BSC. Sva prava zadržana.',
      contactTitle: 'Kontakt info',
      bottomLinks: [
        { label: 'Politika privatnosti', href: '/contact' },
        { label: 'Uslovi korištenja', href: '/contact' },
      ],
    },
  })

  console.log('🦶 Seeding Footer (EN)...')
  const bsFooter = await payload.findGlobal({ slug: 'footer' as any } as any) as any
  await payload.updateGlobal({
    slug: 'footer',
    locale: 'en',
    data: injectIds(bsFooter, {
      logoAlt: 'BSC - Best Solution Company',
      companyDescription: 'Best Solution Company — specialized digital printing company in Sarajevo. From idea to finished product, delivery and installation.',
      newsletter: {
        headingLine1: 'Subscribe to our',
        headingLine2: 'news and updates',
        placeholder: 'Your email address',
      },
      socialLinks: [
        { platform: 'facebook', url: 'https://www.facebook.com/bscsarajevo' },
        { platform: 'twitter', url: 'https://www.twitter.com' },
        { platform: 'linkedin', url: 'https://www.linkedin.com' },
        { platform: 'youtube', url: 'https://www.youtube.com' },
      ],
      columns: [
        {
          title: 'Useful Links',
          links: [
            { label: 'Branding', href: '/products/brendiranje' },
            { label: 'Printing Materials', href: '/materials/uv-ecosolvent-latex' },
            { label: 'UV Direct Print', href: '/materials/uv-direktni-print' },
            { label: 'Promo / POS', href: '/products/promo-pos' },
            { label: 'Outdoor & Indoor', href: '/products/outdoor-indoor' },
          ],
        },
        {
          title: 'Pages',
          links: [
            { label: 'Contact', href: '/contact' },
            { label: 'About us', href: '/about' },
            { label: 'News', href: '/news' },
            { label: 'Preparation guidelines', href: '/instructions' },
            { label: 'Home & Office', href: '/products/home-and-office' },
          ],
        },
      ],
      contactInfo: {
        address: 'Vrbanja 1, 71000 Sarajevo, BiH',
        email: 'info@bsc.ba',
        phone: '+387 33 123 456',
      },
      copyrightText: 'BSC. All rights reserved.',
      contactTitle: 'Contact info',
      bottomLinks: [
        { label: 'Privacy policy', href: '/contact' },
        { label: 'Terms of use', href: '/contact' },
      ],
    }),
  })

  // ──────────────────────────────────────────────
  // 5. ABOUT PAGE
  // ──────────────────────────────────────────────
  console.log('ℹ️  Seeding AboutPage (BS)...')
  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      metaTitle: 'O Nama - BSC',
      metaDescription: 'Saznajte više o BSC digitalnoj štampi — naša priča, tim i vrijednosti.',
      heroBadge: 'Više o nama',
      heroHeading: 'O nama',
      heroSubtitle: 'Osnovani 2012. u sinergiji sa MMC Studiom, koji djeluje u Sarajevu od 1997. godine. Od ideje do gotovog proizvoda.',
      heroUploadedImage: await m('/Products/Brendiranje%20Poslovnih%20Prostora/Brendiranje%20poslovnih%20prostora9.jpg'),
      heading: 'Specijalizirana digitalna',
      headingItalic: 'štamparija',
      heroImageAlt: 'BSC digitalna štampa',
      description1: 'Best Solution Company je specijalizirana štamparija opremljena najnovijim digitalnim UV mašinama, uključujući UV LED mašinu velikog formata sa širinom štampe od 3.2m — jedinu mašinu u ovoj regiji — kao i UV DILLI koja štampa sve ravne materijale (staklo, pleksiglas, alubond, forex, MDF, drvo itd.)',
      description2: 'Pored UV tehnologije, u proizvodnji koristimo latex i ecosolvent mašine (MUTOH, HP, SUMA, XEROX, CANON), što omogućava brzu, kvalitetnu i povoljnu štampu na svim vrstama papirnih medija, vinila, cerada i raznih plastika.',
      checklistItems: [
        { text: 'Digitalna štampa XXL, velikih i malih formata' },
        { text: 'Dorada štampanog materijala i priprema za štampu' },
        { text: 'Od idejnog dizajna do montaže i servisa na području cijele BiH' },
      ],
      ctaText: 'Kontaktirajte nas',
      ctaLink: '/contact',
      statsBadge: 'O nama u brojkama',
      statsTitle: '"OD IDEJE DO GOTOVOG PROIZVODA"',
      statsSubtitle: 'Brojke koje odražavaju našu posvećenost i kvalitet.',
      stats: [
        { number: '4650', label: 'Sretnih klijenata', icon: 'Users' },
        { number: '3790', label: 'Završenih projekata', icon: 'FolderCheck' },
        { number: '5580', label: 'Fotografija', icon: 'ImageIcon' },
        { number: '8580', label: 'Tel. poziva', icon: 'Phone' },
      ],
      advantagesBadge: 'Zašto BSC',
      advantagesTitle: 'Prednost naše štamparije u odnosu na druge',
      advantagesSubtitle: 'Brzina, kvalitet, unikatnost i povoljnost — sve na jednom mjestu.',
      advantages: [
        { number: '01', title: 'Kvalitet', description: 'Visokokvalitetna štampa na svim vrstama medija od papira do više vrsta vinila, cerada i različitih vrsta plastike i materijala za specifičnu upotrebu.', icon: 'Award' },
        { number: '02', title: 'Brzina', description: 'Brzina i kvalitet u svim procesima, od idejnog dizajna, probnog uzorka, štampe i dorade do montaže i servisa.', icon: 'Zap' },
        { number: '03', title: 'Unikatnost', description: 'Modernom tehnologijom pratimo trendove i nudimo širok spektar unikatnih proizvoda. Učinite vaš dom ili poslovni prostor posebnim.', icon: 'Sparkles' },
        { number: '04', title: 'Povoljnost', description: 'Proizvodimo i montiramo razne grafičke proizvode po povoljnim cijenama. Od ideje do gotovog proizvoda, dostave i montaže, sve na jednom mjestu.', icon: 'Tag' },
      ],
      certificatesBadge: 'Certifikati',
      certificatesTitle: 'Šta nas čini posebnima?',
      certificatesSubtitle: 'Koristimo najnoviju tehnologiju, vodeći računa o okolišu. Certifikati koje posjedujemo odražavaju našu posvećenost kvalitetu!',
      satisfiedClientsText: 'zadovoljnih klijenata',
      certificates: [
        { title: 'ICS 27001' },
        { title: 'ICS 50001' },
        { title: 'ICS 9001' },
        { title: 'ICS 14001' },
      ],
      decorativeLabels: [
        { label: 'Dizajn' },
        { label: 'Vinyl' },
        { label: 'Naljepnica' },
      ],
    },
  })

  console.log('ℹ️  Seeding AboutPage (EN)...')
  const bsAboutPage = await payload.findGlobal({ slug: 'about-page' as any } as any) as any
  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'en',
    data: injectIds(bsAboutPage, {
      metaTitle: 'About Us - BSC',
      metaDescription: 'Learn more about BSC digital printing — our story, team and values.',
      heroBadge: 'About us',
      heroHeading: 'About us',
      heroSubtitle: 'Founded in 2012 in synergy with MMC Studio, operating in Sarajevo since 1997. From idea to finished product.',
      heroUploadedImage: await m('/Products/Brendiranje%20Poslovnih%20Prostora/Brendiranje%20poslovnih%20prostora9.jpg'),
      heading: 'Specialized digital',
      headingItalic: 'printing company',
      heroImageAlt: 'BSC digital printing',
      description1: 'Best Solution Company is a specialized printing company equipped with the latest digital UV machines, including a large format UV LED machine with a print width of 3.2m — the only machine in this region — as well as UV DILLI which prints on all flat materials (glass, plexiglass, alubond, forex, MDF, wood etc.)',
      description2: 'In addition to UV technology, we use latex and ecosolvent machines (MUTOH, HP, SUMA, XEROX, CANON) in production, enabling fast, quality and affordable printing on all types of paper media, vinyl, tarpaulins and various plastics.',
      checklistItems: [
        { text: 'Digital printing XXL, large and small formats' },
        { text: 'Finishing of printed material and print preparation' },
        { text: 'From design concept to assembly and service throughout BiH' },
      ],
      ctaText: 'Contact us',
      statsBadge: 'About us in numbers',
      statsTitle: '"FROM IDEA TO FINISHED PRODUCT"',
      statsSubtitle: 'Numbers that reflect our dedication and quality.',
      stats: [
        { number: '4650', label: 'Happy clients', icon: 'Users' },
        { number: '3790', label: 'Completed projects', icon: 'Briefcase' },
        { number: '5580', label: 'Photographs', icon: 'Award' },
        { number: '8580', label: 'Phone calls', icon: 'Target' },
      ],
      advantagesBadge: 'Why BSC',
      advantagesTitle: 'Our printing advantage over others',
      advantagesSubtitle: 'Speed, quality, uniqueness and affordability — all in one place.',
      advantages: [
        { number: '01', title: 'Quality', description: 'High-quality printing on all types of media from paper to various types of vinyl, tarpaulins and different types of plastics and materials for specific use.', icon: 'Award' },
        { number: '02', title: 'Speed', description: 'Speed and quality in all processes, from conceptual design, sample proofs, printing and finishing to assembly and service.', icon: 'Zap' },
        { number: '03', title: 'Uniqueness', description: 'With modern technology we follow trends and offer a wide range of unique products. Make your home or business space special.', icon: 'Lightbulb' },
        { number: '04', title: 'Affordability', description: 'We produce and install various graphic products at affordable prices. From idea to finished product, delivery and installation, all in one place.', icon: 'DollarSign' },
      ],
      certificatesBadge: 'Certificates',
      certificatesTitle: 'What makes us special?',
      certificatesSubtitle: 'We use the latest technology while taking care of the environment. Our certificates reflect our commitment to quality!',
      satisfiedClientsText: 'satisfied clients',
      certificates: [
        { title: 'ICS 27001' },
        { title: 'ICS 50001' },
        { title: 'ICS 9001' },
        { title: 'ICS 14001' },
      ],
      decorativeLabels: [
        { label: 'Design' },
        { label: 'Vinyl' },
        { label: 'Sticker' },
      ],
    }),
  })

  // ──────────────────────────────────────────────
  // 6. CONTACT PAGE
  // ──────────────────────────────────────────────
  console.log('📞 Seeding ContactPage (BS)...')
  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      metaTitle: 'Kontakt - BSC',
      metaDescription: 'Kontaktirajte BSC digitalnu štampu — lokacija, telefon, email i radno vrijeme.',
      heroBadge: 'Želimo surađivati s vama',
      heroHeading: 'Kako vam možemo pomoći',
      heroDescription: 'Best Solution Company je specijalizirana štamparija opremljena modernim digitalnim mašinama kao što su SEIKO, DILLI, MUTOH, SUMA, SISER, XEROX, CANON, HP itd.',
      contactCards: [
        { type: 'address', title: 'Naša adresa', value: 'Vrbanja 1, 71000 Sarajevo, Bosna i Hercegovina' },
        { type: 'phone', title: 'Pozovite nas', value: 'Telefon:+387 33 571 111\nFax:+387 33 571 111' },
        { type: 'email', title: 'Email', value: 'bscsarajevo@gmail.com' },
        { type: 'hours', title: 'Radno vrijeme', value: 'BBI:Pon-Sub 09:00-22:00 | Ned 10:00-18:00\nSCC:10:00-22:00\nBudakovići:Pon-Pet 08:00-17:00 | Sub 09:00-17:00' },
      ],
      form: {
        heading: 'Pišite nam o vašem projektu',
        description: 'Za sve dodatne informacije, upite ili narudžbe, molimo ispunite kontakt formu. Potrudit ćemo se da vam odgovorimo što je moguće prije.',
        nameLabel: 'Vaše ime',
        namePlaceholder: 'Vaše puno ime',
        phoneLabel: 'Telefon',
        phonePlaceholder: 'Vaš broj telefona',
        emailLabel: 'Email',
        emailPlaceholder: 'your@email.com',
        budgetLabel: 'Odaberite budžet',
        messageLabel: 'Opišite projekat',
        messagePlaceholder: 'Recite nam nešto o vašem projektu...',
        submitText: 'Pošaljite poruku',
        successMessage: 'Hvala na vašoj poruci! Javit ćemo vam se uskoro.',
        nameRequired: 'Ime je obavezno',
        emailRequired: 'Email je obavezan',
        emailInvalid: 'Neispravan email format',
      },
      budgetOptions: [
        { label: 'Odaberite raspon budžeta' },
        { label: 'Do 500 KM' },
        { label: '500 - 1.500 KM' },
        { label: '1.500 - 5.000 KM' },
        { label: '5.000 - 15.000 KM' },
        { label: '15.000+ KM' },
      ],
      equipment: [
        { name: 'SEIKO' },
        { name: 'DILLI Neo Titan UV LED' },
        { name: 'DILLI UV Titan 2500 S/W' },
        { name: 'MUTOH' },
        { name: 'HP Latex' },
        { name: 'SUMA CNC' },
        { name: 'XEROX' },
        { name: 'CANON' },
      ],
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.5!2d18.413!3d43.856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVnJiYW5qYSAxLCA3MTAwMCBTYXJhamV2bw!5e0!3m2!1sbs!2sba!4v1700000000000',
      quoteText: '"Od ideje do gotovog proizvoda"',
      quoteDescription: 'Brzina i kvalitet u svim procesima štampe — od idejnog dizajna, probnog uzorka, štampe, dorade, montaže i servisa na području cijele Bosne i Hercegovine.',
      formBadge: 'Pišite nam',
      equipmentHeading: 'Naša oprema',
      equipmentSuffix: '— specijalizirana flota modernih digitalnih štampanih mašina spremnih za vaš projekat.',
    },
  })

  console.log('📞 Seeding ContactPage (EN)...')
  const bsContactPage = await payload.findGlobal({ slug: 'contact-page' as any } as any) as any
  await payload.updateGlobal({
    slug: 'contact-page',
    locale: 'en',
    data: injectIds(bsContactPage, {
      metaTitle: 'Contact - BSC',
      metaDescription: 'Contact BSC digital printing — location, phone, email and working hours.',
      heroBadge: 'We want to work with you',
      heroHeading: 'How can we help you',
      heroDescription: 'Best Solution Company is a specialized printing company equipped with modern digital machines such as SEIKO, DILLI, MUTOH, SUMA, SISER, XEROX, CANON, HP etc.',
      contactCards: [
        { type: 'address', title: 'Our address', value: 'Vrbanja 1, 71000 Sarajevo, Bosnia and Herzegovina' },
        { type: 'phone', title: 'Call us', value: 'Phone:+387 33 571 111\nFax:+387 33 571 111' },
        { type: 'email', title: 'Email', value: 'bscsarajevo@gmail.com' },
        { type: 'hours', title: 'Working hours', value: 'BBI:Mon-Sat 09:00-22:00 | Sun 10:00-18:00\nSCC:10:00-22:00\nBudakovići:Mon-Fri 08:00-17:00 | Sat 09:00-17:00' },
      ],
      form: {
        heading: 'Tell us about your project',
        description: 'For any additional information, inquiries or orders, please fill out the contact form. We will do our best to respond as soon as possible.',
        nameLabel: 'Your name',
        namePlaceholder: 'Your full name',
        phoneLabel: 'Phone',
        phonePlaceholder: 'Your phone number',
        emailLabel: 'Email',
        emailPlaceholder: 'your@email.com',
        budgetLabel: 'Select budget',
        messageLabel: 'Describe your project',
        messagePlaceholder: 'Tell us something about your project...',
        submitText: 'Send message',
        successMessage: 'Thank you for your message! We will get back to you soon.',
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email format',
      },
      budgetOptions: [
        { label: 'Select budget range' },
        { label: 'Up to 500 BAM' },
        { label: '500 - 1,500 BAM' },
        { label: '1,500 - 5,000 BAM' },
        { label: '5,000 - 15,000 BAM' },
        { label: '15,000+ BAM' },
      ],
      equipment: [
        { name: 'SEIKO' },
        { name: 'DILLI Neo Titan UV LED' },
        { name: 'DILLI UV Titan 2500 S/W' },
        { name: 'MUTOH' },
        { name: 'HP Latex' },
        { name: 'SUMA CNC' },
        { name: 'XEROX' },
        { name: 'CANON' },
      ],
      quoteText: '"From idea to finished product"',
      quoteDescription: 'Speed and quality in all printing processes — from conceptual design, sample proofs, printing, finishing, assembly and service throughout Bosnia and Herzegovina.',
      formBadge: 'Write to us',
      equipmentHeading: 'Our equipment',
      equipmentSuffix: '— a specialized fleet of modern digital printing machines ready for your project.',
    }),
  })

  // ──────────────────────────────────────────────
  // 7. INSTRUCTIONS PAGE
  // ──────────────────────────────────────────────
  console.log('📋 Seeding InstructionsPage (BS)...')
  await payload.updateGlobal({
    slug: 'instructions-page',
    data: {
      metaTitle: 'Upute za pripremu - BSC',
      metaDescription: 'Upute za pripremu fajlova za digitalnu štampu — formati, rezolucija, boje i više.',
      heroHeading: 'Upute za pripremu',
      heroSubtitle: 'Pravilna priprema može eliminisati greške koje bi se mogle pojaviti tokom procesa štampe.',
      acceptedFormats: [
        { format: 'TIFF' },
        { format: 'PDF' },
        { format: 'PSD' },
        { format: 'CDR' },
        { format: 'AI' },
        { format: 'JPG' },
        { format: 'EPS' },
      ],
      ratios: [
        { ratio: '1:1' },
        { ratio: '1:5' },
        { ratio: '1:10' },
        { ratio: '1:20' },
      ],
      resolutions: [
        { resolution: '72dpi' },
        { resolution: '100dpi' },
        { resolution: '150dpi' },
        { resolution: '300dpi' },
        { resolution: '500dpi' },
      ],
      prepTips: [
        { title: 'CMYK režim boja', description: 'Koristite CMYK režim boja, ili GRAYSCALE ako želite crno-bijelu štampu.', icon: 'Palette' },
        { title: 'Spajanje slojeva', description: 'Svi slojevi rasterizovani i spojeni (merged) u jedan sloj.', icon: 'Layers' },
        { title: 'Konvertovanje tekstova', description: 'Konvertujte sve tekstove u krivulje da izbjegnete probleme sa fontovima.', icon: 'FileText' },
        { title: 'Prihvaćeni formati', description: 'TIFF, PDF, PSD, CDR, AI, JPG, EPS.', icon: 'Image' },
      ],
      downloads: [
        { name: 'Konverzija Microsoft Word u PDF' },
        { name: 'QuarkXPress separacija boja' },
        { name: 'Upute za eksportovanje PDF iz QuarkXPress-a' },
        { name: 'CorelDraw podešavanja boja' },
        { name: 'Upute za eksportovanje PDF iz CorelDraw-a' },
        { name: 'Podešavanja boja za sve Adobe programe' },
        { name: 'Upute za eksportovanje PDF iz Adobe InDesign-a' },
        { name: 'Upute za eksportovanje PDF iz Adobe Illustrator-a' },
        { name: 'Upute za eksportovanje PDF iz Acrobat Distiller-a' },
        { name: 'Adobe podešavanja boja' },
      ],
      autographTitle: 'Priprema za štampu autograma',
      autographDescription: 'U fajlu postoje samo dva sloja. Jedan sadrži ilustraciju (ili fotografiju) vozila, a drugi sadrži grafiku koja se štampa sa 12 cm preklopom preko svake dimenzije.',
      autographFootnote: 'Ukoliko imate bilo kakvih pitanja, slobodno nas kontaktirajte, rado ćemo vam pomoći.',
      ratiosHeading: 'Omjeri pripreme',
      ratiosDescription: 'Zavisno od proizvoda, grafičke pripreme trebaju biti isporučene u određenom omjeru:',
      ratiosSuffix: 'itd.',
      resolutionsHeading: 'Zahtjevi za rezoluciju',
      resolutionsDescription: 'Određena rezolucija je potrebna zavisno od namjene:',
      resolutionsSuffix: 'itd.',
      sections: [
        { badge: 'Priprema', title: 'Priprema fajlova', subtitle: 'Da bi vaš štampani proizvod izgledao onako kako ste zamišljali, slijedite ove smjernice.' },
        { badge: 'Kvalitet', title: 'Rezolucija i omjer', subtitle: 'Prilagodite vaše grafičke pripreme na osnovu željenog kvaliteta i namjene.' },
        { badge: 'Preuzimanja', title: 'Fajlovi za preuzimanje', subtitle: 'Korisni resursi i upute za različite dizajnerske programe.' },
      ],
      downloadAllText: 'Preuzmi sve',
    },
  })

  console.log('📋 Seeding InstructionsPage (EN)...')
  const bsInstructionsPage = await payload.findGlobal({ slug: 'instructions-page' as any } as any) as any
  await payload.updateGlobal({
    slug: 'instructions-page',
    locale: 'en',
    data: injectIds(bsInstructionsPage, {
      metaTitle: 'Preparation Guidelines - BSC',
      metaDescription: 'File preparation guidelines for digital printing — formats, resolution, colors and more.',
      heroHeading: 'Preparation Guidelines',
      heroSubtitle: 'Proper preparation can eliminate errors that could occur during the printing process.',
      acceptedFormats: [
        { format: 'TIFF' },
        { format: 'PDF' },
        { format: 'PSD' },
        { format: 'CDR' },
        { format: 'AI' },
        { format: 'JPG' },
        { format: 'EPS' },
      ],
      ratios: [
        { ratio: '1:1' },
        { ratio: '1:5' },
        { ratio: '1:10' },
        { ratio: '1:20' },
      ],
      resolutions: [
        { resolution: '72dpi' },
        { resolution: '100dpi' },
        { resolution: '150dpi' },
        { resolution: '300dpi' },
        { resolution: '500dpi' },
      ],
      prepTips: [
        { title: 'CMYK color mode', description: 'Use CMYK color mode, or GRAYSCALE if you want black and white printing.', icon: 'Palette' },
        { title: 'Merging layers', description: 'All layers rasterized and merged into one layer.', icon: 'Layers' },
        { title: 'Converting text', description: 'Convert all text to curves to avoid font problems.', icon: 'FileText' },
        { title: 'Accepted formats', description: 'TIFF, PDF, PSD, CDR, AI, JPG, EPS.', icon: 'Image' },
      ],
      downloads: [
        { name: 'Microsoft Word to PDF conversion' },
        { name: 'QuarkXPress color separation' },
        { name: 'PDF export guidelines from QuarkXPress' },
        { name: 'CorelDraw color settings' },
        { name: 'PDF export guidelines from CorelDraw' },
        { name: 'Color settings for all Adobe programs' },
        { name: 'PDF export guidelines from Adobe InDesign' },
        { name: 'PDF export guidelines from Adobe Illustrator' },
        { name: 'PDF export guidelines from Acrobat Distiller' },
        { name: 'Adobe color settings' },
      ],
      autographTitle: 'Preparation for autograph printing',
      autographDescription: 'The file contains only two layers. One contains the illustration (or photograph) of the vehicle, and the other contains the graphics to be printed with a 12 cm overlap on each dimension.',
      autographFootnote: 'If you have any questions, feel free to contact us, we will be happy to help.',
      ratiosHeading: 'Preparation ratios',
      ratiosDescription: 'Depending on the product, graphic preparations should be delivered in a specific ratio:',
      ratiosSuffix: 'etc.',
      resolutionsHeading: 'Resolution requirements',
      resolutionsDescription: 'A specific resolution is required depending on the purpose:',
      resolutionsSuffix: 'etc.',
      sections: [
        { badge: 'Preparation', title: 'File preparation', subtitle: 'To make your printed product look the way you envisioned, follow these guidelines.' },
        { badge: 'Quality', title: 'Resolution and ratio', subtitle: 'Adjust your graphic preparations based on desired quality and purpose.' },
        { badge: 'Downloads', title: 'Files for download', subtitle: 'Useful resources and guides for various design programs.' },
      ],
      downloadAllText: 'Download all',
    }),
  })

  // ──────────────────────────────────────────────
  // 8. MATERIALS PAGE
  // ──────────────────────────────────────────────
  console.log('🧱 Seeding MaterialsPage (BS)...')
  await payload.updateGlobal({
    slug: 'materials-page',
    data: {
      heroBadge: 'Naši Materijali',
      heroHeading: 'Materijali & Usluge',
      heroSubtitle: 'Od velikoformatnog printa do preciznog laserskog graviranja — radimo sa najkvalitetnijim materijalima za savršene rezultate.',
      quickStats: [
        { value: '4', label: 'kategorije' },
        { value: '30+', label: 'materijala' },
        { value: '4', label: 'tehnologije' },
      ],
      categoriesBadge: 'Kategorije',
      categoriesTitle: 'Odaberite Kategoriju',
      categoriesSubtitle: 'Svaka kategorija obuhvata različite materijale i tehnike obrade.',
      viewAllMaterialsText: 'Pogledaj sve materijale',
      itemCountLabel: 'materijala',
      moreText: 'više',
      whyBadge: 'Prednosti',
      whyTitle: 'Zašto naši materijali?',
      whySubtitle: 'Kvalitet, pouzdanost i stručnost — temelji svakog uspješnog projekta.',
      whyCards: [
        { title: 'Vrhunski materijali', text: 'Koristimo samo provjerene materijale od vodećih evropskih proizvođača' },
        { title: 'Garancija kvaliteta', text: 'Svaki materijal prolazi rigoroznu kontrolu kvaliteta prije obrade' },
        { title: 'Brza obrada', text: 'Efikasan proces od pripreme do gotovog proizvoda — čak i za hitne projekte' },
        { title: 'Stručni savjet', text: 'Naš tim vam pomaže odabrati optimalan materijal za vaš specifičan projekat' },
      ],
      ctaHeading: 'Trebate savjet o materijalima?',
      ctaDescription: 'Kontaktirajte nas za besplatnu konsultaciju i ponudu.',
      ctaButtonText: 'Kontakt',
      ctaButtonLink: '/contact',
      ctaPhoneText: 'Pozovite nas',
      metaTitle: 'Materijali - BSC',
      metaDescription: 'Pregledajte naše kategorije materijala.',
    },
  })

  console.log('🧱 Seeding MaterialsPage (EN)...')
  const bsMaterialsPage = await payload.findGlobal({ slug: 'materials-page' as any } as any) as any
  await payload.updateGlobal({
    slug: 'materials-page',
    locale: 'en',
    data: injectIds(bsMaterialsPage, {
      heroBadge: 'Our Materials',
      heroHeading: 'Materials & Services',
      heroSubtitle: 'From large format printing to precision laser engraving — we work with the highest quality materials for perfect results.',
      quickStats: [
        { value: '4', label: 'categories' },
        { value: '30+', label: 'materials' },
        { value: '4', label: 'technologies' },
      ],
      categoriesBadge: 'Categories',
      categoriesTitle: 'Choose a Category',
      categoriesSubtitle: 'Each category covers different materials and processing techniques.',
      viewAllMaterialsText: 'View all materials',
      itemCountLabel: 'materials',
      moreText: 'more',
      whyBadge: 'Advantages',
      whyTitle: 'Why our materials?',
      whySubtitle: 'Quality, reliability and expertise — the foundation of every successful project.',
      whyCards: [
        { title: 'Premium materials', text: 'We use only proven materials from leading European manufacturers' },
        { title: 'Quality guarantee', text: 'Every material undergoes rigorous quality control before processing' },
        { title: 'Fast processing', text: 'Efficient process from preparation to finished product — even for urgent projects' },
        { title: 'Expert advice', text: 'Our team helps you choose the optimal material for your specific project' },
      ],
      ctaHeading: 'Need advice on materials?',
      ctaDescription: 'Contact us for a free consultation and quote.',
      ctaButtonText: 'Contact',
      ctaPhoneText: 'Call us',
      metaTitle: 'Materials - BSC',
      metaDescription: 'Browse our material categories.',
    }),
  })

  // ──────────────────────────────────────────────
  // 9. PRODUCTS PAGE
  // ──────────────────────────────────────────────
  console.log('📦 Seeding ProductsPage (BS)...')
  await payload.updateGlobal({
    slug: 'products-page',
    data: {
      heroBadge: 'Naši Proizvodi',
      heroHeading: 'Proizvodi & Usluge',
      heroSubtitle: 'Od brendiranja vozila do sajamskih elemenata — nudimo kompletna rješenja za vaše poslovanje.',
      quickStats: [
        { value: '4', label: 'kategorije' },
        { value: '24+', label: 'proizvoda' },
        { value: '15+', label: 'godina iskustva' },
      ],
      categoriesBadge: 'Kategorije',
      categoriesTitle: 'Odaberite Kategoriju',
      categoriesSubtitle: 'Svaka kategorija nudi specijalizirana rješenja za vaše potrebe.',
      viewAllProductsText: 'Pogledaj sve proizvode',
      itemCountLabel: 'proizvoda',
      moreText: 'više',
      whyBadge: 'Prednosti',
      whyTitle: 'Zašto odabrati nas?',
      whySubtitle: 'Kvalitet, brzina i pouzdanost — naši temeljni principi od samog početka.',
      whyCards: [
        { title: 'Profesionalna izrada', text: 'Koristimo najmodernije mašine i tehnologije za svaki proizvod' },
        { title: 'Individualni pristup', text: 'Svaki projekat prilagođavamo specifičnim potrebama klijenta' },
        { title: 'Brza realizacija', text: 'Od narudžbe do isporuke u najkraćem mogućem roku' },
        { title: 'Podrška klijentima', text: 'Naš tim je tu za vas od konsultacija do finalne montaže' },
      ],
      ctaHeading: 'Trebate profesionalna rješenja?',
      ctaDescription: 'Kontaktirajte nas za besplatnu ponudu i profesionalan savjet.',
      ctaButtonText: 'Kontakt',
      ctaButtonLink: '/contact',
      ctaPhoneText: 'Pozovite nas',
      metaTitle: 'Proizvodi - BSC',
      metaDescription: 'Pregledajte naše kategorije proizvoda.',
    },
  })

  console.log('📦 Seeding ProductsPage (EN)...')
  const bsProductsPage = await payload.findGlobal({ slug: 'products-page' as any } as any) as any
  await payload.updateGlobal({
    slug: 'products-page',
    locale: 'en',
    data: injectIds(bsProductsPage, {
      heroBadge: 'Our Products',
      heroHeading: 'Products & Services',
      heroSubtitle: 'From vehicle branding to exhibition elements — we offer complete solutions for your business.',
      quickStats: [
        { value: '4', label: 'categories' },
        { value: '24+', label: 'products' },
        { value: '15+', label: 'years of experience' },
      ],
      categoriesBadge: 'Categories',
      categoriesTitle: 'Choose a Category',
      categoriesSubtitle: 'Each category offers specialized solutions for your needs.',
      viewAllProductsText: 'View all products',
      itemCountLabel: 'products',
      moreText: 'more',
      whyBadge: 'Advantages',
      whyTitle: 'Why choose us?',
      whySubtitle: 'Quality, speed and reliability — our core principles from the very beginning.',
      whyCards: [
        { title: 'Professional production', text: 'We use state-of-the-art machines and technologies for every product' },
        { title: 'Individual approach', text: 'We tailor every project to the specific needs of the client' },
        { title: 'Fast turnaround', text: 'From order to delivery in the shortest possible time' },
        { title: 'Client support', text: 'Our team is here for you from consultations to final installation' },
      ],
      ctaHeading: 'Need professional solutions?',
      ctaDescription: 'Contact us for a free quote and professional advice.',
      ctaButtonText: 'Contact',
      ctaPhoneText: 'Call us',
      metaTitle: 'Products - BSC',
      metaDescription: 'Browse our product categories.',
    }),
  })

  // ──────────────────────────────────────────────
  // 10. NEWS PAGE
  // ──────────────────────────────────────────────
  console.log('📰 Seeding NewsPage (BS)...')
  await payload.updateGlobal({
    slug: 'news-page',
    data: {
      heroHeading: 'Najnovije vijesti',
      heroSubtitle: 'Pratite najnovije vijesti i obavještenja iz BSC-a.',
      featuredImagePlaceholder: 'Istaknuta slika',
      readArticleText: 'Pročitaj članak',
      allCategoryText: 'Sve',
      newsletterHeading: 'Ne propustite novosti',
      newsletterDescription: 'Pretplatite se na naš newsletter.',
      newsletterPlaceholder: 'Unesite vaš email',
      newsletterButtonText: 'Pretplatite se',
      metaTitle: 'Novosti - BSC',
      metaDescription: 'Najnovije vijesti iz BSC.',
    },
  })

  console.log('📰 Seeding NewsPage (EN)...')
  await payload.updateGlobal({
    slug: 'news-page',
    locale: 'en',
    data: {
      heroHeading: 'Latest News',
      heroSubtitle: 'Follow the latest news and updates from BSC.',
      featuredImagePlaceholder: 'Featured image',
      readArticleText: 'Read article',
      allCategoryText: 'All',
      newsletterHeading: "Don't miss the news",
      newsletterDescription: 'Subscribe to our newsletter.',
      newsletterPlaceholder: 'Enter your email',
      newsletterButtonText: 'Subscribe',
      metaTitle: 'News - BSC',
      metaDescription: 'Latest news from BSC.',
    },
  })

  // ──────────────────────────────────────────────
  // 11. MATERIAL DETAIL PAGE
  // ──────────────────────────────────────────────
  console.log('🔍 Seeding MaterialDetailPage (BS)...')
  await payload.updateGlobal({
    slug: 'material-detail-page',
    data: {
      breadcrumbHome: 'Početna',
      breadcrumbMaterials: 'Materijali',
      categoryPage: {
        availableTitle: 'Dostupni Materijali',
        availableSubtitle: 'Izaberite materijal za detaljne informacije, galeriju i specifikacije.',
        learnMoreText: 'Saznaj više',
        whyTitle: 'Zašto odabrati nas?',
        whySubtitle: 'Kvalitet, brzina i pouzdanost — naši temeljni principi od samog početka.',
        whyCards: [
          { title: 'Vrhunski materijali', text: 'Koristimo samo provjerene materijale od vodećih evropskih proizvođača' },
          { title: 'Garancija kvaliteta', text: 'Svaki materijal prolazi rigoroznu kontrolu kvaliteta prije obrade' },
          { title: 'Brza obrada', text: 'Efikasan proces od pripreme do gotovog proizvoda' },
          { title: 'Stručni savjet', text: 'Naš tim vam pomaže odabrati optimalan materijal za vaš projekat' },
        ],
        ctaPrefix: 'Trebate print na nekom od ovih materijala?',
        ctaDescription: 'Kontaktirajte nas za besplatnu ponudu i savjet o najboljim materijalima za vaš projekat.',
        ctaContactText: 'Kontakt',
        ctaPhoneText: 'Pozovite nas',
        statCustomizableValue: '100%',
        statCustomizableLabel: 'prilagodljivo',
        statDeliveryValue: 'Brza',
        statDeliveryLabel: 'isporuka',
        exploreCategoriesTitle: 'Istražite druge kategorije',
        exploreCategoriesSubtitle: 'Pogledajte i ostale tehnologije i materijale koje nudimo.',
        materialsCountLabel: 'materijala',
        backToAllText: 'Nazad na sve materijale',
      },
      itemPage: {
        aboutTitle: 'O materijalu',
        aboutParagraph1: 'Ovaj materijal nudi izvanredne mogućnosti za vaš projekat. Sa bogatom teksturom i izuzetnom izdržljivošću, idealan je za profesionalne primjene u brendiranju, dekoraciji i signalizaciji.',
        aboutParagraph2: 'Naš tim koristi najmoderniju tehnologiju za obradu materijala, osiguravajući precizne rezove, živopisne boje i dugotrajne rezultate koji nadmašuju očekivanja.',
        features: [
          { title: 'Izdržljivost', text: 'Otporan na UV zrake i vremenske uvjete' },
          { title: 'Kvalitet', text: 'Visoka rezolucija i preciznost boja' },
          { title: 'Prilagodljivost', text: 'Dostupan u različitim dimenzijama i debljinama' },
          { title: 'Primjena', text: 'Pogodan za unutrašnju i vanjsku upotrebu' },
        ],
        advantagesTitle: 'Ključne prednosti',
        advantages: [
          { text: 'Visoka otpornost na UV zrake i vremenske uslove' },
          { text: 'Precizna reprodukcija boja i detalja' },
          { text: 'Dostupan u različitim dimenzijama' },
          { text: 'Jednostavno održavanje i čišćenje' },
          { text: 'Ekološki prihvatljiv materijal' },
        ],
        viewAllText: 'Pogledaj sve materijale',
        processTitle: 'Proces izrade',
        processSubtitle: 'Od upita do gotovog proizvoda — transparentan i efikasan proces.',
        processSteps: [
          { title: 'Konsultacije', text: 'Razumijevanje vaših potreba i zahtjeva' },
          { title: 'Priprema', text: 'Priprema dizajna i odabir materijala' },
          { title: 'Proizvodnja', text: 'Štampa i obrada vrhunskim mašinama' },
          { title: 'Isporuka', text: 'Kontrola kvaliteta i sigurna dostava' },
        ],
        galleryTitle: 'Galerija',
        ctaPrefix: 'Trebate ovaj materijal?',
        ctaDescription: 'Kontaktirajte nas za besplatnu ponudu i savjet o najboljim materijalima za vaš projekat.',
        ctaContactText: 'Kontakt',
        ctaPhoneText: 'Pozovite nas',
        relatedTitle: 'Ostali materijali u kategoriji',
        relatedSubtitle: 'Istražite još {n} materijala iz iste kategorije.',
        exploreCategoriesTitle: 'Istražite druge kategorije',
        exploreCategoriesSubtitle: 'Pogledajte i ostale tehnologije i materijale koje nudimo.',
        backText: 'Nazad na',
      },
    },
  })

  console.log('🔍 Seeding MaterialDetailPage (EN)...')
  const bsMaterialDetailPage = await payload.findGlobal({ slug: 'material-detail-page' as any } as any) as any
  await payload.updateGlobal({
    slug: 'material-detail-page',
    locale: 'en',
    data: injectIds(bsMaterialDetailPage, {
      breadcrumbHome: 'Home',
      breadcrumbMaterials: 'Materials',
      categoryPage: {
        availableTitle: 'Available Materials',
        availableSubtitle: 'Select a material for detailed information, gallery and specifications.',
        learnMoreText: 'Learn more',
        whyTitle: 'Why choose us?',
        whySubtitle: 'Quality, speed and reliability — our core principles from the very beginning.',
        whyCards: [
          { title: 'Premium materials', text: 'We use only proven materials from leading European manufacturers' },
          { title: 'Quality guarantee', text: 'Every material undergoes rigorous quality control before processing' },
          { title: 'Fast processing', text: 'Efficient process from preparation to finished product' },
          { title: 'Expert advice', text: 'Our team helps you choose the optimal material for your project' },
        ],
        ctaPrefix: 'Need printing on any of these materials?',
        ctaDescription: 'Contact us for a free quote and advice on the best materials for your project.',
        ctaContactText: 'Contact',
        ctaPhoneText: 'Call us',
        statCustomizableValue: '100%',
        statCustomizableLabel: 'customizable',
        statDeliveryValue: 'Fast',
        statDeliveryLabel: 'delivery',
        exploreCategoriesTitle: 'Explore other categories',
        exploreCategoriesSubtitle: 'Check out other technologies and materials we offer.',
        materialsCountLabel: 'materials',
        backToAllText: 'Back to all materials',
      },
      itemPage: {
        aboutTitle: 'About the material',
        aboutParagraph1: 'This material offers exceptional possibilities for your project. With rich texture and outstanding durability, it is ideal for professional applications in branding, decoration and signage.',
        aboutParagraph2: 'Our team uses cutting-edge technology for material processing, ensuring precise cuts, vivid colors and long-lasting results that exceed expectations.',
        features: [
          { title: 'Durability', text: 'Resistant to UV rays and weather conditions' },
          { title: 'Quality', text: 'High resolution and color accuracy' },
          { title: 'Versatility', text: 'Available in various dimensions and thicknesses' },
          { title: 'Application', text: 'Suitable for indoor and outdoor use' },
        ],
        advantagesTitle: 'Key advantages',
        advantages: [
          { text: 'High resistance to UV rays and weather conditions' },
          { text: 'Precise color and detail reproduction' },
          { text: 'Available in various dimensions' },
          { text: 'Easy maintenance and cleaning' },
          { text: 'Environmentally friendly material' },
        ],
        viewAllText: 'View all materials',
        processTitle: 'Production process',
        processSubtitle: 'From inquiry to finished product — a transparent and efficient process.',
        processSteps: [
          { title: 'Consultation', text: 'Understanding your needs and requirements' },
          { title: 'Preparation', text: 'Design preparation and material selection' },
          { title: 'Production', text: 'Printing and processing with premium machines' },
          { title: 'Delivery', text: 'Quality control and secure delivery' },
        ],
        galleryTitle: 'Gallery',
        ctaPrefix: 'Need this material?',
        ctaDescription: 'Contact us for a free quote and advice on the best materials for your project.',
        ctaContactText: 'Contact',
        ctaPhoneText: 'Call us',
        relatedTitle: 'Other materials in this category',
        relatedSubtitle: 'Explore {n} more materials from the same category.',
        exploreCategoriesTitle: 'Explore other categories',
        exploreCategoriesSubtitle: 'Check out other technologies and materials we offer.',
        backText: 'Back to',
      },
    }),
  })

  // ──────────────────────────────────────────────
  // 12. PRODUCT DETAIL PAGE
  // ──────────────────────────────────────────────
  console.log('🔍 Seeding ProductDetailPage (BS)...')
  await payload.updateGlobal({
    slug: 'product-detail-page',
    data: {
      breadcrumbHome: 'Početna',
      breadcrumbProducts: 'Proizvodi',
      categoryPage: {
        availableTitle: 'Dostupni Proizvodi',
        availableSubtitle: 'Izaberite proizvod za detaljne informacije, galeriju i mogućnosti prilagodbe.',
        learnMoreText: 'Saznaj više',
        whyTitle: 'Zašto odabrati nas?',
        whySubtitle: 'Kvalitet, brzina i pouzdanost — naši temeljni principi od samog početka.',
        whyCards: [
          { title: 'Profesionalna izrada', text: 'Koristimo najmodernije mašine i tehnologije za svaki proizvod' },
          { title: 'Individualni pristup', text: 'Svaki projekat prilagođavamo specifičnim potrebama klijenta' },
          { title: 'Brza realizacija', text: 'Od narudžbe do isporuke u najkraćem mogućem roku' },
          { title: 'Podrška klijentima', text: 'Naš tim je tu za vas od konsultacija do finalne montaže' },
        ],
        ctaPrefix: 'Zainteresirani ste za ovaj proizvod?',
        ctaDescription: 'Kontaktirajte nas za besplatnu ponudu i profesionalan savjet za vaš projekat.',
        ctaContactText: 'Kontakt',
        ctaPhoneText: 'Pozovite nas',
        statCustomizableValue: '100%',
        statCustomizableLabel: 'prilagodljivo',
        statDeliveryValue: 'Brza',
        statDeliveryLabel: 'isporuka',
        exploreCategoriesTitle: 'Istražite druge kategorije',
        exploreCategoriesSubtitle: 'Pogledajte i ostale kategorije proizvoda iz naše ponude.',
        productsCountLabel: 'proizvoda',
        backToAllText: 'Nazad na sve proizvode',
      },
      itemPage: {
        aboutTitle: 'O proizvodu',
        aboutParagraph1: 'Ovaj proizvod nudi profesionalna rješenja prilagođena vašim potrebama. Sa pažnjom prema detaljima i korištenjem najmodernijih tehnologija, garantujemo rezultate koji nadmašuju očekivanja.',
        aboutParagraph2: 'Naš stručni tim prati najnovije trendove u industriji, koristeći inovativne materijale i tehnike za kreiranje proizvoda koji ostavljaju trajan dojam.',
        uspCards: [
          { title: 'Kvalitet', text: 'Koristimo premium materijale za dugotrajne rezultate' },
          { title: 'Dizajn', text: 'Prilagođeni dizajn prema vašim specifičnim zahtjevima' },
          { title: 'Montaža', text: 'Profesionalna montaža i instalacija na lokaciji' },
        ],
        whyTitle: 'Zašto izabrati nas?',
        advantages: [
          { text: 'Više od 15 godina iskustva u industriji' },
          { text: 'Najmodernije mašine i tehnologije' },
          { text: 'Kompletna usluga od dizajna do montaže' },
          { text: 'Konkurentne cijene i fleksibilni rokovi' },
          { text: 'Podrška nakon isporuke' },
        ],
        viewAllText: 'Pogledaj sve proizvode',
        processTitle: 'Proces izrade',
        processSubtitle: 'Od upita do gotovog proizvoda — transparentan i efikasan proces.',
        processSteps: [
          { title: 'Konsultacije', text: 'Razumijevanje vaših potreba i ciljeva' },
          { title: 'Dizajn', text: 'Kreiranje ili prilagodba dizajna' },
          { title: 'Proizvodnja', text: 'Izrada vrhunskim mašinama i materijalima' },
          { title: 'Montaža', text: 'Profesionalna instalacija i završna kontrola' },
        ],
        galleryTitle: 'Galerija',
        ctaPrefix: 'Zainteresirani za ovaj proizvod?',
        ctaDescription: 'Kontaktirajte nas za besplatnu ponudu i profesionalan savjet za vaš projekat.',
        ctaContactText: 'Kontakt',
        ctaPhoneText: 'Pozovite nas',
        relatedTitle: 'Ostalo iz kategorije',
        relatedSubtitle: 'Istražite još {n} proizvoda iz iste kategorije.',
        exploreCategoriesTitle: 'Istražite druge kategorije',
        exploreCategoriesSubtitle: 'Pogledajte i ostale kategorije proizvoda iz naše ponude.',
        backText: 'Nazad na',
      },
    },
  })

  console.log('🔍 Seeding ProductDetailPage (EN)...')
  const bsProductDetailPage = await payload.findGlobal({ slug: 'product-detail-page' as any } as any) as any
  await payload.updateGlobal({
    slug: 'product-detail-page',
    locale: 'en',
    data: injectIds(bsProductDetailPage, {
      breadcrumbHome: 'Home',
      breadcrumbProducts: 'Products',
      categoryPage: {
        availableTitle: 'Available Products',
        availableSubtitle: 'Select a product for detailed information, gallery and customization options.',
        learnMoreText: 'Learn more',
        whyTitle: 'Why choose us?',
        whySubtitle: 'Quality, speed and reliability — our core principles from the very beginning.',
        whyCards: [
          { title: 'Professional production', text: 'We use state-of-the-art machines and technologies for every product' },
          { title: 'Individual approach', text: 'We tailor every project to the specific needs of the client' },
          { title: 'Fast turnaround', text: 'From order to delivery in the shortest possible time' },
          { title: 'Client support', text: 'Our team is here for you from consultations to final installation' },
        ],
        ctaPrefix: 'Interested in this product?',
        ctaDescription: 'Contact us for a free quote and professional advice for your project.',
        ctaContactText: 'Contact',
        ctaPhoneText: 'Call us',
        statCustomizableValue: '100%',
        statCustomizableLabel: 'customizable',
        statDeliveryValue: 'Fast',
        statDeliveryLabel: 'delivery',
        exploreCategoriesTitle: 'Explore other categories',
        exploreCategoriesSubtitle: 'Check out other product categories from our offering.',
        productsCountLabel: 'products',
        backToAllText: 'Back to all products',
      },
      itemPage: {
        aboutTitle: 'About the product',
        aboutParagraph1: 'This product offers professional solutions tailored to your needs. With attention to detail and using the latest technologies, we guarantee results that exceed expectations.',
        aboutParagraph2: 'Our expert team follows the latest industry trends, using innovative materials and techniques to create products that leave a lasting impression.',
        uspCards: [
          { title: 'Quality', text: 'We use premium materials for long-lasting results' },
          { title: 'Design', text: 'Customized design according to your specific requirements' },
          { title: 'Installation', text: 'Professional on-site installation and setup' },
        ],
        whyTitle: 'Why choose us?',
        advantages: [
          { text: 'Over 15 years of industry experience' },
          { text: 'State-of-the-art machines and technologies' },
          { text: 'Complete service from design to installation' },
          { text: 'Competitive prices and flexible deadlines' },
          { text: 'Post-delivery support' },
        ],
        viewAllText: 'View all products',
        processTitle: 'Production process',
        processSubtitle: 'From inquiry to finished product — a transparent and efficient process.',
        processSteps: [
          { title: 'Consultation', text: 'Understanding your needs and goals' },
          { title: 'Design', text: 'Creating or adapting the design' },
          { title: 'Production', text: 'Manufacturing with premium machines and materials' },
          { title: 'Installation', text: 'Professional installation and final inspection' },
        ],
        galleryTitle: 'Gallery',
        ctaPrefix: 'Interested in this product?',
        ctaDescription: 'Contact us for a free quote and professional advice for your project.',
        ctaContactText: 'Contact',
        ctaPhoneText: 'Call us',
        relatedTitle: 'More from this category',
        relatedSubtitle: 'Explore {n} more products from the same category.',
        exploreCategoriesTitle: 'Explore other categories',
        exploreCategoriesSubtitle: 'Check out other product categories from our offering.',
        backText: 'Back to',
      },
    }),
  })

  // ──────────────────────────────────────────────
  // 13. NEWS DETAIL PAGE
  // ──────────────────────────────────────────────
  console.log('📰 Seeding NewsDetailPage (BS)...')
  await payload.updateGlobal({
    slug: 'news-detail-page',
    data: {
      breadcrumbHome: 'Početna',
      breadcrumbNews: 'Novosti',
      featuredImagePlaceholder: 'Istaknuta slika',
      backToAllText: 'Nazad na sve članke',
      relatedTitle: 'Povezani članci',
      readTimeUnit: 'min čitanja',
    },
  })

  console.log('📰 Seeding NewsDetailPage (EN)...')
  await payload.updateGlobal({
    slug: 'news-detail-page',
    locale: 'en',
    data: {
      breadcrumbHome: 'Home',
      breadcrumbNews: 'News',
      featuredImagePlaceholder: 'Featured image',
      backToAllText: 'Back to all articles',
      relatedTitle: 'Related articles',
      readTimeUnit: 'min read',
    },
  })

  // ══════════════════════════════════════════════
  // SEED COLLECTIONS
  // ══════════════════════════════════════════════

  // ──────────────────────────────────────────────
  // MATERIAL CATEGORIES
  // ──────────────────────────────────────────────
  console.log('📂 Seeding MaterialCategories...')

  const matCat1 = await payload.create({
    collection: 'material-categories',
    data: {
      title: 'UV / Ecosolvent / Latex',
      slug: 'uv-ecosolvent-latex',
      description: 'Široki spektar materijala za solventnu, ecosolventnu i latex štampu.',
      color: 'from-cyan-500 to-blue-600',
      sortOrder: 1,
    },
  })
  await payload.update({
    collection: 'material-categories',
    id: matCat1.id,
    locale: 'en',
    data: {
      title: 'UV / Ecosolvent / Latex',
      description: 'Wide range of materials for solvent, ecosolvent and latex printing.',
    },
  })

  const matCat2 = await payload.create({
    collection: 'material-categories',
    data: {
      title: 'UV Direktni Print',
      slug: 'uv-direktni-print',
      description: 'Direktan UV print na tvrde materijale.',
      color: 'from-violet-500 to-purple-600',
      sortOrder: 2,
    },
  })
  await payload.update({
    collection: 'material-categories',
    id: matCat2.id,
    locale: 'en',
    data: {
      title: 'UV Direct Print',
      description: 'Direct UV printing on rigid materials.',
    },
  })

  const matCat3 = await payload.create({
    collection: 'material-categories',
    data: {
      title: 'CNC',
      slug: 'cnc',
      description: 'CNC obrada i rezanje različitih materijala.',
      color: 'from-orange-500 to-red-600',
      sortOrder: 3,
    },
  })
  await payload.update({
    collection: 'material-categories',
    id: matCat3.id,
    locale: 'en',
    data: {
      title: 'CNC',
      description: 'CNC processing and cutting of various materials.',
    },
  })

  const matCat4 = await payload.create({
    collection: 'material-categories',
    data: {
      title: 'Laser',
      slug: 'laser',
      description: 'Lasersko graviranje i precizno rezanje.',
      color: 'from-emerald-500 to-teal-600',
      sortOrder: 4,
    },
  })
  await payload.update({
    collection: 'material-categories',
    id: matCat4.id,
    locale: 'en',
    data: {
      title: 'Laser',
      description: 'Laser engraving and precision cutting.',
    },
  })

  // ──────────────────────────────────────────────
  // PRODUCT CATEGORIES
  // ──────────────────────────────────────────────
  console.log('📂 Seeding ProductCategories...')

  const prodCat1 = await payload.create({
    collection: 'product-categories',
    data: {
      title: 'Brendiranje',
      slug: 'brendiranje',
      description: 'Profesionalno brendiranje vozila, prostora i predmeta.',
      color: 'from-violet-500 to-purple-700',
      sortOrder: 1,
    },
  })
  await payload.update({
    collection: 'product-categories',
    id: prodCat1.id,
    locale: 'en',
    data: {
      title: 'Branding',
      description: 'Professional branding of vehicles, spaces and objects.',
    },
  })

  const prodCat2 = await payload.create({
    collection: 'product-categories',
    data: {
      title: 'Outdoor / Indoor',
      slug: 'outdoor-indoor',
      description: 'Vanjska i unutrašnja reklamna rješenja.',
      color: 'from-cyan-500 to-blue-700',
      sortOrder: 2,
    },
  })
  await payload.update({
    collection: 'product-categories',
    id: prodCat2.id,
    locale: 'en',
    data: {
      title: 'Outdoor / Indoor',
      description: 'Outdoor and indoor advertising solutions.',
    },
  })

  const prodCat3 = await payload.create({
    collection: 'product-categories',
    data: {
      title: 'Home & Office',
      slug: 'home-and-office',
      description: 'Dekorativna i funkcionalna rješenja za dom i ured.',
      color: 'from-amber-500 to-orange-700',
      sortOrder: 3,
    },
  })
  await payload.update({
    collection: 'product-categories',
    id: prodCat3.id,
    locale: 'en',
    data: {
      title: 'Home & Office',
      description: 'Decorative and functional solutions for home and office.',
    },
  })

  const prodCat4 = await payload.create({
    collection: 'product-categories',
    data: {
      title: 'Promo / POS',
      slug: 'promo-pos',
      description: 'Promotivni materijali i POS rješenja.',
      color: 'from-rose-500 to-pink-700',
      sortOrder: 4,
    },
  })
  await payload.update({
    collection: 'product-categories',
    id: prodCat4.id,
    locale: 'en',
    data: {
      title: 'Promo / POS',
      description: 'Promotional materials and POS solutions.',
    },
  })

  // ──────────────────────────────────────────────
  // MATERIAL ITEMS
  // ──────────────────────────────────────────────
  console.log('🧩 Seeding MaterialItems...')

  // Helper function for creating material items
  async function createMaterialItem(
    bsName: string,
    enName: string,
    slug: string,
    categoryId: number | string,
    bsDesc: string,
    enDesc: string,
    image: string,
    sortOrder: number,
  ) {
    const doc = await payload.create({
      collection: 'material-items',
      data: {
        name: bsName,
        slug,
        category: categoryId,
        description: bsDesc,
        uploadedImage: await m(image, bsName),
        sortOrder,
      },
    })
    await payload.update({
      collection: 'material-items',
      id: doc.id,
      locale: 'en',
      data: {
        name: enName,
        description: enDesc,
      },
    })
    return doc
  }

  // --- UV / Ecosolvent / Latex items (9) ---
  await createMaterialItem(
    'PVC Naljepnice', 'PVC Stickers', 'pvc-naljepnice', matCat1.id,
    'Vinil naljepnice za unutrašnju i vanjsku upotrebu sa dugotrajnom postojanošću boja.',
    'Vinyl stickers for indoor and outdoor use with long-lasting color durability.',
    '/Materials/PVC%20Naljepnice/pvc%20naljepnice1.jpg', 1,
  )
  await createMaterialItem(
    'One Way Vision', 'One Way Vision', 'one-way-vision', matCat1.id,
    'Perforirani materijal za stakla koji omogućava pogled iznutra, a reklamnu poruku izvana.',
    'Perforated material for glass that allows interior visibility while displaying advertising outside.',
    '/Materials/One%20Way%20Vision/one%20way%20vision1.jpg', 2,
  )
  await createMaterialItem(
    'Back Light', 'Back Light', 'back-light', matCat1.id,
    'Translucenti materijal za osvjetljene reklame i svjetlosne kutije.',
    'Translucent material for illuminated signs and light boxes.',
    '/Materials/Back%20Light/back%20light1.jpg', 3,
  )
  await createMaterialItem(
    'Banner / Textilni Banner / Flag', 'Banner / Textile Banner / Flag', 'banner-textilni-banner-flag', matCat1.id,
    'Izdržljivi banneri i zastave za vanjsku i unutrašnju reklamu.',
    'Durable banners and flags for outdoor and indoor advertising.',
    '/Materials/Banner%20%20Textilni%20Banner%20%20Flag/banner%20%20textilni%20banner%20%20flag1.jpg', 4,
  )
  await createMaterialItem(
    'Cerade / Kamionske', 'Tarpaulins / Truck Covers', 'cerade-kamionske', matCat1.id,
    'Robusne cerade za kamione i industrijske primjene.',
    'Robust tarpaulins for trucks and industrial applications.',
    '/Materials/Cerade%20Kamionske/cerade%20kamionske1.jpg', 5,
  )
  await createMaterialItem(
    'Canvas', 'Canvas', 'canvas', matCat1.id,
    'Platno za umjetničke reprodukcije i dekorativne aplikacije.',
    'Canvas for art reproductions and decorative applications.',
    '/Materials/Canvas/canvas1.jpg', 6,
  )
  await createMaterialItem(
    'Tapete', 'Wallpapers', 'tapete', matCat1.id,
    'Prilagođene tapete za personaliziranu dekoraciju prostora.',
    'Custom wallpapers for personalized space decoration.',
    '/Materials/Tapete/tapete1.jpg', 7,
  )
  await createMaterialItem(
    'Podna Grafika', 'Floor Graphics', 'podna-grafika', matCat1.id,
    'Otporne grafike za podove sa protukliznom površinom.',
    'Durable floor graphics with anti-slip surface.',
    '/Materials/Podna%20Grafika/podna%20grafika1.jpg', 8,
  )
  await createMaterialItem(
    'Poster Papir', 'Poster Paper', 'poster-papir', matCat1.id,
    'Visokokvalitetni papir za postere i plakate.',
    'High-quality paper for posters and placards.',
    '/Materials/Poster%20Papir/poster%20papir1.jpg', 9,
  )

  // --- UV Direktni Print items (7) ---
  await createMaterialItem(
    'Staklo', 'Glass', 'staklo', matCat2.id,
    'Direktan UV print na staklo za dekorativne i funkcionalne primjene.',
    'Direct UV printing on glass for decorative and functional applications.',
    '/Materials/Staklo/staklo.jpg', 1,
  )
  await createMaterialItem(
    'Drvo', 'Wood', 'drvo', matCat2.id,
    'UV print na drvene površine za jedinstvene dekorativne efekte.',
    'UV printing on wooden surfaces for unique decorative effects.',
    '/Materials/Drvo/Drvo.jpg', 2,
  )
  await createMaterialItem(
    'Forex', 'Forex', 'forex', matCat2.id,
    'Lagane PVC ploče idealne za unutrašnju signalizaciju i reklamu.',
    'Lightweight PVC boards ideal for indoor signage and advertising.',
    '/Materials/Forex/forex.jpg', 3,
  )
  await createMaterialItem(
    'Plexiglass', 'Plexiglass', 'plexiglass', matCat2.id,
    'Transparentne akrilne ploče za elegantna i moderna rješenja.',
    'Transparent acrylic panels for elegant and modern solutions.',
    '/Materials/Plexiglass/plexiglass.jpg', 4,
  )
  await createMaterialItem(
    'Kapaline', 'Kapaline', 'kapaline', matCat2.id,
    'Lagane pjenaste ploče idealne za POS materijale i izložbe.',
    'Lightweight foam boards ideal for POS materials and exhibitions.',
    '/Materials/Kapaline/kapaline.jpg', 5,
  )
  await createMaterialItem(
    'Alu Bond', 'Alu Bond', 'alu-bond', matCat2.id,
    'Aluminijske kompozitne ploče za profesionalnu vanjsku signalizaciju.',
    'Aluminium composite panels for professional outdoor signage.',
    '/Materials/Alu%20Bond/alu%20bond1.jpg', 6,
  )
  await createMaterialItem(
    'MDF', 'MDF', 'mdf', matCat2.id,
    'Srednje gustoća vlaknatica za unutrašnju dekoraciju i signalizaciju.',
    'Medium-density fiberboard for interior decoration and signage.',
    '/Materials/MDF/mdf.jpg', 7,
  )

  // --- CNC items (9) ---
  await createMaterialItem(
    'MDF', 'MDF', 'cnc-mdf', matCat3.id,
    'CNC obrada MDF ploča za precizne oblike i detalje.',
    'CNC processing of MDF boards for precise shapes and details.',
    '/Materials/MDF/mdf.jpg', 1,
  )
  await createMaterialItem(
    'Iverica', 'Chipboard', 'iverica', matCat3.id,
    'CNC rezanje iverice za namještaj i unutrašnje obrade.',
    'CNC cutting of chipboard for furniture and interior applications.',
    '/Materials/Iverica/iverica.jpg', 2,
  )
  await createMaterialItem(
    'Špera', 'Plywood', 'spera', matCat3.id,
    'CNC obrada šperploča za strukturalne i dekorativne elemente.',
    'CNC processing of plywood for structural and decorative elements.',
    '/Materials/%C5%A0pera%20Drvo/%C5%A1pera1.jpg', 3,
  )
  await createMaterialItem(
    'Aluminij', 'Aluminium', 'aluminij', matCat3.id,
    'Precizno CNC rezanje aluminijuma za industrijske i reklamne primjene.',
    'Precision CNC cutting of aluminium for industrial and advertising applications.',
    '/Materials/Aluminijum/aluminijum1.png', 4,
  )
  await createMaterialItem(
    'Forex / Plastika', 'Forex / Plastic', 'forex-plastika', matCat3.id,
    'CNC obrada Forexa i plastičnih materijala za signalizaciju.',
    'CNC processing of Forex and plastic materials for signage.',
    '/Materials/Forex/forex.jpg', 5,
  )
  await createMaterialItem(
    'Plexiglass', 'Plexiglass', 'cnc-plexiglass', matCat3.id,
    'Precizno CNC rezanje plexiglasa za dekorativne i funkcionalne elemente.',
    'Precision CNC cutting of plexiglass for decorative and functional elements.',
    '/Materials/Plexiglass/plexiglass.jpg', 6,
  )
  await createMaterialItem(
    'Medijapan', 'MDF Board', 'medijapan', matCat3.id,
    'CNC obrada medijapana za unutrašnju dekoraciju i oblikovanje.',
    'CNC processing of MDF board for interior decoration and shaping.',
    '/Materials/Medijapan/medijapan1.jpg', 7,
  )
  await createMaterialItem(
    'Drvo', 'Wood', 'cnc-drvo', matCat3.id,
    'CNC rezanje i oblikovanje drveta za razne projekte.',
    'CNC cutting and shaping of wood for various projects.',
    '/Materials/Drvo/Drvo.jpg', 8,
  )
  await createMaterialItem(
    'Plastični Karton / Akyplac', 'Plastic Cardboard / Akyplac', 'plasticni-karton-akyplac', matCat3.id,
    'CNC obrada plastičnog kartona za reklamne i POS materijale.',
    'CNC processing of plastic cardboard for advertising and POS materials.',
    '/Materials/Plasti%C4%8Dni%20Karton%20Akyplac/plasti%C4%8Dni%20karton%20akyplac1.jpg', 9,
  )

  // --- Laser items (5) ---
  await createMaterialItem(
    'Kapafix', 'Kapafix', 'kapafix', matCat4.id,
    'Lasersko rezanje kapafixa za precizne oblike i detalje.',
    'Laser cutting of kapafix for precise shapes and details.',
    '/Materials/Kapafix/kapafix.jpg', 1,
  )
  await createMaterialItem(
    'Plexiglass', 'Plexiglass', 'laser-plexiglass', matCat4.id,
    'Lasersko graviranje i rezanje plexiglasa za elegantne proizvode.',
    'Laser engraving and cutting of plexiglass for elegant products.',
    '/Materials/Plexiglass/plexiglass.jpg', 2,
  )
  await createMaterialItem(
    'Koža', 'Leather', 'koza', matCat4.id,
    'Lasersko graviranje na koži za personalizirane proizvode.',
    'Laser engraving on leather for personalized products.',
    '/Materials/Ko%C5%BEa/ko%C5%BEa1.jpg', 3,
  )
  await createMaterialItem(
    'Papir / Karton', 'Paper / Cardboard', 'papir-karton', matCat4.id,
    'Precizno lasersko rezanje papira i kartona za složene oblike.',
    'Precision laser cutting of paper and cardboard for complex shapes.',
    '/Materials/Karton/karton.jpg', 4,
  )
  await createMaterialItem(
    'Špera / Drvo', 'Plywood / Wood', 'spera-drvo', matCat4.id,
    'Lasersko graviranje i rezanje šperploča i drveta.',
    'Laser engraving and cutting of plywood and wood.',
    '/Materials/%C5%A0pera%20Drvo/%C5%A1pera.jpg', 5,
  )

  // ──────────────────────────────────────────────
  // PRODUCT ITEMS
  // ──────────────────────────────────────────────
  console.log('🧩 Seeding ProductItems...')

  async function createProductItem(
    bsName: string,
    enName: string,
    slug: string,
    categoryId: number | string,
    bsDesc: string,
    enDesc: string,
    image: string,
    sortOrder: number,
  ) {
    const doc = await payload.create({
      collection: 'product-items',
      data: {
        name: bsName,
        slug,
        category: categoryId,
        description: bsDesc,
        uploadedImage: await m(image, bsName),
        sortOrder,
      },
    })
    await payload.update({
      collection: 'product-items',
      id: doc.id,
      locale: 'en',
      data: {
        name: enName,
        description: enDesc,
      },
    })
    return doc
  }

  // --- Brendiranje items (4) ---
  await createProductItem(
    'Brendiranje Poslovnih Prostora', 'Business Space Branding', 'poslovnih-stambenih-prostora', prodCat1.id,
    'Kompletno brendiranje poslovnih i stambenih prostora sa profesionalnim dizajnom.',
    'Complete branding of business and residential spaces with professional design.',
    '/Products/Brendiranje%20Poslovnih%20Prostora/Brendiranje%20poslovnih%20prostora1.jpg', 1,
  )
  await createProductItem(
    'Brendiranje Vozila', 'Vehicle Branding', 'vozila', prodCat1.id,
    'Profesionalno brendiranje vozila sa dugotrajnim materijalima.',
    'Professional vehicle branding with durable materials.',
    '/Products/Brandiranje%20Vozila/brandiranje%20vozila1.jpg', 2,
  )
  await createProductItem(
    'Brendiranje Predmeta', 'Object Branding', 'predmeta', prodCat1.id,
    'Personalizacija predmeta i reklamnih materijala sa vašim brendom.',
    'Personalization of objects and promotional materials with your brand.',
    '/Products/Brendiranje%20Predmeta/Brendiranje%20predmeta1.jpg', 3,
  )
  await createProductItem(
    'Brendiranje Stajališta', 'Bus Stop Branding', 'stajalista', prodCat1.id,
    'Brendiranje autobuskih stajališta za maksimalnu vidljivost reklame.',
    'Bus stop branding for maximum advertising visibility.',
    '/Products/Brendiranje%20Stajali%C5%A1ta/brendiranje%20stajali%C5%A1ta1.jpg', 4,
  )

  // --- Outdoor / Indoor items (7) ---
  await createProductItem(
    'Wallscape', 'Wallscape', 'wallscape', prodCat2.id,
    'Velikoformatne zidne reklame za maksimalni vizuelni impakt.',
    'Large format wall advertisements for maximum visual impact.',
    '/Products/Wallscape/wallscape.jpg', 1,
  )
  await createProductItem(
    'Bilbord', 'Billboard', 'billboard', prodCat2.id,
    'Profesionalni bilbordi za efikasno oglašavanje na otvorenom.',
    'Professional billboards for effective outdoor advertising.',
    '/Products/Bilbord/bilbord.jpg', 2,
  )
  await createProductItem(
    'Banneri', 'Banners', 'banneri', prodCat2.id,
    'Izdržljivi i kvalitetni banneri za unutrašnju i vanjsku upotrebu.',
    'Durable and high-quality banners for indoor and outdoor use.',
    '/Products/Banneri/banneri.jpg', 3,
  )
  await createProductItem(
    'Cerade Kamionske', 'Truck Tarpaulins', 'cerade-kamionske', prodCat2.id,
    'Robusne kamionske cerade sa custom printom.',
    'Robust truck tarpaulins with custom printing.',
    '/Products/Cerade%20Kamionske/cerade%20kamionske1.jpg', 4,
  )
  await createProductItem(
    'Mesh', 'Mesh', 'mesh', prodCat2.id,
    'Propusne mesh mreže za velikoformatne reklame na fasadama.',
    'Breathable mesh nets for large format advertisements on facades.',
    '/Products/Mesh/mesh.jpg', 5,
  )
  await createProductItem(
    'City Light', 'City Light', 'city-light', prodCat2.id,
    'Iluminirani reklamni paneli za gradske sredine.',
    'Illuminated advertising panels for urban environments.',
    '/Products/City%20Light/city%20light1.jpg', 6,
  )
  await createProductItem(
    'Svijetleća Reklama', 'Light-up Signage', 'svijetlece-reklame', prodCat2.id,
    'Svijetleće reklame i svjetlosni natpisi za poslovne prostore.',
    'Light-up signage and illuminated signs for business premises.',
    '/Products/Svijetle%C4%87a%20Reklama/svijetle%C4%87a%20reklama1.png', 7,
  )

  // --- Home & Office items (7) ---
  await createProductItem(
    'Home Dekor', 'Home Decor', 'home-dekor-assesoar', prodCat3.id,
    'Dekorativni elementi za personalizaciju vašeg doma.',
    'Decorative elements for personalizing your home.',
    '/Products/Home%20Dekor/home%20dekor1.jpg', 1,
  )
  await createProductItem(
    'Wall Art', 'Wall Art', 'wall-art', prodCat3.id,
    'Umjetničke zidne dekoracije visokog kvaliteta.',
    'High-quality artistic wall decorations.',
    '/Products/Wall%20Art/wall%20art1.jpg', 2,
  )
  await createProductItem(
    '3D Zidni Paneli', '3D Wall Panels', '3d-zidni-paneli', prodCat3.id,
    'Trodimenzionalni zidni paneli za moderan izgled prostora.',
    'Three-dimensional wall panels for a modern look.',
    '/Products/3D%20zidni%20paneli/3dzidni1.jpg', 3,
  )
  await createProductItem(
    'Pregrade', 'Partitions', 'pregrade', prodCat3.id,
    'Funkcionalne i dekorativne pregrade za poslovne prostore.',
    'Functional and decorative partitions for business spaces.',
    '/Products/Pregrade/pregrade.jpg', 4,
  )
  await createProductItem(
    'Informativne Oznake', 'Informational Signs', 'informativne-oznake', prodCat3.id,
    'Profesionalne informativne oznake za poslovne prostore i javne objekte.',
    'Professional informational signs for business premises and public buildings.',
    '/Products/Informativne%20Oznake/informativne%20oznake1.jpg', 5,
  )
  await createProductItem(
    'Info Display', 'Info Display', 'info-display', prodCat3.id,
    'Info displayi i stalci za prezentacije i izložbe.',
    'Info displays and stands for presentations and exhibitions.',
    '/Products/Info%20Display/info%20display1.jpg', 6,
  )
  await createProductItem(
    'Kancelarijski Materijali', 'Office Supplies', 'kancelarijski-materijal', prodCat3.id,
    'Brendirani kancelarijski materijali za profesionalan poslovni identitet.',
    'Branded office supplies for a professional business identity.',
    '/Products/Kancelarijski%20Materijali/kancelarijski%20materijali1.jpg', 7,
  )

  // --- Promo / POS items (6) ---
  await createProductItem(
    'Štandovi', 'Stands', 'standovi', prodCat4.id,
    'Profesionalni promotivni štandovi za sajmove i prezentacije.',
    'Professional promotional stands for fairs and presentations.',
    '/Products/%C5%A0tandovi/%C5%A1tandovi1.jpg', 1,
  )
  await createProductItem(
    'Plex Stalaže', 'Plex Shelves', 'plex', prodCat4.id,
    'Plexiglass stalaže za atraktivno izlaganje proizvoda.',
    'Plexiglass shelves for attractive product display.',
    '/Products/Plex%20Stala%C5%BEe/plex%20stalaze1.jpg', 2,
  )
  await createProductItem(
    'Sajamski Elementi', 'Exhibition Elements', 'sajamski-elementi', prodCat4.id,
    'Kompletna oprema za sajamske nastupe i izložbe.',
    'Complete equipment for trade show appearances and exhibitions.',
    '/Products/Sajamski%20Elementi/sajamski%20elementi1.jpg', 3,
  )
  await createProductItem(
    'Vobleri / Table Tent', 'Wobblers / Table Tent', 'vobleri-table-tent', prodCat4.id,
    'POS materijali za efikasnu promociju na prodajnim mjestima.',
    'POS materials for effective promotion at points of sale.',
    '/Products/Vobleri%20Table%20Tent/vobleri%20table%20tent1.jpg', 4,
  )
  await createProductItem(
    'Senzormatici', 'Sensormats', 'senzormatici', prodCat4.id,
    'Interaktivne senzormatice za podne reklame i promocije.',
    'Interactive sensormats for floor advertising and promotions.',
    '/Products/Senzormatici/senzormatici.jpg', 5,
  )
  await createProductItem(
    'Showcard', 'Showcard', 'showcard', prodCat4.id,
    'Kartonski displayi za prezentaciju proizvoda na prodajnim mjestima.',
    'Cardboard displays for product presentation at points of sale.',
    '/Products/Showcard/showcard.jpg', 6,
  )

  // ──────────────────────────────────────────────
  // NEWS ARTICLES (matching Prinoz data/news.ts)
  // ──────────────────────────────────────────────
  console.log('📰 Seeding NewsArticles...')

  const news1 = await payload.create({
    collection: 'news-articles',
    data: {
      title: 'Novi ekološki materijali za štampu',
      slug: 'eco-friendly-printing-materials',
      excerpt: 'Sa zadovoljstvom predstavljamo novu liniju održivih, ekoloških materijala za štampu koji smanjuju utjecaj na okoliš bez kompromitiranja kvaliteta.',
      contentMarkdown: `Sa ponosom predstavljamo našu potpuno novu liniju ekoloških materijala za štampu, dizajniranih da smanje utjecaj na okoliš uz održavanje visokog kvaliteta koji naši klijenti očekuju.

Naši novi održivi materijali uključuju reciklirani papir, biorazgradivi vinil i biljne tinte koje proizvode živopisne boje bez štetnih hemikalija. Ovi materijali su savršeni za firme koje žele smanjiti svoj ekološki otisak bez žrtvovanja kvaliteta štampe.

## Šta je novo?

- **Reciklirani papir** — Dostupan u raznim gramaturama i završnim obradama, naš reciklirani papir je napravljen od 100% post-potrošačkog otpada i potpuno je reciklabilan.
- **Biorazgradivi vinil** — Naš novi vinil materijal se prirodno razgrađuje tokom vremena, što ga čini idealnim za privremenu signalizaciju i materijale za događaje.
- **Biljne tinte** — Dobivene iz sojinog i biljnog ulja, ove tinte proizvode bogate, živopisne boje uz blagođi utjecaj na okoliš.

## Zašto izabrati ekološke materijale?

Održivost nije samo trend — to je odgovornost. Odabirom ekoloških materijala za štampu, pozitivno utječete na okoliš dok istovremeno šaljete snažnu poruku vašim klijentima o vrijednostima vašeg brenda.

Kontaktirajte nas danas da saznate više o našim ekološkim opcijama i kako mogu funkcionisati za vaš sljedeći projekat.`,
      uploadedImage: await m('/Materials/Canvas/canvas3.jpg'),
      date: '20. feb 2026.',
      category: 'Održivost',
      author: 'BSC Tim',
      readTime: '4 min čitanja',
    },
  })
  await payload.update({
    collection: 'news-articles',
    id: news1.id,
    locale: 'en',
    data: {
      title: 'New eco-friendly printing materials',
      excerpt: 'We are pleased to introduce a new line of sustainable, eco-friendly printing materials that reduce environmental impact without compromising quality.',
      contentMarkdown: `We are proud to introduce our brand new line of eco-friendly printing materials, designed to reduce environmental impact while maintaining the high quality our clients expect.

Our new sustainable materials include recycled paper, biodegradable vinyl, and plant-based inks that produce vivid colors without harmful chemicals. These materials are perfect for businesses looking to reduce their ecological footprint without sacrificing print quality.

## What's new?

- **Recycled paper** — Available in various weights and finishes, our recycled paper is made from 100% post-consumer waste and is fully recyclable.
- **Biodegradable vinyl** — Our new vinyl material naturally degrades over time, making it ideal for temporary signage and event materials.
- **Plant-based inks** — Derived from soy and vegetable oils, these inks produce rich, vivid colors with a gentler environmental impact.

## Why choose eco-friendly materials?

Sustainability is not just a trend — it's a responsibility. By choosing eco-friendly printing materials, you positively impact the environment while sending a strong message to your clients about your brand values.

Contact us today to learn more about our eco-friendly options and how they can work for your next project.`,
      category: 'Sustainability',
      readTime: '4 min read',
    },
  })

  const news2 = await payload.create({
    collection: 'news-articles',
    data: {
      title: 'Rješenja za brendiranje ambalaže za mala preduzeća',
      slug: 'custom-packaging-small-businesses',
      excerpt: 'Otkrijte kako naše nove opcije brendiranja ambalaže mogu pomoći vašem malom preduzeću da se istakne i ostavi trajni utisak na klijente.',
      contentMarkdown: `Na današnjem konkurentnom tržištu, ambalaža je više od obične kutije — to je moćan alat za brendiranje. Sa zadovoljstvom nudimo nova rješenja za brendiranje ambalaže dizajnirana posebno za mala preduzeća.

## Istaknite se iz mase

Prvi utisak je važan, a vaša ambalaža je često prva fizička interakcija koju klijent ima s vašim brendom. Naše opcije vam omogućavaju da kreirate nezaboravno iskustvo koje odražava osobnost vašeg brenda.

## Naše opcije

- **Brendirane kutije** — Birajte između raznih veličina, oblika i završnih obrada. Dodajte vaš logo, boje brenda i poruku za potpuno personalizirano pakovanje.
- **Brendirani papir** — Umotajte vaše proizvode u štampani papir koji dodaje dozu luksuza svakoj narudžbi.
- **Naljepnice i etikete** — Zatvorite vaša pakovanja s brendiranim naljepnicama ili dodajte etikete proizvoda koje pojačavaju identitet vašeg brenda.
- **Brendirana traka** — Čak i vaša traka za pakovanje može nositi poruku vašeg brenda.

## Pristupačno za mala preduzeća

Razumijemo da mala preduzeća imaju ograničen budžet. Zato smo dizajnirali naša rješenja da budu pristupačna, sa malim minimalnim narudžbama i konkurentnim cijenama.

Započnite danas uz besplatnu konsultaciju!`,
      uploadedImage: await m('/Products/Brendiranje%20Predmeta/Brendiranje%20predmeta3.jpg'),
      date: '15. feb 2026.',
      category: 'Proizvodi',
      author: 'BSC Tim',
      readTime: '5 min čitanja',
    },
  })
  await payload.update({
    collection: 'news-articles',
    id: news2.id,
    locale: 'en',
    data: {
      title: 'Packaging branding solutions for small businesses',
      excerpt: 'Discover how our new packaging branding options can help your small business stand out and leave a lasting impression on clients.',
      contentMarkdown: `In today's competitive market, packaging is more than just a box — it's a powerful branding tool. We are pleased to offer new packaging branding solutions designed specifically for small businesses.

## Stand out from the crowd

First impressions matter, and your packaging is often the first physical interaction a client has with your brand. Our options allow you to create an unforgettable experience that reflects your brand personality.

## Our options

- **Branded boxes** — Choose from various sizes, shapes, and finishes. Add your logo, brand colors, and messaging for fully personalized packaging.
- **Branded paper** — Wrap your products in printed paper that adds a touch of luxury to every order.
- **Stickers and labels** — Seal your packages with branded stickers or add product labels that reinforce your brand identity.
- **Branded tape** — Even your packaging tape can carry your brand message.

## Affordable for small businesses

We understand that small businesses have limited budgets. That's why we've designed our solutions to be affordable, with small minimum orders and competitive prices.

Start today with a free consultation!`,
      category: 'Products',
      readTime: '5 min read',
    },
  })

  const news3 = await payload.create({
    collection: 'news-articles',
    data: {
      title: 'Savjeti za dizajn i savršen rezultat štampe',
      slug: 'design-tips-perfect-print',
      excerpt: 'Naučite top savjete za dizajn i tehnike pripreme fajlova koje osiguravaju da vaše štampe izgledaju tačno onako kako ste zamislili.',
      contentMarkdown: `Savršeni rezultati štampe počinju mnogo prije nego što vaš fajl dođe do štampača. Evo naših top savjeta za dizajn koji osiguravaju da vaše štampe izgledaju tačno onako kako ste zamislili.

## 1. Koristite CMYK režim boja

Uvijek dizajnirajte u CMYK režimu boja za projekte štampe. RGB je samo za ekrane — ako pošaljete RGB fajl, boje se mogu promijeniti tokom procesa konverzije.

## 2. Postavite ispravnu rezoluciju

Za oštre, jasne otiske, vaše slike trebaju biti najmanje 300 DPI (tačaka po inču) na konačnoj veličini štampe. Slike niske rezolucije će izgledati pikselizirano i mutno.

## 3. Uključite područje za napust (bleed)

Dodajte 3mm napusta na sve strane vašeg dizajna. Ovo osigurava da kada se papir oreže, nema bijelih rubova na vašim otiscima.

## 4. Konvertujte tekst u krivulje

Da izbjegnete probleme sa zamjenom fontova, uvijek konvertujte tekst u krivulje (outlines) prije slanja fajla. Ovo osigurava da vaš tekst izgleda tačno onako kako je dizajniran.

## 5. Koristite bogatu crnu za velike površine

Umjesto čiste crne (K:100), koristite bogatu crnu (C:40 M:30 Y:30 K:100) za velike crne površine. Ovo proizvodi dublju, živopisniju crnu boju.

## 6. Probni otisak prije štampe

Uvijek zatražite probni otisak — digitalni ili fizički — prije puštanja pune narudžbe u štampu. Ovo vam omogućava da uhvatite eventualne probleme prije nego što bude kasno.

Pratite ove savjete i vaše štampe će izgledati sjajno svaki put!`,
      uploadedImage: await m('/Products/Brendiranje%20Poslovnih%20Prostora/Brendiranje%20poslovnih%20prostora5.jpg'),
      date: '10. feb 2026.',
      category: 'Savjeti',
      author: 'BSC Tim',
      readTime: '6 min čitanja',
    },
  })
  await payload.update({
    collection: 'news-articles',
    id: news3.id,
    locale: 'en',
    data: {
      title: 'Design tips for perfect print results',
      excerpt: 'Learn top design tips and file preparation techniques that ensure your prints look exactly as you imagined.',
      contentMarkdown: `Perfect print results start long before your file reaches the printer. Here are our top design tips to ensure your prints look exactly as you imagined.

## 1. Use CMYK color mode

Always design in CMYK color mode for print projects. RGB is for screens only — if you send an RGB file, colors may shift during conversion.

## 2. Set the correct resolution

For sharp, clear prints, your images should be at least 300 DPI (dots per inch) at final print size. Low-resolution images will look pixelated and blurry.

## 3. Include bleed area

Add 3mm bleed on all sides of your design. This ensures that when the paper is trimmed, there are no white edges on your prints.

## 4. Convert text to outlines

To avoid font substitution issues, always convert text to outlines before sending your file. This ensures your text looks exactly as designed.

## 5. Use rich black for large areas

Instead of pure black (K:100), use rich black (C:40 M:30 Y:30 K:100) for large black areas. This produces a deeper, more vivid black.

## 6. Proof before printing

Always request a proof — digital or physical — before releasing the full order to print. This allows you to catch any issues before it's too late.

Follow these tips and your prints will look great every time!`,
      category: 'Tips',
      readTime: '6 min read',
    },
  })

  const news4 = await payload.create({
    collection: 'news-articles',
    data: {
      title: 'Iza kulisa: Naš proces štampe',
      slug: 'behind-the-scenes-printing-process',
      excerpt: 'Pogledajte kako obrađujemo vaše narudžbe od početka do kraja, osiguravajući da svaki otisak ispunjava naše visoke standarde kvaliteta.',
      contentMarkdown: `Jeste li se ikada pitali šta se dešava nakon što naručite? Dozvolite nam da vas provedemo iza kulisa našeg procesa štampe.

## Korak 1: Pregled fajla

Svaki fajl koji stigne prolazi kroz temeljit pregled od strane našeg tima za pretpress. Provjeravamo rezoluciju, režim boja, područja za napust i ukupni integritet fajla. Ako uočimo bilo kakve probleme, kontaktirat ćemo vas prije nastavka.

## Korak 2: Probni otisak

Kada vaš fajl prođe pregled, kreiramo digitalni probni otisak za vaše odobrenje. Za projekte gdje je boja kritična, možemo proizvesti i fizički probni otisak.

## Korak 3: Štampa

S vašim odobrenjem, vaš posao ide u proizvodnju. Naše najmodernije digitalne mašine proizvode živopisne, konzistentne rezultate na širokom spektru materijala.

## Korak 4: Dorada

Nakon štampe, vaša narudžba prolazi kroz doradu — koja može uključivati rezanje, savijanje, laminiranje, uvezivanje ili bilo koji drugi post-press proces koji vaš projekat zahtijeva.

## Korak 5: Kontrola kvaliteta

Prije pakovanja, svaka narudžba prolazi kroz završnu kontrolu kvaliteta. Provjeravamo tačnost boja, registar i eventualne nedostatke kako bismo osigurali da dobijete savršen proizvod.

## Korak 6: Dostava

Vaša narudžba se pažljivo pakuje kako bi se spriječila oštećenja tokom transporta i šalje putem odabranog načina dostave.

Ponosni smo na svaki korak ovog procesa jer znamo koliko su vaše štampe važne za vas.`,
      uploadedImage: await m('/Products/Banneri/banneri.jpg'),
      date: '5. feb 2026.',
      category: 'Kompanija',
      author: 'BSC Tim',
      readTime: '5 min čitanja',
    },
  })
  await payload.update({
    collection: 'news-articles',
    id: news4.id,
    locale: 'en',
    data: {
      title: 'Behind the scenes: Our printing process',
      excerpt: 'See how we process your orders from start to finish, ensuring every print meets our high quality standards.',
      contentMarkdown: `Have you ever wondered what happens after you place an order? Let us walk you behind the scenes of our printing process.

## Step 1: File review

Every file that arrives goes through a thorough review by our prepress team. We check resolution, color mode, bleed areas, and overall file integrity. If we spot any issues, we'll contact you before proceeding.

## Step 2: Proof

Once your file passes review, we create a digital proof for your approval. For projects where color is critical, we can also produce a physical proof.

## Step 3: Printing

With your approval, your job goes into production. Our state-of-the-art digital machines produce vivid, consistent results on a wide range of materials.

## Step 4: Finishing

After printing, your order goes through finishing — which may include cutting, folding, laminating, binding, or any other post-press process your project requires.

## Step 5: Quality control

Before packaging, every order goes through a final quality check. We verify color accuracy, registration, and any defects to ensure you receive a perfect product.

## Step 6: Delivery

Your order is carefully packaged to prevent damage during transit and shipped via your chosen delivery method.

We take pride in every step of this process because we know how important your prints are to you.`,
      category: 'Company',
      readTime: '5 min read',
    },
  })

  const news5 = await payload.create({
    collection: 'news-articles',
    data: {
      title: 'Top 5 trendova u naljepnicama za 2026.',
      slug: 'top-sticker-trends-2026',
      excerpt: 'Od holografskih završnih obrada do prilagođenih oblika — otkrijte najaktuelnije trendove u naljepnicama koji osvajaju tržište.',
      contentMarkdown: `Naljepnice i dalje ostaju jedan od najsvestranijih i najpopularnijih proizvoda za štampu. Evo top 5 trendova u naljepnicama koje vidimo u 2026.

## 1. Holografske završne obrade

Holografske naljepnice hvataju svjetlost i stvaraju fascinantan efekat duge. Savršene su za etikete proizvoda, brendiranje i dekorativne svrhe.

## 2. Prilagođeni oblici (die-cut)

Izađite izvan krugova i pravougaonika — naljepnice prilagođenih oblika koji odgovaraju vašem dizajnu su izuzetno popularne.

## 3. Prozirne naljepnice

Prozirne naljepnice sa štampanim dizajnom stvaraju elegantan izgled koji je moderan i profinjen. Posebno su popularne za ambalažu proizvoda i boce s vodom.

## 4. Teksturirani materijali

Od mat završne obrade do kraft papira i soft-touch laminacije, teksturirane naljepnice dodaju taktilnu dimenziju koja čini vaše naljepnice posebnim.

## 5. Mini paketi naljepnica

Brendovi kreiraju tematske mini pakete naljepnica kao promotivne artikle i merchandise. Pristupačni su za proizvodnju, a klijenti ih obožavaju.

Spremni da pratite trendove? Kontaktirajte nas za ponudu!`,
      uploadedImage: await m('/Materials/PVC%20Naljepnice/pvc%20naljepnice5.jpg'),
      date: '28. jan 2026.',
      category: 'Trendovi',
      author: 'BSC Tim',
      readTime: '4 min čitanja',
    },
  })
  await payload.update({
    collection: 'news-articles',
    id: news5.id,
    locale: 'en',
    data: {
      title: 'Top 5 sticker trends for 2026',
      excerpt: 'From holographic finishes to custom shapes — discover the hottest sticker trends conquering the market.',
      contentMarkdown: `Stickers remain one of the most versatile and popular print products. Here are the top 5 sticker trends we're seeing in 2026.

## 1. Holographic finishes

Holographic stickers catch light and create a fascinating rainbow effect. They're perfect for product labels, branding, and decorative purposes.

## 2. Custom shapes (die-cut)

Go beyond circles and rectangles — custom-shaped stickers that match your design are extremely popular.

## 3. Clear stickers

Clear stickers with printed designs create an elegant look that's modern and sophisticated. They're especially popular for product packaging and water bottles.

## 4. Textured materials

From matte finishes to kraft paper and soft-touch lamination, textured stickers add a tactile dimension that makes your stickers special.

## 5. Mini sticker packs

Brands are creating themed mini sticker packs as promotional items and merchandise. They're affordable to produce, and clients love them.

Ready to follow the trends? Contact us for a quote!`,
      category: 'Trends',
      readTime: '4 min read',
    },
  })

  const news6 = await payload.create({
    collection: 'news-articles',
    data: {
      title: 'Kako odabrati pravi materijal za vaš projekat',
      slug: 'choosing-right-material',
      excerpt: 'Sveobuhvatan vodič za odabir savršenog materijala za štampu na osnovu potreba vašeg projekta, budžeta i namjene.',
      contentMarkdown: `Odabir pravog materijala može napraviti ili pokvariti vaš projekat štampe. Evo našeg sveobuhvatnog vodiča koji će vam pomoći da donesete najbolju odluku.

## Razmotrite namjenu

Prvo pitanje koje trebate postaviti je: koja je namjena vaše štampe? Unutrašnja ili vanjska upotreba? Privremena ili trajna? Odgovori će značajno suziti vaše opcije materijala.

## Opcije papira

- **Nepremazani papir** — Prirodan osjećaj, odličan za vizit karte i memorandume.
- **Premazani sjajni** — Sjajna završna obrada, živopisne boje, idealan za letke i brošure.
- **Premazani mat** — Glatka, nereflektirajuća završna obrada za premium izgled.
- **Reciklirani papir** — Ekološka opcija sa jedinstvenom teksturom.

## Vinil i specijalni materijali

- **Samoljepljivi vinil** — Savršen za naljepnice, etikete i brendiranje vozila.
- **Canvas** — Idealan za umjetničke reprodukcije i zidni dekor.
- **Tekstil** — Odličan za bannere, zastave i odjeću.
- **Akril/Metal** — Premium materijali za signalizaciju i displeje.

## Gramatura je važna

Gramatura papira utječe na trajnost i doživljaj. Lakše gramature (80-120gsm) su pogodne za letke, dok su teže gramature (250-400gsm) bolje za vizit karte i razglednice.

## Budžet

Kvalitetniji materijali koštaju više, ali također stvaraju bolji utisak. Balansirajte budžet sa utjecajem koji želite postići.

Još niste sigurni? Naš tim je spreman da vam pruži uzorke materijala i preporuke za vaš specifičan projekat.`,
      uploadedImage: await m('/Materials/Forex/forex8.jpg'),
      date: '20. jan 2026.',
      category: 'Vodič',
      author: 'BSC Tim',
      readTime: '6 min čitanja',
    },
  })
  await payload.update({
    collection: 'news-articles',
    id: news6.id,
    locale: 'en',
    data: {
      title: 'How to choose the right material for your project',
      excerpt: 'A comprehensive guide to choosing the perfect printing material based on your project needs, budget, and purpose.',
      contentMarkdown: `Choosing the right material can make or break your print project. Here's our comprehensive guide to help you make the best decision.

## Consider the purpose

The first question you need to ask is: what is the purpose of your print? Indoor or outdoor use? Temporary or permanent? The answers will significantly narrow down your material options.

## Paper options

- **Uncoated paper** — Natural feel, great for business cards and letterheads.
- **Coated gloss** — Glossy finish, vivid colors, ideal for flyers and brochures.
- **Coated matte** — Smooth, non-reflective finish for a premium look.
- **Recycled paper** — Eco-friendly option with a unique texture.

## Vinyl and specialty materials

- **Self-adhesive vinyl** — Perfect for stickers, labels, and vehicle branding.
- **Canvas** — Ideal for art reproductions and wall decor.
- **Textile** — Great for banners, flags, and apparel.
- **Acrylic/Metal** — Premium materials for signage and displays.

## Weight matters

Paper weight affects durability and feel. Lighter weights (80-120gsm) are suitable for flyers, while heavier weights (250-400gsm) are better for business cards and postcards.

## Budget

Higher quality materials cost more, but also create a better impression. Balance your budget with the impact you want to achieve.

Still not sure? Our team is ready to provide material samples and recommendations for your specific project.`,
      category: 'Guide',
      readTime: '6 min read',
    },
  })

  // ──────────────────────────────────────────────
  // GALLERY IMAGES
  // ──────────────────────────────────────────────
  console.log('🖼️  Seeding GalleryImages...')

  const gallery1 = await payload.create({
    collection: 'gallery-images',
    data: {
      title: 'PVC Naljepnice - Galerija',
      type: 'material',
      categorySlug: 'uv-ecosolvent-latex',
      itemSlug: 'pvc-naljepnice',
      images: [
        { uploadedImage: await m('/Materials/PVC%20Naljepnice/pvc%20naljepnice1.jpg') },
        { uploadedImage: await m('/Materials/PVC%20Naljepnice/pvc%20naljepnice2.jpg') },
        { uploadedImage: await m('/Materials/PVC%20Naljepnice/pvc%20naljepnice3.jpg') },
      ],
    },
  })
  await payload.update({
    collection: 'gallery-images',
    id: gallery1.id,
    locale: 'en',
    data: {
      title: 'PVC Stickers - Gallery',
    },
  })

  const gallery2 = await payload.create({
    collection: 'gallery-images',
    data: {
      title: 'Brendiranje Vozila - Galerija',
      type: 'product',
      categorySlug: 'brendiranje',
      itemSlug: 'vozila',
      images: [
        { uploadedImage: await m('/Products/Brandiranje%20Vozila/brandiranje%20vozila1.jpg') },
        { uploadedImage: await m('/Products/Brandiranje%20Vozila/brandiranje%20vozila2.jpg') },
        { uploadedImage: await m('/Products/Brandiranje%20Vozila/brandiranje%20vozila3.jpg') },
      ],
    },
  })
  await payload.update({
    collection: 'gallery-images',
    id: gallery2.id,
    locale: 'en',
    data: {
      title: 'Vehicle Branding - Gallery',
    },
  })

  const gallery3 = await payload.create({
    collection: 'gallery-images',
    data: {
      title: 'Wallscape - Galerija',
      type: 'product',
      categorySlug: 'outdoor-indoor',
      itemSlug: 'wallscape',
      images: [
        { uploadedImage: await m('/Products/Wallscape/wallscape1.jpg') },
        { uploadedImage: await m('/Products/Wallscape/wallscape2.jpg') },
        { uploadedImage: await m('/Products/Wallscape/wallscape3.jpg') },
      ],
    },
  })
  await payload.update({
    collection: 'gallery-images',
    id: gallery3.id,
    locale: 'en',
    data: {
      title: 'Wallscape - Gallery',
    },
  })

  const gallery4 = await payload.create({
    collection: 'gallery-images',
    data: {
      title: 'Plexiglass - Galerija',
      type: 'material',
      categorySlug: 'uv-direktni-print',
      itemSlug: 'plexiglass',
      images: [
        { uploadedImage: await m('/Materials/Plexiglass/plexiglass1.jpg') },
        { uploadedImage: await m('/Materials/Plexiglass/plexiglass2.jpg') },
        { uploadedImage: await m('/Materials/Plexiglass/plexiglass3.jpg') },
      ],
    },
  })
  await payload.update({
    collection: 'gallery-images',
    id: gallery4.id,
    locale: 'en',
    data: {
      title: 'Plexiglass - Gallery',
    },
  })

  const gallery5 = await payload.create({
    collection: 'gallery-images',
    data: {
      title: 'Svijetleća Reklama - Galerija',
      type: 'product',
      categorySlug: 'outdoor-indoor',
      itemSlug: 'svijetlece-reklame',
      images: [
        { uploadedImage: await m('/Products/Svijetle%C4%87a%20Reklama/svijetle%C4%87a%20reklama1.png') },
        { uploadedImage: await m('/Products/Svijetle%C4%87a%20Reklama/svijetle%C4%87a%20reklama2.png') },
      ],
    },
  })
  await payload.update({
    collection: 'gallery-images',
    id: gallery5.id,
    locale: 'en',
    data: {
      title: 'Light-up Signage - Gallery',
    },
  })

  const gallery6 = await payload.create({
    collection: 'gallery-images',
    data: {
      title: 'Banner - Galerija',
      type: 'material',
      categorySlug: 'uv-ecosolvent-latex',
      itemSlug: 'banner-textilni-banner-flag',
      images: [
        { uploadedImage: await m('/Materials/Banner%20%20Textilni%20Banner%20%20Flag/banner%20%20textilni%20banner%20%20flag1.jpg') },
        { uploadedImage: await m('/Materials/Banner%20%20Textilni%20Banner%20%20Flag/banner%20%20textilni%20banner%20%20flag2.jpg') },
      ],
    },
  })
  await payload.update({
    collection: 'gallery-images',
    id: gallery6.id,
    locale: 'en',
    data: {
      title: 'Banner - Gallery',
    },
  })

  // ──────────────────────────────────────────────
  // DONE
  // ──────────────────────────────────────────────
  console.log('🎉 Comprehensive seed complete!')
  console.log('   ✅ 13 globals seeded (BS + EN)')
  console.log('   ✅ 4 material categories seeded (BS + EN)')
  console.log('   ✅ 4 product categories seeded (BS + EN)')
  console.log('   ✅ 30 material items seeded (BS + EN)')
  console.log('   ✅ 24 product items seeded (BS + EN)')
  console.log('   ✅ 6 news articles seeded (BS + EN)')
  console.log('   ✅ 6 gallery images seeded (BS + EN)')
  console.log('   ✅ 1 admin user created')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
