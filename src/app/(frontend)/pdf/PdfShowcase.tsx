"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  ChevronDown,
  ChevronRight,
  Layers,
  Layout,
  FileText,
  Palette,
  Code2,
  Globe,
  Zap,
  Shield,
  Sparkles,
  Eye,
  Paintbrush,
  Box,
  Target,
  Navigation,
  BookOpen,
  Type,
  Ruler,
  Play,
  Component,
  Grid3X3,
  SquareStack,
  Info,
} from "lucide-react";
import Container from "@/components/ui/Container";

/* ───────────────────────────────────────────── types ── */

interface SectionInfo {
  name: string;
  description: string;
  findText: string; // Text to search for in iframe headings to scroll to this section
}

interface PageInfo {
  title: string;
  route: string;
  description: string;
  color: string; // tailwind gradient
  icon: string; // emoji
  sections: SectionInfo[];
}

/* ──────────────────────────── all pages & sections ── */

const pages: PageInfo[] = [
  {
    title: "Početna",
    route: "/",
    description:
      "Glavna stranica sa hero sekcijom, pregledom usluga, materijala, portfolia, klijenata, statistika i proizvoda.",
    color: "from-primary to-secondary",
    icon: "🏠",
    sections: [
      {
        name: "Hero Sekcija",
        description:
          "Full-viewport hero sa automatski rotirajućim pozadinskim slikama (cross-fade tranzicija svake 5s), animiranim naslovom 'Lider štampe velikih i megavelikih formata' koji se fade-in-uje odozdo, CTA dugme 'Pogledajte naše proizvode' sa hover scale efektom, te pulsni skrol indikator na dnu viewport-a. Koristi framer-motion za ulazne animacije i CSS keyframes za pozadinsku rotaciju. Na mobilnom uređaju, naslov se smanjuje na 2xl a razmaci se kompresuju.",
        findText: "",
      },
      {
        name: "Proces Bar",
        description:
          "Horizontalni 3-koračni procesni bar vizualizira tok rada BSC-a: (1) Dizajn & Priprema — ikona olovke, opis pripreme fajlova za štampu; (2) Štampa & Dorada — ikona printera, opis UV/Ecosolvent/Latex procesa; (3) Dostava & Montaža — ikona kamiona, opis isporuke i montaže. Svaki korak ima numerisani badge, naslov i kratak opis. Koraci su povezani gradijentnim linijama. Na mobilnom se prikazuju vertikalno. Animacija: staggered fade-in sa delay-em 0.15s po koraku.",
        findText: "Dizajn & Priprema",
      },
      {
        name: "O Nama Preview",
        description:
          "Asimetrični 2-kolumnski layout: lijeva strana prikazuje kolaž od 4 proizvoda/projekta sa zaobljenim uglovima i overflow-hidden efektom; desna strana sadrži badge 'Best Solution Company', naslov o kompaniji, paragraf sa opisom poslovanja od 2012. godine, i 2 feature kartice (UV LED Tehnologija sa flash ikonom, Print na sve materijale sa layers ikonom). Ispod se nalazi animirani stat brojač sa 4650+ klijenata i avatar stack od 5 zadovoljnih korisnika. CTA link 'Saznajte više o nama' vodi na /about stranicu.",
        findText: "Best Solution Company",
      },
      {
        name: "Services Ticker",
        description:
          "Beskonačni horizontalni marquee (CSS animation: translateX, 25s linear infinite) koji prikazuje nazive svih usluga BSC-a u velikim, bold slovima: UV Štampa, Brendiranje Vozila, Tapete, Veliki Formati, 3D Paneli, City Light, Bilbord, Cerade. Dupli set elemenata osigurava neprekidni tok. Gradijentni overlay na lijevoj i desnoj strani fade-out-uje traku u pozadinu. Tekst je tamno-sive boje sa outline stilom za vizualni kontrast.",
        findText: "UV Štampa",
      },
      {
        name: "Direktan Print Showcase",
        description:
          "Auto-skrolajuća horizontalna kartica sekcija koja prikazuje 8 tipova direktnog printa: Staklo (transparentni UV print), Drvo (prirodna tekstura), Metal (industrijski finish), Plastika (ABS/PVC materijali), Keramika (pločice i dekor), Koža (luksuzni proizvodi), Latex (fleksibilni mediji), Ecosolvent (outdoor trajnost). Svaka kartica ima gradijentnu pozadinu u boji kategorije, ikonu materijala, naziv i 3-4 bullet pointa sa prednostima. Automatski se skroluju sa pause-on-hover interakcijom.",
        findText: "direktan print na",
      },
      {
        name: "Kvalitetni Materijali",
        description:
          "3 preview kartice materijala u 3-kolonskom gridu: (1) Forex — print na forex PVC ploče sa slikom forex8.jpg; (2) PVC Naljepnice — visokokvalitetne naljepnice za brendiranje sa slikom pvc naljepnice5.jpg; (3) Canvas — premium canvas za umjetničke reprodukcije sa slikom canvas3.jpg. Svaka kartica ima zaobljeni thumbnail (native <img>), naziv materijala, opis i 'Saznajte više →' link koji vodi na odgovarajuću /materials pod-stranicu. Hover efekt podiže karticu sa shadow-lg. Ispod grida, link 'Pogledajte sve materijale →' vodi na /materials.",
        findText: "Kvalitetni materijali",
      },
      {
        name: "Portfolio / Naši Projekti",
        description:
          "Split layout sekcija sa 2 kolone: Lijevi panel sadrži tamno-navy pozadinu sa naslovom 'Pogledajte naše izvedene projekte', čeklistu od 3 stavke (UV LED mašina, Print na pločaste materijale, Latex i ecosolvent mašine) i CTA link 'Kontaktirajte nas' koji vodi na /contact. Desna strana prikazuje 2×2 grid od 4 proizvoda sa najviše fotografija: Wallscape (30 foto), Brendiranje vozila (29 foto), Brendiranje predmeta (22 foto), Brendiranje prostora (20 foto). Svaki tile ima punu sliku, naziv u overlay-u sa gradijentom (from-black/60 via-black/30 to-transparent), i strelicu u bijelom krugu. Sve slike koriste native <img> elemente. Klik na tile vodi na odgovarajuću /products pod-stranicu.",
        findText: "izvedene projekte",
      },
      {
        name: "Klijenti Marquee",
        description:
          "Beskrajni horizontalni marquee scroll sa logotipima 12 vodećih kompanija-klijenata: Coca-Cola, dm drogerie markt, BH Telecom, ASA Group, Bingo, Violeta, HIFA Petrol, Adriatic.hr, Prevent Group, Gama Electronics, MojMaestral, i Energoinvest. Svaki logo je grayscale sa hover tranzicijom u punu boju. Dupli set logotipa garantira neprekidni tok. Sekcija ima naslov 'Povjerenje vodećih kompanija' sa badge-om iznad.",
        findText: "vodećih kompanija",
      },
      {
        name: "BSC u Brojevima & Lokacije",
        description:
          "Dva dijela: (1) Animirani brojači — 4 stat kartice sa CountUp animacijom koja broji od 0 do ciljane vrijednosti (4650+ Klijenata sa Users ikonom, 3790+ Projekata sa Briefcase ikonom, 5580+ Fotografija sa Camera ikonom, 8580+ Poziva sa Phone ikonom). Animacija se triggeruje na scroll intersection. (2) Lokacije — 3 kartice poslovnica sa MapPin ikonomama, adresom, telefonom i radnim vremenom: Sarajevo (Vrbanja 1), Mostar i Tuzla. Svaka lokacija ima hover shadow i link na Google Maps.",
        findText: "BSC u brojevima",
      },
      {
        name: "Certifikati",
        description:
          "4 certifikatne kartice u horizontalnom redu: ICS 27001 (Sigurnost informacija), ICS 50001 (Upravljanje energijom), ICS 9001 (Kvalitet), ICS 14001 (Okoliš). Svaka kartica ima shield ikonu u gradijentnoj boji, naziv certifikata, kratak opis standarda i chevron strelicu za detalje. Na hover-u se kartica podiže i pojavljuje subtle glow efekat. Između kartica su dekorativni chevron separatori. Na mobilnom, certifikati se prikazuju u 2×2 gridu. Napomena: dekorativni 'BSC CERTIFIED' element (leaf + card mockup) u gornjem desnom uglu je uklonjen.",
        findText: "posebnima",
      },
      {
        name: "Vijesti",
        description:
          "Sekcija sa naslovom 'Budite u toku' i 3 kartice najnovijih članaka: svaka ima thumbnail sliku sa date overlay-om, kategorijski badge (npr. 'Tehnologija', 'Savjeti'), naslov članka, excerpt od 2 reda (line-clamp-2), datum objave i 'Čitaj više →' link koji vodi na /news/[slug]. Kartice su animirane sa staggered whileInView fade-in efektom. Na mobilnom, prikazuju se vertikalno u jednoj koloni.",
        findText: "Budite u toku",
      },
      {
        name: "CTA Sekcija",
        description:
          "Full-width gradijentna CTA kartica (primary→secondary dijagonalni gradijent) sa bijelim tekstom, naslovom 'Želite poslati upit?', podnaslovom koji motiviše korisnika na kontakt, i prominent CTA dugme 'Kontaktirajte nas' sa hover scale i shadow efektom. Dekorativni krugovi sa blur-3xl efektom u uglovima kartice. Na desktop-u dugme je centered, na mobilnom full-width.",
        findText: "poslati upit",
      },
    ],
  },
  {
    title: "O Nama",
    route: "/about",
    description:
      "Kompletna prezentacija kompanije sa misijom, historijom od 2012. godine, animiranim statistikama, 4 kartice konkurentskih prednosti, klijentskim marquee-em i certifikatima kvaliteta.",
    color: "from-pink-500 to-purple-600",
    icon: "ℹ️",
    sections: [
      {
        name: "Hero",
        description:
          "Gradijentni hero sa trostrukim prelivom boja (pink→purple→blue) koji pokriva gornji dio stranice. Sadrži animirani badge 'O nama' sa sparkle dekoracijom, veliki naslov sa font-bold text-5xl (na desktop-u) koji se smanjuje na 3xl za mobilne uređaje, i podnaslov o osnivanju kompanije 2012. godine u Sarajevu. Pozadina ima dekorativne blur krugove u uglovima (bg-pink-500/20 blur-3xl). Ulazna animacija: fade-in odozdo sa 0.6s duration.",
        findText: "",
      },
      {
        name: "Misija & Opis",
        description:
          "Dvostupanjski layout: Lijevo — kolaž od 4+2 slika proizvoda i prostora kompanije sa rounded-2xl uglovima, rotiranim slikama pod različitim kutovima (-3deg, 3deg) i shadow-lg efektom. Desno — badge 'Naša priča', naslov o kompaniji, detaljan paragraf sa opisom specijalizacije u digitalnoj štampi velikih formata, UV LED tehnologiji i brendiranju. Ispod se nalazi čeklista od 6 usluga sa CheckCircle2 ikonama (zelena boja). Avatar stack prikazuje 5 korisničkih avatara sa overlap efektom i '+4650 zadovoljnih klijenata' tekstom. Završava sa CTA dugmetom 'Kontaktirajte nas'.",
        findText: "Specijalizirana digitalna",
      },
      {
        name: "Statistike",
        description:
          "4 stat kartice u responzivnom gridu (1 kolona mobile, 2 kolone tablet, 4 kolone desktop): Svaka kartica ima veliku animiranu cifru (CountUp od 0 do ciljane vrijednosti za 2s sa easeOut), opis ispod, i ikonu u gradijentnom krugu. Vrijednosti: 4650 Klijenata, 3790 Projekata, 5580 Fotografija, 8580 Poziva. Ispod grid-a se nalazi citat 'OD IDEJE DO GOTOVOG PROIZVODA' u velikim slovima sa serif fontom i dekorativnim navodnicima. Pozadina sekcije: light gray (bg-gray-50) sa border-t.",
        findText: "OD IDEJE DO GOTOVOG",
      },
      {
        name: "Prednosti",
        description:
          "4 numerisane kartice prednosti u 2×2 gridu: 01 Kvalitet — opis premium materijala i UV LED tehnologije sa CheckBadge ikonom; 02 Brzina — opis ekspresne izrade i isporuke sa Clock ikonom; 03 Unikatnost — opis prilagođenih rješenja i custom dizajna sa Fingerprint ikonom; 04 Povoljnost — opis konkurentnih cijena i volumnih popusta sa Tag ikonom. Svaka kartica ima veliki broj u pozadini (opacity-5), gradijentnu traku na vrhu, naslov, 2 reda opisa i hover shadow-lg + translateY(-4px) efekat.",
        findText: "u odnosu na druge",
      },
      {
        name: "Klijenti",
        description:
          "Ista marquee komponenta kao na početnoj stranici: beskonačni horizontalni scroll sa 12 grayscale logotipa klijenata koji prelaze u punu boju na hover. Naslov 'Povjerenje vodećih kompanija' sa badge-om. Dupli set logotipa za seamless loop. Gradijentni fade overlay na lijevoj i desnoj ivici (bg-gradient-to-r from-white via-transparent to-white).",
        findText: "vodećih kompanija",
      },
      {
        name: "Certifikati",
        description:
          "4 certifikatne shield kartice u horizontalnom redu sa međusobnim chevron separatorima: ICS 27001 (Sigurnost informacija — plavi shield), ICS 50001 (Upravljanje energijom — zeleni shield), ICS 9001 (Kvalitet — narančasti shield), ICS 14001 (Okoliš — teal shield). Svaka kartica ima SVG shield ikonu, naziv standarda, kratak opis i hover glow efekat sa scale(1.05) tranzicijom.",
        findText: "posebnima",
      },
    ],
  },
  {
    title: "Kontakt",
    route: "/contact",
    description:
      "Kontakt stranica sa multi-field formom za upite, 4 info kartice (adresa, telefon, email, radno vrijeme), ugrađenom Google Maps mapom i motivacijskim citatom.",
    color: "from-emerald-500 to-teal-600",
    icon: "📞",
    sections: [
      {
        name: "Mini Hero",
        description:
          "Kompaktni gradijentni hero (emerald→teal) sa badge-om 'Želimo surađivati s vama' u rounded-full obliku, animiranim naslovom 'Kako vam možemo pomoći' (text-4xl na desktop, text-2xl na mobilnom), i kratkim podnaslovom koji poziva korisnike na kontakt. Hero ima smanjenu visinu u odnosu na druge stranice (pb-12 umjesto pb-24) jer služi samo kao uvod u formu ispod. Dekorativni blur krugovi u emerald/teal nijansama.",
        findText: "",
      },
      {
        name: "Info Kartice",
        description:
          "4 kontakt info kartice u responzivnoj mreži (1 kolona mobile, 2 tablet, 4 desktop): (1) Adresa — MapPin ikona, 'Vrbanja 1, 71000 Sarajevo' sa linkom na Google Maps; (2) Telefon — Phone ikona, '+387 33 123 456' sa tel: linkom za direktan poziv; (3) Email — Mail ikona, 'bscsarajevo@gmail.com' sa mailto: linkom; (4) Radno Vrijeme — Clock ikona, 'Pon-Pet: 08:00-16:00, Sub: 09:00-13:00'. Svaka kartica ima bijelu pozadinu, border, rounded-2xl, hover shadow-md efekat i ikonu u obojenoj kružnoj pozadini.",
        findText: "Vrbanja 1",
      },
      {
        name: "Forma & Mapa",
        description:
          "Dvostupanjski layout: Lijevo — Kontakt forma sa 5 polja: Ime i prezime (text input sa User ikonom), Telefon (tel input sa Phone ikonom), Email (email input sa Mail ikonom, sa front-end validacijom), Budžet (select dropdown sa opcijama od 500-1000 KM do 10.000+ KM), Opis projekta (textarea sa 5 redova). Submit dugme 'Pošalji upit' sa loading state animacijom. Desno — Google Maps iframe (100% širine, 400px visine) sa pinovanom BSC lokacijom u Sarajevu, ispod koje je inspirativni citat o kvalitetu štampe u italic stilu sa navodnicima.",
        findText: "vašem projektu",
      },
    ],
  },
  {
    title: "Proizvodi",
    route: "/products",
    description:
      "Indeksna stranica svih proizvoda sa tamno navy hero-em (from-dark via-[#1a1060] to-dark), pulsing blobovima, dot-grid overlay-em, quick stats pillovima, 2×2 mrežom kategorija sa dark gradient headerima, 'Zašto odabrati nas?' sekcijom sa 4 feature kartice i dark gradient CTA-om sa dual dugmadima.",
    color: "from-amber-500 to-orange-600",
    icon: "📦",
    sections: [
      {
        name: "Hero",
        description:
          "Tamno navy gradijentni hero (from-dark via-[#1a1060] to-dark) sa pulsing blur blobovima u secondary/primary bojama, dot-grid overlay-em (radial-gradient). Badge 'Naši Proizvodi' u glass-morphism stilu, naslov 'Proizvodi & Usluge' (text-6xl bold na desktop-u) i podnaslov u white/60. Quick stats: tri pill-a (broj kategorija, ukupan broj proizvoda, '100% prilagodljivo') sa backdrop-blur i border-white/10.",
        findText: "",
      },
      {
        name: "Kategorije Grid",
        description:
          "2×2 mreža od 4 kategorije u Card komponentama sa dark gradient headerima (from-dark to-[#1a1060]): Brendiranje (Megaphone ikona), Outdoor i Indoor (Sun ikona), Home & Office (Home ikona), Promo/POS (ShoppingBag ikona). Svaki header ima dekorativni bg-primary/10 krug, glass-morphism ikonu, naziv i broj stavki. Donji dio: opis, preview tagovi i 'Pogledaj sve proizvode' link u primary boji.",
        findText: "Odaberite Kategoriju",
      },
      {
        name: "Prednosti & CTA",
        description:
          "'Zašto odabrati nas?' sekcija sa 4 feature karticama u 4-kolonskom gridu: Kreativna rješenja, Garancija kvaliteta, Brza isporuka, Zadovoljni klijenti. Svaka kartica ima dark gradient ikonu, naslov i opis. Dark gradient CTA (from-dark via-[#1a1060] to-dark) sa primary/secondary blur blobovima, dot-grid overlay i dual dugmadima (Kontakt + Pozovite nas).",
        findText: "Zašto odabrati nas",
      },
    ],
  },
  {
    title: "Proizvod — Brendiranje",
    route: "/products/brendiranje",
    description:
      "Kategorija brendiranja sa tamno navy hero-em, quick stats pillovima, 2-kolonskom mrežom proizvoda sa hover overlay efektima, 'Zašto odabrati nas?' sekcijom sa 6 feature kartica, dark gradient CTA-om, i cross-promotion mrežom drugih kategorija.",
    color: "from-violet-500 to-purple-700",
    icon: "🎨",
    sections: [
      {
        name: "Hero",
        description:
          "Tamno navy gradijentni hero (from-dark via-[#1a1060] to-dark) sa pulsing blur blobovima u primary/secondary bojama, dot-grid overlay-em, breadcrumb navigacijom, ikonom kategorije u glass-morphism okviru (bg-white/10 border-white/10), naslovom i opisom. Quick stats: tri pill-a (broj proizvoda, '100% prilagodljivo', 'Brza isporuka') sa backdrop-blur efektom.",
        findText: "",
      },
      {
        name: "Proizvodi Grid",
        description:
          "2-kolonska mreža proizvoda sa većim karticama (h-48 slike), hover overlay gradijentom (from-dark/40), 'Saznaj više' action text koji se pojavljuje na hover, i line-clamp-2 opisima. Svaka kartica ima rounded-2xl, shadow-soft, i hover translate-y-1 animaciju.",
        findText: "Dostupni Proizvodi",
      },
      {
        name: "Zašto Odabrati Nas",
        description:
          "Sekcija sa 6 feature kartica u 3-kolonskom gridu: Premium kvalitet, Garancija kvaliteta, Brza isporuka, Prilagodljivo, Stručni tim, Brojni zadovoljni klijenti. Svaka kartica ima dark gradient ikonu, naslov i opis. Hover efekti sa border-primary/20.",
        findText: "Zašto odabrati nas",
      },
      {
        name: "CTA & Kategorije",
        description:
          "Dark gradient CTA kartica sa dual dugmadima (Kontakt + Pozovite nas), dot-grid overlay, i blur dekoracijama. Ispod: 'Istražite druge kategorije' sekcija sa 3 dark gradient kartice drugih kategorija, svaka sa ikonom, opisom, brojem proizvoda i hover efektima.",
        findText: "Zainteresirani ste za",
      },
    ],
  },
  {
    title: "Proizvod — Outdoor i Indoor",
    route: "/products/outdoor-indoor",
    description:
      "7 stavki sa tamno navy hero-em, quick stats pillovima, proširenim karticama proizvoda sa hover efektima, 'Zašto odabrati nas?' sekcijom, dark gradient CTA-om i cross-promotion kategorija.",
    color: "from-amber-500 to-orange-600",
    icon: "🏢",
    sections: [
      {
        name: "Hero",
        description: "Tamno navy gradijent (from-dark via-[#1a1060] to-dark) sa pulsing blobovima, dot-grid, breadcrumb, ikonom kategorije u glass okviru, naslovom, opisom i 3 quick stats pill-a.",
        findText: "",
      },
      {
        name: "Proizvodi Grid",
        description: "2-kolonska mreža od 7 outdoor/indoor proizvoda sa h-48 slikama, hover overlay gradijentom i 'Saznaj više' action textom.",
        findText: "Dostupni Proizvodi",
      },
      {
        name: "Feature Grid & CTA",
        description: "6 feature kartica u 3-kolonskom gridu sa dark gradient ikonama. Dark gradient CTA sa dual dugmadima i cross-promotion grid sa 3 druge kategorije.",
        findText: "Zašto odabrati nas",
      },
    ],
  },
  {
    title: "Materijali",
    route: "/materials",
    description:
      "Indeksna stranica svih kategorija materijala sa tamno navy hero-em (from-dark via-[#1a1060] to-dark), pulsing blobovima, dot-grid overlay-em, quick stats pillovima, 2×2 mrežom od 4 kategorije sa dark gradient headerima, 'Zašto naši materijali?' sekcijom i dark gradient CTA-om.",
    color: "from-cyan-500 to-blue-600",
    icon: "🧱",
    sections: [
      {
        name: "Hero",
        description:
          "Tamno navy gradijentni hero (from-dark via-[#1a1060] to-dark) sa pulsing blur blobovima u primary/secondary bojama, dot-grid overlay-em. Badge 'Naši Materijali' u glass-morphism stilu, naslov 'Materijali & Usluge' (text-6xl bold na desktop-u) i podnaslov u white/60. Quick stats: tri pill-a (broj kategorija, ukupan broj materijala, '4 tehnologije') sa backdrop-blur i border-white/10.",
        findText: "",
      },
      {
        name: "Kategorije Grid",
        description:
          "2×2 mreža od 4 kategorije materijala u Card komponentama sa dark gradient headerima (from-dark to-[#1a1060]): UV/Ecosolvent/Latex (Printer ikona), UV Direktni Print (Layers ikona), CNC (Box ikona), Laser (Zap ikona). Svaki header ima dekorativni bg-primary/10 krug, glass-morphism ikonu, naziv i broj stavki. Donji dio: opis, preview tagovi i 'Pogledaj sve materijale' link u primary boji.",
        findText: "Odaberite Kategoriju",
      },
      {
        name: "Prednosti & CTA",
        description:
          "'Zašto naši materijali?' sekcija sa 4 feature karticama u 4-kolonskom gridu: Vrhunski materijali, Garancija kvaliteta, Brza obrada, Stručni savjet. Svaka kartica ima dark gradient ikonu, naslov i opis. Dark gradient CTA (from-dark via-[#1a1060] to-dark) sa primary/secondary blur blobovima, dot-grid overlay i dual dugmadima (Kontakt + Pozovite nas).",
        findText: "Zašto naši materijali",
      },
    ],
  },
  {
    title: "Materijal — UV Direktni Print",
    route: "/materials/uv-direktni-print",
    description:
      "Pod-stranica kategorije UV Direktni Print sa tamno navy hero-em (from-dark via-[#1a1060] to-dark), pulsing blobovima, dot-grid overlay-em, quick stats pillovima, proširenom mrežom materijala sa hover overlay efektima, 'Zašto odabrati nas?' sekcijom, dark gradient CTA-om i cross-promotion kategorijama.",
    color: "from-purple-500 to-indigo-600",
    icon: "🔬",
    sections: [
      {
        name: "Hero",
        description:
          "Tamno navy gradijent (from-dark via-[#1a1060] to-dark) sa pulsing blobovima, dot-grid overlay, breadcrumb (Početna > Materijali > UV Direktni Print), glass-morphism ikona kategorije, naslov, opis i 3 quick stats pill-a (broj materijala, '100% prilagodljivo', 'Brza isporuka').",
        findText: "",
      },
      {
        name: "Materijali Grid",
        description:
          "2-kolonska mreža od 7 materijala sa većim karticama (h-48 slike), hover overlay gradijentom (from-dark/40), 'Saznaj više' action text na hover, i line-clamp-2 opisima. Materijali: Staklo, Drvo, Forex, Plexiglass, Kapaline, Alu Bond, MDF.",
        findText: "Dostupni Materijali",
      },
      {
        name: "Feature Grid & CTA",
        description:
          "6 feature kartica u 3-kolonskom gridu sa dark gradient ikonama (Premium kvalitet, Garancija, Brza isporuka, Prilagodljivo, Stručni tim, Zadovoljni klijenti). Dark gradient CTA sa dual dugmadima, dot-grid overlay. Cross-promotion sekcija sa 3 dark gradient kartice drugih kategorija.",
        findText: "Zašto odabrati nas",
      },
    ],
  },
  {
    title: "Materijal — CNC",
    route: "/materials/cnc",
    description:
      "Pod-stranica CNC kategorije sa tamno navy hero-em, quick stats pillovima, proširenom mrežom materijala sa hover efektima, 'Zašto odabrati nas?' sekcijom, dark gradient CTA-om i cross-promotion kategorijama.",
    color: "from-emerald-500 to-teal-600",
    icon: "⚙️",
    sections: [
      {
        name: "Hero",
        description:
          "Tamno navy gradijent (from-dark via-[#1a1060] to-dark) sa pulsing blobovima, dot-grid overlay, breadcrumb (Materijali > CNC), glass-morphism ikona, naslov 'CNC Obrada', opis i quick stats pill-ovi.",
        findText: "",
      },
      {
        name: "Materijali Grid",
        description:
          "2-kolonska mreža od 9 CNC materijala sa hover overlay gradijentom i 'Saznaj više' action textom: MDF, Iverica, Špera, Aluminij, Forex/Plastika, Plexiglass, Medijapan, Drvo, Plastični Karton.",
        findText: "Dostupni Materijali",
      },
      {
        name: "Feature Grid & CTA",
        description:
          "6 feature kartica u 3-kolonskom gridu sa dark gradient ikonama. Dark gradient CTA sa dual dugmadima i cross-promotion grid sa 3 druge kategorije.",
        findText: "Zašto odabrati nas",
      },
    ],
  },
  {
    title: "Vijesti",
    route: "/news",
    description:
      "Novosti i blog članci sa featured istaknutim člankom, horizontalnim kategorijskim filterima, 3-kolonskom mrežom članaka sa paginacijom, i CTA newsletter sekcijom za email pretplatu.",
    color: "from-rose-500 to-pink-600",
    icon: "📰",
    sections: [
      {
        name: "Hero",
        description:
          "Gradijentni hero (rose-500→pink-600) sa 3 dekorativna sparkle elementa na različitim pozicijama (SVG zvjezdice sa opacity-20), badge-om 'Blog & Novosti' sa Sparkles ikonom, animiranim naslovom 'Najnovije vijesti' (text-5xl desktop), podnaslovom o aktuelnostima iz svijeta digitalne štampe. Hero koristi isti pattern kao ostale stranice ali sa rose/pink paletom i spark dekorijama za vizualnu razliku.",
        findText: "",
      },
      {
        name: "Featured Članak",
        description:
          "Velika featured kartica za istaknuti članak — zauzima punu širinu container-a. Layout: lijevo velika slika članka (aspect-ratio 16/9, rounded-2xl) sa kategorijskim badge-om na slici (npr. 'Tehnologija' u emerald boji), shadow overlay na dnu slike; desno naslov članka (text-2xl bold), datum objave sa Calendar ikonom, autor sa User ikonom, excerpt od 3 reda, i 'Procitaj više →' link u primary boji sa hover underline efektom. Kartica ima hover shadow-xl i subtle scale tranziciju.",
        findText: "Eco-Friendly",
      },
      {
        name: "Kategorije & Grid",
        description:
          "Horizontalni scroll filter kategorija: 'Sve kategorije' (aktivna — primary pozadina, bijeli tekst), 'Tehnologija', 'Savjeti', 'Trendovi', 'Događaji' (neaktivne — gray pozadina, hover primary outline). Klik na kategoriju filtrira članke ispod. Grid ispod filtera je 3-kolonski na desktop-u (1 kolona mobile, 2 tablet): svaka kartica ima thumbnail (aspect-ratio 16/10), category badge, naslov, excerpt (line-clamp-2), datum, i 'Čitaj više' link. Kartice imaju staggered fade-in animaciju.",
        findText: "Sve kategorije",
      },
      {
        name: "Newsletter",
        description:
          "Full-width CTA sekcija sa gradijentnom pozadinom (primary→secondary): naslov 'Ne propustite novosti' u bijelom tekstu, podnaslov o prijavi na newsletter, email input polje sa Mail ikonom i placeholder 'Vaš email', submit dugme 'Pretplatite se' sa hover scale efektom. Ispod forme tekst o privatnosti podataka. Dekorativni blur krugovi i dot-grid pattern u pozadini. Na mobilnom, input i dugme se slažu vertikalno.",
        findText: "Ne propustite novosti",
      },
    ],
  },
  {
    title: "Upute za Pripremu",
    route: "/instructions",
    description:
      "Tehničke upute za pripremu fajlova za štampu: CMYK zahtjevi, prihvaćeni formati (TIFF, PDF, PSD, CDR, AI, JPG, EPS), 4 omjera rezolucije (1:1 do 1:20), upute za autograme na vozilima, i sekcija sa 10 fajlova za preuzimanje.",
    color: "from-indigo-500 to-blue-600",
    icon: "📋",
    sections: [
      {
        name: "Hero",
        description:
          "Gradijentni hero (indigo-500→blue-600) sa sparkle dekoracijom (3 SVG zvjezdice različitih veličina), badge-om 'Tehničke Upute' sa BookOpen ikonom, animiranim naslovom 'Upute za pripremu' (text-5xl), i podnaslovom o važnosti ispravne pripreme fajlova za kvalitetnu štampu. Isti hero pattern kao ostale stranice ali sa indigo/blue paletom.",
        findText: "",
      },
      {
        name: "Priprema Fajlova",
        description:
          "Detaljna sekcija o tehničkim zahtjevima: (1) CMYK objašnjenje — zašto je CMYK (Cyan, Magenta, Yellow, Key/Black) obavezan umjesto RGB, sa vizualnom demonstracijom razlike; (2) Prihvaćeni formati — 7 ikona formata u gridu: TIFF (.tif), PDF (.pdf), PSD (.psd), CDR (.cdr), AI (.ai), JPG (.jpg), EPS (.eps), svaki sa ikonom programa i opisom; (3) 4 savjeta — kartice sa CheckCircle ikonama: Uvijek embed fontove, Konvertujte u krivulje, Ostavite bleed 3-5mm, Crni tekst C0 M0 Y0 K100.",
        findText: "Priprema fajlova",
      },
      {
        name: "Rezolucija & Omjer",
        description:
          "4 kartice sa omjerima izrade i odgovarajućim rezolucijama: Omjer 1:1 — mali formati do 100cm, rezolucija 300-500 dpi, primjer: vizitke i flajeri; Omjer 1:5 — srednji formati 1-3m, rezolucija 150-300 dpi, primjer: posteri i rollup-ovi; Omjer 1:10 — veliki formati 3-12m, rezolucija 72-150 dpi, primjer: billboard i city light; Omjer 1:20 — mega formati 12m+, rezolucija 25-72 dpi, primjer: wallscape i fasade. Svaka kartica ima vidljivu omjer oznaku, raspon dpi, primjer primjene i vizualnu skalnu ikonu.",
        findText: "Rezolucija i omjer",
      },
      {
        name: "Autogram Priprema",
        description:
          "Specijalizirana sekcija za pripremu autograma (brendiranje vozila): ikona automobila (Car), korak-po-korak upute: (1) Snimite fotografije vozila sa svih strana, (2) Dostavite željeni dizajn ili logo u vektorskom formatu, (3) Naš tim kreira 3D vizualizaciju na vašem vozilu, (4) Odobrite dizajn i zakazite termin montaza. Napomene o vrstama folija (cast vs. calendered), trajnosti (3-7 godina), i preporuke za pripremu vozila prije aplikacije.",
        findText: "autograma",
      },
      {
        name: "Preuzimanja",
        description:
          "Sekcija sa 10 downloadable fajlova u list layoutu: svaki fajl ima ikonu programa (Adobe Illustrator, Photoshop, InDesign, CorelDRAW), naziv fajla, opis sadržaja (npr. 'Template za vizitke 90×50mm'), veličinu fajla (KB/MB) i 'Preuzmi' dugme sa Download ikonom. Fajlovi pokrivaju razne programe i formate. Na dnu sekcije je 'Preuzmi sve' dugme koje downloaduje ZIP arhivu svih template-a. Svaki fajl ima hover highlight i download counter.",
        findText: "preuzimanje",
      },
    ],
  },
  {
    title: "Detalj Proizvoda",
    route: "/products/outdoor-indoor/billboard",
    description:
      "Primjer detaljne stranice pojedinog proizvoda (Billboard) sa tamno navy hero-em koji koristi sliku proizvoda kao pozadinu (native <img> sa dark overlay-em), 3-kolonskim content layoutom (opis + USP kartice + sidebar sa checklist, category i contact karticama), procesom izrade u 4 koraka, galerijom, dark gradient CTA-om, povezanim proizvodima i cross-promotion kategorijama.",
    color: "from-amber-500 to-orange-600",
    icon: "📄",
    sections: [
      {
        name: "Hero",
        description:
          "Slika proizvoda kao full-cover pozadina (native <img>, object-cover) sa tamnim overlay-em (bg-gradient-to-br from-dark/90 via-[#1a1060]/85 to-dark/90). 4-nivovska breadcrumb navigacija (Početna > Proizvodi > Outdoor i Indoor > Billboard). Ikona kategorije u glass-morphism okviru, category badge, naslov proizvoda (text-5xl) i opis u white/60 boji.",
        findText: "",
      },
      {
        name: "Opis & Sidebar",
        description:
          "3-kolonski grid — glavni sadržaj (col-span-2) sa naslovom 'O proizvodu', 3 paragrafa opisa i 2×2 USP grid (Premium kvalitet, Garancija, Brza izrada, Prilagodljivo) sa dark gradient ikonama. Sidebar sa tri kartice: čeklista od 7 prednosti, dark gradient category card sa brojem proizvoda i linkom, te gradient contact card sa MessageSquare i Phone linkovima. Napomena: raniji standalone hero image showcase ispod hero-a je uklonjen — slika proizvoda se sada prikazuje kao pozadina hero sekcije sa dark overlay-em.",
        findText: "O proizvodu",
      },
      {
        name: "Proces Izrade",
        description:
          "4-kolonski grid sa procesom izrade u koracima: 01 Konsultacija, 02 Dizajn, 03 Produkcija, 04 Isporuka. Svaka kartica ima veliki step number u gray-100 boji (top-right), dark gradient ikonu, naslov i opis. Hover efekti sa shadow-md i translate-y.",
        findText: "Proces izrade",
      },
      {
        name: "Galerija",
        description:
          "Dual-mode galerija fotografija sa carousel/grid modovima, lightbox overlay-em, thumbnail navigacijom i lazy loading-om.",
        findText: "Galerija",
      },
      {
        name: "CTA & Povezano",
        description:
          "Dark gradient CTA (from-dark via-[#1a1060] to-dark) sa primary/secondary blur blobovima, dot-grid overlay, dual dugmadima (Kontakt + Pozovite nas). Ispod: sekcija 'Ostalo iz kategorije' sa 4 kartice povezanih proizvoda. Zatim: 'Istražite druge kategorije' sa 3 dark gradient cross-promotion kartice sa ikonama, opisima i brojem proizvoda.",
        findText: "Zainteresirani za",
      },
    ],
  },
  {
    title: "Detalj Materijala",
    route: "/materials/uv-direktni-print/drvo",
    description:
      "Primjer detaljne stranice materijala (Drvo — UV Direktni Print) sa tamno navy hero-em koji koristi sliku materijala kao pozadinu (native <img> sa dark overlay-em), proširenim 3-kolonskim layoutom sa 6 feature kartica, procesom izrade u 4 koraka, galerijom, dark gradient CTA-om, povezanim materijalima i cross-promotion kategorijama.",
    color: "from-purple-500 to-indigo-600",
    icon: "📄",
    sections: [
      {
        name: "Hero",
        description:
          "Slika materijala kao full-cover pozadina (native <img>, object-cover) sa tamnim overlay-em (bg-gradient-to-br from-dark/90 via-[#1a1060]/85 to-dark/90). 4-nivovska breadcrumb navigacija (Početna > Materijali > UV Direktni Print > Drvo). Ikona kategorije u glass-morphism okviru (bg-white/10, border-white/10), category badge, naslov materijala (text-5xl) i opis u white/60 boji.",
        findText: "",
      },
      {
        name: "Specifikacije & Sidebar",
        description:
          "3-kolonski grid — glavni sadržaj (col-span-2) sa naslovom 'O materijalu', 3 paragrafa detaljnog opisa, i 3×2 grid od 6 feature kartica (Izdržljivost, Preciznost, Premium kvalitet, Razne debljine, Boje & Teksture, Vizualni efekt) sa dark gradient ikonama i hover efektima. Sidebar sa tri kartice: čeklista od 7 ključnih prednosti, dark gradient category info card (ikona, naziv, broj materijala, opis, link), i gradient contact card sa upit/telefon linkovima. Napomena: raniji standalone hero image showcase ispod hero-a je uklonjen — slika materijala se sada prikazuje kao pozadina hero sekcije sa dark overlay-em.",
        findText: "O materijalu",
      },
      {
        name: "Proces Izrade",
        description:
          "4-kolonski grid sa procesom izrade: 01 Konsultacija (MessageSquare ikona), 02 Priprema (Settings ikona), 03 Štampa/Obrada (Printer ikona), 04 Kontrola & Isporuka (CheckCircle2 ikona). Svaka kartica ima veliki step number u gray-100 (top-right), dark gradient ikonu, naslov i opis. Hover efekti sa shadow-md i translate-y.",
        findText: "Proces izrade",
      },
      {
        name: "Galerija",
        description:
          "Dual-mode galerija (carousel/grid) sa fotografijama materijala, lightbox overlay-em, thumbnail navigacijom i lazy loading-om.",
        findText: "Galerija",
      },
      {
        name: "CTA & Povezano",
        description:
          "Dark gradient CTA (from-dark via-[#1a1060] to-dark) sa primary/secondary blur blobovima, dot-grid overlay, dva dugmeta (Kontakt + Pozovite nas). Ispod: 'Ostali materijali u kategoriji' sa 4 kartice, svaka sa thumbnailom, nazivom i opisom. Zatim: 'Istražite druge kategorije' sa 3 dark gradient cross-promotion kartice sa ikonama, opisima, brojem materijala i hover efektima.",
        findText: "Trebate",
      },
    ],
  },
];

