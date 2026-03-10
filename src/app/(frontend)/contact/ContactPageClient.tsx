"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send, Clock, Printer, User, MessageSquare, Wallet, ChevronDown, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface FormData {
  name: string;
  telephone: string;
  email: string;
  budget: string;
  project: string;
}

const defaultContactInfo = [
  {
    icon: MapPin,
    title: "Naša adresa",
    value: "Vrbanja 1, 71000 Sarajevo, Bosna i Hercegovina",
    href: "https://maps.google.com/?q=Vrbanja+1+71000+Sarajevo",
  },
  {
    icon: Phone,
    title: "Pozovite nas",
    lines: [
      { label: "Telefon", value: "+387 33 571 111", href: "tel:+38733571111" },
      { label: "Fax", value: "+387 33 571 111", href: "tel:+38733571111" },
    ],
  },
  {
    icon: Mail,
    title: "Email",
    value: "bscsarajevo@gmail.com",
    href: "mailto:bscsarajevo@gmail.com",
  },
  {
    icon: Clock,
    title: "Radno vrijeme",
    lines: [
      { label: "BBI", value: "Pon-Sub 09:00-22:00 | Ned 10:00-18:00" },
      { label: "SCC", value: "10:00-22:00" },
      { label: "Budakovići", value: "Pon-Pet 08:00-17:00 | Sub 09:00-17:00" },
    ],
  },
];

const defaultBudgetOptions = [
  "Odaberite raspon budžeta",
  "Do 500 KM",
  "500 - 1.500 KM",
  "1.500 - 5.000 KM",
  "5.000 - 15.000 KM",
  "15.000+ KM",
];

const contactIconMap: Record<string, any> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
};

interface ContactPageClientProps {
  data: any;
}

