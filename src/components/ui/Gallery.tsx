"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Maximize2,
  ImageIcon,
  LayoutGrid,
  GalleryHorizontalEnd,
} from "lucide-react";
import { toSupabaseUrl } from '@/lib/imageUrl';

interface GalleryImage {
  id: number;
  gradient: string;
  label: string;
  accent: string;
  src?: string;
}

interface GalleryProps {
  title: string;
  color: string;
  itemName: string;
  categoryName: string;
  photos?: string[];
  exampleLabel?: string;
  photosLabel?: string;
  carouselLabel?: string;
  gridLabel?: string;
}

/* Slide direction for the carousel */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

/* Lightbox slide */
const lightboxVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
    rotateY: dir > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    rotateY: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
    rotateY: dir > 0 ? -15 : 15,
    transition: { duration: 0.35, ease: "easeIn" as const },
  }),
};

export default function Gallery({
  title,
  color,
  itemName,
  categoryName,
  photos,
  exampleLabel,
  photosLabel,
  carouselLabel,
  gridLabel,
}: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxDir, setLightboxDir] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const gradients = [
    { gradient: `bg-gradient-to-br ${color}`, accent: "from-white/20 to-white/5" },
    { gradient: `bg-gradient-to-tl ${color}`, accent: "from-black/10 to-transparent" },
    { gradient: `bg-gradient-to-r ${color}`, accent: "from-white/10 to-black/10" },
    { gradient: `bg-gradient-to-b ${color}`, accent: "from-transparent to-white/15" },
    { gradient: `bg-gradient-to-tr ${color}`, accent: "from-white/15 to-transparent" },
    { gradient: `bg-gradient-to-bl ${color}`, accent: "from-black/5 to-white/10" },
  ];

  const count = photos && photos.length > 0 ? photos.length : 6;

  const images: GalleryImage[] = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    gradient: gradients[i % gradients.length].gradient,
    label: `${itemName} — ${exampleLabel || 'Primjer'} ${i + 1}`,
    accent: gradients[i % gradients.length].accent,
    src: photos && photos[i] ? toSupabaseUrl(photos[i]) : undefined,
  }));

  /* ── Auto-play ── */
  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % count);
    }, 4000);
  }, [count]);

  useEffect(() => {
    if (isPlaying && !lightboxOpen) {
      startAutoPlay();
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, lightboxOpen, startAutoPlay]);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      if (isPlaying) startAutoPlay(); // reset timer
    },
    [activeIndex, isPlaying, startAutoPlay]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % images.length);
    if (isPlaying) startAutoPlay();
  }, [images.length, isPlaying, startAutoPlay]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    if (isPlaying) startAutoPlay();
  }, [images.length, isPlaying, startAutoPlay]);

  /* ── Lightbox ── */
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxDir(0);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  }, []);

  const lbNext = useCallback(() => {
    setLightboxDir(1);
    setLightboxIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const lbPrev = useCallback(() => {
    setLightboxDir(-1);
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  /* Keyboard navigation in lightbox */
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") lbNext();
      else if (e.key === "ArrowLeft") lbPrev();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, lbNext, lbPrev, closeLightbox]);

  /* Progress for auto-play indicator */
  const progress = ((activeIndex + 1) / images.length) * 100;

  return (
    <div className="mb-16">
      {/* ── Section header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white`}
          >
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-dark">{title}</h2>
            <p className="text-gray-400 text-sm">
              {images.length} {photosLabel || 'fotografija'} — {categoryName}
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-gray-100 rounded-full p-1">
          <button
            onClick={() => {
              setViewMode('carousel');
              setIsPlaying(true);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              viewMode === 'carousel'
                ? `bg-gradient-to-r ${color} text-white shadow-md`
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <GalleryHorizontalEnd className="w-4 h-4" />
            {carouselLabel || 'Carousel'}
          </button>
          <button
            onClick={() => {
              setViewMode('grid');
              setIsPlaying(false);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              viewMode === 'grid'
                ? `bg-gradient-to-r ${color} text-white shadow-md`
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            {gridLabel || 'Grid'}
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* ── Grid view ── */
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-4">
          {images.map((img, i) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              onClick={() => openLightbox(i)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3]"
            >
              {img.src ? (
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <>
                  <div className={`absolute inset-0 ${img.gradient}`} />
                  <div className={`absolute inset-0 bg-gradient-to-b ${img.accent}`} />
                  <div className="absolute inset-0 opacity-[0.07]">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 30% 40%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
                        backgroundSize: "40px 40px, 60px 60px",
                      }}
                    />
                  </div>
                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                        <ImageIcon className="w-6 h-6 text-white/80" />
                      </div>
                      <p className="text-white text-sm font-semibold px-2">{img.label}</p>
                    </div>
                  </div>
                </>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
        <>
      {/* ── Main carousel ── */}
      <div className="relative rounded-3xl overflow-hidden bg-gray-100 mb-4">
        {/* Main slide area */}
        <div className="relative h-[320px] md:h-[450px] lg:h-[500px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`absolute inset-0 ${images[activeIndex].src ? '' : images[activeIndex].gradient}`}
            >
              {images[activeIndex].src ? (
                <>
                  <Image
                    src={images[activeIndex].src!}
                    alt={images[activeIndex].label}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                  {/* Bottom gradient overlay for text readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
                </>
              ) : (
                <>
              {/* Layered textures for depth */}
              <div className={`absolute inset-0 bg-gradient-to-b ${images[activeIndex].accent}`} />
              <div className="absolute inset-0 opacity-[0.07]">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 40%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
                    backgroundSize: "40px 40px, 60px 60px",
                  }}
                />
              </div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute top-[15%] left-[10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-[20%] right-[15%] w-48 h-48 bg-white/8 rounded-full blur-3xl"
                animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-white/15 rounded-3xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-xl shadow-black/10">
                    <ImageIcon className="w-10 h-10 text-white/80" />
                  </div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    className="text-white text-xl font-bold"
                  >
                    {images[activeIndex].label}
                  </motion.p>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="text-white/50 text-sm mt-1"
                  >
                    {categoryName}
                  </motion.p>
                </motion.div>
              </div>

              {/* Bottom gradient overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows on the slide */}
          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer z-10 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer z-10 group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Expand / lightbox button */}
          <button
            onClick={() => openLightbox(activeIndex)}
            className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/20 hover:bg-black/40 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-pointer z-10"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Slide counter badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm text-white text-xs font-semibold z-10">
            {activeIndex + 1} / {images.length}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 z-10">
            <motion.div
              className="h-full bg-white/60"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="flex justify-center gap-2 overflow-x-auto overflow-y-visible pb-4 pt-2">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => goTo(i)}
            className={`group relative shrink-0 w-16 h-11 sm:w-24 sm:h-16 md:w-32 md:h-20 rounded-xl overflow-visible cursor-pointer transition-all duration-300 ${
              i === activeIndex
                ? "ring-2 ring-offset-2 ring-offset-white ring-gray-900 scale-105 shadow-lg"
                : "opacity-60 hover:opacity-90 hover:scale-[1.02]"
            }`}
          >
            <div className={`absolute inset-0 rounded-xl overflow-hidden`}>
              {img.src ? (
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              ) : (
                <>
                  <div className={`absolute inset-0 ${img.gradient}`} />
                  <div className={`absolute inset-0 bg-gradient-to-t ${img.accent}`} />
                </>
              )}
            </div>

            {/* Active indicator dot */}
            {i === activeIndex && (
              <motion.div
                layoutId="activeThumb"
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-gray-900"
              />
            )}

            {/* Hover zoom icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <ZoomIn className="w-4 h-4 text-white" />
            </div>
          </button>
        ))}
      </div>
        </>
      )}

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999] flex items-center justify-center"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ backdropFilter: "blur(0px)" }}
              animate={{ backdropFilter: "blur(20px)" }}
              className="absolute inset-0 bg-black/90"
              onClick={closeLightbox}
            />

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-4">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-white font-bold text-lg">
                    {images[lightboxIndex].label}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs font-medium">
                    {lightboxIndex + 1} / {images.length}
                  </span>
                </div>
                <button
                  onClick={closeLightbox}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main image with 3D slide */}
              <div className="relative h-[55vh] md:h-[65vh] rounded-2xl overflow-hidden" style={{ perspective: "1200px" }}>
                <AnimatePresence initial={false} custom={lightboxDir} mode="popLayout">
                  <motion.div
                    key={lightboxIndex}
                    custom={lightboxDir}
                    variants={lightboxVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={`absolute inset-0 ${images[lightboxIndex].src ? '' : images[lightboxIndex].gradient} rounded-2xl`}
                  >
                    {images[lightboxIndex].src ? (
                      <Image
                        src={images[lightboxIndex].src!}
                        alt={images[lightboxIndex].label}
                        fill
                        className="object-cover rounded-2xl"
                        sizes="100vw"
                        priority
                      />
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-b ${images[lightboxIndex].accent}`} />
                        <div className="absolute inset-0 opacity-[0.06]">
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle, white 1px, transparent 1px)",
                              backgroundSize: "30px 30px",
                            }}
                          />
                        </div>

                        {/* Floating blobs */}
                        <motion.div
                          className="absolute top-[10%] right-[20%] w-40 h-40 bg-white/10 rounded-full blur-3xl"
                          animate={{ y: [0, -25, 0] }}
                          transition={{ duration: 5, repeat: Infinity }}
                        />

                        {/* Center content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.15, duration: 0.3 }}
                            className="text-center"
                          >
                            <div className="w-28 h-28 bg-white/15 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                              <ImageIcon className="w-14 h-14 text-white/80" />
                            </div>
                            <p className="text-3xl font-bold text-white mb-2">
                              {images[lightboxIndex].label}
                            </p>
                            <p className="text-white/50 text-sm">{categoryName}</p>
                          </motion.div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Nav arrows inside lightbox */}
                <button
                  onClick={lbPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer z-10"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={lbNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer z-10"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>

              {/* Lightbox thumbnail strip */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => {
                      setLightboxDir(i > lightboxIndex ? 1 : -1);
                      setLightboxIndex(i);
                    }}
                    className={`relative w-16 h-10 md:w-20 md:h-12 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                      i === lightboxIndex
                        ? "ring-2 ring-white scale-110 shadow-lg shadow-white/10"
                        : "opacity-40 hover:opacity-75 hover:scale-105"
                    }`}
                  >
                    {img.src ? (
                      <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className={`w-full h-full ${img.gradient}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
