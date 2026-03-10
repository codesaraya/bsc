"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Award,
  MapPin,
  ShoppingCart,
  ArrowUpRight,
  Zap,
  Star,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { getImageUrl } from '@/lib/imageUrl';

/* ── Icon mapping for CMS-driven selections ── */
const featureIconMap: Record<string, LucideIcon> = {
  Award, Package, MapPin, ShoppingCart, Zap, Star, Shield,
};

/* ── Icon / style mapping for feature cards ── */
const featureStyles: { icon: LucideIcon; bg: string; ring: string; color: string }[] = [
  { icon: Award, bg: "bg-amber-50", ring: "ring-amber-100", color: "text-amber-500" },
  { icon: Package, bg: "bg-blue-50", ring: "ring-blue-100", color: "text-blue-500" },
  { icon: MapPin, bg: "bg-emerald-50", ring: "ring-emerald-100", color: "text-emerald-500" },
  { icon: ShoppingCart, bg: "bg-cyan-50", ring: "ring-cyan-100", color: "text-cyan-500" },
];

/* ── Default service card data ── */
const defaultServices = [
  { title: "Ecosolvent štampa", image: "/Materials/PVC%20Naljepnice/pvc%20naljepnice.jpg", desc: "Ecosolvent print za unutrašnju i vanjsku upotrebu.", href: "/materials/uv-ecosolvent-latex" },
  { title: "Print na staklo", image: "/Materials/Staklo/staklo.jpg", desc: "UV direktan print na staklene površine svih dimenzija.", href: "/materials/uv-direktni-print/staklo" },
  { title: "Print na drvo", image: "/Materials/Drvo/Drvo.jpg", desc: "Kvalitetan print na drvene podloge i MDF ploče.", href: "/materials/uv-direktni-print/drvo" },
  { title: "Print na metal", image: "/Materials/Alu%20Bond/alu%20bond.jpg", desc: "Trajni UV print na metalne i alubond površine.", href: "/materials/uv-direktni-print/alu-bond" },
  { title: "Print na plastiku", image: "/Materials/Forex/forex.jpg", desc: "Print na plexy, forex i sve vrste plastike.", href: "/materials/uv-direktni-print/forex" },
  { title: "Print na keramiku", image: "/Materials/Kapaline/kapaline.jpg", desc: "Precizni printovi na keramičke pločice i podloge.", href: "/materials/uv-direktni-print" },
  { title: "Print na kožu", image: "/Materials/Ko%C5%BEa/ko%C5%BEa.jpg", desc: "Unikatni printovi na kožne proizvode i materijale.", href: "/materials/laser/koza" },
  { title: "Latex štampa", image: "/Products/Banneri/banneri.jpg", desc: "Visokokvalitetni printovi latex tehnologijom.", href: "/materials/uv-ecosolvent-latex" },
];

/* ── Default bottom feature data ── */
const defaultFeatures = [
  {
    title: "Kvalitet",
    icon: <Award className="w-7 h-7 text-amber-500" />,
    bg: "bg-amber-50",
    ring: "ring-amber-100",
    desc: "Kvalitetan print na svim vrstama medija od papira, vinila, cerada i raznih materijala.",
  },
  {
    title: "Brzina",
    icon: <Package className="w-7 h-7 text-blue-500" />,
    bg: "bg-blue-50",
    ring: "ring-blue-100",
    desc: "Brzina i kvalitet u svim procesima, od idejnog rješenja do montaže i servisa.",
  },
  {
    title: "Unikatnost",
    icon: <MapPin className="w-7 h-7 text-emerald-500" />,
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
    desc: "Sa savremenom tehnologijom slijedimo trendove i nudimo široki spektar unikatnih proizvoda.",
  },
  {
    title: "Povoljnost",
    icon: <ShoppingCart className="w-7 h-7 text-cyan-500" />,
    bg: "bg-cyan-50",
    ring: "ring-cyan-100",
    desc: "Od ideje do završnog proizvoda, dostave i montaže, sve po povoljnim cijenama.",
  },
];

