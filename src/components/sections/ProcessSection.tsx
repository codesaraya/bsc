"use client";

import { motion } from "framer-motion";
import { Printer, Palette, Truck, Package, Pencil, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";

const iconMap: Record<string, LucideIcon> = {
  palette: Palette,
  printer: Printer,
  truck: Truck,
  package: Package,
  pencil: Pencil,
};

const defaultSteps = [
  {
    icon: "palette",
    title: "Dizajn & Priprema",
    description: "Od idejnog rješenja do probnog uzorka — kreativni tim priprema vaš projekat.",
    gradient: "from-pink-400 to-rose-400",
  },
  {
    icon: "printer",
    title: "Štampa & Dorada",
    description: "UV, Latex i Ecosolvent tehnologija za vrhunski kvalitet na svim materijalima.",
    gradient: "from-amber-400 to-yellow-400",
  },
  {
    icon: "truck",
    title: "Dostava & Montaža",
    description: "Brza dostava i profesionalna montaža gotovih grafičkih proizvoda.",
    gradient: "from-primary to-teal-400",
  },
];

export default function ProcessSection({ data }: { data?: any }) {
  const steps = (data?.steps?.length ? data.steps : defaultSteps).map((s: any) => ({
    ...s,
    IconComponent: iconMap[s.icon?.toLowerCase?.()] || Palette,
  }));

  return (
    <section className="relative z-20 -mt-4 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-soft border border-gray-100 px-5 py-8 sm:px-8 sm:py-10 md:px-12"
        >
          <div className={`grid grid-cols-2 gap-4 sm:gap-8 md:gap-12 ${steps.length <= 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
            {steps.map((step: any, i: number) => {
              const Icon = step.IconComponent;
              return (
                <div key={step.title || i} className="flex items-start gap-5">
                  <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
