"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  title: string;
  image: string;
  category: string;
  href?: string;
  placeholderText?: string;
  subtitleText?: string;
  ctaText?: string;
}

export default function ProductCard({
  title,
  image,
  category,
  href,
  placeholderText,
  subtitleText,
  ctaText,
}: ProductCardProps) {
  const card = (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden group hover:scale-105 transition-transform duration-300">
      {/* Image */}
      <div className="h-40 sm:h-56 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <span className="text-3xl font-bold text-primary">
                {title[0]}
              </span>
            </div>
            <p className="text-xs text-gray-400">{placeholderText || 'BSC Proizvod'}</p>
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-dark text-lg mb-1">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{subtitleText || 'Personalizirano po vašoj mjeri'}</p>
        <span className="w-full flex items-center justify-center gap-2 bg-dark text-white py-3 rounded-xl hover:bg-dark/90 transition-colors font-medium text-sm cursor-pointer">
          <ArrowRight className="w-4 h-4" />
          {ctaText || 'Saznajte više'}
        </span>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }
  return card;
}
