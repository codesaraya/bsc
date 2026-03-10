export interface MaterialItem {
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface MaterialCategory {
  title: string;
  slug: string;
  description: string;
  color: string; // tailwind gradient classes
  items: MaterialItem[];
}

export const categories: MaterialCategory[] = [
  {
    title: "UV / Ecosolvent / Latex",
    slug: "uv-ecosolvent-latex",
    description:
      "Profesionalni UV, ecosolvent i latex printevi na širokom spektru materijala — od naljepnica i bannera do tapeta i poster papira.",
    color: "from-cyan-500 to-blue-600",
    items: [
      {
        name: "PVC Naljepnice",
        slug: "pvc-naljepnice",
        image: "/Materials/PVC%20Naljepnice/pvc%20naljepnice.jpg",
        description:
          "Visokokvalitetne PVC naljepnice za unutrašnju i vanjsku upotrebu. Otporne na UV zračenje, vodu i habanje, idealne za brendiranje, označavanje i dekoraciju.",
      },
      {
        name: "One Way Vision",
        slug: "one-way-vision",
        image: "/Materials/One%20Way%20Vision/one%20way%20vision1.jpg",
        description:
          "Perforirana folija koja omogućava jednosmjernu vidljivost — savršena za izloge i stakla vozila. Pruža privatnost iznutra dok se spolja prikazuje grafika.",
      },
      {
        name: "Back Light",
        slug: "back-light",
        image: "/Materials/Back%20Light/back%20light.jpg",
        description:
          "Translucenti materijal za pozadinsko osvjetljenje. Idealan za light box-ove, reklamne panele i sve primjene gdje je potrebno ravnomjerno rasprostiranje svjetlosti.",
      },
      {
        name: "Banner / Textilni Banner / Flag",
        slug: "banner-textilni-banner-flag",
        image: "/Materials/Banner%20%20Textilni%20Banner%20%20Flag/banner%20%20textilni%20banner%20%20flag.jpg",
        description:
          "Širok izbor banner materijala uključujući PVC bannere, tekstilne bannere i zastave. Savršeni za događaje, promocije i outdoor oglašavanje.",
      },
      {
        name: "Cerade / Kamionske",
        slug: "cerade-kamionske",
        image: "/Materials/Cerade%20Kamionske/cerade%20kamionske1.jpg",
        description:
          "Izdržljive cerade i kamionske cerade visokog kvaliteta. Otporne na sve vremenske uslove, UV zračenje i mehaničke udare.",
      },
      {
        name: "Canvas",
        slug: "canvas",
        image: "/Materials/Canvas/canvas.jpg",
        description:
          "Premium canvas materijal za umjetničke reprodukcije, foto printove i dekorativne zidne slike. Pruža teksturu i toplinu tradicionalnog platna.",
      },
      {
        name: "Tapete",
        slug: "tapete",
        image: "/Materials/Tapete/tapete.jpg",
        description:
          "Personalizirane tapete s prilagođenim dizajnom za poslovne i stambene prostore. Jednostavna primjena i dugotrajnost boja.",
      },
      {
        name: "Podna Grafika",
        slug: "podna-grafika",
        image: "/Materials/Podna%20Grafika/podna%20grafika.jpg",
        description:
          "Specijalizovana grafika za podove sa anti-kliznom površinom. Idealna za navigaciju, brendiranje i promotivne kampanje u maloprodajnim prostorima.",
      },
      {
        name: "Poster Papir",
        slug: "poster-papir",
        image: "/Materials/Poster%20Papir/poster%20papir.jpg",
        description:
          "Visokokvalitetni poster papir za unutrašnje plakate, reklamne materijale i prezentacije. Dostupan u različitim gramaturama i završnim obradama.",
      },
    ],
  },
  {
    title: "UV Direktni Print",
    slug: "uv-direktni-print",
    description:
      "Direktan UV print na razne podloge — staklo, drvo, forex, plexiglass, metal i mnoge druge površine.",
    color: "from-purple-500 to-indigo-600",
    items: [
      {
        name: "Staklo",
        slug: "staklo",
        image: "/Materials/Staklo/staklo.jpg",
        description:
          "Direktan UV print na staklo — idealan za dekorativne panele, pregradne zidove, staklene fasade i umjetničke instalacije.",
      },
      {
        name: "Drvo",
        slug: "drvo",
        image: "/Materials/Drvo/Drvo.jpg",
        description:
          "UV print direktno na drvene površine — savršen za natpise, dekorativne panele, namještaj i unikatne drvene proizvode.",
      },
      {
        name: "Forex",
        slug: "forex",
        image: "/Materials/Forex/forex.jpg",
        description:
          "Print na forex PVC ploče — lagane, izdržljive i idealne za unutrašnje i vanjske znakove, displeje i dekoracije.",
      },
      {
        name: "Plexiglass",
        slug: "plexiglass",
        image: "/Materials/Plexiglass/plexiglass.jpg",
        description:
          "UV print na plexiglass za elegantne znakove, displeje i dekorativne elemente. Pruža profesionalan i moderan izgled.",
      },
      {
        name: "Kapaline",
        slug: "kapaline",
        image: "/Materials/Kapaline/kapaline.jpg",
        description:
          "Print na kapaline (pjenaste PVC ploče) — lagane i versatilne, idealne za signalizaciju i dekorativne primjene.",
      },
      {
        name: "Alu Bond",
        slug: "alu-bond",
        image: "/Materials/Alu%20Bond/alu%20bond.jpg",
        description:
          "Print na alu bond kompozitne ploče — izuzetno izdržljive i otporne na vremenske uslove, idealne za fasadne ploče i znakove.",
      },
      {
        name: "MDF",
        slug: "mdf",
        image: "/Materials/MDF/mdf.jpg",
        description:
          "UV print na MDF (medium-density fibreboard) — savršen za namještaj, dekorativne panele i unutrašnje uređenje.",
      },
    ],
  },
  {
    title: "CNC",
    slug: "cnc",
    description:
      "Precizno CNC rezanje i obrada materijala — MDF, iverica, šperploča, aluminij, plexiglass i plastični karton.",
    color: "from-emerald-500 to-teal-600",
    items: [
      {
        name: "MDF",
        slug: "mdf",
        image: "/Materials/MDF/mdf1.jpg",
        description:
          "Precizno CNC rezanje MDF ploča za namještaj, dekorativne elemente, prototipove i razne konstruktivne primjene.",
      },
      {
        name: "Iverica",
        slug: "iverica",
        image: "/Materials/Iverica/iverica.jpg",
        description:
          "CNC obrada iverice za namještaj, pregradne zidove i razne konstruktivne elemente. Precizno rezanje i profilisanje.",
      },
      {
        name: "Špera",
        slug: "spera",
        image: "/Materials/%C5%A0pera/%C5%A1pera.jpg",
        description:
          "CNC rezanje i obrada šperploče za namještaj, podove, zidne obloge i razne drvene konstrukcije.",
      },
      {
        name: "Aluminij",
        slug: "aluminij",
        image: "/Materials/Aluminijum/aluminijum1.png",
        description:
          "Precizno CNC rezanje i graviranje aluminija za industrijske dijelove, znakove, dekorativne elemente i precizne komponente.",
      },
      {
        name: "Forex / Plastika",
        slug: "forex-plastika",
        image: "/Materials/Forex/forex1.jpg",
        description:
          "CNC rezanje forex i plastičnih materijala za signalizaciju, displeje i razne industrijske primjene.",
      },
      {
        name: "Plexiglass",
        slug: "plexiglass",
        image: "/Materials/Plexiglass/plexiglass1.jpg",
        description:
          "CNC rezanje i graviranje plexiglassa za svjetleće znakove, displeje, vitrine i dekorativne elemente.",
      },
      {
        name: "Medijapan",
        slug: "medijapan",
        image: "/Materials/Medijapan/medijapan.png",
        description:
          "CNC obrada medijapana za dekorativne panele, namještaj, zidne obloge i razne konstruktivne elemente.",
      },
      {
        name: "Drvo",
        slug: "drvo",
        image: "/Materials/Drvo/Drvo1.jpg",
        description:
          "Precizno CNC rezanje i graviranje drveta za namještaj, dekorativne elemente, natpise i umjetničke radove.",
      },
      {
        name: "Plastični Karton / Akyplac",
        slug: "plasticni-karton-akyplac",
        image: "/Materials/Plasti%C4%8Dni%20Karton%20Akyplac/plasti%C4%8Dni%20karton%20akyplac.jpg",
        description:
          "CNC rezanje plastičnog kartona i Akyplac materijala za signalizaciju, displeje i lagane konstruktivne elemente.",
      },
    ],
  },
  {
    title: "Laser",
    slug: "laser",
    description:
      "Lasersko graviranje i rezanje materijala — kapafix, plexiglass, koža, papir, karton, šperploča i drvo.",
    color: "from-rose-500 to-pink-600",
    items: [
      {
        name: "Kapafix",
        slug: "kapafix",
        image: "/Materials/Kapafix/kapafix.jpg",
        description:
          "Lasersko rezanje Kapafix materijala — idealno za displeje, modele, prezentacije i dekorativne elemente. Precizno i čisto rezanje.",
      },
      {
        name: "Plexiglass",
        slug: "plexiglass",
        image: "/Materials/Plexiglass/plexiglass1.jpg",
        description:
          "Lasersko rezanje i graviranje plexiglassa za precizne znakove, displeje, nakit i dekorativne elemente.",
      },
      {
        name: "Koža",
        slug: "koza",
        image: "/Materials/Ko%C5%BEa/ko%C5%BEa.jpg",
        description:
          "Lasersko graviranje i rezanje kože za personalizirane proizvode, modne dodatke, torbice i unikatne dizajne.",
      },
      {
        name: "Papir / Karton",
        slug: "papir-karton",
        image: "/Materials/Karton/karton.jpg",
        description:
          "Lasersko rezanje papira i kartona za pozivnice, ambalažu, dekorativne elemente i precizne papirne proizvode.",
      },
      {
        name: "Špera / Drvo",
        slug: "spera-drvo",
        image: "/Materials/%C5%A0pera/%C5%A1pera.jpg",
        description:
          "Lasersko rezanje i graviranje šperploče i drveta za dekorativne elemente, poklone, natpise i umjetničke radove.",
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): MaterialCategory | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return categories.map((c) => c.slug);
}

export function getMaterialItem(
  categorySlug: string,
  itemSlug: string
): { category: MaterialCategory; item: MaterialItem } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const item = category.items.find((i) => i.slug === itemSlug);
  if (!item) return undefined;
  return { category, item };
}

export function getAllMaterialItemParams(): { slug: string; item: string }[] {
  return categories.flatMap((cat) =>
    cat.items.map((i) => ({ slug: cat.slug, item: i.slug }))
  );
}