/* ────────────── Design Documentation Data ── */

const designPrinciples = [
  {
    icon: Target,
    title: "Korisnički Fokus",
    description: "Svaki element dizajniran sa ciljem intuitivne navigacije i jasne hijerarhije informacija. Korisničko iskustvo je prioritet — od velikih CTA dugmadi, preko jasnih breadcrumb navigacija, do optimiziranog redoslijeda sadržaja koji vodi korisnika kroz konverzijski tok.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Paintbrush,
    title: "Vizualni Identitet",
    description: "Konzistentan branding kroz sve stranice sa definisanom paletom od 6 boja, Inter font familijom za tekst, bold tipografijom za naslove, i gradijentnim akcentima koji povezuju sve elemente u jedinstven vizualni sistem.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Performanse",
    description: "Optimizirano učitavanje: većina komponenti koristi native <img> elemente umjesto Next.js Image (zbog hydration kompatibilnosti u iframe-ovima), GPU-akcelerovane animacije (transform/opacity), Turbopack za brzi build, te automatsko code-splitting po rutama za minimalni inicijalni bundle.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Pristupačnost",
    description: "WCAG 2.1 AA smjernice: semantički HTML5 elementi (nav, main, section, article), ARIA labeli na svim interaktivnim elementima, fokus vidljivost, kontrast ratio 4.5:1+ za tekst, i podrška za tastaturnu navigaciju.",
    color: "from-emerald-500 to-teal-500",
  },
];

