export interface ProductItem {
  name: string;
  slug: string;
  description: string;
  image?: string;
}

export interface ProductCategory {
  title: string;
  slug: string;
  description: string;
  color: string;
  items: ProductItem[];
}

export const productCategories: ProductCategory[] = [
  {
    title: "Brendiranje",
    slug: "brendiranje",
    description:
      "Kompletno brendiranje poslovnih prostora, vozila, predmeta i stajališta — od dizajna do implementacije.",
    color: "from-violet-500 to-purple-700",
    items: [
      { name: "Poslovnih / Stambenih Prostora", slug: "poslovnih-stambenih-prostora", description: "Profesionalno brendiranje poslovnih i stambenih prostora — fasade, enterijeri, recepcije, izlozi i navigacijski sistemi.", image: "/Products/Brendiranje%20Poslovnih%20Prostora/Brendiranje%20poslovnih%20prostora.jpg" },
      { name: "Vozila", slug: "vozila", description: "Kompletno brendiranje vozila — auto folije, oslikavanje, magnetne table i fleet branding za vaš vozni park.", image: "/Products/Brandiranje%20Vozila/brandiranje%20vozila.jpg" },
      { name: "Predmeta", slug: "predmeta", description: "Brendiranje raznih predmeta — šolje, olovke, USB-ovi, majice i drugi promotivni artikli sa vašim logom.", image: "/Products/Brendiranje%20Predmeta/Brendiranje%20predmeta.jpg" },
      { name: "Stajališta", slug: "stajalista", description: "Brendiranje stajališta i javnih površina — citylighti, panoi, totemi i informativne table.", image: "/Products/Brendiranje%20Stajali%C5%A1ta/brendiranje%20stajali%C5%A1ta.jpg" },
    ],
  },
  {
    title: "Outdoor i Indoor",
    slug: "outdoor-indoor",
    description:
      "Reklamni materijali za vanjske i unutrašnje prostore — od wallscape i billboard reklama do city light i svijetlećih reklama.",
    color: "from-amber-500 to-orange-600",
    items: [
      { name: "Wallscape", slug: "wallscape", description: "Velikoformatne reklamne površine na fasadama zgrada — maksimalna vidljivost vašeg brenda u urbanom okruženju.", image: "/Products/Wallscape/wallscape.jpg" },
      { name: "Billboard", slug: "billboard", description: "Klasični i digitalni billboardi za maksimalni doseg — reklamne poruke koje se ne mogu zaobići.", image: "/Products/Bilbord/bilbord.jpg" },
      { name: "Banneri", slug: "banneri", description: "Banneri za unutrašnju i vanjsku upotrebu — vinilni, tekstilni i mesh banneri u svim dimenzijama.", image: "/Products/Banneri/banneri.jpg" },
      { name: "Cerade / Kamionske", slug: "cerade-kamionske", description: "Ceradne reklame za kamione i prikolice — mobilna reklamna površina koja putuje sa vašim vozilima.", image: "/Products/Cerade%20Kamionske/cerade%20kamionske1.jpg" },
      { name: "Mesh", slug: "mesh", description: "Perforirani mesh banneri za fasade i ograde — propuštaju vjetar a zadržavaju vizualni efekat.", image: "/Products/Mesh/mesh.jpg" },
      { name: "City Light", slug: "city-light", description: "Osvjetljeni reklamni panoi na frekventnim lokacijama — elegantna reklama vidljiva danju i noću.", image: "/Products/City%20Light/city%20light.jpg" },
      { name: "Svijetleće Reklame", slug: "svijetlece-reklame", description: "LED i neonske svijetleće reklame — 3D slova, lightbox elementi i svjetlosni panoi za maksimalan efekat.", image: "/Products/Svijetle%C4%87a%20Reklama/svijetle%C4%87a%20reklama.png" },
    ],
  },
  {
    title: "Home and Office",
    slug: "home-and-office",
    description:
      "Dekorativni i funkcionalni printevi za dom i ured — od wall art-a i 3D zidnih panela do display rješenja.",
    color: "from-teal-500 to-cyan-600",
    items: [
      { name: "Home Dekor / Assesoar", slug: "home-dekor-assesoar", description: "Dekorativni elementi za dom — printovi na platnu, foto tapete, personalizirani predmeti i unikatni dekorativni komadi.", image: "/Products/Home%20Dekor/home%20dekor.jpg" },
      { name: "Wall Art", slug: "wall-art", description: "Umjetnički printovi za zidove — canvas printovi, postere, acrylic print i aluminij printovi za moderan izgled.", image: "/Products/Wall%20Art/wall%20art.jpg" },
      { name: "3D Zidni Paneli", slug: "3d-zidni-paneli", description: "Dekorativni 3D zidni paneli koji dodaju dubinu i teksturu vašim prostorima — savršeni za ured, hotel ili dom.", image: "/Products/3D%20zidni%20paneli/3dzidni.jpg" },
      { name: "Pregrade", slug: "pregrade", description: "Pregradni sistemi za ured i poslovne prostore — akustične pregrade, staklo sa printom i paravani.", image: "/Products/Pregrade/pregrade.jpg" },
      { name: "Informativne Oznake", slug: "informativne-oznake", description: "Informativne i navigacijske oznake za poslovne prostore — smjerokazi, table sa imenima, sigurnosne oznake.", image: "/Products/Informativne%20Oznake/informativne%20oznake.jpg" },
      { name: "Info Display", slug: "info-display", description: "Informativni display sistemi — stalci za brošure, posterframes, klip ramovi i rotacijski displayi.", image: "/Products/Info%20Display/info%20display.jpg" },
      { name: "Kancelarijski Materijal", slug: "kancelarijski-materijal", description: "Brendirani kancelarijski materijal — blokovi, fascikle, koverte, vizit karte i memorandum.", image: "/Products/Kancelarijski%20Materijali/kancelarijski%20materijali.jpg" },
    ],
  },
  {
    title: "Promo / POS",
    slug: "promo-pos",
    description:
      "Promotivni materijali i POS rješenja — štandovi, pleksiglas elementi, sajamski štandovi i vobleri.",
    color: "from-rose-500 to-red-600",
    items: [
      { name: "Štandovi", slug: "standovi", description: "Promotivni štandovi za sajmove i evente — pop-up, roll-up i modularne konstrukcije po mjeri.", image: "/Products/%C5%A0tandovi/%C5%A1tandovi.jpg" },
      { name: "Plex Stalaže", slug: "plex", description: "Plexiglass elementi — stalci, displaji, držači, kutije i razni dekorativni elementi od plexiglasa.", image: "/Products/Plex%20Stala%C5%BEe/plex%20stalaze.jpg" },
      { name: "Sajamski Elementi", slug: "sajamski-elementi", description: "Kompletna oprema za sajmove — štandovi, banneri, stolovi, prospekt stalci i podne grafike.", image: "/Products/Sajamski%20Elementi/sajamski%20elementi.jpg" },
      { name: "Vobleri / Table Tent", slug: "vobleri-table-tent", description: "POS materijali za prodajna mjesta — vobleri, table tent kartice, šelf talkeri i wobler stalci.", image: "/Products/Vobleri%20Table%20Tent/vobleri%20table%20tent.jpg" },
      { name: "Senzormatici", slug: "senzormatici", description: "Automatski dezinfekcioni i info uređaji sa brendiranjem — senzormatici i interaktivni POS elementi.", image: "/Products/Senzormatici/senzormatici.jpg" },
      { name: "Showcard", slug: "showcard", description: "Kartonski showcardi za promotivne akcije — stalci za proizvode, cjenovnici i POS elementi od kvalitetnog kartona.", image: "/Products/Showcard/showcard.jpg" },
    ],
  },
];

export function getProductCategoryBySlug(
  slug: string
): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return productCategories.map((c) => c.slug);
}

export function getProductItem(
  categorySlug: string,
  itemSlug: string
): { category: ProductCategory; item: ProductItem } | undefined {
  const category = getProductCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const item = category.items.find((i) => i.slug === itemSlug);
  if (!item) return undefined;
  return { category, item };
}

export function getAllProductItemParams(): { slug: string; item: string }[] {
  const params: { slug: string; item: string }[] = [];
  for (const cat of productCategories) {
    for (const item of cat.items) {
      params.push({ slug: cat.slug, item: item.slug });
    }
  }
  return params;
}
