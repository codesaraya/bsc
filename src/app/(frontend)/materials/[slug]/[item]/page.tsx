import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { getImageUrl } from '@/lib/imageUrl';
import {
  getMaterialItem as getStaticMaterialItem,
  getAllMaterialItemParams,
  categories as fallbackCategories,
  type MaterialCategory,
  type MaterialItem,
} from "@/data/materials";
import { getPayload } from "payload";
import config from "@payload-config";
import { getLocale } from '@/lib/locale';
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  Shield,
  Ruler,
  Sparkles,
  Phone,
  MessageSquare,
  CheckCircle2,
  Printer,
  Box,
  Zap,
  Eye,
  Palette,
  Settings,
} from "lucide-react";
import Gallery from "@/components/ui/Gallery";
import { getMaterialGalleryPhotos } from "@/data/galleryImages";

/* ── Static params ── */
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const [categoriesRes, itemsRes] = await Promise.all([
      payload.find({ collection: "material-categories" as any, limit: 100, locale } as any),
      payload.find({ collection: "material-items" as any, limit: 500, depth: 2, locale } as any),
    ]);
    if (categoriesRes.docs.length > 0 && itemsRes.docs.length > 0) {
      return itemsRes.docs.map((item: any) => {
        const catRef = item.category;
        const cat = typeof catRef === "object" ? catRef : categoriesRes.docs.find((c: any) => c.id === catRef);
        return { slug: cat?.slug || "", item: item.slug };
      });
    }
  } catch {
    // fallback
  }
  return getAllMaterialItemParams();
}

