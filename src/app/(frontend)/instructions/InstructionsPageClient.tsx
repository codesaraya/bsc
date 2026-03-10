"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Palette,
  Layers,
  Car,
  Download,
  CheckCircle,
  ArrowRight,
  FileImage,
  Sparkles,
  Image as ImageIcon,
  Type,
  Scissors,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

const prepTipIconMap: Record<string, LucideIcon> = {
  FileText, Palette, Image: ImageIcon, Layers, Type, Scissors, Ruler, CheckCircle,
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.5 },
};

const defaultAcceptedFormats = ["TIFF", "PDF", "PSD", "CDR", "AI", "JPG", "EPS"];

const defaultRatios = ["1:1", "1:5", "1:10", "1:20"];
const defaultResolutions = ["72dpi", "100dpi", "150dpi", "300dpi", "500dpi"];

const defaultDownloadFiles = [
  "Konverzija Microsoft Word u PDF",
  "QuarkXPress separacija boja",
  "Upute za eksportovanje PDF iz QuarkXPress-a",
  "CorelDraw podešavanja boja",
  "Upute za eksportovanje PDF iz CorelDraw-a",
  "Podešavanja boja za sve Adobe programe",
  "Upute za eksportovanje PDF iz Adobe InDesign-a",
  "Upute za eksportovanje PDF iz Adobe Illustrator-a",
  "Upute za eksportovanje PDF iz Acrobat Distiller-a",
  "Adobe podešavanja boja",
];

const prepTipIcons = [Palette, Layers, FileText, FileImage];

const defaultPrepTips = [
  {
    icon: Palette,
    title: "CMYK režim boja",
    description:
      "Koristite CMYK režim boja, ili GRAYSCALE ako želite crno-bijelu štampu.",
  },
  {
    icon: Layers,
    title: "Spajanje slojeva",
    description:
      "Svi slojevi rasterizovani i spojeni (merged) u jedan sloj.",
  },
  {
    icon: FileText,
    title: "Konvertovanje tekstova",
    description: "Konvertujte sve tekstove u krivulje da izbjegnete probleme sa fontovima.",
  },
  {
    icon: FileImage,
    title: "Prihvaćeni formati",
    description: "TIFF, PDF, PSD, CDR, AI, JPG, EPS.",
  },
];

interface InstructionsPageClientProps {
  data: any;
}

