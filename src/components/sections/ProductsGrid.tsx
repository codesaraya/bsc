"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/cards/ProductCard";

const defaultProducts = [
  {
    title: "Tapete",
    image: "/Products/Tapete/tapete.jpg",
    category: "Dekoracija",
    href: "/products/home-and-office/wall-art",
  },
  {
    title: "3D Zidni Paneli",
    image: "/Products/3D%20zidni%20paneli/3dzidni.jpg",
    category: "Dekoracija",
    href: "/products/home-and-office/3d-zidni-paneli",
  },
  {
    title: "Billboard",
    image: "/Products/Bilbord/bilbord.jpg",
    category: "Brendiranje",
    href: "/products/outdoor-indoor/billboard",
  },
];

export default function ProductsGrid({ data }: { data?: any }) {
  const products = data?.products || defaultProducts;
  const badge = data?.badge || "Proizvodi";
  const title = data?.title || "Nova rješenja iz naše radionice";
  const subtitle = data?.subtitle || "Istražite naše najpopularnije proizvode koje smo kreirali za naše klijente.";
  const linkText = data?.linkText || "Pogledajte sve proizvode";
  const linkHref = data?.linkHref || "/products";

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20" />

      <Container>
        <SectionTitle
          badge={badge}
          title={title}
          subtitle={subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
          {products.map((product: any, i: number) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard {...product} placeholderText={data?.uiLabels?.productPlaceholder} subtitleText={data?.uiLabels?.productSubtitle} ctaText={data?.uiLabels?.productCta} />
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
