import {
  Activity,
  AlertTriangle,
  CircleDollarSign,
  Crown,
  Target,
  Trophy,
  UsersRound,
} from "lucide-react";
import { MapMock } from "../components/MapMock";
import { StatCard } from "../components/StatCard";
import { Topbar } from "../components/Topbar";
import { agents, alerts, kpis, nodes, properties, sourcingBreakdown, timeline } from "../data/mockData";

const icons = [UsersRound, Activity, Crown, CircleDollarSign, Target];

export function Dashboard() {
  const activeNode = nodes[0];
  const exclusiveCount = properties.filter((property) => property.exclusive).length;
  const fieldAgents = agents.filter((agent) => agent.status === "On-Field");
  const director = agents.find((agent) => agent.role === "Director");

  return (
    <div>
      <Topbar
        title="Director Overview"
        subtitle="Agency-level control of people, protected listings, targets, and monthly outcomes"
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi, index) => (
          <StatCard key={kpi.label} {...kpi} icon={icons[index]} />
        ))}
      </div>

      <section className="mt-3 grid gap-3 xl:grid-cols-[1.1fr_1fr_1fr]">
        <article className="rounded-[28px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Active node</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">{activeNode.agency}</h3>
              <p className="text-sm text-slate-500">{activeNode.plan} plan • {activeNode.seats} seats</p>
            </div>
            <span className="rounded-full bg-[#e8f8ea] px-4 py-2 text-sm font-medium text-[#1a9d36]">
              {activeNode.status}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-xs text-slate-500">Director</p>
              <p className="mt-1 font-semibold text-slate-900">{activeNode.director}</p>
            </div>
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-xs text-slate-500">Renewal date</p>
              <p className="mt-1 font-semibold text-slate-900">{activeNode.billingDate}</p>
            </div>
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-xs text-slate-500">Protected exclusives</p>
              <p className="mt-1 font-semibold text-slate-900">{exclusiveCount}</p>
            </div>
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-xs text-slate-500">On-field agents</p>
              <p className="mt-1 font-semibold text-slate-900">{fieldAgents.length}</p>
            </div>
          </div>
          <div className="mt-4 rounded-[24px] border border-[#ece6db] bg-white p-4">
            <p className="mb-2 text-sm font-semibold text-slate-900">Director focus today</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Approve Arabkir exclusive contract and assign single owner for follow-up.</li>
              <li>Resolve Nor Nork sourcing overlap to prevent duplicated field effort.</li>
              <li>Review leaderboard and collaboration commissions before month-end close.</li>
            </ul>
          </div>
        </article>

        <MapMock />

        <section className="space-y-3">
          <article className="rounded-[28px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <div className="mb-3 flex items-center gap-2">
              <Trophy size={16} className="text-brand-600" />
              <h3 className="text-sm font-semibold text-slate-900">Leaderboard snapshot</h3>
            </div>
            <div className="space-y-2">
              {agents
                .filter((agent) => agent.role === "Agent")
                .slice()
                .sort((left, right) => right.completedDeals - left.completedDeals)
                .slice(0, 3)
                .map((agent, index) => (
                  <div key={agent.id} className="flex items-center justify-between rounded-[22px] bg-white p-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        #{index + 1} {agent.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {agent.completedDeals} deals • {agent.revenue}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#e8f8ea] px-3 py-1 text-xs font-semibold text-[#1a9d36]">
                      {agent.actualOptions}/{agent.dailyTarget} today
                    </span>
                  </div>
                ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Daily operational timeline</h3>
            <div className="space-y-2.5">
              {timeline.map((item) => (
                <div key={item.time} className="flex gap-3">
                  <span className="w-14 text-[11px] font-semibold text-slate-500">{item.time}</span>
                  <div>
                    <p className="text-xs font-medium text-slate-900">{item.title}</p>
                    <p className="text-[11px] text-slate-500">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>

      <section className="mt-3 grid gap-3 xl:grid-cols-[1.2fr_1fr]">
        <article className="rounded-[28px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <div className="mb-3 flex items-center gap-2">
            <Target size={16} className="text-brand-600" />
            <h3 className="text-sm font-semibold text-slate-900">Target vs actual options</h3>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-3">Agent</th>
                  <th className="py-2 pr-3">District</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Goal</th>
                  <th className="py-2 pr-3">Actual</th>
                  <th className="py-2 pr-3">Sourcing</th>
                </tr>
              </thead>
              <tbody>
                {agents
                  .filter((agent) => agent.role === "Agent")
                  .map((agent) => (
                    <tr key={agent.id} className="border-b border-slate-100">
                      <td className="py-2 pr-3 font-medium text-slate-900">{agent.name}</td>
                      <td className="py-2 pr-3 text-slate-600">{agent.district}</td>
                      <td className="py-2 pr-3 text-slate-600">{agent.status}</td>
                      <td className="py-2 pr-3 text-slate-600">{agent.dailyTarget}</td>
                      <td className="py-2 pr-3">
                        <span className="rounded-full bg-[#e8f8ea] px-3 py-1 font-semibold text-[#1a9d36]">
                          {agent.actualOptions}
                        </span>
                      </td>
                      <td className="py-2 pr-3 text-slate-600">{agent.sourcingMethod}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-[28px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" />
            <h3 className="text-sm font-semibold text-slate-900">Director alerts</h3>
          </div>
          <ul className="space-y-3">
            {alerts.map((alert) => (
              <li key={alert} className="rounded-[22px] bg-white p-4 text-sm text-slate-600">
                {alert}
              </li>
            ))}
          </ul>
          {director ? (
            <div className="mt-4 rounded-[24px] border border-dashed border-[#ccefd1] bg-[#e8f8ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1a9d36]">Owner seat</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{director.name}</p>
              <p className="text-xs text-slate-600">{director.email}</p>
            </div>
          ) : null}
        </article>
      </section>

      <article className="mt-3 rounded-[28px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Sourcing mix this month</h3>
        <div className="grid gap-3 md:grid-cols-4">
          {sourcingBreakdown.map((item) => (
            <div key={item.label} className="rounded-[22px] border border-[#ece6db] bg-white p-4">
              <p className="text-sm text-slate-600">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}%</p>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[#11a82e]" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
