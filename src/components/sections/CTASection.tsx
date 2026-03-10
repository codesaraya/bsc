"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/ui/Container";
import {
  Printer,
  Palette,
  Layers,
  Tag,
  Frame,
  Brush,
  Image,
} from "lucide-react";

/* Default floating cards data */
const defaultFloatingCards = [
  { icon: "Printer", color: "text-teal-600", bg: "bg-white", label: "UV Štampa", className: "w-20 h-20 top-4 right-32", rotate: -8 },
  { icon: "Image", color: "text-blue-600", bg: "bg-blue-50", label: "Tapete", className: "w-28 h-24 top-6 right-4", rotate: 6 },
  { icon: "Palette", color: "text-purple-600", bg: "bg-purple-50", label: "Dizajn", className: "w-24 h-20 top-20 right-48", rotate: -4 },
  { icon: "Tag", color: "text-amber-600", bg: "bg-amber-50", label: "Naljepnice", className: "w-22 h-20 top-[160px] right-52", rotate: -6 },
  { icon: "Frame", color: "text-rose-600", bg: "bg-rose-50", label: "3D Paneli", className: "w-20 h-20 bottom-12 right-36", rotate: 8 },
  { icon: "Brush", color: "text-gray-700", bg: "bg-gray-100", label: "Alubond", className: "w-24 h-22 bottom-8 right-8", rotate: -5 },
];

const iconMap: Record<string, React.ElementType> = { Printer, Palette, Layers, Tag, Frame, Brush, Image };

/* Floating product card component */
function ProductCard({
  icon: Icon,
  color,
  bg,
  label,
  className,
  rotate = 0,
}: {
  icon: React.ElementType;
  color: string;
  bg: string;
  label: string;
  className?: string;
  rotate?: number;
}) {
  return (
    <motion.div
      className={`absolute shadow-xl rounded-xl flex flex-col items-center justify-center gap-1.5 ${className}`}
      style={{ rotate: `${rotate}deg` }}
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.random() * 0.3 + 0.2 }}
    >
      <div className={`${bg} w-full h-full rounded-xl flex flex-col items-center justify-center p-3`}>
        <Icon className={`w-7 h-7 ${color}`} />
        <span className="text-[10px] font-semibold text-gray-600 mt-1">{label}</span>
      </div>
    </motion.div>
  );
}

export default function CTASection({ data }: { data?: any }) {
  const badge = data?.badge || "Kontakt";
  const headingLine1 = data?.headingLine1 || "Želite poslati upit,";
  const headingLine2 = data?.headingLine2 || "zahtjev, narudžbu?";
  const buttonText = data?.buttonText || "Kontaktirajte nas";
  const buttonLink = data?.buttonLink || "/contact";

  // Merge CMS data into the hardcoded layout/style definitions
  const floatingCards = defaultFloatingCards.map((card, i) => ({
    ...card,
    label: data?.floatingCards?.[i]?.label || card.label,
    icon: data?.floatingCards?.[i]?.icon || card.icon,
    color: data?.floatingCards?.[i]?.color || card.color,
    bg: data?.floatingCards?.[i]?.bg || card.bg,
    className: data?.floatingCards?.[i]?.className || card.className,
    rotate: data?.floatingCards?.[i]?.rotate ?? card.rotate,
  }));

  // Center card (Branding by default)
  const centerLabel = data?.centerCard?.label || "Branding";
  const CenterIcon = iconMap[data?.centerCard?.icon || "Layers"] || Layers;
  const centerGradient = data?.centerCard?.gradient || "from-teal-400 to-emerald-500";

  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #c8b6ff 0%, #b8c0ff 20%, #d4c5f9 40%, #f0c6e8 60%, #f8d0e8 80%, #f5d0e0 100%)",
          }}
        >
          {/* Soft glow blobs */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center min-h-[340px]">
            {/* ── Left: Text content ── */}
            <div className="p-6 sm:p-10 md:p-14 lg:p-16">
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-block bg-primary text-white text-sm font-semibold tracking-wide px-6 py-2.5 rounded-full mb-6"
              >
                {badge}
              </motion.span>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-gray-900 leading-[1.15] mb-6 sm:mb-8"
              >
                {headingLine1}
                <br />
                {headingLine2}
              </motion.h2>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <Link
                  href={buttonLink}
                  className="inline-block bg-gray-900 text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-gray-800 transition-colors"
                >
                  {buttonText}
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Product collage ── */}
            <div className="relative h-[340px] hidden lg:block">
              {/* Render floating cards from data */}
              {floatingCards.map((card: any, i: number) => {
                const IconComponent = iconMap[card.icon] || Printer;
                return (
                  <ProductCard
                    key={i}
                    icon={IconComponent}
                    color={card.color}
                    bg={card.bg}
                    label={card.label}
                    className={card.className}
                    rotate={card.rotate}
                  />
                );
              })}

              {/* Large center card – branding */}
              <motion.div
                className="absolute w-36 h-28 top-[90px] right-16 rounded-xl shadow-xl overflow-hidden"
                style={{ rotate: "3deg" }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className={`w-full h-full bg-gradient-to-br ${centerGradient} flex flex-col items-center justify-center p-3`}>
                  <CenterIcon className="w-8 h-8 text-white" />
                  <span className="text-xs font-bold text-white mt-1">{centerLabel}</span>
                </div>
              </motion.div>

              {/* Decorative sticker rolls (left edge) */}
              <motion.div
                className="absolute -left-6 bottom-4 flex flex-col gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 shadow-lg flex items-center justify-center">
                  <span className="text-lg">🏷️</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg flex items-center justify-center">
                  <span className="text-sm">✨</span>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
