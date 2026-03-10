"use client";

import { ChevronRight } from "lucide-react";

/* ── Default step data ── */
const defaultSteps = [
  {
    title: "ICS 27001\nInformacijska sigurnost",
    icon: (
      <div className="w-14 h-14 rounded-full bg-[#E8F5E9] flex items-center justify-center">
        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke="#8BC34A" strokeWidth="2.5" fill="none" />
          <path d="M14 20l4 4 8-8" stroke="#8BC34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
  {
    title: "ICS 50001\nUpravljanje energijom",
    icon: (
      <div className="w-14 h-14 rounded-full bg-[#E3F2FD] flex items-center justify-center">
        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke="#42A5F5" strokeWidth="2.5" fill="none" />
          <path d="M14 20l4 4 8-8" stroke="#42A5F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
  {
    title: "ICS 9001\nUpravljanje kvalitetom",
    icon: (
      <div className="w-14 h-14 rounded-full bg-[#FFF3E0] flex items-center justify-center">
        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke="#FF9800" strokeWidth="2.5" fill="none" />
          <path d="M14 20l4 4 8-8" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
  {
    title: "ICS 14001\nUpravljanje okolišem",
    icon: (
      <div className="w-14 h-14 rounded-full bg-[#FCE4EC] flex items-center justify-center">
        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke="#E91E63" strokeWidth="2.5" fill="none" />
          <path d="M14 20l4 4 8-8" stroke="#E91E63" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
  },
];

export default function ProcessStepsSection({ data }: { data?: any }) {
  const steps = data?.certificates || defaultSteps;
  const badge = data?.badge || "Certifikati";
  const heading = data?.heading || "Šta nas čini posebnima?";
  const subtitle = data?.subtitle || "Koristimo najnoviju tehnologiju, istovremeno brinući o okolišu. Certifikati koje posjedujemo odraz su naše posvećenosti kvaliteti!";

  return (
    <section className="bg-white py-16 lg:py-20 relative overflow-hidden">

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Section heading */}
        <div className="text-center mb-10">
          <span className="inline-block bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full mb-5">
            {badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-extrabold text-dark leading-tight mb-3">
            {heading}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        {/* Card container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_40px_rgba(0,0,0,0.04)] px-4 sm:px-8 md:px-12 py-8 sm:py-12 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            {steps.map((step: any, i: number) => (
              <div key={i} className="flex items-center gap-4 md:gap-6">
                {/* Step content */}
                <div className="flex flex-col items-center text-center min-w-[140px] max-w-[180px]">
                  {/* Icon */}
                  <div className="mb-4">
                    {step.icon ? step.icon : step.color ? (
                      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: step.color + '20' }}>
                        <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                          <circle cx="20" cy="20" r="16" stroke={step.color} strokeWidth="2.5" fill="none" />
                          <path d="M14 20l4 4 8-8" stroke={step.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    ) : null}
                  </div>
                  {/* Title */}
                  <p className="text-sm font-semibold text-dark leading-snug whitespace-pre-line">
                    {step.title}
                  </p>
                </div>

                {/* Arrow separator (not after last item) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center text-gray-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
