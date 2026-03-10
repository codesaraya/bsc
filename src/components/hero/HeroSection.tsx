"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Mouse, Award, Zap, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { getImageUrl } from '@/lib/imageUrl';

const defaultHeroImages = [
  "/Hero/wallpaper1.jpg",
  "/Hero/wallpaper2.jpg",
  "/Hero/wallpaper3.jpg",
];

const defaultFeatures = [
  {
    icon: Award,
    title: "Kvalitet",
    description: "Kvalitetan print na svim vrstama medija od papira, vinila, cerada i raznih materijala.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Zap,
    title: "Brzina",
    description: "Brzina u svim procesima, od idejnog rješenja do realizacije štampe i montaže.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Sparkles,
    title: "Unikatnost",
    description: "Sa savremenom tehnologijom nudimo široki spektar unikatnih proizvoda.",
    color: "bg-pink-100 text-pink-500",
  },
];

const defaultChecklistItems = [
  "Digitalna štampa velikih i malih formata najnovijom UV tehnologijom",
  "Priprema za štampu, dizajn, dorada i montaža",
];

const iconMap: Record<string, React.ElementType> = { Award, Zap, Sparkles };

export default function HeroSection({ data }: { data?: any }) {
  const heroImages = data?.backgroundImages?.map((i: any) => getImageUrl(i.uploadedImage)) || defaultHeroImages;

  const features = data?.featureCards
    ? data.featureCards.map((f: any) => ({
        icon: iconMap[f.icon] || Award,
        title: f.title,
        description: f.description,
        color: f.color || "bg-primary/10 text-primary",
      }))
    : defaultFeatures;

  const badge = data?.badge || "BSC Sarajevo";
  const headingLine1 = data?.headingLine1 || "Lider štampe velikih";
  const headingLine2 = data?.headingLine2 || "i megavelikih formata";
  const description =
    data?.description ||
    "Osnovna prednost naše štamparije nad konkurencijom je brzina i kvalitet u svim procesima štampe. Specijalizovana štamparija opremljena modernim digitalnim mašinama.";
  const checklistItems = data?.checklistItems?.map((i: any) => i.text) || defaultChecklistItems;
  const ctaText = data?.ctaText || "Kontaktirajte nas";
  const ctaLink = data?.ctaLink || "/contact";
  const scrollText = data?.scrollText || "Skrolajte dolje";

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="relative">
    <section className="relative min-h-[auto] lg:min-h-[75vh] overflow-hidden pb-24 sm:pb-16 -mt-[80px] pt-[80px]">
      {/* Rotating background images */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${heroImages[currentImage]}')` }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30 z-[1]" />

      {/* ──── Decorative Elements ──── */}

      {/* Pink striped circle – top left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-16 left-6 w-20 h-20 opacity-60"
      >
        <svg viewBox="0 0 80 80" fill="none">
          {[0, 8, 16, 24, 32].map((y) => (
            <line key={y} x1="10" y1={20 + y} x2="70" y2={20 + y} stroke="#F9A8D4" strokeWidth="3" strokeLinecap="round" />
          ))}
          <circle cx="40" cy="40" r="32" stroke="#F9A8D4" strokeWidth="2" fill="none" />
        </svg>
      </motion.div>

      {/* Teal dot – top center-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-12 left-[14%] w-8 h-8 bg-cyan-300 rounded-full"
      />

      {/* White abstract star – bottom left */}
      <motion.div
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 0.7, rotate: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-20 left-8 w-28 h-28 opacity-70"
      >
        <svg viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="8" />
          <circle cx="60" cy="60" r="24" stroke="white" strokeWidth="6" />
          <line x1="60" y1="10" x2="60" y2="50" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <line x1="60" y1="70" x2="60" y2="110" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <line x1="10" y1="60" x2="50" y2="60" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <line x1="70" y1="60" x2="110" y2="60" stroke="white" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Soft gradient blob behind image area */}
      <div className="absolute top-1/4 right-[20%] w-[500px] h-[500px] bg-gradient-to-br from-cyan-200/10 via-pink-100/5 to-transparent rounded-full blur-3xl" />

      {/* ──── Content ──── */}
      <Container className="relative z-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:min-h-[75vh] py-6 sm:py-10">
          {/* Left column – text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <span className="inline-block bg-primary text-white text-sm font-semibold tracking-wide px-6 py-2.5 rounded-full mb-8">
              {badge}
            </span>

            {/* Heading */}
            <h1 className="text-[28px] sm:text-[36px] md:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.15]">
              {headingLine1}
              <br />
              {headingLine2}
            </h1>

            {/* Sub-text */}
            <p className="mt-5 text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0">
              {description}
            </p>

            {/* Checkmark list */}
            <div className="mt-7 space-y-3 hidden sm:block">
              {checklistItems.map((text: string) => (
                <div key={text} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-gray-200 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-9 flex justify-center lg:justify-start">
              <Link href={ctaLink}>
                <Button variant="dark" size="lg" className="rounded-full px-10">
                  {ctaText}
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right column – floating feature card */}
          <motion.div
            className="flex items-center justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-soft p-7 w-full max-w-sm border-t-4 border-primary">
              {features.map((feature: any, i: number) => (
                <div key={feature.title}>
                  <div className="flex items-start gap-4 py-1">
                    <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center shrink-0`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark text-base leading-tight">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  {i < features.length - 1 && (
                    <div className="border-b border-gray-100 my-5" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </Container>

      {/* Curved bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 L0,80 Q360,0 720,40 Q1080,80 1440,0 L1440,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>

    {/* Scroll Down indicator – on the edge between hero and content */}
    <motion.div
      className="absolute bottom-0 sm:bottom-14 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <div className="bg-white rounded-3xl px-6 sm:px-8 py-3 sm:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.08)]">
        <Mouse className="w-5 h-5 text-gray-700 mx-auto mb-1" />
        <span className="text-xs font-medium tracking-wider text-gray-700">{scrollText}</span>
      </div>
    </motion.div>
    </div>
  );
}
