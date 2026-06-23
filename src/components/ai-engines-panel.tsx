import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { aiEngines } from "@/lib/mock-data";
import { BrainCircuit, LineChart, Cpu, Zap, Activity } from "lucide-react";
import { Badge } from "./ui/badge";

export function AIEnginesPanel() {
  const icons = [LineChart, Cpu, Activity];

  return (
    <section aria-label="AI Engines Status" className="space-y-4">
      <div className="flex items-center gap-2">
        <BrainCircuit className="w-4 h-4 text-cyan-500" />
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          AI Engines Status
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {aiEngines.map((engine, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Card key={engine.name} className="border-slate-200 bg-slate-800 text-white overflow-hidden relative group">
              {/* Background accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 z-0" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

              <div className="relative z-10 p-5 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-xl bg-slate-700/50 border border-slate-600/50">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <Badge variant="ai" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                    <Zap className="w-3 h-3 mr-1" />
                    {engine.status}
                  </Badge>
                </div>

                <div className="mb-4 flex-1">
                  <h4 className="font-bold text-base mb-1">{engine.name}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {engine.output}
                  </p>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/50 mt-auto">
                  <div className="flex justify-between items-center mb-2 text-xs">
                    <span className="text-slate-400">Confidence Score</span>
                    <span className="font-mono font-bold text-cyan-400">{engine.confidence}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                      style={{ width: `${engine.confidence}%` }} 
                    />
                  </div>
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest truncate">
                      {engine.model}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
