import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  variant?: "default" | "safe" | "watch" | "critical" | "ai";
  className?: string;
  showValue?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  variant = "default",
  className,
  showValue = false,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variants = {
    default: "bg-slate-400",
    safe: "bg-emerald-500",
    watch: "bg-amber-400",
    critical: "bg-rose-500",
    ai: "bg-cyan-500",
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", variants[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="flex justify-between text-[11px] font-medium text-slate-400 px-0.5">
          <span>0</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
