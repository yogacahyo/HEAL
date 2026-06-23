import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "safe" | "watch" | "critical" | "ai" | "outline" | "secondary";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-slate-100 text-slate-800",
    safe: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    watch: "bg-amber-50 text-amber-700 border border-amber-200/60",
    critical: "bg-rose-50 text-rose-700 border border-rose-200/60",
    ai: "bg-cyan-50 text-cyan-700 border border-cyan-200/60",
    outline: "text-slate-600 border border-slate-200",
    secondary: "bg-slate-100 text-slate-600 border border-transparent",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
