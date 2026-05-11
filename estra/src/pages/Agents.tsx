import { useState } from "react";
import { AgentCard } from "../components/AgentCard";
import { Topbar } from "../components/Topbar";
import { Agent, agents } from "../data/mockData";

export function Agents() {
  const [selected, setSelected] = useState<Agent | null>(null);

  return (
    <div>
      <Topbar title="Agents" subtitle="Team availability, location, and daily productivity" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onClick={() => setSelected(agent)} />
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-20 grid place-items-center bg-slate-900/35 p-4" onClick={() => setSelected(null)}>
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-soft"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <img src={selected.avatar} alt={selected.name} className="h-14 w-14 rounded-2xl object-cover" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{selected.name}</h3>
                <p className="text-sm text-slate-500">{selected.location}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">Status:</span> {selected.status}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Visits Today:</span> {selected.visitsToday}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Performance Score:</span> {selected.score}/100
              </p>
              <p>
                <span className="font-semibold text-slate-900">Phone:</span> {selected.phone}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Email:</span> {selected.email}
              </p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="mt-5 w-full rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
