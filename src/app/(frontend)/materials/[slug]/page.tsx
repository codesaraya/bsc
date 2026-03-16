import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { getImageUrl } from '@/lib/imageUrl';
import {
  categories as fallbackCategories,
  getCategoryBySlug as getStaticCategoryBySlug,
  getAllSlugs,
  type MaterialCategory,
} from "@/data/materials";
import { getPayload } from "payload";
import config from "@payload-config";
import { getLocale } from '@/lib/locale';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Printer,
  Layers,
  Box,
  Zap,
  Phone,
  MessageSquare,
  Sparkles,
  Shield,
  Clock,
  Award,
  Users,
  Palette,
} from "lucide-react";

/* ── Static params ── */
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const res = await payload.find({
      collection: "material-categories" as any,
      limit: 100,
      locale,
    } as any);
    if (res.docs.length > 0) {
      return res.docs.map((doc: any) => ({ slug: doc.slug }));
    }
  } catch {
    // fallback
  }
  return getAllSlugs().map((slug) => ({ slug }));
}

/* ── Dynamic metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const [res, ss] = await Promise.all([
      payload.find({
        collection: "material-categories" as any,
        where: { slug: { equals: slug } },
        limit: 1,
        locale,
      } as any),
      payload.findGlobal({ slug: 'site-settings' as any, locale } as any).catch(() => null),
    ]);
    const siteName = (ss as any)?.siteName || 'BSC';
    if (res.docs.length > 0) {
      const doc: any = res.docs[0];
      return {
        title: `${doc.title} - ${siteName}`,
        description: doc.description,
      };
    }
  } catch {
    // fallback
  }

  const category = getStaticCategoryBySlug(slug);
  if (!category) return { title: "Nije pronađeno" };
  return {
    title: `${category.title} - BSC`,
    description: category.description,
  };
}

const categoryIcons: Record<string, React.ReactNode> = {
  "uv-ecosolvent-latex": <Printer className="w-10 h-10" />,
  "uv-direktni-print": <Layers className="w-10 h-10" />,
  cnc: <Box className="w-10 h-10" />,
  laser: <Zap className="w-10 h-10" />,
};


export default async function MaterialCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let category: MaterialCategory | undefined;
  let allCategories: MaterialCategory[] = fallbackCategories;
  let phone = '+387 33 571 111';
  let dp: any = null;

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
    dp = detailPage;

    if (categoriesRes.docs.length > 0) {
      allCategories = categoriesRes.docs.map((cat: any) => {
        const catItems = itemsRes.docs
          .filter((item: any) => {
            const catRef = item.category;
            const catId = typeof catRef === "object" ? catRef?.id : catRef;
            return catId === cat.id;
          })
          .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((item: any) => ({
            name: item.name,
            slug: item.slug,
            description: item.description,
            image: getImageUrl(item.uploadedImage),
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
  if (!category) {
    // Try static fallback
    category = getStaticCategoryBySlug(slug);
  }
  if (!category) notFound();

  /* Find prev/next for navigation */
  const currentIndex = allCategories.findIndex((c) => c.slug === slug);
  const prev = currentIndex > 0 ? allCategories[currentIndex - 1] : null;
  const next =
    currentIndex < allCategories.length - 1 ? allCategories[currentIndex + 1] : null;

  /* Other categories for cross-promotion */
  const otherCategories = allCategories.filter((c) => c.slug !== slug).slice(0, 3);

  const cp = dp?.categoryPage;
  const whyIcons = [<Sparkles key="s" className="w-5 h-5" />, <Shield key="sh" className="w-5 h-5" />, <Clock key="c" className="w-5 h-5" />, <Palette key="p" className="w-5 h-5" />, <Users key="u" className="w-5 h-5" />, <Award key="a" className="w-5 h-5" />];
  const defaultWhyCards = [
    { title: "Premium kvalitet", text: "Najmodernija oprema i provjereni materijali od vodećih proizvođača" },
    { title: "Garancija kvaliteta", text: "Rigorozna kontrola kvaliteta na svakom koraku procesa" },
    { title: "Brza isporuka", text: "Efikasan proces od upita do gotovog proizvoda" },
    { title: "Prilagodljivo", text: "Potpuno prilagođeno dimenzijama, materijalima i potrebama" },
    { title: "Stručni tim", text: "Višegodišnje iskustvo u industriji digitalne štampe" },
    { title: "Zadovoljni klijenti", text: "Stotine realizovanih projekata za domaće i međunarodne klijente" },
  ];
  const resolvedWhyCards = (cp?.whyCards?.length > 0 ? cp.whyCards : defaultWhyCards).map((c: any, i: number) => ({ ...c, icon: whyIcons[i % whyIcons.length] }));

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark via-[#1a1060] to-dark -mt-[80px] pt-[120px] sm:pt-[176px] pb-12 sm:pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <Container className="relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">{dp?.breadcrumbHome || 'Početna'}</Link>
            <span>/</span>
            <Link href="/materials" className="hover:text-white transition-colors">{dp?.breadcrumbMaterials || 'Materijali'}</Link>
            <span>/</span>
            <span className="text-white font-medium">{category.title}</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/10 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white backdrop-blur-sm border border-white/10">
              {categoryIcons[category.slug]}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                {category.title}
              </h1>
              <p className="mt-2 text-lg text-white/60 max-w-xl">
                {category.description}
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-6 mt-10 flex-wrap">
            <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-white font-bold">{category.items.length}</span>
              <span className="text-white/60 ml-1 text-sm">{cp?.materialsCountLabel || 'materijala'}</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-white font-bold">{cp?.statCustomizableValue || '100%'}</span>
              <span className="text-white/60 ml-1 text-sm">{cp?.statCustomizableLabel || 'prilagodljivo'}</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-white font-bold">{cp?.statDeliveryValue || 'Brza'}</span>
              <span className="text-white/60 ml-1 text-sm">{cp?.statDeliveryLabel || 'isporuka'}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Materials List */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-dark mb-2">
              {cp?.availableTitle || 'Dostupni Materijali'}
            </h2>
            <p className="text-gray-500 mb-10">
              {cp?.availableSubtitle || 'Izaberite materijal za detaljne informacije, galeriju i specifikacije.'}
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {category.items.map((item, i) => (
                <Link
                  key={`${item.slug}-${i}`}
                  href={`/materials/${category.slug}/${item.slug}`}
                  className="group bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
                >
                  {item.image ? (
                    <div className="relative h-40 sm:h-48 w-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ) : (
                    <div className="h-28 bg-gradient-to-br from-dark to-[#1a1060] flex items-center justify-center text-white">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-semibold text-dark text-lg group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {cp?.learnMoreText || 'Saznaj više'} <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Why choose us */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-dark mb-2">{cp?.whyTitle || 'Zašto odabrati nas?'}</h2>
              <p className="text-gray-500 mb-8">{cp?.whySubtitle || 'Kvalitet, brzina i pouzdanost — naši temeljni principi od samog početka.'}</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {resolvedWhyCards.map((item: any) => (
                  <div key={item.title} className="flex items-start gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dark to-[#1a1060] flex items-center justify-center text-white shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark text-sm">{item.title}</h4>
                      <p className="text-gray-500 text-xs mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="bg-gradient-to-r from-dark via-[#1a1060] to-dark rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {cp?.ctaPrefix || 'Trebate print na nekom od ovih materijala?'}
                  </h3>
                  <p className="text-white/60 max-w-lg">
                    {cp?.ctaDescription || 'Kontaktirajte nas za besplatnu ponudu i savjet o najboljim materijalima za vaš projekat.'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-dark font-semibold px-7 py-3.5 rounded-full hover:scale-105 transition-transform shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {cp?.ctaContactText || 'Kontakt'}
                  </Link>
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
                  >
                    <Phone className="w-4 h-4" />
                    {cp?.ctaPhoneText || 'Pozovite nas'}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Explore other categories */}
          {otherCategories.length > 0 && (
            <div className="max-w-5xl mx-auto mt-16">
              <h2 className="text-2xl font-bold text-dark mb-2">{cp?.exploreCategoriesTitle || 'Istražite druge kategorije'}</h2>
              <p className="text-gray-500 text-sm mb-6">{cp?.exploreCategoriesSubtitle || 'Pogledajte i ostale tehnologije i materijale koje nudimo.'}</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                        {cat.items.length} {cp?.materialsCountLabel || 'materijala'} <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next navigation */}
          <div className="max-w-5xl mx-auto mt-12 flex items-center justify-between">
            {prev ? (
              <Link
                href={`/materials/${prev.slug}`}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {prev.title}
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/materials/${next.slug}`}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {next.title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Back link */}
          <div className="text-center mt-8">
            <Link
              href="/materials"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {cp?.backToAllText || 'Nazad na sve materijale'}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
