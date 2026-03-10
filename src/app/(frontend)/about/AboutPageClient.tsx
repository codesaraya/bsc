"use client";

import { motion } from "framer-motion";
import NextImage from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { getImageUrl, toSupabaseUrl } from '@/lib/imageUrl';
import SectionTitle from "@/components/ui/SectionTitle";
import Card from "@/components/ui/Card";
import ClientsSection from "@/components/sections/ClientsSection";
import {
  Users, Award, CheckCircle, Shield, Sparkles, Shirt, Type, Scissors,
  Image as ImageIcon, Upload, Coffee, Tag, Zap, Phone, FolderCheck, ShieldCheck,
  Briefcase, Printer, Star, TrendingUp, Heart, Target, Lightbulb, DollarSign,
  type LucideIcon,
} from "lucide-react";

const statsIconMap: Record<string, LucideIcon> = {
  Users, Briefcase, Printer, Award, Star, TrendingUp, Heart, Target,
  FolderCheck, ImageIcon, Phone,
};
const advantageIconMap: Record<string, LucideIcon> = {
  Award, Zap, Lightbulb, DollarSign, Star, Shield, Target, Heart, Sparkles, Tag,
};

const statsIcons = [Users, FolderCheck, ImageIcon, Phone];
const advantageIcons = [Award, Zap, Sparkles, Tag];

const defaultStats = [
  { icon: Users, value: "4650", label: "Sretnih klijenata" },
  { icon: FolderCheck, value: "3790", label: "Završenih projekata" },
  { icon: ImageIcon, value: "5580", label: "Fotografija" },
  { icon: Phone, value: "8580", label: "Tel. poziva" },
];

const defaultAdvantages = [
  {
    number: "01",
    icon: Award,
    title: "Kvalitet",
    description:
      "Visokokvalitetna štampa na svim vrstama medija od papira do više vrsta vinila, cerada i različitih vrsta plastike i materijala za specifičnu upotrebu.",
  },
  {
    number: "02",
    icon: Zap,
    title: "Brzina",
    description:
      "Brzina i kvalitet u svim procesima, od idejnog dizajna, probnog uzorka, štampe i dorade do montaže i servisa.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Unikatnost",
    description:
      "Modernom tehnologijom pratimo trendove i nudimo širok spektar unikatnih proizvoda. Učinite vaš dom ili poslovni prostor posebnim.",
  },
  {
    number: "04",
    icon: Tag,
    title: "Povoljnost",
    description:
      "Proizvodimo i montiramo razne grafičke proizvode po povoljnim cijenama. Od ideje do gotovog proizvoda, dostave i montaže, sve na jednom mjestu.",
  },
];

const defaultCertificates = ["ICS 27001", "ICS 50001", "ICS 9001", "ICS 14001"];

