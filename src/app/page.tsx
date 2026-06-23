import { Header } from "@/components/header";
import { KPICards } from "@/components/kpi-cards";
import { UnitStatusCards } from "@/components/unit-status-cards";
import { AIEnginesPanel } from "@/components/ai-engines-panel";
import { SmartActionCenter } from "@/components/smart-action-center";
import { BurnoutChart } from "@/components/burnout-chart";
import { DataIntegrationStatus } from "@/components/dashboard/DataIntegrationStatus";

export default function CommandCenterPage() {
  return (
    <div className="min-h-screen pb-12">
      <Header title="Command Center" subtitle="Hospital AI Operations Command Center" />

      <div className="px-6 lg:px-8 py-8 space-y-10 max-w-[1600px] mx-auto animate-fade-in">
        {/* Data Integration & Mode Status */}
        <DataIntegrationStatus />

        {/* Row 1: KPI Cards */}
        <KPICards />

        {/* Row 2: Unit Status */}
        <UnitStatusCards />

        {/* Row 3: AI Engines Status */}
        <AIEnginesPanel />

        {/* Row 4: Smart Action Center */}
        <SmartActionCenter />

        {/* Row 5: Burnout Radar Overview */}
        <BurnoutChart />
      </div>
    </div>
  );
}