export default function ServicesShowcase({ data }: { data?: any }) {
  const services = data?.services || defaultServices;
  const features = data?.features || defaultFeatures;
  const badge = data?.badge || "Direktan print";
  const headingLine1 = data?.headingLine1 || "Vršimo direktan print na";
  const headingLine2 = data?.headingLine2 || "UV / Ecosolvent / Latex";
  const buttonText = data?.buttonText || "Svi materijali";
  const buttonLink = data?.buttonLink || "/materials";
  const featuresHeading = data?.featuresHeading || "Prednost naše štamparije u odnosu na druge";
  const readMoreText = data?.readMoreText || "Pročitajte više";

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  /* ── Drag-to-scroll state ── */
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  /* Auto-scroll the cards continuously to the left */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animating = false;

    const smoothScroll = (target: number, duration: number) => {
      animating = true;
      const start = el.scrollLeft;
      const distance = target - start;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        /* ease-in-out cubic */
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        el.scrollLeft = start + distance * ease;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          animating = false;
        }
      };
      requestAnimationFrame(step);
    };

    const cardWidth = 250 + 24; // card width + gap

    const interval = setInterval(() => {
      if (!isPaused && !isDragging.current && !animating && el) {
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
        smoothScroll(el.scrollLeft + cardWidth, 600);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  /* ── Drag handlers (pointer events cover both mouse & touch) ── */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    setIsPaused(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartX.current;
    el.scrollLeft = dragScrollLeft.current - dx;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const wasDragged = Math.abs(e.clientX - dragStartX.current) > 5;
    isDragging.current = false;
    scrollRef.current?.releasePointerCapture(e.pointerId);
    setIsPaused(false);
    /* If the user actually dragged, suppress the click so links don't fire */
    if (wasDragged) {
      const handler = (ev: Event) => { ev.preventDefault(); ev.stopPropagation(); };
      scrollRef.current?.addEventListener('click', handler, { capture: true, once: true });
    }
  };

  const duplicated = [...services, ...services];

  return (
    <section className="relative bg-[#f8f8f8] overflow-hidden">
      {/* Diamond pattern background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23000' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Decorative diamonds – upper left ── */}
      <div className="absolute top-0 left-0 w-[280px] h-[280px] pointer-events-none z-0">
        {/* Large diamond */}
        <div className="absolute -top-16 -left-16 w-48 h-48 border-2 border-gray-300/80 rotate-45 rounded-md" />
        {/* Medium diamond */}
        <div className="absolute top-4 left-4 w-32 h-32 border-2 border-gray-300/70 rotate-45 rounded-md" />
        {/* Small diamond */}
        <div className="absolute top-16 left-16 w-20 h-20 border-2 border-gray-300/60 rotate-45 rounded-sm" />
        {/* Tiny filled diamond */}
        <div className="absolute top-24 left-24 w-10 h-10 bg-gray-300/40 rotate-45 rounded-sm" />
      </div>

      {/* ── Header row ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 sm:pt-20 pb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            {/* Badge */}
            <span className="inline-block bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full mb-5">
              {badge}
            </span>
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold text-dark leading-tight">
              {headingLine1}
              <br />
              <span className="underline decoration-2 underline-offset-4">
                {headingLine2}
              </span>
            </h2>
          </div>

          {/* Button + decorative circle */}
          <div className="relative flex items-center">
            <Link href={buttonLink} className="bg-dark text-white text-sm font-semibold px-8 py-4 rounded-full hover:bg-dark/90 transition-colors">
              {buttonText}
            </Link>
            {/* Small teal circle decoration */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-primary" />
          </div>
        </div>
      </div>

      {/* ── Scrolling service cards ── */}
      <div
        ref={scrollRef}
        className="relative z-10 flex gap-6 overflow-x-auto py-6 px-6 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => { if (!isDragging.current) setIsPaused(true); }}
        onMouseLeave={() => { if (!isDragging.current) setIsPaused(false); }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {duplicated.map((s: any, i: number) => (
          <div
            key={i}
            className="flex-shrink-0 w-[250px] group cursor-pointer"
          >
            {/* Title + description */}
            <h3 className="text-lg font-bold text-dark mb-1">{s.title}</h3>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              {s.desc || s.description}
            </p>

            {/* Circular image */}
            <div className="mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden shadow-sm relative">
                {getImageUrl(s.uploadedImage) && (
                  <img
                    src={getImageUrl(s.uploadedImage)}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Read Out More link */}
            <Link
              href={s.href}
              className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2.5 transition-all"
            >
              {readMoreText}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* ── Bottom features row: Prednosti ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10 pb-12 sm:pb-20">
        <h3 className="text-center text-2xl sm:text-3xl font-extrabold text-dark mb-10">{featuresHeading}</h3>
        <div className="bg-white rounded-3xl shadow-soft px-5 py-8 sm:px-8 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-10">
            {features.map((f: any, i: number) => {
              const style = featureStyles[i % featureStyles.length];
              const IconComp = (typeof f.icon === 'string' ? featureIconMap[f.icon] : null) || style.icon;
              const bg = f.bg || style.bg;
              const ring = f.ring || style.ring;
              const color = f.color || style.color;
              const desc = f.desc || f.description || "";
              return (
              <div key={i} className="flex flex-col items-center text-center">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl ${bg} ring-4 ${ring} flex items-center justify-center mb-4`}
                >
                  <IconComp className={`w-7 h-7 ${color}`} />
                </div>
                <h4 className="text-base font-bold text-dark mb-2">
                  {f.title}
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">
                  {desc}
                </p>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
