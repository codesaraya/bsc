import Link from "next/link";
import Container from "@/components/ui/Container";
import { getImageUrl, toSupabaseUrl } from '@/lib/imageUrl';
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const defaultSocials = [
  { platform: "Facebook", href: "https://www.facebook.com/bscsarajevo" },
  { platform: "Twitter", href: "https://www.twitter.com" },
  { platform: "Linkedin", href: "https://www.linkedin.com" },
  { platform: "Youtube", href: "https://www.youtube.com" },
];

const defaultColumns = [
  {
    title: "Korisni linkovi",
    links: [
      { label: "Brendiranje", href: "/products/brendiranje" },
      { label: "Materijali za štampu", href: "/materials/uv-ecosolvent-latex" },
      { label: "UV direktni print", href: "/materials/uv-direktni-print" },
      { label: "Promo / POS", href: "/products/promo-pos" },
      { label: "Outdoor i Indoor", href: "/products/outdoor-indoor" },
    ],
  },
  {
    title: "Stranice",
    links: [
      { label: "Kontakt", href: "/contact" },
      { label: "O nama", href: "/about" },
      { label: "Novosti", href: "/news" },
      { label: "Upute za pripremu", href: "/instructions" },
      { label: "Home & Office", href: "/products/home-and-office" },
    ],
  },
];

const defaultBottomLinks = [
  { label: "Politika privatnosti", href: "/contact" },
  { label: "Uslovi korištenja", href: "/contact" },
];

const platformIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook,
  facebook: Facebook,
  Twitter,
  twitter: Twitter,
  Linkedin,
  linkedin: Linkedin,
  Youtube,
  youtube: Youtube,
  Instagram,
  instagram: Instagram,
};

function getSocialIcon(platform: string) {
  return platformIconMap[platform] || Facebook;
}

export default function Footer({ data, siteSettings }: { data?: any; siteSettings?: any }) {
  const logoAlt = data?.logoAlt || "BSC - Best Solution Company";
  const companyDescription =
    data?.companyDescription ||
    "Best Solution Company — specijalizirana digitalna štamparija u Sarajevu. Od ideje do gotovog proizvoda, dostave i montaže.";
  const newsletterLine1 = data?.newsletter?.headingLine1 || "Prijavite se na naše";
  const newsletterLine2 = data?.newsletter?.headingLine2 || "novosti i obavještenja";
  const newsletterPlaceholder = data?.newsletter?.placeholder || "Vaša email adresa";

  // Social links from data or fallback
  const socialLinks = data?.socialLinks || defaultSocials;

  // Columns from data or fallback to hardcoded
  const columns = data?.columns || defaultColumns;

  // Contact info
  const contactAddress = data?.contactInfo?.address || "Vrbanja 1, 71000 Sarajevo, BiH";
  const contactEmail = data?.contactInfo?.email || "info@bsc.ba";
  const contactPhone = data?.contactInfo?.phone || "+387 33 123 456";

  const copyrightText = data?.copyrightText || "BSC. Sva prava zadržana.";
  const bottomLinks = data?.bottomLinks || defaultBottomLinks;

  return (
    <>
      {/* ── Newsletter Bar ── */}
      <section className="relative bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10 border-b border-gray-200">
            {/* Left — icon + text */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark leading-tight">
                  {newsletterLine1}
                </h3>
                <p className="text-xl font-bold text-dark leading-tight">
                  {newsletterLine2}
                </p>
              </div>
            </div>

            {/* Right — email input */}
            <div className="flex w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <input
                  type="email"
                  placeholder={newsletterPlaceholder}
                  className="w-full px-5 py-3.5 pr-14 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary/90 transition-colors cursor-pointer">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative bg-gradient-to-b from-[#0d0b2e] via-[#1A1464] to-[#0d0b2e] text-white pt-12 md:pt-20 pb-8 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E91E90]/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-800/10 rounded-full blur-3xl" />

        {/* Curved top separator */}
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full h-[60px]" preserveAspectRatio="none">
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,0 L0,0 Z" fill="white" />
          </svg>
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 pb-8 md:pb-12 border-b border-white/10">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-block mb-5">
                {(getImageUrl(data?.logoUpload) || "/logo.png") && (
                  <img
                    src={getImageUrl(data?.logoUpload) || "/logo.png"}
                    alt={logoAlt}
                    width={220}
                    height={74}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-auto object-contain brightness-0 invert"
                  />
                )}
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {companyDescription}
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social: any, i: number) => {
                  const Icon = getSocialIcon(social.platform);
                  const href = social.href || social.url || "#";
                  return (
                    <a
                      key={i}
                      href={href}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Dynamic columns */}
            {columns.map((col: any, colIdx: number) => (
              <div key={col.title || colIdx}>
                <h4 className="font-bold text-lg mb-6">{col.title}</h4>
                <ul className="space-y-3">
                  {(col.links || []).map((link: any, i: number) => (
                    <li key={`${link.label}-${i}`}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Get In Touch */}
            <div>
              <h4 className="font-bold text-lg mb-6">{data?.contactTitle || "Kontakt info"}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {contactAddress}
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  {contactEmail}
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  {contactPhone}
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} {copyrightText}
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              {bottomLinks.map((link: any, i: number) => (
                <Link
                  key={`${link.label}-${i}`}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>

        {/* Decorative star */}
        <div className="absolute bottom-8 right-20 hidden lg:block">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M24 0L28.9 19.1L48 24L28.9 28.9L24 48L19.1 28.9L0 24L19.1 19.1L24 0Z" fill="#F5A623" />
          </svg>
        </div>
      </footer>
    </>
  );
}
