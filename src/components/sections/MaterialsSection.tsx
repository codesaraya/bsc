"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import MaterialCard from "@/components/cards/MaterialCard";

const defaultMaterials = [
  {
    title: "Forex",
    description:
      "Print na forex PVC ploče — lagane, izdržljive i idealne za unutrašnje i vanjske znakove, displeje i dekoracije.",
    image: "/Materials/Forex/forex8.jpg",
    href: "/materials/uv-direktni-print/forex",
  },
  {
    title: "PVC Naljepnice",
    description:
      "Visokokvalitetne PVC naljepnice za brendiranje, dekoraciju i signalizaciju. Otporne na UV zračenje, vodu i habanje.",
    image: "/Materials/PVC%20Naljepnice/pvc%20naljepnice5.jpg",
    href: "/materials/uv-ecosolvent-latex/pvc-naljepnice",
  },
  {
    title: "Canvas",
    description:
      "Premium canvas materijal za umjetničke reprodukcije, foto printove i dekorativne zidne slike.",
    image: "/Materials/Canvas/canvas3.jpg",
    href: "/materials/uv-ecosolvent-latex/canvas",
  },
];

export default function MaterialsSection({ data }: { data?: any }) {
  const materials = data?.materials || defaultMaterials;
  const badge = data?.badge || "Naši materijali";
  const title = data?.title || "Kvalitetni materijali";
  const subtitle = data?.subtitle || "Koristimo samo najkvalitetnije materijale kako bi vaši printovi izgledali besprijekorno i trajali dugo.";
  const linkText = data?.linkText || "Pogledajte sve materijale";
  const linkHref = data?.linkHref || "/materials";

  return (
    <section className="py-12 md:py-20 bg-gray-50 relative overflow-hidden">
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20" />

      <Container>
        <SectionTitle
          badge={badge}
          title={title}
          subtitle={subtitle}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {materials.map((material: any, i: number) => (
            <motion.div
              key={material.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <MaterialCard {...material} placeholderText={data?.uiLabels?.materialPlaceholder} ctaText={data?.uiLabels?.materialCta} />
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
