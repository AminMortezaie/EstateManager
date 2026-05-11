import { MapMock } from "../components/MapMock";
import { Topbar } from "../components/Topbar";
import { agents, visits } from "../data/mockData";

export function MapPage() {
  return (
    <div>
      <Topbar title="Map Monitor" subtitle="Large map mock with agents, properties, and route activity" />
      <section className="grid gap-4 xl:grid-cols-[280px_1fr_300px]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <h3 className="mb-3 font-semibold text-slate-900">Agents</h3>
          <div className="space-y-2">
            {agents.map((agent) => (
              <article key={agent.id} className="rounded-xl bg-slate-50 p-3">
                <p className="text-sm font-medium text-slate-900">{agent.name}</p>
                <p className="text-xs text-slate-500">{agent.location}</p>
                <p className="mt-1 text-xs text-brand-700">{agent.status}</p>
              </article>
            ))}
          </div>
        </aside>
        <MapMock />
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <h3 className="mb-3 font-semibold text-slate-900">Visit details</h3>
          <div className="space-y-3">
            {visits.map((visit) => (
              <article key={visit.id} className="rounded-xl border border-slate-200 p-3">
                <p className="text-sm font-medium text-slate-900">{visit.clientName}</p>
                <p className="text-xs text-slate-500">
                  {visit.start} - {visit.end}
                </p>
                <p className="mt-1 text-xs text-slate-600">{visit.feedback}</p>
              </article>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-brand-200 bg-brand-50 p-3">
            <p className="text-xs font-semibold text-brand-700">Route line mock</p>
            <p className="text-xs text-slate-600">Sayat-Nova Ave to Republic Square to Komitas Ave</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
