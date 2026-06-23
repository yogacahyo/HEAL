import { Header } from "@/components/header";
import { UnitStatusCards } from "@/components/unit-status-cards";
import { SmartActionCenter } from "@/components/smart-action-center";
import { BurnoutChart } from "@/components/burnout-chart";

export default function CommandCenterPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="px-6 lg:px-8 py-6 space-y-8 max-w-7xl">
        {/* Section A: Unit Status Banner */}
        <UnitStatusCards />

        {/* Section B: Smart Action Center */}
        <SmartActionCenter />

        {/* Section C: Burnout Risk Overview */}
        <BurnoutChart />
      </div>
    </div>
  );
}
