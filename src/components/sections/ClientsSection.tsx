"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { getImageUrl, toSupabaseUrl } from '@/lib/imageUrl';

/* ── Default client data — all logos are .jpg in /Clients/ ── */
const defaultClients = [
  { name: "Coca-Cola", logo: "/Clients/cocacola.jpg" },
  { name: "dm", logo: "/Clients/dm.jpg" },
  { name: "BH Telecom", logo: "/Clients/bhtelecom.jpg" },
  { name: "Bingo", logo: "/Clients/bingo.jpg" },
  { name: "Samsung", logo: "/Clients/samsung.jpg" },
  { name: "Telemach", logo: "/Clients/telemach.jpg" },
  { name: "Mtel", logo: "/Clients/mtel.jpg" },
  { name: "Raiffeisen", logo: "/Clients/raiffhaisen.jpg" },
  { name: "Strabag", logo: "/Clients/strabag.jpg" },
  { name: "Mercator", logo: "/Clients/mercator.jpg" },
  { name: "Konzum", logo: "/Clients/konzum.jpg" },
  { name: "Palmolive", logo: "/Clients/palmolive.jpg" },
  { name: "Samsonite", logo: "/Clients/samsonite.jpg" },
  { name: "Bosnalijek", logo: "/Clients/bosnalijek.jpg" },
  { name: "Hemofarm", logo: "/Clients/hemofarm.jpg" },
  { name: "Intesa", logo: "/Clients/intesa.jpg" },
  { name: "Nova Banka", logo: "/Clients/novabanka.jpg" },
  { name: "Orbico", logo: "/Clients/orbico.jpg" },
  { name: "Penny", logo: "/Clients/penny.jpg" },
  { name: "Kraš", logo: "/Clients/krash.jpg" },
  { name: "ArcelorMittal", logo: "/Clients/arcelor.jpg" },
  { name: "Avaz", logo: "/Clients/avaz.jpg" },
  { name: "BBI", logo: "/Clients/bbi.jpg" },
  { name: "SCC", logo: "/Clients/scc.jpg" },
  { name: "Skenderija", logo: "/Clients/skenderija.jpg" },
  { name: "Tehnomag", logo: "/Clients/tehnomag.jpg" },
  { name: "Akta", logo: "/Clients/akta.jpg" },
  { name: "Altermedia", logo: "/Clients/altermedia.jpg" },
  { name: "B2B", logo: "/Clients/b2b.jpg" },
  { name: "Balu", logo: "/Clients/balu.jpg" },
  { name: "BB Sport", logo: "/Clients/bb-sport.jpg" },
  { name: "CMS", logo: "/Clients/cms.jpg" },
  { name: "Domod", logo: "/Clients/domod.jpg" },
  { name: "Euro Plakat", logo: "/Clients/euro-plakat.jpg" },
  { name: "Eurobit", logo: "/Clients/eurobit.jpg" },
  { name: "Face", logo: "/Clients/face.jpg" },
  { name: "FDS", logo: "/Clients/fds.jpg" },
  { name: "Hepok", logo: "/Clients/hepok.jpg" },
  { name: "Herbal Spa", logo: "/Clients/herbal-spa.jpg" },
  { name: "Inovine", logo: "/Clients/inovine.jpg" },
  { name: "JetDirect", logo: "/Clients/jetdirect.jpg" },
  { name: "Kimono", logo: "/Clients/kimono.jpg" },
  { name: "Kuehne+Nagel", logo: "/Clients/kuene.jpg" },
  { name: "Lampica", logo: "/Clients/lampica.jpg" },
  { name: "Link Group", logo: "/Clients/linkgroup.jpg" },
  { name: "LRC", logo: "/Clients/lrc.jpg" },
  { name: "Metromedia", logo: "/Clients/metromedia.jpg" },
  { name: "Milcos", logo: "/Clients/milcos.jpg" },
  { name: "Navigare", logo: "/Clients/navigare.jpg" },
  { name: "NDI", logo: "/Clients/ndi.jpg" },
  { name: "Office", logo: "/Clients/office.jpg" },
  { name: "Plaza", logo: "/Clients/plaza.jpg" },
  { name: "Poljine", logo: "/Clients/poljine.jpg" },
  { name: "Sarajevo", logo: "/Clients/sarajevo.jpg" },
  { name: "Simeco", logo: "/Clients/simeco.jpg" },
  { name: "Sinkro", logo: "/Clients/sinkro.jpg" },
  { name: "Slatko Slano", logo: "/Clients/slatko-slano.jpg" },
  { name: "Surlan", logo: "/Clients/surlan.jpg" },
  { name: "Telegroup", logo: "/Clients/telegroup.jpg" },
  { name: "UN", logo: "/Clients/un.jpg" },
];

function ClientCard({ name, logo, uploadedLogo }: { name: string; logo: string; uploadedLogo?: any }) {
  return (
    <div className="group relative flex-shrink-0 w-[160px] sm:w-[180px] mx-3 sm:mx-4">
      <div
        className="
          relative overflow-hidden rounded-2xl bg-white border border-gray-100
          shadow-soft
          transition-all duration-500 ease-out
          group-hover:scale-105 group-hover:shadow-xl
          group-hover:border-primary/30
        "
      >
        {/* Bottom line accent */}
        <div
          className="
            absolute bottom-0 left-0 h-[3px] w-0
            group-hover:w-full
            transition-all duration-500 ease-out
            bg-gradient-to-r from-primary to-secondary
            z-10
          "
        />

        {/* Logo */}
        <div className="relative w-full aspect-[5/3]">
          {getImageUrl(uploadedLogo) && (
            <img
              src={getImageUrl(uploadedLogo)}
              alt={name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ClientsSection({ data }: { data?: any }) {
  const clients = data?.clients || defaultClients;
  const badge = data?.badge || "Naši klijenti";
  const title = data?.title || "Povjerenje vodećih kompanija";
  const subtitle = data?.subtitle || "Ponosni smo na saradnju s vrhunskim brendovima i kompanijama širom regije.";

  return (
    <section className="py-14 md:py-20 bg-gray-50/70 overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            badge={badge}
            title={title}
            subtitle={subtitle}
          />
        </motion.div>
      </Container>

      {/* Marquee track */}
      <div className="relative mt-2">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 z-10 bg-gradient-to-r from-gray-50/70 to-transparent pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 z-10 bg-gradient-to-l from-gray-50/70 to-transparent pointer-events-none" />

        <div className="flex whitespace-nowrap animate-clients-scroll hover:[animation-play-state:paused]">
          {/* First copy */}
          <div className="flex shrink-0 items-center py-4 animate-clients-marquee">
            {clients.map((client: any, i: number) => (
              <ClientCard key={`a-${i}`} {...client} />
            ))}
          </div>

          {/* Second copy (seamless loop) */}
          <div className="flex shrink-0 items-center py-4 animate-clients-marquee">
            {clients.map((client: any, i: number) => (
              <ClientCard key={`b-${i}`} {...client} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
