"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import NewsCard from "@/components/cards/NewsCard";
import { articles as defaultArticles } from "@/data/news";
import { getImageUrl } from "@/lib/imageUrl";

export default function NewsSection({ data, articles }: { data?: any; articles?: any[] }) {
  const newsArticles = (articles && articles.length > 0 ? articles : defaultArticles).map((item: any) => ({
    ...item,
    imageUrl: item.imageUrl || getImageUrl(item.uploadedImage),
  }));
  const latestNews = newsArticles.slice(0, 3);
  const badge = data?.badge || "Novosti";
  const title = data?.title || "Budite u toku";
  const subtitle = data?.subtitle || "Pročitajte najnovije vijesti, savjete i aktuelnosti iz svijeta digitalne štampe.";
  const linkText = data?.linkText || "Sve novosti";
  const linkHref = data?.linkHref || "/news";

  return (
    <section className="py-12 md:py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute -top-10 left-1/2 w-80 h-80 bg-pink-200 rounded-full blur-3xl opacity-20" />

      <Container>
        <SectionTitle
          badge={badge}
          title={title}
          subtitle={subtitle}
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {latestNews.map((item: any, i: number) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="h-full"
            >
              <NewsCard {...item} placeholderText={data?.uiLabels?.newsPlaceholder} readMoreText={data?.uiLabels?.newsReadMore} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={linkHref}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300"
          >
            {linkText}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
