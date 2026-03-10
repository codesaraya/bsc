"use client";

import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold text-dark text-base">{title}</h4>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  );
}
