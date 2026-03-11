"use client";

import { useState, useEffect, Fragment, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { getImageUrl, toSupabaseUrl } from '@/lib/imageUrl';
import { setLocale } from '@/lib/setLocale';
import type { Locale } from '@/lib/locale';

const defaultNavigation = [
  { name: "Početna", href: "/" },
  {
    name: "Materijali",
    href: "/materials",
    megaMenu: true,
    columns: [
      {
        title: "UV / ECOSOLVENT / LATEX",
        href: "/materials/uv-ecosolvent-latex",
        items: [
          { name: "PVC Naljepnice", slug: "pvc-naljepnice" },
          { name: "One Way Vision", slug: "one-way-vision" },
          { name: "Back Light", slug: "back-light" },
          { name: "Banner / Textilni Banner / Flag", slug: "banner-textilni-banner-flag" },
          { name: "Cerade / Kamionske", slug: "cerade-kamionske" },
          { name: "Canvas", slug: "canvas" },
          { name: "Tapete", slug: "tapete" },
          { name: "Podna Grafika", slug: "podna-grafika" },
          { name: "Poster Papir", slug: "poster-papir" },
        ],
      },
      {
        title: "UV DIREKTNI PRINT",
        href: "/materials/uv-direktni-print",
        items: [
          { name: "Staklo", slug: "staklo" },
          { name: "Drvo", slug: "drvo" },
          { name: "Forex", slug: "forex" },
          { name: "Plexiglass", slug: "plexiglass" },
          { name: "Kapaline", slug: "kapaline" },
          { name: "Alu Bond", slug: "alu-bond" },
          { name: "MDF", slug: "mdf" },
        ],
      },
      {
        title: "CNC",
        href: "/materials/cnc",
        items: [
          { name: "MDF", slug: "mdf" },
          { name: "Iverica", slug: "iverica" },
          { name: "Špera", slug: "spera" },
          { name: "Aluminij", slug: "aluminij" },
          { name: "Forex / Plastika", slug: "forex-plastika" },
          { name: "Plexiglass", slug: "plexiglass" },
          { name: "Medijapan", slug: "medijapan" },
          { name: "Drvo", slug: "drvo" },
          { name: "Plastični Karton / Akyplac", slug: "plasticni-karton-akyplac" },
        ],
      },
      {
        title: "LASER",
        href: "/materials/laser",
        items: [
          { name: "Kapafix", slug: "kapafix" },
          { name: "Plexiglass", slug: "plexiglass" },
          { name: "Koža", slug: "koza" },
          { name: "Papir / Karton", slug: "papir-karton" },
          { name: "Špera / Drvo", slug: "spera-drvo" },
        ],
      },
    ],
  },
  {
    name: "Proizvodi",
    href: "/products",
    megaMenu: true,
    columns: [
      {
        title: "BRENDIRANJE",
        href: "/products/brendiranje",
        items: [
          { name: "Poslovnih / Stambenih Prostora", slug: "poslovnih-stambenih-prostora" },
          { name: "Vozila", slug: "vozila" },
          { name: "Predmeta", slug: "predmeta" },
          { name: "Stajališta", slug: "stajalista" },
        ],
      },
      {
        title: "OUTDOOR I INDOOR",
        href: "/products/outdoor-indoor",
        items: [
          { name: "Wallscape", slug: "wallscape" },
          { name: "Billboard", slug: "billboard" },
          { name: "Banneri", slug: "banneri" },
          { name: "Cerade / Kamionske", slug: "cerade-kamionske" },
          { name: "Mesh", slug: "mesh" },
          { name: "City Light", slug: "city-light" },
          { name: "Svijetleće Reklame", slug: "svijetlece-reklame" },
        ],
      },
      {
        title: "HOME AND OFFICE",
        href: "/products/home-and-office",
        items: [
          { name: "Home Dekor / Assesoar", slug: "home-dekor-assesoar" },
          { name: "Wall Art", slug: "wall-art" },
          { name: "3D Zidni Paneli", slug: "3d-zidni-paneli" },
          { name: "Pregrade", slug: "pregrade" },
          { name: "Informativne Oznake", slug: "informativne-oznake" },
          { name: "Info Display", slug: "info-display" },
          { name: "Kancelarijski Materijal", slug: "kancelarijski-materijal" },
        ],
      },
      {
        title: "PROMO / POS",
        href: "/products/promo-pos",
        items: [
          { name: "Štandovi", slug: "standovi" },
          { name: "Plex Stalaže", slug: "plex" },
          { name: "Sajamski Elementi", slug: "sajamski-elementi" },
          { name: "Vobleri / Table Tent", slug: "vobleri-table-tent" },
          { name: "Senzormatici", slug: "senzormatici" },
          { name: "Showcard", slug: "showcard" },
        ],
      },
    ],
  },
  { name: "O nama", href: "/about" },
  { name: "Novosti", href: "/news" },
  { name: "Upute", href: "/instructions" },
];

interface NavSubItem { name: string; slug: string }
interface NavColumn { title: string; href: string; items: NavSubItem[] }
interface NavItem { name: string; href: string; megaMenu?: boolean; columns?: NavColumn[] }

export default function Navbar({ data, siteSettings, locale = 'bs' }: { data?: any; siteSettings?: any; locale?: Locale }) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLocaleSwitch = (newLocale: Locale) => {
    startTransition(async () => {
      await setLocale(newLocale);
      router.refresh();
    });
  };

  // Use data from Payload or fall back to hardcoded navigation
  const navigation: NavItem[] = data?.items?.map((item: any) => ({
    name: item.label,
    href: item.href,
    megaMenu: item.hasMegaMenu,
    columns: item.columns?.map((col: any) => ({
      title: col.title,
      href: col.href,
      items: col.items || [],
    })),
  })) || defaultNavigation;

  const ctaText = data?.ctaText || "Kontaktirajte nas";
  const ctaLink = data?.ctaLink || "/contact";
  const logoTop = getImageUrl(siteSettings?.logos?.navbarTopUpload) || "/bsc-logo-white-top.png";
  const logoScrolled = getImageUrl(siteSettings?.logos?.navbarScrolledUpload) || "/bsc-logo-white.png";

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY <= 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navWrapperClasses = isAtTop
    ? "mx-2 md:mx-4 mt-2 md:mt-3"
    : "mx-0 mt-0";

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navWrapperClasses}`}>
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`transition-all duration-500 backdrop-blur-xl shadow-lg shadow-black/20 relative bg-gradient-to-r from-[#0d0b2e] via-[#1A1464] to-[#0d0b2e] ${
            isAtTop ? "rounded-2xl" : ""
          }`}
        >
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#42C6D9]/40 to-transparent" />
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* BSC Logo */}
              <Link href="/" className="flex items-center relative">
                {/* Soft glow behind logo at top */}
                <span className={`absolute -inset-4 -z-10 rounded-2xl bg-[#2a1e70]/50 blur-2xl transition-opacity duration-500 pointer-events-none ${isAtTop ? "opacity-100" : "opacity-0"}`} />
                {/* Top-of-page logo (colorful) */}
                <Image
                  src={logoTop}
                  alt="BSC - Best Solution Company"
                  width={160}
                  height={40}
                  className={`h-8 sm:h-9 lg:h-10 w-auto object-contain transition-opacity duration-500 ${
                    isAtTop ? "opacity-100" : "opacity-0 absolute"
                  }`}
                  priority
                />
                {/* Scrolled logo (white) */}
                <Image
                  src={logoScrolled}
                  alt="BSC - Best Solution Company"
                  width={160}
                  height={40}
                  className={`h-8 sm:h-9 lg:h-10 w-auto object-contain transition-opacity duration-500 ${
                    isAtTop ? "opacity-0 absolute" : "opacity-100"
                  }`}
                  priority
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-1 py-1">
                {navigation.map((item, idx) =>
                  item.megaMenu && item.columns ? (
                    <Fragment key={item.name}>
                      <Popover className="static">
                        <PopoverButton className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all outline-none cursor-pointer">
                          {item.name}
                          <ChevronDown className="w-3.5 h-3.5" />
                        </PopoverButton>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <PopoverPanel className="absolute left-0 right-0 top-full mt-0 bg-[#0c0a2a]/98 backdrop-blur-xl rounded-b-2xl shadow-2xl shadow-black/40 border-x border-b border-white/5 z-50 overflow-hidden">
                          {({ close }) => (
                          <>
                          {/* Top separator line */}
                          <div className="h-px bg-gradient-to-r from-transparent via-[#42C6D9]/30 to-transparent" />
                          <div className="max-w-7xl mx-auto px-8 py-8">
                            <div className="grid grid-cols-4 gap-10">
                              {item.columns!.map((col: { title: string; href: string; items: { name: string; slug?: string }[] | string[] }) => (
                                <div key={col.title}>
                                  <Link
                                    href={col.href}
                                    onClick={() => close()}
                                    className="block text-xs font-bold tracking-[0.15em] text-[#42C6D9] hover:text-[#42C6D9]/80 uppercase mb-4 pb-2 border-b border-white/10 transition-colors"
                                  >
                                    {col.title}
                                  </Link>
                                  <ul className="space-y-2">
                                    {col.items.map((entry: { name: string; slug?: string } | string, i: number) => {
                                      const isObj = typeof entry === "object";
                                      const label = isObj ? entry.name : entry;
                                      const linkHref = isObj && entry.slug
                                        ? `${col.href}/${entry.slug}`
                                        : col.href;
                                      return (
                                        <li key={`${label}-${i}`}>
                                          <Link
                                            href={linkHref}
                                            onClick={() => close()}
                                            className="block text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200"
                                          >
                                            {label}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                          </>
                          )}
                        </PopoverPanel>
                      </Transition>
                    </Popover>
                    </Fragment>
                  ) : (
                    <Fragment key={item.name}>
                      <Link
                        href={item.href}
                        className="px-4 py-1.5 rounded-full text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
                      >
                        {item.name}
                      </Link>
                    </Fragment>
                  )
                )}
              </div>

              {/* Right: Language Switch & CTA Button */}
              <div className="flex items-center gap-3">
                {/* Language Switcher */}
                <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full p-0.5">
                  {locale === 'bs' ? (
                    <div className="rounded-full bg-gradient-to-b from-primary to-secondary p-[1.5px]">
                      <button
                        onClick={() => handleLocaleSwitch('bs')}
                        disabled={isPending}
                        className="px-3 py-1.5 rounded-full bg-dark text-white text-xs font-bold cursor-pointer transition-all"
                      >
                        BS
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleLocaleSwitch('bs')}
                      disabled={isPending}
                      className="px-3 py-1.5 rounded-full text-white/50 text-xs font-bold hover:text-white cursor-pointer transition-all"
                    >
                      BS
                    </button>
                  )}
                  {locale === 'en' ? (
                    <div className="rounded-full bg-gradient-to-b from-primary to-secondary p-[1.5px]">
                      <button
                        onClick={() => handleLocaleSwitch('en')}
                        disabled={isPending}
                        className="px-3 py-1.5 rounded-full bg-dark text-white text-xs font-bold cursor-pointer transition-all"
                      >
                        EN
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleLocaleSwitch('en')}
                      disabled={isPending}
                      className="px-3 py-1.5 rounded-full text-white/50 text-xs font-bold hover:text-white cursor-pointer transition-all"
                    >
                      EN
                    </button>
                  )}
                </div>

                <div className="hidden lg:inline-flex rounded-full bg-gradient-to-b from-primary to-secondary p-[1.5px] hover:scale-[1.03] transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <Link
                    href={ctaLink}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-dark text-white text-sm font-semibold"
                  >
                    {ctaText}
                  </Link>
                </div>

                {/* Mobile toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="lg:hidden p-2.5 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </nav>
        </motion.header>
      </div>

      {/* Mobile Menu — Slide-in drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-80 bg-gradient-to-b from-[#0d0b2e] via-[#1A1464] to-[#0d0b2e] z-[70] lg:hidden shadow-2xl shadow-black/50 border-l border-white/5"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <Image
                    src={logoScrolled}
                    alt="BSC"
                    width={100}
                    height={28}
                    className="h-7 w-auto object-contain"
                  />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white cursor-pointer transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4" />

                {/* Nav links */}
                <nav className="space-y-0.5 overflow-y-auto flex-1 -mx-2 px-2">
                  {navigation.map((item) =>
                    item.megaMenu && item.columns ? (
                      <div key={item.name}>
                        {/* Accordion toggle */}
                        <button
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === item.name ? null : item.name
                            )
                          }
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium transition-colors cursor-pointer ${
                            mobileExpanded === item.name
                              ? "bg-white/10 text-white"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {item.name}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileExpanded === item.name ? "rotate-180 text-primary" : ""
                            }`}
                          />
                        </button>

                        {/* Collapsible content */}
                        <AnimatePresence>
                          {mobileExpanded === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-3 pb-2 pt-1">
                                {/* "View all" link */}
                                <Link
                                  href={item.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-4 py-2 text-sm font-semibold text-primary hover:bg-white/5 rounded-lg transition-colors"
                                >
                                  {data?.viewAllText || (locale === 'en' ? 'View all →' : 'Pogledaj sve →')}
                                </Link>

                                {item.columns.map((col) => (
                                  <div key={col.title} className="mt-3">
                                    <Link
                                      href={col.href}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block px-4 py-1 text-[10px] font-bold tracking-[0.15em] text-primary/60 uppercase"
                                    >
                                      {col.title}
                                    </Link>
                                    {col.items.map((entry, i) => {
                                      const isObj = typeof entry === "object";
                                      const label = isObj ? entry.name : entry;
                                      const linkHref =
                                        isObj && entry.slug
                                          ? `${col.href}/${entry.slug}`
                                          : col.href;
                                      return (
                                        <Link
                                          key={`${label}-${i}`}
                                          href={linkHref}
                                          onClick={() =>
                                            setIsMobileMenuOpen(false)
                                          }
                                          className="block px-4 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                        >
                                          {label}
                                        </Link>
                                      );
                                    })}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 rounded-xl text-white/70 font-medium hover:bg-white/5 hover:text-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </nav>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-4 mb-4" />

                {/* Mobile Language Switcher */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-white/50" />
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5">
                    <button
                      onClick={() => { handleLocaleSwitch('bs'); setIsMobileMenuOpen(false); }}
                      disabled={isPending}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        locale === 'bs'
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-white/50 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      BS
                    </button>
                    <button
                      onClick={() => { handleLocaleSwitch('en'); setIsMobileMenuOpen(false); }}
                      disabled={isPending}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        locale === 'en'
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-white/50 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                {/* CTA in mobile */}
                <div>
                  <div className="rounded-full bg-gradient-to-r from-primary to-secondary p-[1.5px]">
                    <Link
                      href={ctaLink}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center px-6 py-3 rounded-full bg-dark text-white font-semibold text-sm hover:bg-dark/80 transition-all"
                    >
                      {ctaText}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