export default function ContactPageClient({ data }: ContactPageClientProps) {
  const d: any = data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    console.log("Form submitted:", formData);
    alert(d?.form?.successMessage || "Hvala na vašoj poruci! Javit ćemo vam se uskoro.");
  };

  // Build contact info from Payload data or use defaults
  const contactInfo =
    d?.contactCards?.length > 0
      ? d.contactCards.map((card: any) => {
          const Icon = contactIconMap[card.type] || MapPin;
          // For phone and hours, try to parse lines from the value (newline separated)
          if (card.type === "phone" || card.type === "hours") {
            const rawLines = card.value
              ?.split("\n")
              .filter((l: string) => l.trim());
            const lines = rawLines?.map((line: string) => {
              const parts = line.split(":");
              if (parts.length >= 2) {
                const label = parts[0].trim();
                const val = parts.slice(1).join(":").trim();
                const result: any = { label, value: val };
                if (card.type === "phone" && val.match(/\+?\d/)) {
                  result.href = `tel:${val.replace(/\s/g, "")}`;
                }
                return result;
              }
              return { label: "", value: line.trim() };
            });
            return { icon: Icon, title: card.title, lines };
          }
          // For address and email
          const result: any = { icon: Icon, title: card.title, value: card.value };
          if (card.type === "email") {
            result.href = `mailto:${card.value}`;
          } else if (card.type === "address") {
            result.href = `https://maps.google.com/?q=${encodeURIComponent(card.value)}`;
          }
          return result;
        })
      : defaultContactInfo;

  const budgetOptions =
    d?.budgetOptions?.length > 0
      ? [
          d?.form?.budgetLabel || "Odaberite raspon budžeta",
          ...d.budgetOptions.map((b: any) => b.label),
        ]
      : defaultBudgetOptions;

  const equipmentList =
    d?.equipment?.length > 0
      ? d.equipment.map((e: any) => e.name).join(", ")
      : "SEIKO, DILLI, MUTOH, SUMA, SISER, XEROX, CANON, HP";

  const mapUrl =
    d?.mapUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.5!2d18.413!3d43.856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVnJiYW5qYSAxLCA3MTAwMCBTYXJhamV2bw!5e0!3m2!1sbs!2sba!4v1700000000000";

  return (
    <>
      {/* Mini Hero */}
      <section className="bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 -mt-[80px] pt-[120px] sm:pt-[160px] pb-12 sm:pb-20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-pink-300 rounded-full blur-3xl opacity-30" />
        <Container className="relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block bg-primary text-white text-sm font-semibold tracking-wide px-6 py-2.5 rounded-full mb-6"
          >
            {d?.heroBadge || "Želimo surađivati s vama"}
          </motion.span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-dark">
            {d?.heroHeading || "Kako vam možemo pomoći"}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {d?.heroDescription ||
              "Best Solution Company je specijalizirana štamparija opremljena modernim digitalnim mašinama kao što su SEIKO, DILLI, MUTOH, SUMA, SISER, XEROX, CANON, HP itd."}
          </p>
        </Container>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {contactInfo.map((item: any, i: number) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl shadow-soft p-6 hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-dark mb-2">{item.title}</h3>

                  {"lines" in item && item.lines ? (
                    <div className="space-y-1.5">
                      {item.lines.map((line: any) => (
                        <p key={line.label} className="text-gray-500 text-sm">
                          <span className="font-medium text-gray-600">
                            {line.label}:{" "}
                          </span>
                          {"href" in line && line.href ? (
                            <a
                              href={line.href}
                              className="hover:text-primary transition-colors"
                            >
                              {line.value}
                            </a>
                          ) : (
                            line.value
                          )}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="text-gray-500 text-sm hover:text-primary transition-colors block"
                    >
                      {item.value}
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Contact Form + Map — redesigned */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-10 items-stretch">
            {/* Left: Form Card (3 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 flex"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col w-full">
                {/* Card header with gradient */}
                <div className="bg-gradient-to-r from-dark via-dark/95 to-dark p-5 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-20 w-32 h-32 bg-secondary/15 rounded-full blur-2xl translate-y-1/2" />
                  <div className="relative z-10">
                    <span className="inline-block bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                      {d?.formBadge || "Pišite nam"}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {d?.form?.heading || "Pišite nam o vašem projektu"}
                    </h2>
                    <p className="text-gray-300 text-sm mt-3 max-w-lg leading-relaxed">
                      {d?.form?.description ||
                        "Za sve dodatne informacije, upite ili narudžbe, molimo ispunite kontakt formu. Potrudit ćemo se da vam odgovorimo što je moguće prije."}
                    </p>
                  </div>
                </div>

                {/* Form body */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="p-5 sm:p-8 space-y-5 flex-1 flex flex-col"
                >
                  {/* Name + Telephone row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-dark/70 uppercase tracking-wider mb-2">
                        {d?.form?.nameLabel || "Vaše ime"} <span className="text-secondary">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          {...register("name", {
                            required: d?.form?.nameRequired || "Ime je obavezno",
                          })}
                          type="text"
                          placeholder={d?.form?.namePlaceholder || "Vaše puno ime"}
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all text-sm"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-dark/70 uppercase tracking-wider mb-2">
                        {d?.form?.phoneLabel || "Telefon"}
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          {...register("telephone")}
                          type="tel"
                          placeholder={d?.form?.phonePlaceholder || "Vaš broj telefona"}
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email + Budget row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-dark/70 uppercase tracking-wider mb-2">
                        {d?.form?.emailLabel || "Email"} <span className="text-secondary">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          {...register("email", {
                            required: d?.form?.emailRequired || "Email je obavezan",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: d?.form?.emailInvalid || "Neispravan email format",
                            },
                          })}
                          type="email"
                          placeholder={d?.form?.emailPlaceholder || "your@email.com"}
                          className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all text-sm"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1.5">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-dark/70 uppercase tracking-wider mb-2">
                        {d?.form?.budgetLabel || "Odaberite budžet"}
                      </label>
                      <div className="relative">
                        <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <select
                          {...register("budget")}
                          className="w-full pl-11 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all text-sm text-gray-600 appearance-none cursor-pointer"
                        >
                          {budgetOptions.map((opt: string, idx: number) => (
                            <option
                              key={opt}
                              value={idx === 0 ? "" : opt}
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Project description */}
                  <div className="flex-1 flex flex-col">
                    <label className="block text-xs font-semibold text-dark/70 uppercase tracking-wider mb-2">
                      {d?.form?.messageLabel || "Opišite projekat"}
                    </label>
                    <div className="relative flex-1 flex flex-col">
                      <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                      <textarea
                        {...register("project")}
                        rows={4}
                        placeholder={d?.form?.messagePlaceholder || "Recite nam nešto o vašem projektu..."}
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all resize-none text-sm flex-1 min-h-[120px]"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    variant="dark"
                    size="lg"
                    type="submit"
                    className="w-full !rounded-xl !py-4 text-base"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {d?.form?.submitText || "Pošaljite poruku"}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Right: Map + extras (2 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Map */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex-1 min-h-[240px]">
                <iframe
                  title="BSC Location"
                  src={mapUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Quote card */}
              <div className="bg-gradient-to-br from-dark to-dark/90 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/15 rounded-full blur-xl" />
                <div className="relative z-10">
                  <Sparkles className="w-8 h-8 text-primary mb-4" />
                  <p className="text-white/90 text-lg font-medium italic leading-relaxed mb-4">
                    &ldquo;{d?.quoteText || "Od ideje do gotovog proizvoda"}&rdquo;
                  </p>
                  <div className="w-12 h-0.5 bg-primary/60 mb-4" />
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {d?.quoteDescription || "Brzina i kvalitet u svim procesima štampe — od idejnog dizajna, probnog uzorka, štampe, dorade, montaže i servisa na području cijele Bosne i Hercegovine."}
                  </p>
                </div>
              </div>

              {/* Equipment card */}
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center shrink-0">
                    <Printer className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1.5">
                      {d?.equipmentHeading || "Naša oprema"}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {equipmentList} {d?.equipmentSuffix || "— specijalizirana flota modernih digitalnih štampanih mašina spremnih za vaš projekat."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}
