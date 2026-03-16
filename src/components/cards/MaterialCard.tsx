"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface MaterialCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
  placeholderText?: string;
  ctaText?: string;
}

export default function MaterialCard({
  title,
  description,
  image,
  href,
  placeholderText,
  ctaText,
}: MaterialCardProps) {
  const card = (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden group hover:scale-105 transition-transform duration-300">
      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden relative">
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
            <div className="w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl font-bold text-primary">
                {title[0]}
              </span>
            </div>
            <p className="text-xs text-gray-500">{placeholderText || 'Slika materijala'}</p>
          </div>
        )}
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-xl font-bold text-dark mb-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {description}
        </p>
        <Button variant="outline" size="sm" className="group/btn">
          {ctaText || 'Saznajte više'}
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }
  return card;
}
