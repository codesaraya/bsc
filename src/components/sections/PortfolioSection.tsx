"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from '@/lib/imageUrl';

/* ── Default portfolio items – sorted by photo count (most first) ── */
const defaultPortfolioItems = [
  {
    title: "Wallscape",
    photos: 30,
    image: "/Products/Wallscape/wallscape5.jpg",
    href: "/products/outdoor-indoor/wallscape",
  },
  {
    title: "Brendiranje vozila",
    photos: 29,
    image: "/Products/Brandiranje%20Vozila/brandiranje%20vozila10.jpg",
    href: "/products/brendiranje/vozila",
  },
  {
    title: "Brendiranje predmeta",
    photos: 22,
    image: "/Products/Brendiranje%20Predmeta/Brendiranje%20predmeta3.jpg",
    href: "/products/brendiranje/predmeta",
  },
  {
    title: "Brendiranje prostora",
    photos: 20,
    image: "/Products/Brendiranje%20Poslovnih%20Prostora/Brendiranje%20poslovnih%20prostora5.jpg",
    href: "/products/brendiranje/poslovnih-stambenih-prostora",
  },
];

const defaultChecklistItems = [
  "UV LED mašina velikog formata širine štampe 3,2m",
  "Print na sve pločaste materijale (staklo, plexy, alubond, forex, MDF, drvo)",
  "Latex i ecosolvent mašine najvišeg kvaliteta",
];

export default function PortfolioSection({ data }: { data?: any }) {
  const portfolioItems = data?.items || defaultPortfolioItems;
  const checklistItems = data?.checklistItems || defaultChecklistItems;
  const badge = data?.badge || "Naši projekti";
  const headingLine1 = data?.headingLine1 || "Pogledajte naše";
  const headingLine2 = data?.headingLine2 || "izvedene projekte";
  const ctaText = data?.ctaText || "Kontaktirajte nas";
  const ctaLink = data?.ctaLink || "/contact";

  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row">
        {/* ── Left side – Navy gradient ── */}
        <div className="relative lg:w-[42%] bg-gradient-to-br from-[#1A1464] via-[#251a80] to-[#130f50] px-6 sm:px-10 md:px-16 lg:px-20 py-12 sm:py-20 lg:py-28 flex flex-col justify-center overflow-hidden">
          {/* Decorative 3D diamond – top-left */}
          <div className="absolute top-16 left-24">
            <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
              <path d="M20 0L40 20L20 40L0 20Z" fill="#42A5F5" opacity="0.7" />
              <path d="M20 8L32 20L20 32L8 20Z" fill="#64B5F6" opacity="0.5" />
              <path d="M20 40L30 30L40 40L30 48Z" fill="#1E88E5" opacity="0.4" />
            </svg>
          </div>

          {/* Decorative curved line – bottom-left */}
          <svg
            className="absolute bottom-14 left-8 w-16 h-20"
            viewBox="0 0 60 80"
            fill="none"
          >
            <path
              d="M30 0C30 25 5 35 5 55C5 70 20 80 30 80"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </svg>

          {/* Badge */}
          <span className="inline-block w-fit bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-full mb-8">
            {badge}
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold text-white leading-[1.15] mb-6 sm:mb-10">
            {headingLine1}
            <br />
            {headingLine2}
          </h2>

          {/* Checklist */}
          <ul className="space-y-5 mb-12">
            {checklistItems.map((item: any, i: number) => {
              const text = typeof item === "string" ? item : item.text || item;
              return (
                <li key={i} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-white/90 text-[15px] font-medium">
                    {text}
                  </span>
                </li>
              );
            })}
          </ul>

          {/* CTA Button */}
          <Link href={ctaLink} className="w-fit bg-dark text-white text-sm font-semibold px-10 py-4 rounded-full hover:bg-dark/90 transition-colors">
            {ctaText}
          </Link>
        </div>

        {/* ── Right side – 2×2 image grid ── */}
        <div className="lg:w-[58%] grid grid-cols-2">
          {portfolioItems.map((item: any, i: number) => (
            <Link
              key={i}
              href={item.href}
              className="relative overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="w-full h-full min-h-[290px] relative">
                {getImageUrl(item.uploadedImage) && (
                  <img
                    src={getImageUrl(item.uploadedImage)}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                {/* Title + photo count overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pt-16 p-6">
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                </div>
              </div>

              {/* Arrow button */}
              <span className="absolute top-6 right-6 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4 text-dark" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
