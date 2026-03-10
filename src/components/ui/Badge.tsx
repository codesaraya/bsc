import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark";
}

export default function Badge({
  children,
  className,
  variant = "primary",
}: BadgeProps) {
  const variants = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    dark: "bg-dark/10 text-dark",
  };

  return (
    <span
      className={cn(
        "inline-block text-sm uppercase tracking-wide font-semibold px-4 py-1.5 rounded-full",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