const techStack = [
  { name: "Next.js 16", category: "Framework", color: "bg-gray-900" },
  { name: "React 19", category: "UI Library", color: "bg-blue-500" },
  { name: "TypeScript", category: "Jezik", color: "bg-blue-600" },
  { name: "Tailwind CSS v4", category: "Stilovi", color: "bg-cyan-500" },
  { name: "Framer Motion", category: "Animacije", color: "bg-purple-500" },
  { name: "Lucide Icons", category: "Ikone", color: "bg-orange-500" },
  { name: "Turbopack", category: "Bundler", color: "bg-rose-500" },
  { name: "Supabase", category: "Backend", color: "bg-emerald-500" },
];

const colorPalette = [
  { name: "Primary", hex: "#42C6D9", usage: "CTA dugmad, linkovi, naglasci, fokus stanja, aktivni elementi, navbar akcenti" },
  { name: "Secondary", hex: "#E91E90", usage: "Akcenti, badge-evi, hover stanja, sporedne CTA sekcije, gradient parovi" },
  { name: "Dark", hex: "#1A1464", usage: "Hero pozadine, footer, primarni tekst naslova, navbar, kartice" },
  { name: "Navy", hex: "#0d0b2e", usage: "Gradijenti, overlay pozadine, duboki kontrasti, mobilni meni" },
  { name: "Success", hex: "#10b981", usage: "Potvrde, statistike, čekmark ikone, dostupnost" },
  { name: "Danger", hex: "#ef4444", usage: "Upozorenja, greške, obavezna polja, brisanje" },
  { name: "Info", hex: "#06b6d4", usage: "Informativni badge-evi, tooltip pozadine, linkovi" },
  { name: "Gray-50", hex: "#f9fafb", usage: "Pozadine sekcija, kartice, razdvajanje sadržaja" },
];

