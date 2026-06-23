import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  subtitle: string;
}

export function PageHeader({
  icon: Icon,
  iconColor = "text-blue-600",
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
