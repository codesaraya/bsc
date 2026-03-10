import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import {
  articles as fallbackArticles,
  getArticleBySlug as getStaticArticleBySlug,
  getAllSlugs,
} from "@/data/news";
import { getPayload } from "payload";
import config from "@payload-config";
import { getLocale } from '@/lib/locale';
import { getImageUrl } from '@/lib/imageUrl';

/* ── Static params for SSG ── */
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();
    const res = await payload.find({
      collection: "news-articles" as any,
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
        collection: "news-articles" as any,
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
        description: doc.excerpt || doc.description,
      };
    }
  } catch {
    // fallback to static
  }

  const article = getStaticArticleBySlug(slug);
  if (!article) return { title: "Nije pronađeno" };
  return {
    title: `${article.title} - BSC`,
    description: article.excerpt,
  };
}

/* ── Simple markdown-ish renderer ── */
function renderContent(content: string) {
  return content.split("\n\n").map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-2xl font-bold text-dark mt-10 mb-4"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    }
    if (trimmed.startsWith("- **")) {
      const items = trimmed.split("\n").map((line) => line.trim());
      return (
        <ul key={i} className="space-y-3 my-4">
          {items.map((item, j) => {
            const cleaned = item.replace(/^- /, "");
            const parts = cleaned.split("**");
            return (
              <li key={j} className="flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-1" />
                <span className="text-gray-600 leading-relaxed">
                  {parts.map((part, k) =>
                    k % 2 === 1 ? (
                      <strong key={k} className="text-dark">
                        {part}
                      </strong>
                    ) : (
                      <span key={k}>{part}</span>
                    )
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <p key={i} className="text-gray-600 leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  });
}

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  imageUrl?: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article: Article | undefined;
  let allArticles: Article[] = fallbackArticles;
  let dp: any = null;

  try {
    const payload = await getPayload({ config });
    const locale = await getLocale();

    // Fetch the current article + detail page config
    const [res, detailPage] = await Promise.all([
      payload.find({
        collection: "news-articles" as any,
        where: { slug: { equals: slug } },
        limit: 1,
        locale,
      } as any),
      payload.findGlobal({ slug: 'news-detail-page' as any, locale } as any).catch(() => null),
    ]);
    dp = detailPage;

    if (res.docs.length > 0) {
      const doc: any = res.docs[0];
      article = {
        slug: doc.slug,
        title: doc.title,
        excerpt: doc.excerpt,
        content: doc.contentMarkdown || "",
        imageUrl: getImageUrl(doc.uploadedImage),
        date: doc.date,
        category: doc.category,
        author: doc.author || "BSC Tim",
        readTime: doc.readTime || "5 min čitanja",
      };

      // Fetch all articles for related
      const allRes = await payload.find({
        collection: "news-articles" as any,
        sort: "-createdAt",
        limit: 100,
        locale,
      } as any);
      if (allRes.docs.length > 0) {
        allArticles = allRes.docs.map((d: any) => ({
          slug: d.slug,
          title: d.title,
          excerpt: d.excerpt,
          content: d.contentMarkdown || "",
          imageUrl: getImageUrl(d.uploadedImage),
          date: d.date,
          category: d.category,
          author: d.author || "BSC Tim",
          readTime: d.readTime || "5 min čitanja",
        }));
      }
    }
  } catch {
    // fallback to static
  }

  // Fallback to static data if not found in Payload
  if (!article) {
    article = getStaticArticleBySlug(slug);
  }

  if (!article) notFound();

  /* Related articles (exclude current, pick up to 3) */
  const related = allArticles
    .filter((a) => a.slug !== article!.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 -mt-[80px] pt-[110px] sm:pt-[144px] pb-10 sm:pb-16 relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30" />
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-20" />
        <Container className="relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              {dp?.breadcrumbHome || 'Početna'}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/news" className="hover:text-primary transition-colors">
              {dp?.breadcrumbNews || 'Novosti'}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700 truncate max-w-[200px]">
              {article.title}
            </span>
          </div>

          {/* Badge */}
          <Badge variant="secondary" className="mb-4">
            {article.category}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-dark leading-tight max-w-3xl">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 mt-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-10 sm:py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Featured image or placeholder */}
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center mb-10 overflow-hidden">
              {article.imageUrl ? (
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-secondary">
                      {article.title[0]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{dp?.featuredImagePlaceholder || 'Istaknuta slika'}</p>
                </div>
              )}
            </div>

            {/* Excerpt highlight */}
            <div className="border-l-4 border-primary bg-primary/5 rounded-r-xl px-6 py-5 mb-10">
              <p className="text-gray-700 leading-relaxed italic">
                {article.excerpt}
              </p>
            </div>

            {/* Content */}
            <article className="prose-custom">
              {renderContent(article.content)}
            </article>

            {/* Back link */}
            <div className="mt-14 pt-8 border-t border-gray-100">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                {dp?.backToAllText || 'Nazad na sve članke'}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-10 sm:py-16 bg-gray-50">
          <Container>
            <h2 className="text-2xl font-bold text-dark mb-8 text-center">
              {dp?.relatedTitle || 'Povezani članci'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="bg-white rounded-2xl shadow-soft overflow-hidden group hover:scale-105 transition-transform duration-300"
                >
                  <div className="h-40 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-12 h-12 bg-white/60 rounded-xl flex items-center justify-center">
                        <span className="text-lg font-bold text-secondary">
                          {item.title[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <h3 className="font-bold text-dark text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
