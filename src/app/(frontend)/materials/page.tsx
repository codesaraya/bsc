import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { categories as fallbackCategories } from "@/data/materials";
import { getPayload } from 'payload';
import config from '@payload-config';
import { getLocale } from '@/lib/locale';
import { getImageUrl } from '@/lib/imageUrl';
import {
  ArrowRight,
  Printer,
  Layers,
  Box,
  Zap,
  Shield,
  Sparkles,
  Clock,
  Award,
  MessageSquare,
  Phone,
  CheckCircle2,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const d = await payload.findGlobal({ slug: 'materials-page' as any, locale } as any);
    return {
      title: (d as any)?.metaTitle || "Materijali - BSC",
      description: (d as any)?.metaDescription || "Pregledajte naše kategorije materijala — UV/Ecosolvent/Latex, UV Direktni Print, CNC obrada i Laser graviranje.",
    };
  } catch {
    return {
      title: "Materijali - BSC",
      description: "Pregledajte naše kategorije materijala — UV/Ecosolvent/Latex, UV Direktni Print, CNC obrada i Laser graviranje.",
    };
  }
}

const categoryIcons: Record<string, React.ReactNode> = {
  "uv-ecosolvent-latex": <Printer className="w-8 h-8" />,
  "uv-direktni-print": <Layers className="w-8 h-8" />,
  cnc: <Box className="w-8 h-8" />,
  laser: <Zap className="w-8 h-8" />,
};

const defaultWhyChooseUs = [
  { title: "Vrhunski materijali", text: "Koristimo samo provjerene materijale od vodećih evropskih proizvođača" },
  { title: "Garancija kvaliteta", text: "Svaki materijal prolazi rigoroznu kontrolu kvaliteta prije obrade" },
  { title: "Brza obrada", text: "Efikasan proces od pripreme do gotovog proizvoda — čak i za hitne projekte" },
  { title: "Stručni savjet", text: "Naš tim vam pomaže odabrati optimalan materijal za vaš specifičan projekat" },
];

const whyIcons = [Sparkles, Shield, Clock, Award];