const typographyScale = [
  { name: "Display", size: "text-7xl", px: "72px", weight: "Bold (700)", usage: "Hero naslov na početnoj" },
  { name: "H1", size: "text-5xl", px: "48px", weight: "Bold (700)", usage: "Naslovi stranica" },
  { name: "H2", size: "text-3xl", px: "30px", weight: "Bold (700)", usage: "Naslovi sekcija" },
  { name: "H3", size: "text-xl", px: "20px", weight: "Semibold (600)", usage: "Podnaslovi, kartice" },
  { name: "H4", size: "text-lg", px: "18px", weight: "Semibold (600)", usage: "Nazivi stavki" },
  { name: "Body", size: "text-base", px: "16px", weight: "Regular (400)", usage: "Paragraf tekst" },
  { name: "Small", size: "text-sm", px: "14px", weight: "Medium (500)", usage: "Opisi, meta podaci" },
  { name: "Caption", size: "text-xs", px: "12px", weight: "Medium (500)", usage: "Badge-evi, labele" },
];

const breakpoints = [
  { name: "Mobile S", width: "320px", range: "< 640px", cols: "1", layout: "Vertikalni stack, full-width kartice, hamburger meni" },
  { name: "Mobile L", width: "640px (sm)", range: "640-767px", cols: "1-2", layout: "Dva grid kolone, veći fontovi, vidljivi badge-evi" },
  { name: "Tablet", width: "768px (md)", range: "768-1023px", cols: "2-3", layout: "Sidebar nestaje, 2-3 kolone, medium razmaci" },
  { name: "Desktop", width: "1024px (lg)", range: "1024-1279px", cols: "3-4", layout: "Sidebar vidljiv, 3-4 kolone, puni layout" },
  { name: "Desktop L", width: "1280px (xl)", range: "≥ 1280px", cols: "4-5", layout: "Max-width container, 4-5 kolona, svi elementi" },
];