export default function InstructionsPageClient({ data }: InstructionsPageClientProps) {
  const d: any = data;

  const acceptedFormats =
    d?.acceptedFormats?.length > 0
      ? d.acceptedFormats.map((f: any) => f.format)
      : defaultAcceptedFormats;

  const ratios =
    d?.ratios?.length > 0
      ? d.ratios.map((r: any) => r.ratio)
      : defaultRatios;

  const resolutions =
    d?.resolutions?.length > 0
      ? d.resolutions.map((r: any) => r.resolution)
      : defaultResolutions;

  const downloadFiles =
    d?.downloads?.length > 0
      ? d.downloads.map((dl: any) => {
          let fileUrl = dl.url || undefined;
          if (dl.file) {
            // dl.file can be a populated object or just an id
            const fileObj = typeof dl.file === 'object' ? dl.file : null;
            if (fileObj?.url) {
              fileUrl = fileObj.url;
            }
          }
          return { name: dl.name, url: fileUrl };
        })
      : defaultDownloadFiles.map((name) => ({ name, url: undefined }));

  const prepTips =
    d?.prepTips?.length > 0
      ? d.prepTips.map((tip: any, i: number) => ({
          icon: (tip.icon && prepTipIconMap[tip.icon]) || prepTipIcons[i] || FileText,
          title: tip.title,
          description: tip.description,
        }))
      : defaultPrepTips;

  // Section titles from Payload or defaults
  const section0Badge = d?.sections?.[0]?.badge || "Priprema";
  const section0Title = d?.sections?.[0]?.title || "Priprema fajlova";
  const section0Subtitle =
    d?.sections?.[0]?.subtitle ||
    "Da bi vaš štampani proizvod izgledao onako kako ste zamišljali, slijedite ove smjernice.";

  const section1Badge = d?.sections?.[1]?.badge || "Kvalitet";
  const section1Title = d?.sections?.[1]?.title || "Rezolucija i omjer";
  const section1Subtitle =
    d?.sections?.[1]?.subtitle ||
    "Prilagodite vaše grafičke pripreme na osnovu željenog kvaliteta i namjene.";

  const section2Badge = d?.sections?.[2]?.badge || "Preuzimanja";
  const section2Title = d?.sections?.[2]?.title || "Fajlovi za preuzimanje";
  const section2Subtitle =
    d?.sections?.[2]?.subtitle ||
    "Korisni resursi i upute za različite dizajnerske programe.";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark via-[#1a1060] to-dark -mt-[80px] pt-[120px] sm:pt-[160px] pb-12 sm:pb-20 relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-36 left-[15%] w-16 h-16 border border-white/10 rounded-2xl backdrop-blur-sm hidden lg:block"
        />
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-52 right-[12%] w-12 h-12 border border-primary/20 rounded-xl backdrop-blur-sm hidden lg:block"
        />
        <motion.div
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-36 left-[22%] w-8 h-8 bg-secondary/10 rounded-lg hidden lg:block"
        />

        <div className="absolute top-8 left-8 z-10">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-10 h-10 text-white/20" />
          </motion.div>
        </div>
        <div className="absolute top-12 right-16 z-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 0L28.5 19.5L48 24L28.5 28.5L24 48L19.5 28.5L0 24L19.5 19.5L24 0Z" fill="#D4A017" opacity="0.7" />
            </svg>
          </motion.div>
        </div>
        <Container className="relative z-10 text-center">
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            {d?.heroHeading || "Upute za pripremu"}
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-white/60 max-w-2xl mx-auto"
          >
            {d?.heroSubtitle ||
              "Pravilna priprema može eliminisati greške koje bi se mogle pojaviti tokom procesa štampe."}
          </motion.p>
        </Container>
      </section>

      {/* File Preparation Overview */}
      <section className="py-12 md:py-20">
        <Container>
          <SectionTitle
            badge={section0Badge}
            title={section0Title}
            subtitle={section0Subtitle}
          />

          <div className="max-w-4xl mx-auto">
            {/* Intro text */}
            <motion.div {...fadeUp} className="mb-12">
              <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-6 sm:p-8 md:p-10">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {d?.introText || (<>Da bi vaš štampani proizvod izgledao onako kako ste zamišljali,
                  trebali biste nam poslati pripremu u sljedećoj formi:{" "}
                  <strong className="text-dark">CMYK</strong> i u jednom od
                  sljedećih formata:</>)}
                </p>

                {/* Format badges */}
                <div className="flex flex-wrap gap-3">
                  {acceptedFormats.map((fmt: string) => (
                    <span
                      key={fmt}
                      className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-2 rounded-full"
                    >
                      <FileImage className="w-4 h-4" />
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Prep tips grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
              {prepTips.map((tip: any, i: number) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl shadow-soft border border-gray-100 p-4 sm:p-6 flex items-start gap-3 sm:gap-4"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <tip.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">{tip.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Resolution & Ratio */}
      <section className="py-12 md:py-20 bg-gray-50">
        <Container>
          <SectionTitle
            badge={section1Badge}
            title={section1Title}
            subtitle={section1Subtitle}
          />

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 sm:gap-8">
            {/* Ratios */}
            <motion.div
              {...fadeUp}
              className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8"
            >
              <h3 className="font-bold text-dark text-lg mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                {d?.ratiosHeading || "Omjeri pripreme"}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {d?.ratiosDescription || "Zavisno od proizvoda, grafičke pripreme trebaju biti isporučene u određenom omjeru:"}
              </p>
              <div className="flex flex-wrap gap-3">
                {ratios.map((r: string) => (
                  <span
                    key={r}
                    className="bg-dark text-white font-semibold text-sm px-5 py-2.5 rounded-full"
                  >
                    {r}
                  </span>
                ))}
                <span className="text-gray-400 flex items-center text-sm">{d?.ratiosSuffix || "itd."}</span>
              </div>
            </motion.div>

            {/* Resolutions */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8"
            >
              <h3 className="font-bold text-dark text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                {d?.resolutionsHeading || "Zahtjevi za rezoluciju"}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {d?.resolutionsDescription || "Određena rezolucija je potrebna zavisno od namjene:"}
              </p>
              <div className="flex flex-wrap gap-3">
                {resolutions.map((r: string) => (
                  <span
                    key={r}
                    className="bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-full"
                  >
                    {r}
                  </span>
                ))}
                <span className="text-gray-400 flex items-center text-sm">{d?.resolutionsSuffix || "itd."}</span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Autograph Preparation */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <motion.div
              {...fadeUp}
              className="relative rounded-[2rem] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, #c8b6ff 0%, #b8c0ff 20%, #d4c5f9 40%, #f0c6e8 60%, #f8d0e8 80%, #f5d0e0 100%)",
              }}
            >
              {/* Glow blobs */}
              <div className="absolute top-0 left-0 w-48 h-48 bg-blue-300/30 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300/30 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

              <div className="relative z-10 p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                  <Car className="w-10 h-10 text-dark" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4">
                    {d?.autographTitle || "Priprema za štampu autograma"}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    {d?.autographDescription ? (
                      d.autographDescription
                    ) : (
                      <>
                        U fajlu postoje samo dva sloja. Jedan sadrži ilustraciju
                        (ili fotografiju) vozila, a drugi sadrži grafiku koja se
                        štampa sa <strong>12 cm preklopom</strong> preko svake dimenzije.
                      </>
                    )}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {d?.autographFootnote || "Ukoliko imate bilo kakvih pitanja, slobodno nas kontaktirajte, rado ćemo vam pomoći."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Download Files */}
      <section className="py-12 md:py-20 bg-gray-50">
        <Container>
          <SectionTitle
            badge={section2Badge}
            title={section2Title}
            subtitle={section2Subtitle}
          />

          <div className="max-w-3xl mx-auto space-y-3">
            {downloadFiles.map((file: any, i: number) => {
              const Wrapper = file.url ? 'a' : 'div';
              const wrapperProps = file.url
                ? { href: file.url, download: true, target: '_blank' as const, rel: 'noopener noreferrer' }
                : {};
              return (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Wrapper
                    {...wrapperProps}
                    className="bg-white rounded-xl shadow-soft border border-gray-100 px-6 py-4 flex items-center justify-between group hover:border-primary/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium">
                        {file.name}
                      </span>
                    </div>
                    {file.url ? (
                      <Download className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    )}
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>

          {/* Download All button */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <a
              href={d?.downloadAllLink || "/contact"}
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Download className="w-5 h-5" />
              {d?.downloadAllText || "Preuzmi sve"}
            </a>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
