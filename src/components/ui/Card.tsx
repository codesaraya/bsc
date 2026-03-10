import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-soft p-6",
        hover && "hover:scale-105 transition-transform duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
