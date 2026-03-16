"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

interface NewsCardProps {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  imageUrl?: string;
  date: string;
  category: string;
  placeholderText?: string;
  readMoreText?: string;
}

export default function NewsCard({
  slug,
  title,
  excerpt,
  date,
  category,
  imageUrl,
  placeholderText,
  readMoreText,
}: NewsCardProps) {
  return (
    <Link href={`/news/${slug}`} className="block h-full">
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden group hover:scale-105 transition-transform duration-300 h-full flex flex-col">
        {/* Article image or placeholder */}
        <div className="h-32 sm:h-48 bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <div className="text-center">
              <div className="w-14 h-14 bg-white/60 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <span className="text-xl font-bold text-secondary">
                  {title[0]}
                </span>
              </div>
              <p className="text-xs text-gray-500">{placeholderText || 'Slika članka'}</p>
            </div>
          )}
        </div>
        <div className="p-4 sm:p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              {date}
            </span>
          </div>
          <h3 className="font-bold text-dark text-sm sm:text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
            {excerpt}
          </p>
          <span className="text-primary font-semibold text-sm group-hover:underline mt-auto">
            {readMoreText || 'Pročitaj više →'}
          </span>
        </div>
      </div>
    </Link>
  );
}
