import { Compass, MapPinned } from "lucide-react";
import { MapMock } from "../components/MapMock";
import { Topbar } from "../components/Topbar";
import { agents } from "../data/mockData";

export function MapPage() {
  const fieldAgents = agents.filter((agent) => agent.status === "On-Field");

  return (
    <div>
      <Topbar
        title="District & Field Coverage"
        subtitle="Geographic specialization view for Arabkir, Ajapnyak, Nor Nork, Shengavit, and commercial work"
      />
      <section className="grid gap-4 xl:grid-cols-[280px_1fr_320px]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="mb-3 flex items-center gap-2">
            <Compass size={16} className="text-brand-600" />
            <h3 className="font-semibold text-slate-900">On-field agents</h3>
          </div>
          <div className="space-y-2">
            {fieldAgents.map((agent) => (
              <article key={agent.id} className="rounded-xl bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-900">{agent.name}</p>
                <p className="text-xs text-slate-500">{agent.district} • {agent.specialty}</p>
                <p className="mt-1 text-xs text-brand-700">{agent.location}</p>
              </article>
            ))}
          </div>
        </aside>
        <MapMock />
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="mb-3 flex items-center gap-2">
            <MapPinned size={16} className="text-brand-600" />
            <h3 className="font-semibold text-slate-900">Coverage intent</h3>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <article className="rounded-xl border border-slate-200 p-3">
              Arabkir and Nor Nork are running active on-field sourcing based on building-by-building research.
            </article>
            <article className="rounded-xl border border-slate-200 p-3">
              Shengavit is reserved for Karen’s commercial and mixed-use pipeline.
            </article>
            <article className="rounded-xl border border-slate-200 p-3">
              Ajapnyak is queued for owner-document follow-up before another field pass is assigned.
            </article>
          </div>
        </aside>
      </section>
    </div>
  );
}