const defaultChecklist = [
  "Digitalna štampa XXL, velikih i malih formata",
  "Dorada štampanog materijala i priprema za štampu",
  "Od idejnog dizajna do montaže i servisa na području cijele BiH",
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

interface AboutPageClientProps {
  data: any;
  clientsData?: any;
}

export default function AboutPageClient({ data, clientsData }: AboutPageClientProps) {
  const d: any = data;

  const stats =
    d?.stats?.length > 0
      ? d.stats.map((s: any, i: number) => ({
          icon: (s.icon && statsIconMap[s.icon]) || statsIcons[i] || Users,
          value: s.number,
          label: s.label,
        }))
      : defaultStats;

  const advantages =
    d?.advantages?.length > 0
      ? d.advantages.map((a: any, i: number) => ({
          number: a.number,
          icon: (a.icon && advantageIconMap[a.icon]) || advantageIcons[i] || Award,
          title: a.title,
          description: a.description,
        }))
      : defaultAdvantages;

  const certificates =
    d?.certificates?.length > 0
      ? d.certificates.map((c: any) => c.title)
      : defaultCertificates;

  const checklist =
    d?.checklistItems?.length > 0
      ? d.checklistItems.map((c: any) => c.text)
      : defaultChecklist;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark via-[#1a1060] to-dark -mt-[80px] pt-[120px] sm:pt-[160px] pb-12 sm:pb-20 relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
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

        <Container className="relative z-10 text-center">
          <motion.h1
            {...fadeUp}
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            {d?.heroHeading || "O nama"}
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-white/60 max-w-2xl mx-auto"
          >
            {d?.heroSubtitle || "Osnovani 2012. u sinergiji sa MMC Studiom, koji djeluje u Sarajevu od 1997. godine. Od ideje do gotovog proizvoda."}
          </motion.p>
        </Container>
      </section>

      {/* Mission – Create Stunning Print */}
      <section className="py-12 md:py-20 overflow-hidden">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* ── Left: Product collage with floating elements ── */}
            <motion.div
              {...fadeUp}
              className="relative flex items-center justify-center min-h-[320px] md:min-h-[480px] lg:min-h-[560px]"
            >
              {/* Large circle background */}
              <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-purple-200 via-pink-100 to-purple-100 rounded-full" />

              {/* Center product image */}
              <div className="relative z-10 w-56 h-64 md:w-64 md:h-72 lg:w-80 lg:h-[22rem] rounded-2xl overflow-hidden shadow-lg">
                <NextImage
                  src={getImageUrl(d?.heroUploadedImage) || toSupabaseUrl("/Products/City%20Light/city%20light.jpg")}
                  alt={d?.heroImageAlt || "BSC digitalna štampa"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 224px, (max-width: 1024px) 256px, 320px"
                />
              </div>

              {/* ── Floating elements with wander animation ── */}

              {/* Tool icons – top left */}
              <motion.div
                className="absolute top-8 left-4 z-20 flex flex-col gap-2"
                animate={{ x: [0, 6, -4, 2, 0], y: [0, -5, 3, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-teal-400 rounded-xl flex items-center justify-center shadow-md">
                    <Type className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-rose-400 rounded-xl flex items-center justify-center shadow-md">
                    <Scissors className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-gray-100">
                    <Type className="w-5 h-5 text-teal-500" />
                  </div>
                  <div className="w-10 h-10 bg-rose-300 rounded-xl flex items-center justify-center shadow-md">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Upload button – left */}
              <motion.div
                className="absolute left-2 bottom-32 z-20"
                animate={{ x: [0, -5, 3, -2, 0], y: [0, 4, -6, 3, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="bg-white rounded-xl px-4 py-2.5 shadow-lg border border-teal-200 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-teal-500" />
                  <span className="text-xs font-semibold text-teal-600">
                    {d?.decorativeLabels?.[0]?.label || "Dizajn"}
                  </span>
                </div>
              </motion.div>

              {/* Color swatches – top right */}
              <motion.div
                className="absolute top-12 right-4 z-20 flex items-center gap-1.5"
                animate={{ x: [0, 5, -3, 4, 0], y: [0, -4, 5, -3, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <div className="w-6 h-6 bg-indigo-400 rounded-full shadow-sm" />
                <div className="w-6 h-6 bg-amber-400 rounded-full shadow-sm" />
                <div className="w-6 h-6 bg-pink-500 rounded-full shadow-sm" />
                <CheckCircle className="w-5 h-5 text-teal-500" />
              </motion.div>

              {/* Coffee cups – bottom left */}
              <motion.div
                className="absolute -bottom-2 left-8 z-20"
                animate={{ x: [0, -4, 5, -3, 0], y: [0, 3, -4, 2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-end gap-1">
                  <div className="w-12 h-16 bg-gray-800 rounded-lg flex items-center justify-center shadow-lg">
                    <Coffee className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="w-10 h-14 bg-gray-900 rounded-lg flex items-center justify-center shadow-lg">
                    <Coffee className="w-4 h-4 text-amber-300" />
                  </div>
                </div>
              </motion.div>

              {/* Sticker badge – bottom right */}
              <motion.div
                className="absolute bottom-4 right-8 z-20"
                animate={{ x: [0, 4, -5, 3, 0], y: [0, -3, 4, -2, 0], rotate: [0, 5, -3, 2, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex flex-col items-center justify-center shadow-lg">
                  <Tag className="w-5 h-5 text-white" />
                  <span className="text-[8px] font-bold text-white mt-0.5 uppercase tracking-wide">
                    {d?.decorativeLabels?.[1]?.label || "Vinyl"}
                  </span>
                  <span className="text-[7px] font-semibold text-white/80">
                    {d?.decorativeLabels?.[2]?.label || "Naljepnica"}
                  </span>
                </div>
              </motion.div>

              {/* Small floating dot */}
              <motion.div
                className="absolute bottom-24 right-16 z-10"
                animate={{ x: [0, 8, -6, 4, 0], y: [0, -8, 4, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                <div className="w-5 h-5 bg-cyan-300 rounded-full opacity-60" />
              </motion.div>
            </motion.div>

            {/* ── Right: Text content ── */}
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
              {/* Badge */}
              <span className="inline-block bg-primary text-white text-sm font-semibold tracking-wide px-6 py-2.5 rounded-full mb-6">
                {d?.heroBadge || "Više o nama"}
              </span>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-gray-900 leading-[1.15] mb-6">
                {d?.heading || "Specijalizirana digitalna"}{" "}
                <span className="italic">{d?.headingItalic || "štamparija"}</span>
              </h2>

              {/* Description */}
              <p className="text-gray-500 leading-relaxed mb-4 max-w-md">
                {d?.description1 ||
                  "Best Solution Company je specijalizirana štamparija opremljena najnovijim digitalnim UV mašinama, uključujući UV LED mašinu velikog formata sa širinom štampe od 3.2m — jedinu mašinu u ovoj regiji — kao i UV DILLI koja štampa sve ravne materijale (staklo, pleksiglas, alubond, forex, MDF, drvo itd.)"}
              </p>
              <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
                {d?.description2 ||
                  "Pored UV tehnologije, u proizvodnji koristimo latex i ecosolvent mašine (MUTOH, HP, SUMA, XEROX, CANON), što omogućava brzu, kvalitetnu i povoljnu štampu na svim vrstama papirnih medija, vinila, cerada i raznih plastika."}
              </p>

              {/* Checklist */}
              <div className="space-y-4 mb-8">
                {checklist.map((text: string) => (
                  <div key={text} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-gray-600 text-sm">{text}</span>
                  </div>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex items-center gap-6 flex-wrap">
                <Link
                  href={d?.ctaLink || "/contact"}
                  className="inline-block bg-gray-900 text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-gray-800 transition-colors"
                >
                  {d?.ctaText || "Kontaktirajte nas"}
                </Link>

                {/* Avatar stack */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["bg-amber-400", "bg-rose-400", "bg-indigo-400", "bg-teal-400"].map((bg, i) => (
                      <div
                        key={i}
                        className={`w-9 h-9 ${bg} rounded-full border-2 border-white flex items-center justify-center shadow-sm`}
                      >
                        <Users className="w-4 h-4 text-white" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-800">
                    {stats[0]?.value || "4650"}+ <span className="font-normal text-gray-500">{d?.satisfiedClientsText || "zadovoljnih klijenata"}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats – "About us in pictures" */}
      <section className="py-12 md:py-20 bg-gray-50">
        <Container>
          <SectionTitle
            badge={d?.statsBadge || "O nama u brojkama"}
            title={d?.statsTitle || `"OD IDEJE DO GOTOVOG PROIZVODA"`}
            subtitle={d?.statsSubtitle || "Brojke koje odražavaju našu posvećenost i kvalitet."}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat: any, i: number) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-2xl sm:text-4xl font-bold text-dark mb-1">
                    {stat.value}
                  </p>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Advantages */}
      <section className="py-12 md:py-20">
        <Container>
          <SectionTitle
            badge={d?.advantagesBadge || "Zašto BSC"}
            title={d?.advantagesTitle || "Prednost naše štamparije u odnosu na druge"}
            subtitle={d?.advantagesSubtitle || "Brzina, kvalitet, unikatnost i povoljnost — sve na jednom mjestu."}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {advantages.map((item: any, i: number) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="text-center h-full relative overflow-hidden">
                  <span className="absolute top-4 right-4 text-5xl font-black text-primary/10 leading-none select-none">
                    {item.number}
                  </span>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-dark mb-2 text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Clients */}
      <ClientsSection data={clientsData} />

      {/* Certificates – "What makes us special?" */}
      <section className="py-12 md:py-20 bg-gray-50">
        <Container>
          <SectionTitle
            badge={d?.certificatesBadge || "Certifikati"}
            title={d?.certificatesTitle || "Šta nas čini posebnima?"}
            subtitle={d?.certificatesSubtitle || "Koristimo najnoviju tehnologiju, vodeći računa o okolišu. Certifikati koje posjedujemo odražavaju našu posvećenost kvalitetu!"}
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-3xl mx-auto">
            {certificates.map((cert: string, i: number) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white border-2 border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <ShieldCheck className="w-9 h-9 text-primary" />
                </div>
                <p className="font-bold text-dark text-sm">{cert}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
