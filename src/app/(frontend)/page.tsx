import { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { getLocale } from '@/lib/locale';
import HeroSection from "@/components/hero/HeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import AboutPreview from "@/components/sections/AboutPreview";
import ServicesTicker from "@/components/sections/ServicesTicker";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import MaterialsSection from "@/components/sections/MaterialsSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ClientsSection from "@/components/sections/ClientsSection";
import StatsPODSection from "@/components/sections/StatsPODSection";
import ProcessStepsSection from "@/components/sections/ProcessStepsSection";
import NewsSection from "@/components/sections/NewsSection";
import CTASection from "@/components/sections/CTASection";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const hp = await payload.findGlobal({ slug: 'homepage' as any, locale } as any);
    return {
      title: (hp as any)?.metaTitle || "BSC - Best Solution Company",
      description: (hp as any)?.metaDescription || "Specijalizirana digitalna štamparija u Sarajevu. UV štampa, brendiranje, tapete, 3D paneli i više.",
    };
  } catch {
    return {
      title: "BSC - Best Solution Company",
      description: "Specijalizirana digitalna štamparija u Sarajevu. UV štampa, brendiranje, tapete, 3D paneli i više.",
    };
  }
}

export default async function Home() {
  const payload = await getPayload({ config });
  const locale = await getLocale();

  const [homepageData, newsResult, siteSettingsData] = await Promise.all([
    payload.findGlobal({ slug: 'homepage' as any, locale } as any).catch(() => ({})),
    payload.find({ collection: 'news-articles' as any, limit: 3, sort: '-createdAt', locale } as any).catch(() => ({ docs: [] })),
    payload.findGlobal({ slug: 'site-settings' as any, locale } as any).catch(() => ({})),
  ]);

  const hp: any = homepageData;
  const newsArticles = (newsResult as any)?.docs || [];
  const uiLabels = (siteSettingsData as any)?.uiLabels || {};

  return (
    <>
      <HeroSection data={hp?.hero} />
      <ProcessSection data={hp?.processSection} />
      <AboutPreview data={hp?.aboutPreview} />
      <ServicesTicker data={hp?.servicesTicker} />
      <ServicesShowcase data={hp?.servicesShowcase} />
      <MaterialsSection data={{ ...hp?.materialsSection, uiLabels }} />
      <PortfolioSection data={hp?.portfolioSection} />
      <ClientsSection data={hp?.clientsSection} />
      <StatsPODSection data={hp?.statsSection} />
      <ProcessStepsSection data={hp?.certificatesSection} />
      <NewsSection data={{ ...hp?.newsSection, uiLabels }} articles={newsArticles} />
      <CTASection data={hp?.ctaSection} />
    </>
  );
}

