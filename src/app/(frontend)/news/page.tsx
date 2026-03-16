import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import { articles as fallbackArticles } from "@/data/news";
import { getPayload } from 'payload';
import config from '@payload-config';
import { getLocale } from '@/lib/locale';
import { getImageUrl } from '@/lib/imageUrl';
import { Sparkles, Calendar, Clock, User, ArrowRight } from "lucide-react";
import NewsCard from "@/components/cards/NewsCard";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const d = await payload.findGlobal({ slug: 'news-page' as any, locale } as any);
    return {
      title: (d as any)?.metaTitle || "Novosti - BSC",
      description: (d as any)?.metaDescription || "Budite u toku sa najnovijim vijestima, savjetima i ažuriranjima iz BSC-a.",
    };
  } catch {
    return {
      title: "Novosti - BSC",
      description: "Budite u toku sa najnovijim vijestima, savjetima i ažuriranjima iz BSC-a.",
    };
  }
}

export default async function NewsPage() {
  let articles = fallbackArticles;
  let pageData: any = null;

  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const [newsRes, pageGlobal, siteSettingsData] = await Promise.all([
      payload.find({
        collection: 'news-articles' as any,
        sort: '-createdAt',
        limit: 100,
        locale,
      } as any),
      payload.findGlobal({ slug: 'news-page' as any, locale } as any).catch(() => null),
      payload.findGlobal({ slug: 'site-settings' as any, locale } as any).catch(() => null),
    ]);

    pageData = pageGlobal;
    const uiL = (siteSettingsData as any)?.uiLabels;
    if (uiL) {
      pageData = { ...pageData, _uiLabels: uiL };
    }

    if (newsRes.docs.length > 0) {
      articles = newsRes.docs.map((doc: any) => ({
        slug: doc.slug,
        title: doc.title,
        excerpt: doc.excerpt,
        content: doc.contentMarkdown || '',
        imageUrl: getImageUrl(doc.uploadedImage),
        date: doc.date,
        category: doc.category,
        author: doc.author || 'BSC Tim',
        readTime: doc.readTime || '5 min čitanja',
      }));
    }
  } catch (e) {
    // fallback to static data
  }

  const d = pageData;
  const uiLabels = (d as any)?._uiLabels || {};

  const featured = articles[0];
  const rest = articles.slice(1);
  const categories = [d?.allCategoryText || "Sve", ...Array.from(new Set(articles.map((a) => a.category)))];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark via-[#1a1060] to-dark -mt-[80px] pt-[120px] sm:pt-[160px] pb-12 sm:pb-20 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Floating decorative elements */}
        <div className="absolute top-36 left-[15%] w-16 h-16 border border-white/10 rounded-2xl backdrop-blur-sm hidden lg:block animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-52 right-[12%] w-12 h-12 border border-primary/20 rounded-xl backdrop-blur-sm hidden lg:block animate-[float_7s_ease-in-out_infinite_reverse]" />
        <div className="absolute bottom-36 left-[22%] w-8 h-8 bg-secondary/10 rounded-lg hidden lg:block animate-[float_5s_ease-in-out_infinite]" />

        <div className="absolute top-8 left-8 z-10 animate-spin" style={{ animationDuration: "20s" }}>
          <Sparkles className="w-10 h-10 text-white/20" />
        </div>
        <div className="absolute top-12 right-16 z-10">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="animate-pulse">
            <path d="M24 0L28.5 19.5L48 24L28.5 28.5L24 48L19.5 28.5L0 24L19.5 19.5L24 0Z" fill="#D4A017" opacity="0.7" />
          </svg>
        </div>
        <Container className="relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            {d?.heroHeading || "Najnovije vijesti"}
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            {d?.heroSubtitle || "Budite u toku sa najnovijim trendovima, savjetima i ažuriranjima iz svijeta digitalne štampe."}
          </p>
        </Container>
      </section>

      {/* Featured Article */}
      <section className="py-10 sm:py-16">
        <Container>
          <Link
            href={`/news/${featured.slug}`}
            className="block group"
          >
            <div className="relative rounded-[2rem] overflow-hidden" style={{ background: "linear-gradient(135deg, #c8b6ff 0%, #b8c0ff 20%, #d4c5f9 40%, #f0c6e8 60%, #f8d0e8 80%, #f5d0e0 100%)" }}>
              <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                {/* Left – Article image or placeholder */}
                <div className="h-64 md:h-80 flex items-center justify-center overflow-hidden">
                  {featured.imageUrl ? (
                    <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-l-[2rem]" />
                  ) : (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white/40 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl font-bold text-secondary">
                          {featured.title[0]}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{d?.featuredImagePlaceholder || "Istaknuta slika"}</p>
                    </div>
                  )}
                </div>

                {/* Right – Content */}
                <div className="p-5 sm:p-8 md:p-12">
                  <Badge variant="secondary" className="mb-4">
                    {featured.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featured.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-5 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      {featured.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                    {d?.readArticleText || "Pročitaj članak"}
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      {/* Category Pills */}
      <section className="pb-4">
        <Container>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <span
                key={cat}
                className={`px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all ${
                  cat === (d?.allCategoryText || "Sve")
                    ? "bg-dark text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* News Grid */}
      <section className="py-10 sm:py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {rest.map((article) => (
              <NewsCard key={article.slug} {...article} placeholderText={uiLabels?.newsPlaceholder} readMoreText={uiLabels?.newsReadMore} />
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">
              {d?.newsletterHeading || "Ne propustite novosti"}
            </h2>
            <p className="text-gray-500 mb-8">
              {d?.newsletterDescription || "Prijavite se na naš newsletter i primajte najnovije savjete, trendove i vijesti iz kompanije direktno u vaš inbox."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder={d?.newsletterPlaceholder || "Unesite vaš email"}
                className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <button className="bg-gray-900 text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors">
                {d?.newsletterButtonText || "Pretplatite se"}
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