const animationPatterns = [
  { name: "Fade In Up", props: "opacity 0→1, y 20→0", duration: "0.4-0.6s", trigger: "Scroll intersection", usage: "Kartice, naslovi, sekcije" },
  { name: "Scale In", props: "scale 0.9→1, opacity 0→1", duration: "0.3-0.5s", trigger: "Scroll intersection", usage: "Stat brojači, ikone" },
  { name: "Stagger", props: "Delay +0.05-0.15s po elementu", duration: "0.4s base", trigger: "Parent in view", usage: "Grid kartice, liste" },
  { name: "Marquee", props: "translateX -100%", duration: "20-30s linear", trigger: "Automatic infinite", usage: "Klijenti, usluge ticker" },
  { name: "Count Up", props: "0 → cilj sa easeOut", duration: "2-3s", trigger: "Scroll intersection", usage: "Statistički brojači" },
  { name: "Hover Lift", props: "translateY -4px, shadow-lg", duration: "0.3s ease", trigger: "Mouse enter", usage: "Kartice, dugmad, linkovi" },
  { name: "Accordion", props: "height 0→auto, opacity", duration: "0.35s easeInOut", trigger: "Click toggle", usage: "Padajući paneli, FAQ" },
  { name: "Float", props: "y ±10px, rotate ±5deg", duration: "5-7s infinite", trigger: "Automatic", usage: "Dekorativni elementi" },
];

const componentInventory = [
  { category: "Layout", items: ["Navbar", "Topbar", "Footer", "Container"], count: 4 },
  { category: "Hero", items: ["HeroSection", "FeatureCard"], count: 2 },
  { category: "Kartice", items: ["ProductCard", "MaterialCard", "NewsCard"], count: 3 },
  { category: "Sekcije", items: ["AboutPreview", "ClientsSection", "CTASection", "ProcessSection", "ProcessStepsSection", "PortfolioSection", "ServicesShowcase", "ServicesTicker", "StatsPODSection", "MaterialsSection", "NewsSection"], count: 11 },
  { category: "UI", items: ["Badge", "Button", "Card", "Container", "Gallery", "SectionTitle"], count: 6 },
];

const pageFeatures: Record<string, string[]> = {
  "/": ["Hero animacije", "Marquee scroll", "Animirani brojači", "Lazy loading", "CTA gradijent", "Kolaž slike", "Portfolio grid", "Certifikati"],
  "/about": ["Kolaž layout", "Stat brojači", "Certifikati", "Avatar stack", "Prednosti kartice", "Marquee klijenti"],
  "/contact": ["Form validacija", "Google Maps", "Info kartice", "Motivacijski citat", "Budžet select", "Tel/mailto linkovi"],
  "/products": ["Dark navy hero", "Quick stats pills", "Dark gradient headeri", "Preview tagovi", "Zašto nas", "Dark CTA"],
  "/products/brendiranje": ["Dark navy hero", "Quick stats pills", "Proizvod mreža", "Hover overlay", "Zašto nas", "Cross-promotion"],
  "/products/outdoor-indoor": ["Breadcrumb", "7 stavki grid", "Blur placeholders", "Hover scale", "Link na detalj"],
  "/materials": ["Dark navy hero", "Quick stats pills", "Dark gradient headeri", "Preview tagovi", "Zašto nas", "Dark CTA"],
  "/materials/uv-direktni-print": ["Dark navy hero", "Quick stats pills", "Hover overlay", "Zašto nas", "Cross-promotion", "Dark CTA"],
  "/materials/cnc": ["Dark navy hero", "Quick stats pills", "9 materijala", "Zašto nas", "Cross-promotion", "Dark CTA"],
  "/news": ["Featured članak", "Filteri", "Newsletter", "Sparkle dekor", "Paginacija", "Datum/autor meta"],
  "/instructions": ["Rezolucija kartice", "Download sekcija", "Format ikone", "Autogram upute", "CMYK objašnjenje", "Omjer kartice"],
  "/products/outdoor-indoor/billboard": ["Dark navy hero", "Slika kao hero pozadina", "USP kartice", "Proces izrade", "Galerija", "Cross-promotion"],
  "/materials/uv-direktni-print/drvo": ["Dark navy hero", "Slika kao hero pozadina", "6 feature kartica", "Proces izrade", "Galerija", "Cross-promotion"],
};

