export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
}

export const articles: NewsArticle[] = [
  {
    slug: "eco-friendly-printing-materials",
    title: "Novi ekolo\u0161ki materijali za \u0161tampu",
    excerpt:
      "Sa zadovoljstvom predstavljamo novu liniju odr\u017eivih, ekolo\u0161kih materijala za \u0161tampu koji smanjuju utjecaj na okoli\u0161 bez kompromitiranja kvaliteta.",
    content: `Sa ponosom predstavljamo na\u0161u potpuno novu liniju ekolo\u0161kih materijala za \u0161tampu, dizajniranih da smanje utjecaj na okoli\u0161 uz odr\u017eavanje visokog kvaliteta koji na\u0161i klijenti o\u010dekuju.

Na\u0161i novi odr\u017eivi materijali uklju\u010duju reciklirani papir, biorazgradivi vinil i biljne tinte koje proizvode \u017eivopisne boje bez \u0161tetnih hemikalija. Ovi materijali su savr\u0161eni za firme koje \u017eele smanjiti svoj ekolo\u0161ki otisak bez \u017ertvovanja kvaliteta \u0161tampe.

## \u0160ta je novo?

- **Reciklirani papir** \u2014 Dostupan u raznim gramaturama i zavr\u0161nim obradama, na\u0161 reciklirani papir je napravljen od 100% post-potro\u0161a\u010dkog otpada i potpuno je reciklabilan.
- **Biorazgradivi vinil** \u2014 Na\u0161 novi vinil materijal se prirodno razgra\u0111uje tokom vremena, \u0161to ga \u010dini idealnim za privremenu signalizaciju i materijale za doga\u0111aje.
- **Biljne tinte** \u2014 Dobivene iz sojinog i biljnog ulja, ove tinte proizvode bogate, \u017eivopisne boje uz blago\u0111i utjecaj na okoli\u0161.

## Za\u0161to izabrati ekolo\u0161ke materijale?

Odr\u017eivost nije samo trend \u2014 to je odgovornost. Odabirom ekolo\u0161kih materijala za \u0161tampu, pozitivno utje\u010dete na okoli\u0161 dok istovremeno \u0161aljete sna\u017enu poruku va\u0161im klijentima o vrijednostima va\u0161eg brenda.

Kontaktirajte nas danas da saznate vi\u0161e o na\u0161im ekolo\u0161kim opcijama i kako mogu funkcionisati za va\u0161 sljede\u0107i projekat.`,
    imageUrl: "/news/eco.jpg",
    date: "20. feb 2026.",
    category: "Odr\u017eivost",
    author: "BSC Tim",
    readTime: "4 min \u010ditanja",
  },
  {
    slug: "custom-packaging-small-businesses",
    title: "Rje\u0161enja za brendiranje ambala\u017ee za mala preduze\u0107a",
    excerpt:
      "Otkrijte kako na\u0161e nove opcije brendiranja ambala\u017ee mogu pomo\u0107i va\u0161em malom preduze\u0107u da se istakne i ostavi trajni utisak na klijente.",
    content: `Na dana\u0161njem konkurentnom tr\u017ei\u0161tu, ambala\u017ea je vi\u0161e od obi\u010dne kutije \u2014 to je mo\u0107an alat za brendiranje. Sa zadovoljstvom nudimo nova rje\u0161enja za brendiranje ambala\u017ee dizajnirana posebno za mala preduze\u0107a.

## Istaknite se iz mase

Prvi utisak je va\u017ean, a va\u0161a ambala\u017ea je \u010desto prva fizi\u010dka interakcija koju klijent ima s va\u0161im brendom. Na\u0161e opcije vam omogu\u0107avaju da kreirate nezaboravno iskustvo koje odra\u017eava osobnost va\u0161eg brenda.

## Na\u0161e opcije

- **Brendirane kutije** \u2014 Birajte izme\u0111u raznih veli\u010dina, oblika i zavr\u0161nih obrada. Dodajte va\u0161 logo, boje brenda i poruku za potpuno personalizirano pakovanje.
- **Brendirani papir** \u2014 Umotajte va\u0161e proizvode u \u0161tampani papir koji dodaje dozu luksuza svakoj narud\u017ebi.
- **Naljepnice i etikete** \u2014 Zatvorite va\u0161a pakovanja s brendiranim naljepnicama ili dodajte etikete proizvoda koje poja\u010davaju identitet va\u0161eg brenda.
- **Brendirana traka** \u2014 \u010cak i va\u0161a traka za pakovanje mo\u017ee nositi poruku va\u0161eg brenda.

## Pristupa\u010dno za mala preduze\u0107a

Razumijemo da mala preduze\u0107a imaju ograni\u010den bud\u017eet. Zato smo dizajnirali na\u0161a rje\u0161enja da budu pristupa\u010dna, sa malim minimalnim narud\u017ebama i konkurentnim cijenama.

Zapo\u010dnite danas uz besplatnu konsultaciju!`,
    imageUrl: "/news/packaging.jpg",
    date: "15. feb 2026.",
    category: "Proizvodi",
    author: "BSC Tim",
    readTime: "5 min \u010ditanja",
  },
  {
    slug: "design-tips-perfect-print",
    title: "Savjeti za dizajn i savr\u0161en rezultat \u0161tampe",
    excerpt:
      "Nau\u010dite top savjete za dizajn i tehnike pripreme fajlova koje osiguravaju da va\u0161e \u0161tampe izgledaju ta\u010dno onako kako ste zamislili.",
    content: `Savr\u0161eni rezultati \u0161tampe po\u010dinju mnogo prije nego \u0161to va\u0161 fajl do\u0111e do \u0161tampa\u010da. Evo na\u0161ih top savjeta za dizajn koji osiguravaju da va\u0161e \u0161tampe izgledaju ta\u010dno onako kako ste zamislili.

## 1. Koristite CMYK re\u017eim boja

Uvijek dizajnirajte u CMYK re\u017eimu boja za projekte \u0161tampe. RGB je samo za ekrane \u2014 ako po\u0161aljete RGB fajl, boje se mogu promijeniti tokom procesa konverzije.

## 2. Postavite ispravnu rezoluciju

Za o\u0161tre, jasne otiske, va\u0161e slike trebaju biti najmanje 300 DPI (ta\u010daka po in\u010du) na kona\u010dnoj veli\u010dini \u0161tampe. Slike niske rezolucije \u0107e izgledati pikselizirano i mutno.

## 3. Uklju\u010dite podru\u010dje za napust (bleed)

Dodajte 3mm napusta na sve strane va\u0161eg dizajna. Ovo osigurava da kada se papir ore\u017ee, nema bijelih rubova na va\u0161im otiscima.

## 4. Konvertujte tekst u krivulje

Da izbjegnete probleme sa zamjenom fontova, uvijek konvertujte tekst u krivulje (outlines) prije slanja fajla. Ovo osigurava da va\u0161 tekst izgleda ta\u010dno onako kako je dizajniran.

## 5. Koristite bogatu crnu za velike povr\u0161ine

Umjesto \u010diste crne (K:100), koristite bogatu crnu (C:40 M:30 Y:30 K:100) za velike crne povr\u0161ine. Ovo proizvodi dublju, \u017eivopisniju crnu boju.

## 6. Probni otisak prije \u0161tampe

Uvijek zatra\u017eite probni otisak \u2014 digitalni ili fizi\u010dki \u2014 prije pu\u0161tanja pune narud\u017ebe u \u0161tampu. Ovo vam omogu\u0107ava da uhvatite eventualne probleme prije nego \u0161to bude kasno.

Pratite ove savjete i va\u0161e \u0161tampe \u0107e izgledati sjajno svaki put!`,
    imageUrl: "/news/design.jpg",
    date: "10. feb 2026.",
    category: "Savjeti",
    author: "BSC Tim",
    readTime: "6 min \u010ditanja",
  },
  {
    slug: "behind-the-scenes-printing-process",
    title: "Iza kulisa: Na\u0161 proces \u0161tampe",
    excerpt:
      "Pogledajte kako obra\u0111ujemo va\u0161e narud\u017ebe od po\u010detka do kraja, osiguravaju\u0107i da svaki otisak ispunjava na\u0161e visoke standarde kvaliteta.",
    content: `Jeste li se ikada pitali \u0161ta se de\u0161ava nakon \u0161to naru\u010dite? Dozvolite nam da vas provedemo iza kulisa na\u0161eg procesa \u0161tampe.

## Korak 1: Pregled fajla

Svaki fajl koji stigne prolazi kroz temeljit pregled od strane na\u0161eg tima za pretpress. Provjeravamo rezoluciju, re\u017eim boja, podru\u010dja za napust i ukupni integritet fajla. Ako uo\u010dimo bilo kakve probleme, kontaktirat \u0107emo vas prije nastavka.

## Korak 2: Probni otisak

Kada va\u0161 fajl pro\u0111e pregled, kreiramo digitalni probni otisak za va\u0161e odobrenje. Za projekte gdje je boja kriti\u010dna, mo\u017eemo proizvesti i fizi\u010dki probni otisak.

## Korak 3: \u0160tampa

S va\u0161im odobrenjem, va\u0161 posao ide u proizvodnju. Na\u0161e najmodernije digitalne ma\u0161ine proizvode \u017eivopisne, konzistentne rezultate na \u0161irokom spektru materijala.

## Korak 4: Dorada

Nakon \u0161tampe, va\u0161a narud\u017eba prolazi kroz doradu \u2014 koja mo\u017ee uklju\u010divati rezanje, savijanje, laminiranje, uvezivanje ili bilo koji drugi post-press proces koji va\u0161 projekat zahtijeva.

## Korak 5: Kontrola kvaliteta

Prije pakovanja, svaka narud\u017eba prolazi kroz zavr\u0161nu kontrolu kvaliteta. Provjeravamo ta\u010dnost boja, registar i eventualne nedostatke kako bismo osigurali da dobijete savr\u0161en proizvod.

## Korak 6: Dostava

Va\u0161a narud\u017eba se pa\u017eljivo pakuje kako bi se sprije\u010dila o\u0161te\u0107enja tokom transporta i \u0161alje putem odabranog na\u010dina dostave.

Ponosni smo na svaki korak ovog procesa jer znamo koliko su va\u0161e \u0161tampe va\u017ene za vas.`,
    imageUrl: "/news/process.jpg",
    date: "5. feb 2026.",
    category: "Kompanija",
    author: "BSC Tim",
    readTime: "5 min \u010ditanja",
  },
  {
    slug: "top-sticker-trends-2026",
    title: "Top 5 trendova u naljepnicama za 2026.",
    excerpt:
      "Od holografskih zavr\u0161nih obrada do prilago\u0111enih oblika \u2014 otkrijte najaktuelnije trendove u naljepnicama koji osvajaju tr\u017ei\u0161te.",
    content: `Naljepnice i dalje ostaju jedan od najsvestranijih i najpopularnijih proizvoda za \u0161tampu. Evo top 5 trendova u naljepnicama koje vidimo u 2026.

## 1. Holografske zavr\u0161ne obrade

Holografske naljepnice hvataju svjetlost i stvaraju fascinantan efekat duge. Savr\u0161ene su za etikete proizvoda, brendiranje i dekorativne svrhe.

## 2. Prilago\u0111eni oblici (die-cut)

Iza\u0111ite izvan krugova i pravougaonika \u2014 naljepnice prilago\u0111enih oblika koji odgovaraju va\u0161em dizajnu su izuzetno popularne.

## 3. Prozirne naljepnice

Prozirne naljepnice sa \u0161tampanim dizajnom stvaraju elegantan izgled koji je moderan i profinjen. Posebno su popularne za ambala\u017eu proizvoda i boce s vodom.

## 4. Teksturirani materijali

Od mat zavr\u0161ne obrade do kraft papira i soft-touch laminacije, teksturirane naljepnice dodaju taktilnu dimenziju koja \u010dini va\u0161e naljepnice posebnim.

## 5. Mini paketi naljepnica

Brendovi kreiraju tematske mini pakete naljepnica kao promotivne artikle i merchandise. Pristupa\u010dni su za proizvodnju, a klijenti ih obo\u017eavaju.

Spremni da pratite trendove? Kontaktirajte nas za ponudu!`,
    imageUrl: "/news/trends.jpg",
    date: "28. jan 2026.",
    category: "Trendovi",
    author: "BSC Tim",
    readTime: "4 min \u010ditanja",
  },
  {
    slug: "choosing-right-material",
    title: "Kako odabrati pravi materijal za va\u0161 projekat",
    excerpt:
      "Sveobuhvatan vodi\u010d za odabir savr\u0161enog materijala za \u0161tampu na osnovu potreba va\u0161eg projekta, bud\u017eeta i namjene.",
    content: `Odabir pravog materijala mo\u017ee napraviti ili pokvariti va\u0161 projekat \u0161tampe. Evo na\u0161eg sveobuhvatnog vodi\u010da koji \u0107e vam pomo\u0107i da donesete najbolju odluku.

## Razmotrite namjenu

Prvo pitanje koje trebate postaviti je: koja je namjena va\u0161e \u0161tampe? Unutra\u0161nja ili vanjska upotreba? Privremena ili trajna? Odgovori \u0107e zna\u010dajno suziti va\u0161e opcije materijala.

## Opcije papira

- **Nepremazani papir** \u2014 Prirodan osje\u0107aj, odli\u010dan za vizit karte i memorandume.
- **Premazani sjajni** \u2014 Sjajna zavr\u0161na obrada, \u017eivopisne boje, idealan za letke i bro\u0161ure.
- **Premazani mat** \u2014 Glatka, nereflektiraju\u0107a zavr\u0161na obrada za premium izgled.
- **Reciklirani papir** \u2014 Ekolo\u0161ka opcija sa jedinstvenom teksturom.

## Vinil i specijalni materijali

- **Samoljepljivi vinil** \u2014 Savr\u0161en za naljepnice, etikete i brendiranje vozila.
- **Canvas** \u2014 Idealan za umjetni\u010dke reprodukcije i zidni dekor.
- **Tekstil** \u2014 Odli\u010dan za bannere, zastave i odje\u0107u.
- **Akril/Metal** \u2014 Premium materijali za signalizaciju i displeje.

## Gramatura je va\u017ena

Gramatura papira utje\u010de na trajnost i do\u017eivljaj. Lak\u0161e gramature (80-120gsm) su pogodne za letke, dok su te\u017ee gramature (250-400gsm) bolje za vizit karte i razglednice.

## Bud\u017eet

Kvalitetniji materijali ko\u0161taju vi\u0161e, ali tako\u0111er stvaraju bolji utisak. Balansirajte bud\u017eet sa utjecajem koji \u017eelite posti\u0107i.

Jo\u0161 niste sigurni? Na\u0161 tim je spreman da vam pru\u017ei uzorke materijala i preporuke za va\u0161 specifi\u010dan projekat.`,
    imageUrl: "/news/material-guide.jpg",
    date: "20. jan 2026.",
    category: "Vodi\u010d",
    author: "BSC Tim",
    readTime: "6 min \u010ditanja",
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((a) => a.slug);
}
