import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  Handshake,
  UserRound,
} from "lucide-react";
import { AgentCard } from "../components/AgentCard";
import { MapMock } from "../components/MapMock";
import { StatCard } from "../components/StatCard";
import { Topbar } from "../components/Topbar";
import { alerts, agents, kpis, properties, timeline, visits } from "../data/mockData";

const icons = [UserRound, Activity, CircleDollarSign, Handshake, AlertTriangle];

export function Dashboard() {
  return (
    <div>
      <Topbar title="Manager Dashboard" subtitle="Yerevan operations overview - Monday" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi, index) => (
          <StatCard key={kpi.label} {...kpi} icon={icons[index]} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <MapMock />
        <section className="space-y-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <h3 className="mb-3 text-base font-semibold text-slate-900">Today&apos;s timeline</h3>
            <div className="space-y-3">
              {timeline.map((item) => (
                <div key={item.time} className="flex gap-3">
                  <span className="w-14 text-xs font-semibold text-brand-700">{item.time}</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
            <h3 className="mb-3 text-base font-semibold text-slate-900">Alerts</h3>
            <ul className="space-y-2">
              {alerts.map((alert) => (
                <li key={alert} className="flex items-start gap-2 text-sm text-slate-600">
                  <AlertTriangle size={15} className="mt-0.5 text-amber-500" />
                  {alert}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.4fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <h3 className="mb-3 text-base font-semibold text-slate-900">Top agents this week</h3>
          <div className="space-y-3">
            {agents.slice(0, 3).map((agent) => (
              <div key={agent.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                <div className="flex items-center gap-3">
                  <img src={agent.avatar} alt={agent.name} className="h-10 w-10 rounded-xl object-cover" />
                  <div>
                    <p className="font-medium text-slate-900">{agent.name}</p>
                    <p className="text-xs text-slate-500">{agent.location}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-brand-700">{agent.score}%</p>
              </div>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <h3 className="mb-3 text-base font-semibold text-slate-900">Today&apos;s visits</h3>
          <div className="overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-2">Client</th>
                  <th className="py-2 pr-2">Property</th>
                  <th className="py-2 pr-2">Agent</th>
                  <th className="py-2 pr-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {visits.map((visit) => (
                  <tr key={visit.id} className="border-b border-slate-100">
                    <td className="py-2 pr-2 text-slate-800">{visit.clientName}</td>
                    <td className="py-2 pr-2 text-slate-600">
                      {properties.find((property) => property.id === visit.propertyId)?.name}
                    </td>
                    <td className="py-2 pr-2 text-slate-600">
                      {agents.find((agent) => agent.id === visit.agentId)?.name}
                    </td>
                    <td className="py-2 pr-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">
                        <CheckCircle2 size={12} />
                        {visit.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>

      <section className="mt-6">
        <h3 className="mb-3 text-base font-semibold text-slate-900">Live agents</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </div>
  );
}