/* ── Dynamic metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; item: string }>;
}): Promise<Metadata> {
  const { slug, item: itemSlug } = await params;

  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const [catRes, itemRes, ss] = await Promise.all([
      payload.find({ collection: "material-categories" as any, where: { slug: { equals: slug } }, limit: 1, locale } as any),
      payload.find({ collection: "material-items" as any, where: { slug: { equals: itemSlug } }, limit: 1, locale } as any),
      payload.findGlobal({ slug: 'site-settings' as any, locale } as any).catch(() => null),
    ]);
    const siteName = (ss as any)?.siteName || 'BSC';
    if (catRes.docs.length > 0 && itemRes.docs.length > 0) {
      return {
        title: `${(itemRes.docs[0] as any).name} - ${(catRes.docs[0] as any).title} - ${siteName}`,
        description: (itemRes.docs[0] as any).description,
      };
    }
  } catch {
    // fallback
  }

  const result = getStaticMaterialItem(slug, itemSlug);
  if (!result) return { title: "Nije pronađeno" };
  return {
    title: `${result.item.name} - ${result.category.title} - BSC`,
    description: result.item.description,
  };
}

const categoryIcons: Record<string, React.ReactNode> = {
  "uv-ecosolvent-latex": <Printer className="w-8 h-8" />,
  "uv-direktni-print": <Layers className="w-8 h-8" />,
  cnc: <Box className="w-8 h-8" />,
  laser: <Zap className="w-8 h-8" />,
};

export default async function MaterialItemPage({
  params,
}: {
  params: Promise<{ slug: string; item: string }>;
}) {
  const { slug, item: itemSlug } = await params;

  let category: MaterialCategory | undefined;
  let item: MaterialItem | undefined;
  let allCategories: MaterialCategory[] = fallbackCategories;
  let phone = '+387 33 571 111';
  let dp: any = null;
  let uiLabels: any = {};

  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const [categoriesRes, itemsRes, siteSettings, detailPage] = await Promise.all([
      payload.find({ collection: "material-categories" as any, sort: "sortOrder", limit: 100, locale } as any),
      payload.find({ collection: "material-items" as any, limit: 500, depth: 2, locale } as any),
      payload.findGlobal({ slug: 'site-settings' as any, locale } as any).catch(() => null),
      payload.findGlobal({ slug: 'material-detail-page' as any, locale } as any).catch(() => null),
    ]);
    if ((siteSettings as any)?.contactPhone) phone = (siteSettings as any).contactPhone;
    if ((siteSettings as any)?.uiLabels) uiLabels = (siteSettings as any).uiLabels;
    dp = detailPage;

    if (categoriesRes.docs.length > 0) {
      allCategories = categoriesRes.docs.map((cat: any) => {
        const catItems = itemsRes.docs
          .filter((it: any) => {
            const catRef = it.category;
            const catId = typeof catRef === "object" ? catRef?.id : catRef;
            return catId === cat.id;
          })
          .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((it: any) => ({
            name: it.name,
            slug: it.slug,
            description: it.description,
            image: getImageUrl(it.uploadedImage),
          }));

        return {
          title: cat.title,
          slug: cat.slug,
          description: cat.description,
          color: cat.color,
          items: catItems,
        };
      });
    }
  } catch {
    // fallback to static data
  }

  category = allCategories.find((c) => c.slug === slug);
  if (category) {
    item = category.items.find((i) => i.slug === itemSlug);
  }

  // Fallback to static data
  if (!category || !item) {
    const staticResult = getStaticMaterialItem(slug, itemSlug);
    if (staticResult) {
      category = staticResult.category;
      item = staticResult.item;
    }
  }

  if (!category || !item) notFound();

  /* Prev / next items within same category */
  const currentIdx = category.items.findIndex((i) => i.slug === itemSlug);
  const prevItem = currentIdx > 0 ? category.items[currentIdx - 1] : null;
  const nextItem =
    currentIdx < category.items.length - 1
      ? category.items[currentIdx + 1]
      : null;

  /* Related items from same category */
  const relatedItems = category.items
    .filter((i) => i.slug !== itemSlug)
    .slice(0, 4);

  /* Other categories for cross-promotion */
  const otherCategories = allCategories.filter((c) => c.slug !== slug).slice(0, 3);

  const ip = dp?.itemPage;
  const featureIcons = [<Shield key="1" className="w-5 h-5" />, <Ruler key="2" className="w-5 h-5" />, <Sparkles key="3" className="w-5 h-5" />, <Layers key="4" className="w-5 h-5" />, <Palette key="5" className="w-5 h-5" />, <Eye key="6" className="w-5 h-5" />];
  const defaultFeatures = [
    { title: "Izdržljivost", text: "Otpornost na UV zračenje, vlagu, habanje i mehaničke udarce" },
    { title: "Preciznost", text: "CNC i lasersko rezanje sa tolerancijom od 0.1mm" },
    { title: "Premium kvalitet", text: "Samo provjereni materijali od vodećih evropskih proizvođača" },
    { title: "Razne debljine", text: "Dostupan u različitim debljinama, formatima i završnim obradama" },
    { title: "Boje & Teksture", text: "Širok spektar boja, mat i sjajnih završnih obrada po želji" },
    { title: "Vizualni efekt", text: "Fotorealistična reprodukcija boja sa visokom rezolucijom" },
  ];
  const features = (ip?.features?.length > 0 ? ip.features : defaultFeatures).map((f: any, i: number) => ({ ...f, icon: featureIcons[i % featureIcons.length] }));

  const defaultProcessSteps = [
    { step: "01", title: "Konsultacija", desc: "Analiza zahtjeva i savjet o optimalnom materijalu" },
    { step: "02", title: "Priprema", desc: "Dizajn, prepress priprema i provjera fajlova" },
    { step: "03", title: "Štampa / Obrada", desc: "Profesionalna obrada na najmodernijim mašinama" },
    { step: "04", title: "Kontrola & Isporuka", desc: "Rigorozna kontrola kvaliteta i brza dostava" },
  ];
  const processSteps = ip?.processSteps?.length > 0 ? ip.processSteps.map((s: any, i: number) => ({ step: String(i + 1).padStart(2, '0'), title: s.title, desc: s.text || s.desc })) : defaultProcessSteps;

  return (
    <>
      {/* Hero */}
      <section className="-mt-[80px] pt-[120px] sm:pt-[176px] pb-12 sm:pb-24 relative overflow-hidden">
        {/* Background image */}
        {item.image && (
          <img
            src={item.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-[#1a1060]/85 to-dark/90" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-sm mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">{dp?.breadcrumbHome || 'Početna'}</Link>
            <span>/</span>
            <Link href="/materials" className="hover:text-white transition-colors">{dp?.breadcrumbMaterials || 'Materijali'}</Link>
            <span>/</span>
            <Link href={`/materials/${category.slug}`} className="hover:text-white transition-colors">{category.title}</Link>
            <span>/</span>
            <span className="text-white font-medium">{item.name}</span>
          </div>

          <div className="flex items-start gap-6 flex-wrap md:flex-nowrap">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm border border-white/10 shrink-0">
              {categoryIcons[category.slug] ?? <Layers className="w-8 h-8" />}
            </div>
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4 backdrop-blur-sm border border-white/10">
                {category.title}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                {item.name}
              </h1>
              <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main content */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="max-w-5xl mx-auto">

            {/* Content grid */}
            <div className="grid md:grid-cols-3 gap-4 sm:gap-8 mb-16 items-stretch">
              {/* Description */}
              <div className="md:col-span-2 space-y-6 flex flex-col">
                <h2 className="text-2xl font-bold text-dark mb-2">{ip?.aboutTitle || 'O materijalu'}</h2>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {ip?.aboutParagraph1 || 'Koristimo isključivo materijale vrhunskog kvaliteta od provjerenih dobavljača. Svaki materijal prolazi rigoroznu kontrolu kvaliteta prije obrade, čime garantujemo izvanredne rezultate za svaki projekat. Naša oprema omogućava štampu u visokoj rezoluciji do 1440dpi, sa preciznom reprodukcijom boja i dugotrajnim rezultatima.'}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {ip?.aboutParagraph2 || 'Bez obzira da li vam treba mala serija ili velika naklada, naš tim stručnjaka će pronaći optimalno rješenje za vaše potrebe — od savjetovanja pri izboru materijala do finalne obrade i isporuke.'}
                </p>

                {/* Features grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 mt-auto">
                  {features.map((feat: any) => (
                    <div
                      key={feat.title}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-dark to-[#1a1060] flex items-center justify-center text-white shrink-0">
                        {feat.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-dark text-sm">{feat.title}</h4>
                        <p className="text-gray-500 text-xs mt-0.5">{feat.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="flex flex-col gap-4 justify-between">
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-dark mb-3">{ip?.advantagesTitle || 'Ključne prednosti'}</h3>
                  <ul className="space-y-2.5">
                    {(ip?.advantages?.length > 0 ? ip.advantages.map((a: any) => a.text) : [
                      "Visokokvalitetni materijali",
                      "Profesionalna obrada",
                      "Brza izrada i isporuka",
                      "Konkurentne cijene",
                      "Besplatna konsultacija",
                      "Garancija kvaliteta",
                      "Prilagođeno vašim potrebama",
                    ]).map((point: string) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Category info card */}
                <div className="bg-gradient-to-br from-dark to-[#1a1060] rounded-2xl p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                      {categoryIcons[category.slug] ?? <Layers className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{category.title}</p>
                      <p className="text-white/60 text-xs">{category.items.length} {ip?.viewAllText || 'materijala'}</p>
                    </div>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed mb-3">{category.description}</p>
                  <Link
                    href={`/materials/${category.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors mt-1"
                  >
                    {ip?.viewAllText ? `Pogledaj sve ${ip.viewAllText}` : 'Pogledaj sve materijale'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Process steps */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-dark mb-2">{ip?.processTitle || 'Proces izrade'}</h2>
              <p className="text-gray-500 mb-8">{ip?.processSubtitle || 'Od upita do gotovog proizvoda — transparentan i efikasan proces.'}</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {processSteps.map((s: any) => (
                  <div key={s.step} className="relative bg-white rounded-2xl p-5 border border-gray-100 shadow-soft hover:shadow-md hover:-translate-y-0.5 transition-all group">
                    <span className="text-3xl font-black text-gray-100 group-hover:text-primary/15 transition-colors absolute top-4 right-4">{s.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dark to-[#1a1060] flex items-center justify-center text-white mb-3">
                      {s.step === "01" && <MessageSquare className="w-5 h-5" />}
                      {s.step === "02" && <Settings className="w-5 h-5" />}
                      {s.step === "03" && <Printer className="w-5 h-5" />}
                      {s.step === "04" && <CheckCircle2 className="w-5 h-5" />}
                    </div>
                    <h4 className="font-bold text-dark text-sm mb-1">{s.title}</h4>
                    <p className="text-gray-500 text-xs">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <Gallery
              title={ip?.galleryTitle || 'Galerija'}
              color={category.color}
              itemName={item.name}
              categoryName={category.title}
              photos={getMaterialGalleryPhotos(category.slug, item.slug)}
              exampleLabel={uiLabels?.galleryExample}
              photosLabel={uiLabels?.galleryPhotos}
              carouselLabel={uiLabels?.galleryCarousel}
              gridLabel={uiLabels?.galleryGrid}
            />

            {/* CTA */}
            <div className="bg-gradient-to-r from-dark via-[#1a1060] to-dark rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {ip?.ctaPrefix || 'Trebate'} {item.name}?
                  </h3>
                  <p className="text-white/60 max-w-lg">
                    {ip?.ctaDescription || 'Kontaktirajte nas za besplatnu ponudu i profesionalan savjet o najboljim materijalima za vaš projekat.'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-dark font-semibold px-7 py-3.5 rounded-full hover:scale-105 transition-transform shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {ip?.ctaContactText || 'Kontakt'}
                  </Link>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
                  >
                    <Phone className="w-4 h-4" />
                    {ip?.ctaPhoneText || 'Pozovite nas'}
                  </a>
                </div>
              </div>
            </div>

            {/* Related materials */}
            {relatedItems.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-dark mb-2">
                  {ip?.relatedTitle || 'Ostali materijali u kategoriji'} {category.title}
                </h2>
                <p className="text-gray-500 text-sm mb-6">{ip?.relatedSubtitle || `Istražite još ${relatedItems.length} materijala iz iste kategorije.`}</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {relatedItems.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/materials/${category.slug}/${related.slug}`}
                      className="group bg-white rounded-2xl shadow-soft hover:shadow-lg border border-gray-100 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                    >
                      {related.image ? (
                        <div className="relative h-32 w-full">
                          <Image
                            src={related.image}
                            alt={related.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                      ) : (
                        <div className="h-20 bg-gradient-to-br from-dark to-[#1a1060] flex items-center justify-center text-white">
                          {categoryIcons[category.slug] ?? <Layers className="w-6 h-6" />}
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-dark group-hover:text-primary transition-colors text-sm">
                          {related.name}
                        </h3>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{related.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Explore other categories */}
            {otherCategories.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-dark mb-2">{ip?.exploreCategoriesTitle || 'Istražite druge kategorije'}</h2>
                <p className="text-gray-500 text-sm mb-6">{ip?.exploreCategoriesSubtitle || 'Pogledajte i ostale tehnologije i materijale koje nudimo.'}</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {otherCategories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/materials/${cat.slug}`}
                      className="group bg-gradient-to-br from-dark to-[#1a1060] rounded-2xl p-5 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl translate-x-1/3 -translate-y-1/3" />
                      <div className="relative z-10">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-3 border border-white/10">
                          {categoryIcons[cat.slug] ?? <Layers className="w-5 h-5" />}
                        </div>
                        <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{cat.title}</h3>
                        <p className="text-white/50 text-xs line-clamp-2">{cat.description}</p>
                        <span className="inline-flex items-center gap-1 text-xs text-white/40 mt-3">
                          {cat.items.length} {ip?.viewAllText || 'materijala'} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Prev / Next */}
            <div className="mt-12 flex items-center justify-between">
              {prevItem ? (
                <Link
                  href={`/materials/${category.slug}/${prevItem.slug}`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {prevItem.name}
                </Link>
              ) : (
                <div />
              )}
              {nextItem ? (
                <Link
                  href={`/materials/${category.slug}/${nextItem.slug}`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors"
                >
                  {nextItem.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Back */}
            <div className="text-center mt-8">
              <Link
                href={`/materials/${category.slug}`}
                className="inline-flex items-center gap-2 text-primary hover:text-secondary font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {ip?.backText || 'Nazad na'} {category.title}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