export default async function MaterialsPage() {
  let categories = fallbackCategories;
  let pageData: any = null;
  let siteSettings: any = null;

  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const [categoriesRes, itemsRes, pageGlobal, settings] = await Promise.all([
      payload.find({ collection: 'material-categories' as any, sort: 'sortOrder', limit: 100, locale } as any),
      payload.find({ collection: 'material-items' as any, limit: 500, depth: 2, locale } as any),
      payload.findGlobal({ slug: 'materials-page' as any, locale } as any).catch(() => null),
      payload.findGlobal({ slug: 'site-settings' as any, locale } as any).catch(() => null),
    ]);

    pageData = pageGlobal;
    siteSettings = settings;

    if (categoriesRes.docs.length > 0) {
      categories = categoriesRes.docs.map((cat: any) => ({
        title: cat.title,
        slug: cat.slug,
        description: cat.description,
        color: cat.color,
        items: itemsRes.docs
          .filter((item: any) => {
            const catRef = item.category;
            const catId = typeof catRef === 'object' ? catRef?.id : catRef;
            return catId === cat.id;
          })
          .map((item: any) => ({
            name: item.name,
            slug: item.slug,
            description: item.description,
            image: getImageUrl(item.uploadedImage),
          })),
      }));
    }
  } catch (e) {
    // fallback to static data
  }

  const d = pageData;
  const phone = siteSettings?.contactPhone || '+387 33 571 111';
  const phoneHref = `tel:${phone.replace(/\s/g, '')}`;
  const whyCards = d?.whyCards?.length > 0 ? d.whyCards : defaultWhyChooseUs;

  const totalMaterials = categories.reduce((sum, c) => sum + c.items.length, 0);
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark via-[#1a1060] to-dark -mt-[80px] pt-[120px] sm:pt-[176px] pb-12 sm:pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <Container className="relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-primary text-sm font-semibold tracking-wide mb-6 backdrop-blur-sm border border-white/10">
            {d?.heroBadge || "Naši Materijali"}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            {d?.heroHeading || "Materijali & Usluge"}
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            {d?.heroSubtitle || "Od velikoformatnog printa do preciznog laserskog graviranja — radimo sa najkvalitetnijim materijalima za savršene rezultate."}
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-10 flex-wrap">
            <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-white font-bold">{d?.quickStats?.[0]?.value || categories.length}</span>
              <span className="text-white/60 ml-1 text-sm">{d?.quickStats?.[0]?.label || "kategorije"}</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-white font-bold">{d?.quickStats?.[1]?.value || `${totalMaterials}+`}</span>
              <span className="text-white/60 ml-1 text-sm">{d?.quickStats?.[1]?.label || "materijala"}</span>
            </div>
            <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-white font-bold">{d?.quickStats?.[2]?.value || "4"}</span>
              <span className="text-white/60 ml-1 text-sm">{d?.quickStats?.[2]?.label || "tehnologije"}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Grid */}
      <section className="py-12 md:py-20">
        <Container>
          <SectionTitle
            badge={d?.categoriesBadge || "Kategorije"}
            title={d?.categoriesTitle || "Odaberite Kategoriju"}
            subtitle={d?.categoriesSubtitle || "Svaka kategorija obuhvata različite materijale i tehnike obrade."}
          />
          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mt-12">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/materials/${cat.slug}`}
                className="group relative bg-white rounded-3xl shadow-soft overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Gradient header */}
                <div className="bg-gradient-to-r from-dark to-[#1a1060] p-5 sm:p-8 flex items-center gap-5 relative overflow-hidden">
                  <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/10 rounded-full" />
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-sm border border-white/10 relative z-10">
                    {categoryIcons[cat.slug]}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white">
                      {cat.title}
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      {cat.items.length} {d?.itemCountLabel || 'materijala'}
                    </p>
                  </div>
                </div>

                {/* Items preview */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4">
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cat.items.slice(0, 5).map((item) => (
                      <span
                        key={item.name}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {item.name}
                      </span>
                    ))}
                    {cat.items.length > 5 && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        +{cat.items.length - 5} {d?.moreText || "više"}
                      </span>
                    )}
                  </div>
                  <span className="inline-flex items-center text-primary font-semibold text-sm group-hover:gap-3 gap-1.5 transition-all duration-300">
                    {d?.viewAllMaterialsText || "Pogledaj sve materijale"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Why choose us */}
          <div className="mt-20">
            <SectionTitle
              badge={d?.whyBadge || "Prednosti"}
              title={d?.whyTitle || "Zašto naši materijali?"}
              subtitle={d?.whySubtitle || "Kvalitet, pouzdanost i stručnost — temelji svakog uspješnog projekta."}
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {whyCards.map((item: any, i: number) => {
                const Icon = whyIcons[i] || Sparkles;
                return (
                <div key={item.title} className="flex flex-col items-start p-5 bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dark to-[#1a1060] flex items-center justify-center text-white mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-dark text-sm mb-1">{item.title}</h4>
                  <p className="text-gray-500 text-xs">{item.text}</p>
                </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-dark via-[#1a1060] to-dark rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {d?.ctaHeading || "Trebate savjet o materijalima?"}
                  </h3>
                  <p className="text-white/60 max-w-lg">
                    {d?.ctaDescription || "Kontaktirajte nas za besplatnu konsultaciju i ponudu — pomoći ćemo vam odabrati idealan materijal za vaš projekat."}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <Link
                    href={d?.ctaButtonLink || "/contact"}
                    className="inline-flex items-center gap-2 bg-white text-dark font-semibold px-7 py-3.5 rounded-full hover:scale-105 transition-transform shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {d?.ctaButtonText || "Kontakt"}
                  </Link>
                  <a
                    href={phoneHref}
                    className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10"
                  >
                    <Phone className="w-4 h-4" />
                    {d?.ctaPhoneText || "Pozovite nas"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