/* ───────────────────── Device Mockup Components ── */

/**
 * Search the iframe DOM for an element containing `findText`
 * and scroll it into view. Works identically on both desktop and mobile
 * regardless of layout differences.
 */
function scrollIframeToSection(win: Window, findText: string) {
  if (!findText) {
    // Empty findText = scroll to top (hero sections)
    win.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  const doc = win.document;
  const searchLower = findText.toLowerCase();

  /**
   * Find the best scroll target: prefer a nearby wrapper (direct parent
   * or grandparent) over the closest <section>, because detail pages
   * often have ONE large <section> wrapping all content blocks.
   */
  function scrollTarget(el: Element): Element {
    // Walk up max 3 levels looking for a meaningful block wrapper
    let target: Element = el;
    for (let i = 0; i < 3; i++) {
      const p = target.parentElement;
      if (!p) break;
      const tag = p.tagName.toLowerCase();
      // Stop before we reach the giant content section / main / body
      if (tag === "section" || tag === "main" || tag === "body") break;
      target = p;
    }
    return target;
  }

  // 1. Search headings first (most reliable)
  const headingTags = doc.querySelectorAll("h1, h2, h3, h4, h5, h6");
  for (const el of headingTags) {
    if (el.textContent?.toLowerCase().includes(searchLower)) {
      scrollTarget(el).scrollIntoView({ block: "start", behavior: "instant" });
      return;
    }
  }

  // 2. Search all elements with text content
  const allEls = doc.querySelectorAll("p, span, div, a, button, li, td, th, label");
  for (const el of allEls) {
    // Only match direct text (not deeply nested text) for precision
    const directText = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3)
      .map((n) => n.textContent)
      .join("");
    if (directText.toLowerCase().includes(searchLower)) {
      scrollTarget(el).scrollIntoView({ block: "start", behavior: "instant" });
      return;
    }
  }

  // 3. Last resort: search full textContent of any element
  const everything = doc.querySelectorAll("*");
  for (const el of everything) {
    if (el.textContent?.toLowerCase().includes(searchLower) && el.children.length < 5) {
      scrollTarget(el).scrollIntoView({ block: "start", behavior: "instant" });
      return;
    }
  }
}

/**
 * After programmatic scroll inside an iframe, Next.js <Image> lazy-loaded
 * images won't trigger their IntersectionObserver. This helper forces
 * every image to load eagerly.
 */
function forceIframeImages(win: Window) {
  try {
    const doc = win.document;
    doc.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.setAttribute("loading", "eager");
      const src = img.getAttribute("src");
      if (src) {
        img.setAttribute("src", "");
        img.setAttribute("src", src);
      }
    });
    doc.querySelectorAll("img[data-srcset], img[srcset]").forEach((img) => {
      img.setAttribute("loading", "eager");
    });
    win.dispatchEvent(new Event("scroll"));
    win.dispatchEvent(new Event("resize"));
  } catch {
    /* cross-origin – ignore */
  }
}

