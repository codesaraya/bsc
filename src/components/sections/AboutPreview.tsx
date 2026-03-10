"use client";

import { motion } from "framer-motion";
import { Cpu, Layers, Users } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { getImageUrl } from '@/lib/imageUrl';

const defaultFeatures = [
  {
    icon: Cpu,
    title: "UV LED Tehnologija",
    description: "UV LED mašina širine štampe 3,2m — jedina na ovim prostorima.",
    color: "text-primary bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Layers,
    title: "Print na sve materijale",
    description: "UV DILLI štampa na staklo, plexy, alubond, forex, MDF, drvo i još mnogo toga.",
    color: "text-amber-500 bg-amber-50",
    border: "border-amber-200",
  },
];

const defaultImages = [
  { src: "/Products/Brendiranje%20Poslovnih%20Prostora/Brendiranje%20poslovnih%20prostora.jpg", alt: "Brendiranje poslovnih prostora" },
  { src: "/Products/Wall%20Art/wall%20art.jpg", alt: "Wall Art" },
  { src: "/Products/Wallscape/wallscape.jpg", alt: "Wallscape" },
];

const iconMap: Record<string, React.ElementType> = { Cpu, Layers, Users };

export default function AboutPreview({ data }: { data?: any }) {
  const badge = data?.badge || "O nama";
  const heading = data?.heading || "Best Solution Company";
  const description =
    data?.description ||
    "BSC je specijalizovana štamparija osnovana 2012. godine sinergijom sa firmom MMC Studio koji posluje od 1997. u Sarajevu. Opremljeni smo najnovijim digitalnim UV mašinama. Osim UV tehnologije koristimo latex i ecosolvent mašine u izradi naših visoko kvalitetnih proizvoda (MUTOH, HP, SUMA, XEROX, CANON).";
  const ctaText = data?.ctaText || "Više o nama";
  const ctaLink = data?.ctaLink || "/about";
  const statsNumber = data?.statsNumber || "4650+";
  const statsLabel = data?.statsLabel || "sretnih klijenata";

  const features = data?.featureCards
    ? data.featureCards.map((f: any) => ({
        icon: iconMap[f.icon] || Cpu,
        title: f.title,
        description: f.description,
        color: f.color || "text-primary bg-primary/10",
        border: f.border || "border-primary/20",
      }))
    : defaultFeatures;

  const images = data?.images || defaultImages;

  return (
    <section className="py-12 md:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      {/* Pink dot – top left */}
      <div className="absolute top-[18%] left-[7%] w-3 h-3 bg-pink-400 rounded-full" />
      {/* Pink triangle – right */}
      <motion.div
        className="absolute top-[22%] right-[3%]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L22 20H2L12 2Z" fill="#F472B6" />
        </svg>
      </motion.div>
      {/* Teal circle – bottom left */}
      <div className="absolute bottom-[15%] left-[1%] w-10 h-10 border-4 border-primary rounded-full" />
      {/* Purple dot – right center */}
      <div className="absolute bottom-[30%] right-[2%] w-5 h-5 bg-violet-300 rounded-full opacity-60" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left – Image Collage */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Pink organic blob background */}
            <div className="absolute top-[5%] -left-[8%] w-[90%] h-[90%] z-0">
              <svg viewBox="0 0 500 500" fill="none" className="w-full h-full">
                <path
                  d="M420,150 Q460,50 380,30 Q280,-10 200,40 Q120,80 60,160 Q10,240 40,330 Q70,420 160,450 Q250,480 340,440 Q430,400 450,310 Q470,220 420,150Z"
                  fill="#FBCFE8"
                  opacity="0.45"
                />
              </svg>
            </div>

            {/* Decorative: teal circle outline – top left */}
            <div className="absolute top-[4%] left-[2%] w-7 h-7 border-[2.5px] border-cyan-400 rounded-full z-20" />
            <div className="absolute top-[7%] left-[6%] w-2 h-2 bg-cyan-400 rounded-full z-20" />

            {/* ── Image Collage ── */}
            <div className="relative z-10 w-full max-w-[520px] mx-auto h-[350px] sm:h-[450px] md:h-[580px]">

              {/* 1) Top left, large */}
              <motion.div
                className="absolute top-0 left-[8%] w-[55%] rounded-2xl shadow-xl overflow-hidden z-10"
                style={{ height: "55%" }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src={getImageUrl(images[0]?.uploadedImage) || defaultImages[0].src}
                  alt={images[0]?.alt || defaultImages[0].alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>

              {/* 2) Middle right, overlapping */}
              <motion.div
                className="absolute top-[28%] right-[0%] w-[48%] rounded-2xl shadow-xl overflow-hidden z-20"
                style={{ height: "48%" }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <img
                  src={getImageUrl(images[1]?.uploadedImage) || defaultImages[1].src}
                  alt={images[1]?.alt || defaultImages[1].alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>

              {/* 3) Bottom left */}
              <motion.div
                className="absolute bottom-[2%] left-[0%] w-[52%] rounded-2xl shadow-xl overflow-hidden z-10"
                style={{ height: "45%" }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <img
                  src={getImageUrl(images[2]?.uploadedImage) || defaultImages[2].src}
                  alt={images[2]?.alt || defaultImages[2].alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>

              {/* Curved line decoration – bottom area */}
              <svg
                className="absolute bottom-[8%] right-[8%] w-32 h-24 z-0"
                viewBox="0 0 140 100"
                fill="none"
              >
                <path
                  d="M5 90 Q 70 10, 135 50"
                  stroke="#C7D2FE"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>

          {/* Right – Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Badge */}
            <span className="inline-block bg-primary text-white text-sm font-semibold tracking-wide px-6 py-2.5 rounded-full mb-6">
              {badge}
            </span>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-dark leading-[1.15] mb-5">
              {heading}
            </h2>

            {/* Paragraph */}
            <p className="text-gray-500 leading-relaxed mb-8 max-w-lg">
              {description}
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-10">
              {features.map((feature: any) => (
                <div
                  key={feature.title}
                  className={`bg-white border ${feature.border} rounded-2xl p-5 hover:shadow-soft transition-shadow duration-300`}
                >
                  <div className={`w-11 h-11 ${feature.color} rounded-xl flex items-center justify-center mb-3`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-dark text-base mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-6">
              <Link href={ctaLink}>
                <Button variant="dark" size="lg" className="rounded-full px-10">
                  {ctaText}
                </Button>
              </Link>

              {/* Stats highlight */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[
                    "bg-gradient-to-br from-blue-400 to-blue-600",
                    "bg-gradient-to-br from-amber-400 to-orange-500",
                    "bg-gradient-to-br from-pink-400 to-rose-500",
                    "bg-gradient-to-br from-teal-400 to-primary",
                  ].map((bg, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 ${bg} rounded-full border-2 border-white flex items-center justify-center`}
                    >
                      <span className="text-white text-xs font-bold">
                        {["B", "S", "C", "✓"][i]}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <span className="text-dark font-bold text-sm">{statsNumber}</span>
                  <span className="text-gray-400 text-sm ml-1">{statsLabel}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
