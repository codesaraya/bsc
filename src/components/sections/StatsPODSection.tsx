"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
      /* ease-out cubic */
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
    text: "Naša glavna poslovnica u srcu Sarajeva. Posjetite nas za konsultacije, pregled uzoraka i narudžbe svih vrsta štampe.",
    image: "/SCC.jpg",
  },
  {
    title: "BSC Budakovići",
    text: "Proizvodni pogon opremljen najmodernijim UV LED i latex mašinama za štampu velikih i megavelikih formata.",
    image: "/BUDAKOVICI.jpg",
  },
  {
    title: "BSC BBI Centar Sarajevo",
    text: "Print Shop lokacija u BBI Centru. Brza izrada vizitki, letaka, postera i ostalih grafičkih proizvoda.",
    image: "/BBI.jpg",
  },
];

export default function StatsPODSection({ data }: { data?: any }) {
  const stats = data?.stats || defaultStats;
  const infoItems = data?.locations || defaultInfoItems;
  const heading = data?.heading || "BSC u brojevima \u2014 rezultati koji govore sami za sebe";
  const badge = data?.locationsBadge || data?.badge || "Naše lokacije";
  const locationsHeadingLine1 = data?.locationsHeadingLine1 || "Print Shop BSC";
  const locationsHeadingLine2 = data?.locationsHeadingLine2 || "Na tri lokacije";
  const starburstText = data?.starburstText || "Kvalitetna Štampa";

  const [activeLocation, setActiveLocation] = useState(1);

  return (
    <>
      {/* ═══════════════════════════════════════
          PART 1 – Stats bar
         ═══════════════════════════════════════ */}
      <section className="bg-white py-10 sm:py-16 lg:py-20">
        <div className="max-w-[1080px] mx-auto px-6">
          {/* Heading */}
          <p className="text-center text-dark font-semibold text-base md:text-lg tracking-tight mb-14">
            {heading}
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {stats.map((s: any, i: number) => (
              <div key={i} className="flex flex-col items-center gap-4">
                {/* Rounded pill */}
                <div
                  className={`w-full max-w-[260px] h-20 md:h-[88px] rounded-full bg-gradient-to-r ${s.gradient} flex items-center justify-center`}
                >
                  <AnimatedStat
                    numericValue={s.numericValue}
                    suffix={s.suffix}
                    dark={s.dark}
                  />
                </div>
                {/* Label */}
                <span className="text-[13px] text-gray-400 font-medium text-center">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PART 2 – How Print-On-Demand Works
         ═══════════════════════════════════════ */}
      <section className="bg-white pb-16 sm:pb-28 pt-6">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-10 lg:gap-20">

            {/* ── Left: Image ── */}
            <div className="relative w-full lg:w-[44%] max-w-[470px] self-center lg:self-stretch">
              {/* Pink blob behind top-left */}
              <div className="absolute -top-8 -left-8 w-44 h-44 bg-[#FCE4EC]/60 rounded-full blur-3xl" />

              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg w-full h-full min-h-[400px]">
                {infoItems.map((item: any, i: number) => (
                  <img
                    key={i}
                    src={getImageUrl(item.uploadedImage)}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      activeLocation === i ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              {/* "Quality Printing" starburst badge – bottom-left overlap */}
              <div className="absolute -bottom-5 left-4 z-20">
                <svg
                  width="190"
                  height="72"
                  viewBox="0 0 190 72"
                  fill="none"
                  className="drop-shadow-md"
                >
                  {/* Starburst / wavy edge */}
                  <path
                    d="M8 36C8 22 14 12 28 9C26 4 38 1 52 4C60 -1 74 -1 90 4C106 -1 120 -1 128 4C142 1 154 4 156 9C170 12 182 22 182 36C182 50 170 60 156 63C154 68 142 71 128 68C120 73 106 73 90 68C74 73 60 73 52 68C38 71 26 68 28 63C14 60 8 50 8 36Z"
                    fill="#67E8F9"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <span className="w-[6px] h-[6px] bg-[#42C6D9] rounded-full" />
                    <span className="text-[#1A1464] font-bold text-[15px] italic">
                      {starburstText}
                    </span>
                    <span className="w-[6px] h-[6px] bg-[#42C6D9] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Decorative dot grid – right side */}
              <div className="absolute -right-5 top-[40%] flex flex-col gap-[6px]">
                {[...Array(5)].map((_, r) => (
                  <div key={r} className="flex gap-[6px]">
                    {[...Array(3)].map((_, c) => (
                      <div
                        key={c}
                        className="w-[5px] h-[5px] rounded-full bg-gray-300/70"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Content ── */}
            <div className="w-full lg:w-[56%] pt-0 lg:pt-6">
              {/* Badge */}
              <span className="inline-block bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full mb-7">
                {badge}
              </span>

              {/* Heading */}
              <h2 className="text-[24px] sm:text-[28px] md:text-[38px] lg:text-[42px] font-extrabold text-dark leading-[1.15] mb-6 sm:mb-10">
                {locationsHeadingLine1}
                <br />
                {locationsHeadingLine2}
              </h2>

              {/* Info items */}
              <div className="flex flex-col gap-4">
                {infoItems.map((item: any, i: number) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveLocation(i)}
                    onClick={() => setActiveLocation(i)}
                    className={`relative transition-all duration-300 rounded-2xl pl-7 pr-7 py-7 cursor-pointer ${
                      activeLocation === i
                        ? "border-l-[3px] border-primary bg-white shadow-[0_4px_32px_rgba(0,0,0,0.07)]"
                        : "border-l-[3px] border-transparent hover:border-primary hover:bg-white hover:shadow-[0_4px_32px_rgba(0,0,0,0.07)]"
                    }`}
                  >
                    <h4 className="text-[15px] font-bold text-dark mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-gray-400 leading-[1.7]">
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