function DesktopMockup({
  src,
  findText,
  label,
}: {
  src: string;
  findText: string;
  label: string;
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.35);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (w > 0) setScale(w / 1920);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLIFrameElement>) => {
      try {
        const win = (e.target as HTMLIFrameElement).contentWindow;
        if (win) {
          setTimeout(() => {
            scrollIframeToSection(win, findText);
            setTimeout(() => forceIframeImages(win), 200);
            setTimeout(() => forceIframeImages(win), 1000);
          }, 600);
        }
      } catch {
        /* cross-origin fallback */
      }
    },
    [findText]
  );
  return (
    <div className="group relative">
      {/* Monitor frame */}
      <div className="bg-gray-800 rounded-xl p-1.5">
        {/* Toolbar dots */}
        <div className="flex items-center gap-1.5 px-2 pb-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          <div className="flex-1 mx-3">
            <div className="bg-gray-700 rounded-md px-3 py-0.5 text-[10px] text-gray-400 truncate text-center">
              bsc.ba{src}
            </div>
          </div>
        </div>
        {/* Screen — simulates 1920×1080 */}
        <div
          ref={screenRef}
          className="bg-white rounded-md overflow-hidden relative"
          style={{ aspectRatio: "16/9" }}
        >
          <iframe
            src={src}
            title={label}
            onLoad={handleLoad}
            className="absolute top-0 left-0 border-0"
            style={{
              width: "1920px",
              height: "1080px",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            loading="lazy"
          />
        </div>
      </div>
      {/* Monitor stand */}
      <div className="flex justify-center">
        <div className="w-24 h-4 bg-gray-700 rounded-b-lg" />
      </div>
      <div className="flex justify-center -mt-0.5">
        <div className="w-36 h-2 bg-gray-600 rounded-b-xl" />
      </div>
    </div>
  );
}

function MobileMockup({
  src,
  findText,
  label,
}: {
  src: string;
  findText: string;
  label: string;
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.31);

  useEffect(() => {
    const el = screenRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      if (w > 0) setScale(w / 560);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLIFrameElement>) => {
      try {
        const win = (e.target as HTMLIFrameElement).contentWindow;
        if (win) {
          setTimeout(() => {
            scrollIframeToSection(win, findText);
            setTimeout(() => forceIframeImages(win), 200);
            setTimeout(() => forceIframeImages(win), 1000);
          }, 800);
        }
      } catch {
        /* cross-origin fallback */
      }
    },
    [findText]
  );
  return (
    <div className="group relative inline-block">
      {/* Phone frame */}
      <div className="bg-gray-800 rounded-[2rem] p-2 w-[200px]">
        {/* Notch */}
        <div className="flex justify-center mb-1">
          <div className="w-20 h-4 bg-gray-900 rounded-b-xl flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gray-700" />
          </div>
        </div>
        {/* Screen — simulates 560×1147 */}
        <div
          ref={screenRef}
          className="bg-white rounded-[1.25rem] overflow-hidden relative"
          style={{ aspectRatio: "560/1147", width: "100%" }}
        >
          <iframe
            src={src}
            title={`${label} (mobile)`}
            onLoad={handleLoad}
            className="absolute top-0 left-0 border-0"
            style={{
              width: "560px",
              height: "1147px",
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            loading="lazy"
          />
        </div>
        {/* Home bar */}
        <div className="flex justify-center mt-1.5">
          <div className="w-24 h-1 bg-gray-600 rounded-full" />
        </div>
      </div>
    </div>
  );
}

/* ───────────────── Section Card with Mockups ── */

function SectionCard({
  section,
  route,
  color,
  sectionIndex,
}: {
  section: SectionInfo;
  route: string;
  color: string;
  sectionIndex: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: sectionIndex * 0.05, duration: 0.4 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
    >
      {/* Section header */}
      <div className="relative">
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${color} opacity-40 rounded-t-2xl`} />
        <div className="px-6 pt-6 pb-3">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}
            >
              {sectionIndex + 1}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-dark text-lg leading-tight">{section.name}</h4>
            </div>
            {sectionIndex === 0 && (
              <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider border border-amber-200">
                Hero
              </span>
            )}
            {section.name.toLowerCase().includes("cta") && (
              <span className="px-2.5 py-1 rounded-lg bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider border border-green-200">
                CTA
              </span>
            )}
            {(section.name.toLowerCase().includes("grid") || section.name.toLowerCase().includes("kategorije")) && (
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-200">
                Grid
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm leading-relaxed pl-12">
            {section.description}
          </p>
        </div>
      </div>

      {/* Mockups */}
      <div className="px-6 pb-6 pt-3">
        <div className="flex gap-5 items-end">
          {/* Desktop */}
          <div className="flex-1 min-w-0">
            <DesktopMockup
              src={route}
              findText={section.findText}
              label={section.name}
            />
          </div>
          {/* Mobile */}
          <div className="shrink-0">
            <MobileMockup
              src={route}
              findText={section.findText}
              label={section.name}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── Page Info Panel (inside accordion) ── */

function PageInfoPanel({ page }: { page: PageInfo }) {
  const features = pageFeatures[page.route] || [];
  const hasHero = page.sections.some(s => s.name.toLowerCase().includes("hero"));
  const hasCTA = page.sections.some(s => s.name.toLowerCase().includes("cta"));
  const hasGrid = page.sections.some(s => s.name.toLowerCase().includes("grid") || s.name.toLowerCase().includes("kategorije") || s.name.toLowerCase().includes("stavke"));
  const hasGallery = page.sections.some(s => s.name.toLowerCase().includes("galerija"));

  return (
    <div className="space-y-4">
      {/* Top row: Route, Structure, Mockups */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2.5">
            <Globe className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ruta</span>
          </div>
          <code className="text-sm font-mono text-dark bg-white px-2.5 py-1 rounded-lg border border-gray-200 inline-block shadow-sm">
            {page.route}
          </code>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2.5">
            <Layers className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sekcije</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-dark">{page.sections.length}</span>
            <span className="text-sm text-gray-500">sekcija</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2.5">
            <Monitor className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mockup-ovi</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-dark">{(page.sections.length + 1) * 2}</span>
            <span className="text-sm text-gray-500">desktop + mobile</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-100">
          <div className="flex items-center gap-2 mb-2.5">
            <Grid3X3 className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sadrži</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {hasHero && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200 font-semibold">Hero</span>}
            {hasCTA && <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 border border-green-200 font-semibold">CTA</span>}
            {hasGrid && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200 font-semibold">Grid</span>}
            {hasGallery && <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-200 font-semibold">Galerija</span>}
          </div>
        </div>
      </div>

      {/* Features row */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Funkcionalnosti & Tehnike</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {features.map((f, i) => (
            <span key={i} className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600 shadow-sm hover:border-primary/30 hover:text-primary transition-colors">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Page description expanded */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-2.5">
          <Info className="w-4 h-4 text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Opis Stranice</span>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{page.description}</p>
      </div>
    </div>
  );
}

/* ──────────────────────── Page Accordion ── */

function PageAccordion({ page }: { page: PageInfo }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-6 py-5 hover:bg-gray-50 transition-colors cursor-pointer text-left"
      >
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${page.color} flex items-center justify-center text-2xl shrink-0`}
        >
          {page.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-bold text-dark">{page.title}</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
              {page.route}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
              {page.sections.length} sekcij{page.sections.length === 1 ? "a" : "a"}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1 line-clamp-1">
            {page.description}
          </p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6 border-t border-gray-100 pt-6">
              {/* Page Info */}
              <PageInfoPanel page={page} />

              {/* Full page overview mockups */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Layout className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-600">
                    Pregled stranice — Desktop & Mobile
                  </span>
                </div>
                <div className="flex gap-5 items-end">
                  <div className="flex-1 min-w-0">
                    <DesktopMockup
                      src={page.route}
                      findText=""
                      label={page.title}
                    />
                  </div>
                  <div className="shrink-0">
                    <MobileMockup
                      src={page.route}
                      findText=""
                      label={page.title}
                    />
                  </div>
                </div>
              </div>

              {/* Individual sections */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Layers className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-semibold text-gray-600">
                    Sekcije ({page.sections.length})
                  </span>
                </div>
                <div className="space-y-5">
                  {page.sections.map((section, idx) => (
                    <SectionCard
                      key={idx}
                      section={section}
                      route={page.route}
                      color={page.color}
                      sectionIndex={idx}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ──────────────────────── Table of Contents ── */

function TableOfContents() {
  const totalSections = pages.reduce((acc, p) => acc + p.sections.length, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-[96px] overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-br from-dark to-[#1a1060] p-5">
        <h3 className="font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Sadržaj
        </h3>
        <p className="text-white/50 text-xs mt-1">Navigacija dokumentacije</p>
      </div>

      <div className="p-4">
        <nav className="space-y-0.5">
          {pages.map((page, i) => (
            <a
              key={i}
              href={`#page-${i}`}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-all group"
            >
              <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${page.color} flex items-center justify-center text-[10px] shrink-0`}>
                {page.icon}
              </div>
              <span className="flex-1 truncate font-medium">{page.title}</span>
              <span className="text-[10px] text-gray-300 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                {page.sections.length}
              </span>
            </a>
          ))}
        </nav>

        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Stranice</span>
            <span className="font-bold text-dark">{pages.length}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Sekcije</span>
            <span className="font-bold text-dark">{totalSections}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Mockup-ova</span>
            <span className="font-bold text-dark">{totalSections * 2 + pages.length * 2}</span>
          </div>

          {/* Visual distribution bar */}
          <div className="pt-2">
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden flex">
              {pages.map((page, i) => (
                <div
                  key={i}
                  className={`h-full bg-gradient-to-r ${page.color}`}
                  style={{ width: `${(page.sections.length / totalSections) * 100}%` }}
                  title={`${page.title}: ${page.sections.length} sekcija`}
                />
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5 text-center">
              Distribucija sekcija po stranicama
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────── Project Overview Section ── */

function ProjectOverview() {
  const totalSections = pages.reduce((acc, p) => acc + p.sections.length, 0);

  const stats = [
    { label: "Stranica", value: pages.length, icon: Layout, color: "from-blue-500 to-indigo-500" },
    { label: "Sekcija", value: totalSections, icon: Layers, color: "from-purple-500 to-pink-500" },
    { label: "Breakpointa", value: 5, icon: Monitor, color: "from-amber-500 to-orange-500" },
    { label: "Komponenti", value: 42, icon: Box, color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-gray-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Eye className="w-3.5 h-3.5" />
            Pregled Projekta
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
            Arhitektura & Brojevi
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Ključne metrike web aplikacije koje definišu obim, kvalitet i kompleksnost projekta.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-dark mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold text-dark">Tehnološki Stack</h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {techStack.map((tech, i) => (
              <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-2.5 h-2.5 rounded-full ${tech.color}`} />
                <span className="text-sm font-semibold text-dark">{tech.name}</span>
                <span className="text-xs text-gray-400 border-l border-gray-200 pl-2">{tech.category}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ────────── Design Principles Section ── */

function DesignPrinciplesSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50/50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Dizajn Principi
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
            Temelji Dizajn Sistema
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Četiri ključna principa koja vode svaku dizajnersku odluku u ovom projektu.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {designPrinciples.map((principle, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${principle.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                <principle.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-dark mb-2">{principle.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{principle.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ────────── Color Palette Section ── */

function ColorPaletteSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold mb-4">
            <Palette className="w-3.5 h-3.5" />
            Paleta Boja
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
            Vizualni Identitet
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Definisana paleta boja koja osigurava konzistentnost kroz cijelu aplikaciju.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {colorPalette.map((color, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div
                  className="h-20 sm:h-24 w-full transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="p-3">
                  <div className="font-semibold text-dark text-sm">{color.name}</div>
                  <div className="text-xs text-gray-400 font-mono mt-0.5">{color.hex}</div>
                  <div className="text-[11px] text-gray-500 mt-1.5 leading-snug">{color.usage}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ────────── Typography Scale Section ── */

function TypographySection() {
  return (
    <section className="py-16 md:py-20 bg-gray-50/50 border-t border-gray-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-semibold mb-4">
            <Type className="w-3.5 h-3.5" />
            Tipografija
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
            Tipografska Skala
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Definisane veličine teksta, težine i primjene kroz cijelu aplikaciju. Font familija: Inter (Google Fonts) — moderni sans-serif optimiziran za ekrane.
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            <div>Naziv</div>
            <div>Klasa</div>
            <div>Veličina</div>
            <div>Težina</div>
            <div>Primjena</div>
          </div>
          {typographyScale.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center"
            >
              <div className="font-bold text-dark">{t.name}</div>
              <div><code className="text-xs bg-gray-100 px-2 py-0.5 rounded-md text-primary font-mono">{t.size}</code></div>
              <div className="text-sm text-gray-500 font-mono">{t.px}</div>
              <div className="text-sm text-gray-500">{t.weight}</div>
              <div className="text-sm text-gray-500">{t.usage}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 grid sm:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Font Family</div>
            <div className="font-semibold text-dark">Inter</div>
            <div className="text-xs text-gray-400 mt-1">Google Fonts CDN, Variable Weight</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Line Height</div>
            <div className="font-semibold text-dark">1.5 - 1.75</div>
            <div className="text-xs text-gray-400 mt-1">leading-relaxed za paragraf tekst</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Letter Spacing</div>
            <div className="font-semibold text-dark">-0.025em — 0.2em</div>
            <div className="text-xs text-gray-400 mt-1">tracking-tight naslovi, tracking-widest badge-evi</div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ────────── Responsive Breakpoints Section ── */

function BreakpointsSection() {
  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-600 text-xs font-semibold mb-4">
            <Ruler className="w-3.5 h-3.5" />
            Responsive Dizajn
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
            Breakpointi & Prilagodbe
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Aplikacija koristi Tailwind CSS breakpointe sa mobile-first pristupom.
            Svaki breakpoint donosi prilagodbe layouta, fonta i broja kolona.
          </p>
        </motion.div>

        <div className="space-y-3">
          {breakpoints.map((bp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 sm:w-44 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-dark text-sm">{bp.name}</div>
                    <code className="text-[11px] text-gray-400 font-mono">{bp.width}</code>
                  </div>
                </div>
                <div className="flex-1 flex items-center gap-4 flex-wrap">
                  <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Raspon</span>
                    <span className="text-sm text-dark font-mono">{bp.range}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Kolone</span>
                    <span className="text-sm text-dark font-semibold">{bp.cols}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Layout</span>
                    <span className="text-sm text-gray-600">{bp.layout}</span>
                  </div>
                </div>
              </div>
              {/* Visual width indicator */}
              <div className="mt-3 pt-3 border-t border-gray-50">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(((parseInt(bp.width) || 320) / 1280) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ────────── Animation Patterns Section ── */

function AnimationPatternsSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50/50 to-white border-t border-gray-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-600 text-xs font-semibold mb-4">
            <Play className="w-3.5 h-3.5" />
            Animacije
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
            Animacijski Obrasci
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Svi animacijski obrasci korišteni u aplikaciji putem Framer Motion biblioteke i CSS keyframes.
            Konzistentni timing i easing osiguravaju ugodno korisničko iskustvo.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {animationPatterns.map((anim, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-dark text-sm mb-2">{anim.name}</h4>
              <div className="space-y-2 text-[12px]">
                <div className="flex items-start gap-1.5">
                  <span className="text-gray-400 font-semibold shrink-0 w-16">Svojstva:</span>
                  <code className="text-violet-600 bg-violet-50 px-1.5 py-0.5 rounded font-mono text-[11px]">{anim.props}</code>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-gray-400 font-semibold shrink-0 w-16">Trajanje:</span>
                  <span className="text-gray-600">{anim.duration}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-gray-400 font-semibold shrink-0 w-16">Trigger:</span>
                  <span className="text-gray-600">{anim.trigger}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-gray-400 font-semibold shrink-0 w-16">Primjena:</span>
                  <span className="text-gray-600">{anim.usage}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ────────── Component Architecture Section ── */

function ComponentArchitectureSection() {
  const totalComponents = componentInventory.reduce((acc, c) => acc + c.count, 0);

  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-600 text-xs font-semibold mb-4">
            <Component className="w-3.5 h-3.5" />
            Komponente
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
            Arhitektura Komponenti
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Modularna arhitektura sa {totalComponents} React komponenti organiziranih u 5 kategorija.
            Sve komponente su TypeScript-typed, reusable i konzistentno stilizirane.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {componentInventory.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 flex items-center justify-between">
                <span className="text-white font-bold text-sm">{cat.category}</span>
                <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cat.count}
                </span>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-gray-700 font-mono hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-colors cursor-default"
                    >
                      &lt;{item} /&gt;
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Folder structure */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-2xl border border-gray-100 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <SquareStack className="w-4 h-4 text-gray-500" />
            <h3 className="font-semibold text-dark">Struktura Direktorija</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <code className="text-xs font-mono text-primary font-semibold">components/layout/</code>
              <p className="text-[11px] text-gray-500 mt-1.5">Navbar, Topbar, Footer — globalni layout elementi koji se ponavljaju na svim stranicama</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <code className="text-xs font-mono text-primary font-semibold">components/sections/</code>
              <p className="text-[11px] text-gray-500 mt-1.5">12 sekcija — AboutPreview, ClientsSection, ProcessSection, ServicesShowcase, itd.</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <code className="text-xs font-mono text-primary font-semibold">components/cards/</code>
              <p className="text-[11px] text-gray-500 mt-1.5">ProductCard, MaterialCard, NewsCard — kartice za prikaz stavki u mreži</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <code className="text-xs font-mono text-primary font-semibold">components/ui/</code>
              <p className="text-[11px] text-gray-500 mt-1.5">Badge, Button, Card, Container, Gallery, SectionTitle — atomski UI primitivi</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ────────── Page Navigator Grid ── */

function PageNavigator() {
  return (
    <section className="py-12 md:py-16 bg-gray-50/50 border-b border-gray-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-600 text-xs font-semibold mb-4">
            <Navigation className="w-3.5 h-3.5" />
            Mapa Stranica
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-3">
            Navigacija Dokumentacije
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Brzi pregled svih dokumentiranih stranica. Kliknite za skok na detaljni prikaz.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {pages.map((page, i) => (
            <motion.a
              key={i}
              href={`#page-${i}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="group relative bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${page.color} opacity-50 group-hover:opacity-100 transition-opacity`} />
              <div className="text-2xl mb-2">{page.icon}</div>
              <div className="font-semibold text-dark text-sm mb-1 group-hover:text-primary transition-colors">{page.title}</div>
              <div className="text-[11px] text-gray-400 font-mono">{page.route}</div>
              <div className="flex items-center gap-1.5 mt-2.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: Math.min(page.sections.length, 8) }).map((_, j) => (
                    <div key={j} className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${page.color} opacity-40`} />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400">{page.sections.length} sek.</span>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ────────── Documentation Footer ── */

function DocumentationFooter() {
  const totalSections = pages.reduce((acc, p) => acc + p.sections.length, 0);
  const totalMockups = (totalSections + pages.length) * 2;
  const totalFeatures = Object.values(pageFeatures).reduce((acc, f) => acc + f.length, 0);
  const dynamicPages = pages.filter(p => p.route.includes("[")).length;
  const staticPages = pages.length - dynamicPages;

  const projectTimeline = [
    { phase: "Istraživanje & Planiranje", detail: "Analiza kompetencija, wireframing, informaciona arhitektura", status: "done" },
    { phase: "UI/UX Dizajn", detail: "High-fidelity dizajn, dizajn sistem, prototipiranje", status: "done" },
    { phase: "Frontend Razvoj", detail: "Next.js 15 implementacija, React 19, Tailwind v4", status: "done" },
    { phase: "Backend Integracija", detail: "Supabase, API rute, autentifikacija, CMS", status: "done" },
    { phase: "Testiranje & QA", detail: "Cross-browser, responsive, performance, accessibility", status: "done" },
    { phase: "Dokumentacija", detail: "Kompletna tehnička dokumentacija sa mockup-ovima i specifikacijama", status: "done" },
  ];

  const qualityMetrics = [
    { label: "Lighthouse Performance", value: "95+", icon: Zap },
    { label: "Accessibility Score", value: "98+", icon: Eye },
    { label: "Best Practices", value: "100", icon: Shield },
    { label: "SEO Score", value: "100", icon: Globe },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-dark via-[#1a1060] to-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <Container className="relative z-10">
        {/* Project timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/70 text-sm font-medium mb-4">
              <Navigation className="w-4 h-4 text-primary" />
              Projektne Faze
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Razvojni Životni Ciklus</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {projectTimeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:bg-white/[0.08] transition-colors group"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider font-bold">Faza {i + 1}</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.phase}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quality metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Kvalitativni Indikatori</h3>
            <p className="text-white/40 text-sm mt-2">Google Lighthouse ciljane metrike</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {qualityMetrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-5 text-center backdrop-blur-sm"
              >
                <m.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{m.value}</div>
                <div className="text-[11px] text-white/40">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/70 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            Kraj Dokumentacije
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Dokumentacija Kompletirana
          </h2>
          <p className="text-white/50 mb-6 leading-relaxed">
            Ovaj dokument sadrži kompletnu tehničku dokumentaciju BSC web aplikacije
            sa svim stranicama, sekcijama i interaktivnim mockup-ovima. Dokumentacija pokriva
            arhitekturu, dizajn sistem, tipografiju, responsive breakpoint-ove, animacijske pattern-e
            i inventar komponenti.
          </p>
          <p className="text-white/40 mb-10 text-sm leading-relaxed">
            Svaka stranica je dokumentovana sa desktop i mobilnim mockup-ovima koji prikazuju stvarni
            sadržaj aplikacije. Sekcije su grupisane po tipu (hero, sadržaj, grid, CTA, navigacija)
            sa detaljnim opisima implementacije i korištenih tehnika.
          </p>

          {/* Expanded stats grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-2xl mx-auto mb-10">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white mb-1">{pages.length}</div>
              <div className="text-[10px] text-white/40">Stranica</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white mb-1">{totalSections}</div>
              <div className="text-[10px] text-white/40">Sekcija</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white mb-1">{totalMockups}</div>
              <div className="text-[10px] text-white/40">Mockup-ova</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white mb-1">{totalFeatures}</div>
              <div className="text-[10px] text-white/40">Funkcija</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white mb-1">{staticPages}</div>
              <div className="text-[10px] text-white/40">Statičkih</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white mb-1">{dynamicPages}</div>
              <div className="text-[10px] text-white/40">Dinamičkih</div>
            </div>
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {techStack.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs backdrop-blur-sm">
                <Code2 className="w-3 h-3 text-primary" />
                {t.name}
              </span>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 space-y-2">
            <p className="text-white/40 text-sm font-semibold">
              BSC — Best Solution Company d.o.o. Sarajevo
            </p>
            <p className="text-white/20 text-xs">
              Web aplikacija razvijena u Next.js 15 · React 19 · Tailwind CSS v4 · Framer Motion · Supabase
            </p>
            <p className="text-white/15 text-[11px]">
              Dokumentacija generisana automatski · Svi mockup-ovi prikazuju živi sadržaj aplikacije
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ───────────────────────── Main Component ── */

export default function PdfShowcase() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark via-[#1a1060] to-dark -mt-[80px] pt-[120px] sm:pt-[160px] pb-20 sm:pb-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" />
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

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/80 text-sm font-medium mb-8"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Dokumentacija & UI Prezentacija</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Kompletna
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-400 to-secondary bg-clip-text text-transparent">
                UI Dokumentacija
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
              Kompletna tehnička dokumentacija svih stranica, sekcija i komponenti
              BSC web aplikacije — sa interaktivnim desktop i mobilnim mockup-ovima.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Layout className="w-4 h-4 text-primary" />
                <span className="font-bold text-white">{pages.length}</span>
                <span className="text-white/50 text-sm">stranica</span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Layers className="w-4 h-4 text-secondary" />
                <span className="font-bold text-white">
                  {pages.reduce((acc, p) => acc + p.sections.length, 0)}
                </span>
                <span className="text-white/50 text-sm">sekcija</span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Monitor className="w-4 h-4 text-emerald-400" />
                <span className="text-white/50 text-sm">Responsive</span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Smartphone className="w-4 h-4 text-pink-400" />
                <span className="text-white/50 text-sm">Mobile-first</span>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Istražite dokumentaciju</span>
              <ChevronDown className="w-5 h-5 text-white/30" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Documentation Sections */}
      <ProjectOverview />
      <DesignPrinciplesSection />
      <ColorPaletteSection />
      <TypographySection />
      <BreakpointsSection />
      <AnimationPatternsSection />
      <ComponentArchitectureSection />
      <PageNavigator />

      {/* ── Section-by-section presentation banner ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #42C6D9 0%, #1A1464 10%, #1A1464 90%, #E91E90 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <Container className="relative z-10 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
              Pregled svih stranica i sekcija
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
              U nastavku slijedi detaljna prezentacija svake stranice i njenih sekcija — sa desktop i mobilnim mockup-ovima, opisima i tehničkim detaljima.
            </p>

            {/* Scroll arrow */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mt-8"
            >
              <ChevronDown className="w-6 h-6 text-white/40 mx-auto" />
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 bg-gray-50/50">
        <Container>
          <div className="flex gap-8">
            {/* Sidebar TOC — hidden on mobile */}
            <div className="hidden lg:block w-64 shrink-0">
              <TableOfContents />
            </div>

            {/* Pages list */}
            <div className="flex-1 min-w-0 space-y-6">
              {pages.map((page, i) => (
                <div key={i} id={`page-${i}`} className="scroll-mt-24">
                  <PageAccordion page={page} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Documentation Footer */}
      <DocumentationFooter />
    </>
  );
}
