import { cn } from "@/lib/utils";
import Badge from "./Badge";

interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionTitle({
  badge,
  title,
  subtitle,
  className,
  align = "center",
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <div className={cn("mb-4", align === "center" && "flex justify-center")}>
          <Badge>{badge}</Badge>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-dark">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
