"use client";

const defaultServices = [
  { label: "UV Štampa", highlight: false },
  { label: "Brendiranje", highlight: true },
  { label: "Tapete", highlight: false },
  { label: "Veliki Formati", highlight: true },
  { label: "3D Paneli", highlight: true },
  { label: "Alubond", highlight: false },
  { label: "Ecosolvent", highlight: true },
];

/* CMYK-style overlapping dots separator */
function DotSeparator() {
  return (
    <span className="relative inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 mx-3 sm:mx-6 shrink-0">
      <span className="absolute w-4 h-4 rounded-full bg-[#FF4081] top-0 left-0 opacity-90" />
      <span className="absolute w-4 h-4 rounded-full bg-[#FFD740] top-0 right-0 opacity-90" />
      <span className="absolute w-4 h-4 rounded-full bg-[#00BCD4] bottom-0 left-1/2 -translate-x-1/2 opacity-90" />
      <span className="absolute w-3 h-3 rounded-full bg-[#2979FF] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80" />
    </span>
  );
}

export default function ServicesTicker({ data }: { data?: any }) {
  const services = data?.services || defaultServices;

  /* We duplicate the list twice for a seamless infinite loop */
  const list = [...services, ...services];

  return (
    <section className="w-full bg-white py-8 overflow-hidden select-none">
      <div className="relative flex whitespace-nowrap animate-marquee">
        {/* First copy */}
        <div className="flex items-center shrink-0 animate-marquee-scroll">
          {list.map((s: any, i: number) => (
            <span key={i} className="flex items-center">
              <span
                className={`text-2xl sm:text-4xl md:text-[56px] font-extrabold tracking-tight leading-none ${
                  s.highlight ? "text-[#42C6D9]" : "text-[#1A1464]"
                }`}
              >
                {s.label}
              </span>
              <DotSeparator />
            </span>
          ))}
        </div>

        {/* Second copy (seamless loop) */}
        <div className="flex items-center shrink-0 animate-marquee-scroll">
          {list.map((s: any, i: number) => (
            <span key={`dup-${i}`} className="flex items-center">
              <span
                className={`text-2xl sm:text-4xl md:text-[56px] font-extrabold tracking-tight leading-none ${
                  s.highlight ? "text-[#42C6D9]" : "text-[#1A1464]"
                }`}
              >
                {s.label}
              </span>
              <DotSeparator />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
