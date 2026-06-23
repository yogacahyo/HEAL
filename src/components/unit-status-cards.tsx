import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnitData {
  name: string;
  bor: number;
  status: "aman" | "waspada" | "kritis";
  beds: { occupied: number; total: number };
  nurses: number;
}

const units: UnitData[] = [
  {
    name: "ICU",
    bor: 72,
    status: "aman",
    beds: { occupied: 18, total: 25 },
    nurses: 12,
  },
  {
    name: "IGD",
    bor: 84,
    status: "waspada",
    beds: { occupied: 21, total: 25 },
    nurses: 8,
  },
  {
    name: "Rawat Inap B",
    bor: 96,
    status: "kritis",
    beds: { occupied: 29, total: 30 },
    nurses: 5,
  },
];

const statusConfig = {
  aman: {
    label: "Aman",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    ring: "ring-emerald-500/20",
    dot: "bg-emerald-500",
    icon: ShieldCheck,
    barColor: "bg-emerald-500",
    cardBorder: "border-slate-200",
    cardBg: "bg-white",
  },
  waspada: {
    label: "Waspada",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    ring: "ring-amber-500/20",
    dot: "bg-amber-400",
    icon: TrendingUp,
    barColor: "bg-amber-400",
    cardBorder: "border-amber-300",
    cardBg: "bg-white",
  },
  kritis: {
    label: "Kritis",
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-300",
    ring: "ring-rose-500/20",
    dot: "bg-rose-500",
    icon: AlertTriangle,
    barColor: "bg-rose-500",
    cardBorder: "border-rose-400",
    cardBg: "bg-rose-50/50",
  },
};

export function UnitStatusCards() {
  return (
    <section aria-label="Status unit bangsal">
      <div className="flex items-center gap-2 mb-4">
        <Bed className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
          Status Unit
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {units.map((unit) => {
          const config = statusConfig[unit.status];
          const StatusIcon = config.icon;

          return (
            <Card
              key={unit.name}
              id={`unit-card-${unit.name.toLowerCase().replace(/\s+/g, "-")}`}
              className={cn(
                "relative overflow-hidden transition-all duration-300 hover:scale-[1.02]",
                config.cardBorder,
                config.cardBg,
                unit.status === "kritis" && "border-2 shadow-rose-100 shadow-md"
              )}
            >
              {/* Top accent bar */}
              <div className={cn("absolute top-0 left-0 right-0 h-1", config.barColor)} />

              <CardHeader className="pt-5">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{unit.name}</CardTitle>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold",
                      config.bg,
                      config.color,
                      config.border,
                      "border"
                    )}
                  >
                    <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
                    {config.label}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                {/* BOR Display */}
                <div className="mb-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold tabular-nums text-slate-800">
                      {unit.bor}
                    </span>
                    <span className="text-lg font-semibold text-slate-400">%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    Bed Occupancy Rate
                  </p>
                </div>

                {/* BOR Progress Bar */}
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700 ease-out",
                      config.barColor
                    )}
                    style={{ width: `${unit.bor}%` }}
                  />
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      <span className="font-semibold tabular-nums text-slate-700">
                        {unit.beds.occupied}
                      </span>
                      /{unit.beds.total} bed
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon className={cn("w-3.5 h-3.5", config.color)} />
                    <span>
                      <span className="font-semibold tabular-nums text-slate-700">
                        {unit.nurses}
                      </span>{" "}
                      perawat
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
