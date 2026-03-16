"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink } from "lucide-react";
import { getImageUrl } from '@/lib/imageUrl';

/* ── Animated counter hook ── */
function useCountUp(end: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [end, duration, trigger]);

  return count;
}

/* ── Single stat counter ── */
function AnimatedStat({
  numericValue,
  suffix,
  dark,
}: {
  numericValue: number;
  suffix: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(numericValue, 2200, visible);

  return (
    <span
      ref={ref}
      className={`text-[28px] sm:text-[38px] md:text-[48px] font-extrabold tracking-tight leading-none ${
        dark ? "text-white" : "text-dark"
      }`}
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Default stats data ── */
const defaultStats = [
  {
    numericValue: 4650,
    suffix: "+",
    label: "Sretnih klijenata",
    gradient: "from-[#FDDDE6] via-[#FBE9ED] to-[#FDDDE6]/40",
  },
  {
    numericValue: 3790,
    suffix: "+",
    label: "Završenih projekata",
    gradient: "from-[#E3E8EF] via-[#EDF1F5] to-[#E3E8EF]/40",
  },
  {
    numericValue: 5580,
    suffix: "+",
    label: "Fotografija",
    gradient: "from-[#B2DFDB] via-[#C8EBE8] to-[#B2DFDB]/40",
  },
  {
    numericValue: 8580,
    suffix: "+",
    label: "Tel. poziva",
    gradient: "from-[#1A1464] via-[#251a80] to-[#1A1464]",
    dark: true,
  },
];

/* ── Default info items ── */
const defaultInfoItems = [
  {
    title: "BSC Sarajevo City Centar",
    text: "Vaše odredište za brze grafičke usluge — letci, brošure, UV printovi, vizitke, hemijske olovke, upaljači, šolje, tekstilni print, pleksiglas stalci, izrada pečata, kopiranje, skeniranje i grafička priprema.",
    image: "/SCC.jpg",
    slug: "scc",
    address: "Sarajevo City Centar, Vrbanja 1, 71000 Sarajevo",
    phone: "+387 33 571 111",
    viber: "+387 61 200 100",
    email: "bscsarajevo@gmail.com",
    mapUrl: "https://maps.google.com/?q=Sarajevo+City+Center",
    workingHours: [{ days: "Pon-Sub", hours: "10:00-22:00" }],
  },
  {
    title: "BSC Budakovići",
    text: "Proizvodni pogon za velikoformatnu štampu — XXL formati, billboardi, banneri, brendiranje vozila, portali, tapete, neonske reklame, pleksiglas stalci, posteri i sve vrste outdoor i indoor rješenja.",
    image: "/BUDAKOVICI.jpg",
    slug: "budakovici",
    address: "Budakovići bb, 71000 Sarajevo",
    phone: "+387 33 571 112",
    viber: "+387 61 200 101",
    email: "bscsarajevo@gmail.com",
    mapUrl: "https://maps.google.com/?q=Budakovici+Sarajevo",
    workingHours: [
      { days: "Pon-Pet", hours: "08:00-17:00" },
      { days: "Sub", hours: "09:00-17:00" },
    ],
  },
  {
    title: "BSC Aria Mall Sarajevo",
    text: "Print Shop u Aria Mallu — letci, brošure, UV printovi, vizitke, hemijske olovke, upaljači, šolje, tekstilni print, pleksiglas stalci, izrada pečata, kopiranje, skeniranje i grafička priprema.",
    image: "/BBI.jpg",
    slug: "aria",
    address: "Aria Mall, Trg djece Sarajeva 1, 71000 Sarajevo",
    phone: "+387 33 571 113",
    viber: "+387 61 200 102",
    email: "bscsarajevo@gmail.com",
    mapUrl: "https://maps.google.com/?q=Aria+Mall+Sarajevo",
    workingHours: [
      { days: "Pon-Sub", hours: "09:00-22:00" },
      { days: "Ned", hours: "10:00-18:00" },
    ],
  },
];

export default function StatsPODSection({ data }: { data?: any }) {
  const stats = data?.stats || defaultStats;
  const rawLocations = data?.locations || defaultInfoItems;
  // Merge CMS data with defaults so static images are always available as fallback
  const infoItems = rawLocations.map((loc: any, i: number) => ({
    ...defaultInfoItems[i],
    ...loc,
  }));
  const heading = data?.heading || "BSC u brojevima \u2014 rezultati koji govore sami za sebe";
  const badge = data?.locationsBadge || data?.badge || "Naše lokacije";
  const locationsHeadingLine1 = data?.locationsHeadingLine1 || "Print Shop BSC";
  const locationsHeadingLine2 = data?.locationsHeadingLine2 || "Na tri lokacije";
  const starburstText = data?.starburstText || "Kvalitetna Štampa";

  const [activeLocation, setActiveLocation] = useState(0);

  return (
    <>
      {/* ═══════════════════════════════════════
          PART 1 – Stats bar
         ═══════════════════════════════════════ */}
      <section className="bg-white py-10 sm:py-16 lg:py-20">
        <div className="max-w-[1080px] mx-auto px-6">
          <p className="text-center text-dark font-semibold text-base md:text-lg tracking-tight mb-14">
            {heading}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {stats.map((s: any, i: number) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div
                  className={`w-full max-w-[260px] h-20 md:h-[88px] rounded-full bg-gradient-to-r ${s.gradient} flex items-center justify-center`}
                >
                  <AnimatedStat
                    numericValue={s.numericValue}
                    suffix={s.suffix}
                    dark={s.dark}
                  />
                </div>
                <span className="text-[13px] text-gray-400 font-medium text-center">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PART 2 – Locations with hover detail
         ═══════════════════════════════════════ */}
      <section className="bg-white pb-16 sm:pb-28 pt-6">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

          {/* ── Mobile: heading + badge above everything ── */}
          <div className="lg:hidden text-center mb-8">
            <span className="inline-block bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full mb-5">
              {badge}
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-dark leading-[1.15]">
              {locationsHeadingLine1}
              <br />
              {locationsHeadingLine2}
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-14">

            {/* ── Left: Image + Contact Detail ── */}
            <div className="relative w-full lg:w-[48%] flex flex-col gap-4 lg:gap-5 order-2 lg:order-1">
              {/* Pink blob */}
              <div className="absolute -top-8 -left-8 w-44 h-44 bg-[#FCE4EC]/60 rounded-full blur-3xl pointer-events-none hidden lg:block" />

              {/* Main image — flex-1 on desktop so it grows to fill */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg w-full min-h-[220px] sm:min-h-[280px] lg:flex-1">
                {infoItems.map((item: any, i: number) => {
                  const imgUrl = getImageUrl(item.uploadedImage) || item.image;
                  return imgUrl ? (
                    <img
                      key={i}
                      src={imgUrl}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        activeLocation === i ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ) : null;
                })}
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLocation}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute bottom-4 left-5 right-5"
                  >
                    <h3 className="text-white font-bold text-base sm:text-lg drop-shadow-md">
                      {infoItems[activeLocation]?.title}
                    </h3>
                  </motion.div>
                </AnimatePresence>

                {/* Starburst badge — inside image on desktop */}
                <div className="absolute bottom-3 right-3 sm:bottom-auto sm:top-4 sm:left-4 z-20 hidden sm:block">
                  <svg
                    width="190"
                    height="72"
                    viewBox="0 0 190 72"
                    fill="none"
                    className="drop-shadow-md"
                  >
                    <path
                      d="M8 36C8 22 14 12 28 9C26 4 38 1 52 4C60 -1 74 -1 90 4C106 -1 120 -1 128 4C142 1 154 4 156 9C170 12 182 22 182 36C182 50 170 60 156 63C154 68 142 71 128 68C120 73 106 73 90 68C74 73 60 73 52 68C38 71 26 68 28 63C14 60 8 50 8 36Z"
                      fill="#67E8F9"
                    />
                    <circle cx="62" cy="36" r="3" fill="#42C6D9" />
                    <text
                      x="95"
                      y="37"
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#1A1464"
                      fontWeight="bold"
                      fontSize="13"
                      fontStyle="italic"
                    >
                      {starburstText}
                    </text>
                    <circle cx="128" cy="36" r="3" fill="#42C6D9" />
                  </svg>
                </div>
              </div>

              {/* Contact detail cards — animate on hover/tap change */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLocation}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col gap-2.5 sm:gap-3"
                >
                  {/* Contact grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {infoItems[activeLocation]?.address && (
                      <div className="flex items-start gap-2.5 sm:gap-3 bg-gray-50 rounded-xl p-3 sm:p-3.5 border border-gray-100">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Adresa</p>
                          <p className="text-[11px] sm:text-[12px] text-dark font-medium leading-snug">{infoItems[activeLocation].address}</p>
                        </div>
                      </div>
                    )}
                    {infoItems[activeLocation]?.phone && (
                      <div className="flex items-start gap-2.5 sm:gap-3 bg-gray-50 rounded-xl p-3 sm:p-3.5 border border-gray-100">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Telefon</p>
                          <a href={`tel:${infoItems[activeLocation].phone}`} className="text-[11px] sm:text-[12px] text-dark font-medium hover:text-primary transition-colors">{infoItems[activeLocation].phone}</a>
                        </div>
                      </div>
                    )}
                    {infoItems[activeLocation]?.viber && (
                      <div className="flex items-start gap-2.5 sm:gap-3 bg-gray-50 rounded-xl p-3 sm:p-3.5 border border-gray-100">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                          <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Viber</p>
                          <a href={`viber://chat?number=${infoItems[activeLocation].viber?.replace(/[^0-9+]/g, '')}`} className="text-[11px] sm:text-[12px] text-dark font-medium hover:text-purple-500 transition-colors">{infoItems[activeLocation].viber}</a>
                        </div>
                      </div>
                    )}
                    {infoItems[activeLocation]?.email && (
                      <div className="flex items-start gap-2.5 sm:gap-3 bg-gray-50 rounded-xl p-3 sm:p-3.5 border border-gray-100">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-pink-50 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                          <a href={`mailto:${infoItems[activeLocation].email}`} className="text-[11px] sm:text-[12px] text-dark font-medium hover:text-pink-500 transition-colors">{infoItems[activeLocation].email}</a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Working Hours + Map link row */}
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                    {infoItems[activeLocation]?.workingHours?.length > 0 && (
                      <div className="bg-gradient-to-br from-dark via-[#1a1060] to-dark rounded-xl p-3.5 sm:p-4 flex-1">
                        <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                          </div>
                          <h4 className="text-white font-bold text-[12px] sm:text-[13px]">Radno vrijeme</h4>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {infoItems[activeLocation].workingHours.map((wh: any, i: number) => (
                            <div key={i} className="flex justify-between items-center bg-white/5 rounded-lg px-3 sm:px-3.5 py-1.5 sm:py-2">
                              <span className="text-white/70 text-[11px] sm:text-[12px] font-medium">{wh.days}</span>
                              <span className="text-primary font-bold text-[11px] sm:text-[12px]">{wh.hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Map link */}
                    {infoItems[activeLocation]?.mapUrl && (
                      <a
                        href={infoItems[activeLocation].mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center sm:justify-start gap-2 text-primary hover:text-primary/80 font-semibold text-[12px] transition-colors sm:self-end sm:pb-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Google Maps
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Right: Content ── */}
            <div className="w-full lg:w-[52%] pt-0 lg:pt-6 order-1 lg:order-2">
              {/* Desktop-only heading */}
              <span className="hidden lg:inline-block bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full mb-7">
                {badge}
              </span>

              <h2 className="hidden lg:block text-[38px] lg:text-[42px] font-extrabold text-dark leading-[1.15] mb-10">
                {locationsHeadingLine1}
                <br />
                {locationsHeadingLine2}
              </h2>

              {/* Location cards */}
              <div className="flex flex-col gap-3 sm:gap-4">
                {infoItems.map((item: any, i: number) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveLocation(i)}
                    onClick={() => setActiveLocation(i)}
                    className={`group relative transition-all duration-300 rounded-2xl px-5 sm:pl-7 sm:pr-7 py-5 sm:py-6 cursor-pointer lg:cursor-default ${
                      activeLocation === i
                        ? "border-l-[3px] border-primary bg-white shadow-[0_4px_32px_rgba(0,0,0,0.07)]"
                        : "border-l-[3px] border-transparent hover:border-primary hover:bg-white hover:shadow-[0_4px_32px_rgba(0,0,0,0.07)]"
                    }`}
                  >
                    <h4 className="text-[14px] sm:text-[15px] font-bold text-dark mb-1 sm:mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-[12px] sm:text-[13px] text-gray-400 leading-[1.7]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
