import {
  Activity,
  AlertTriangle,
  CircleDollarSign,
  Crown,
  Target,
  Trophy,
  UsersRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { MapMock } from "../components/MapMock";
import { StatCard } from "../components/StatCard";
import { Topbar } from "../components/Topbar";
import { agents, alerts, kpis, nodes, properties, sourcingBreakdown, timeline } from "../data/mockData";

const icons = [UsersRound, Activity, Crown, CircleDollarSign, Target];

export function Dashboard() {
  const { t } = useTranslation();
  const activeNode = nodes[0];
  const exclusiveCount = properties.filter((property) => property.exclusive).length;
  const fieldAgents = agents.filter((agent) => agent.status === "On-Field");
  const director = agents.find((agent) => agent.role === "Director");

  const kpiKeys = [
    { labelKey: "kpi.subscribed_nodes", changeKey: "kpi.change.this_month" },
    { labelKey: "kpi.active_agents_today", changeKey: "kpi.change.on_field_now" },
    { labelKey: "kpi.exclusive_listings", changeKey: "kpi.change.protected" },
    { labelKey: "kpi.monthly_revenue", changeKey: "kpi.change.vs_april" },
    { labelKey: "kpi.options_logged", changeKey: "kpi.change.target_pace" },
  ];

  const sourcingKey: Record<string, string> = {
    "On-field search": "sourcing.on_field_search",
    "Word of mouth": "sourcing.word_of_mouth",
    "Referral network": "sourcing.referral_network",
    "Commercial network": "sourcing.commercial_network",
    "Talking to neighbors": "sourcing.talking_to_neighbors",
    "Building guards": "sourcing.building_guards",
    "Desk workflow": "sourcing.desk_workflow",
    "Management": "sourcing.management",
  };

  const agentStatusKey: Record<string, string> = {
    "In-Office": "agent_status.in_office",
    "Coffee Break": "agent_status.coffee_break",
    "Lunch Break": "agent_status.lunch_break",
    "On-Field": "agent_status.on_field",
    "Available": "agent_status.available",
    "In Visit": "agent_status.in_visit",
    "Traveling": "agent_status.traveling",
    "Offline": "agent_status.offline",
  };

  const nodeStatusKey: Record<string, string> = {
    "Active": "nodes_admin.status.active",
    "Trial": "nodes_admin.status.trial",
    "At Risk": "nodes_admin.status.at_risk",
  };

  return (
    <div>
      <Topbar
        title={t("dashboard.title")}
        subtitle={t("dashboard.subtitle")}
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {kpis.map((kpi, index) => (
          <StatCard
            key={kpi.label}
            label={t(kpiKeys[index].labelKey)}
            value={kpi.value}
            change={t(kpiKeys[index].changeKey)}
            icon={icons[index]}
          />
        ))}
      </div>

      <section className="mt-3 grid gap-3 xl:grid-cols-[1.1fr_1fr_1fr]">
        <article className="rounded-[28px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{t("dashboard.active_node")}</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">{activeNode.agency}</h3>
              <p className="text-sm text-slate-500">{t("dashboard.plan_seats", { plan: activeNode.plan, seats: activeNode.seats })}</p>
            </div>
            <span className="rounded-full bg-[#e8f8ea] px-4 py-2 text-sm font-medium text-[#1a9d36]">
              {t(nodeStatusKey[activeNode.status] ?? "nodes_admin.status.active")}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-xs text-slate-500">{t("dashboard.director_label")}</p>
              <p className="mt-1 font-semibold text-slate-900">{activeNode.director}</p>
            </div>
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-xs text-slate-500">{t("dashboard.renewal_date")}</p>
              <p className="mt-1 font-semibold text-slate-900">{activeNode.billingDate}</p>
            </div>
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-xs text-slate-500">{t("dashboard.protected_exclusives")}</p>
              <p className="mt-1 font-semibold text-slate-900">{exclusiveCount}</p>
            </div>
            <div className="rounded-[22px] bg-white p-4">
              <p className="text-xs text-slate-500">{t("dashboard.on_field_agents")}</p>
              <p className="mt-1 font-semibold text-slate-900">{fieldAgents.length}</p>
            </div>
          </div>
          <div className="mt-4 rounded-[24px] border border-[#ece6db] bg-white p-4">
            <p className="mb-2 text-sm font-semibold text-slate-900">{t("dashboard.focus_today")}</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>{t("dashboard.focus_1")}</li>
              <li>{t("dashboard.focus_2")}</li>
              <li>{t("dashboard.focus_3")}</li>
            </ul>
          </div>
        </article>

        <MapMock />

        <section className="space-y-3">
          <article className="rounded-[28px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <div className="mb-3 flex items-center gap-2">
              <Trophy size={16} className="text-brand-600" />
              <h3 className="text-sm font-semibold text-slate-900">{t("dashboard.leaderboard_snapshot")}</h3>
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
                        {agent.completedDeals} {t("dashboard.deals")} • {agent.revenue}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#e8f8ea] px-3 py-1 text-xs font-semibold text-[#1a9d36]">
                      {agent.actualOptions}/{agent.dailyTarget} {t("dashboard.today")}
                    </span>
                  </div>
                ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <h3 className="mb-3 text-sm font-semibold text-slate-900">{t("dashboard.daily_timeline")}</h3>
            <div className="space-y-2.5">
              {timeline.map((item, idx) => (
                <div key={item.time} className="flex gap-3">
                  <span className="w-14 text-[11px] font-semibold text-slate-500">{item.time}</span>
                  <div>
                    <p className="text-xs font-medium text-slate-900">{t(`timeline.item${idx}.title`)}</p>
                    <p className="text-[11px] text-slate-500">{t(`timeline.item${idx}.subtitle`)}</p>
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
            <h3 className="text-sm font-semibold text-slate-900">{t("dashboard.target_actual")}</h3>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-3">{t("dashboard.col.agent")}</th>
                  <th className="py-2 pr-3">{t("dashboard.col.district")}</th>
                  <th className="py-2 pr-3">{t("dashboard.col.status")}</th>
                  <th className="py-2 pr-3">{t("dashboard.col.goal")}</th>
                  <th className="py-2 pr-3">{t("dashboard.col.actual")}</th>
                  <th className="py-2 pr-3">{t("dashboard.col.sourcing")}</th>
                </tr>
              </thead>
              <tbody>
                {agents
                  .filter((agent) => agent.role === "Agent")
                  .map((agent) => (
                    <tr key={agent.id} className="border-b border-slate-100">
                      <td className="py-2 pr-3 font-medium text-slate-900">{agent.name}</td>
                      <td className="py-2 pr-3 text-slate-600">{agent.district}</td>
                      <td className="py-2 pr-3 text-slate-600">{t(agentStatusKey[agent.status] ?? agent.status)}</td>
                      <td className="py-2 pr-3 text-slate-600">{agent.dailyTarget}</td>
                      <td className="py-2 pr-3">
                        <span className="rounded-full bg-[#e8f8ea] px-3 py-1 font-semibold text-[#1a9d36]">
                          {agent.actualOptions}
                        </span>
                      </td>
                      <td className="py-2 pr-3 text-slate-600">{t(sourcingKey[agent.sourcingMethod] ?? agent.sourcingMethod)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-[28px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" />
            <h3 className="text-sm font-semibold text-slate-900">{t("dashboard.director_alerts")}</h3>
          </div>
          <ul className="space-y-3">
            {alerts.map((alert, idx) => (
              <li key={alert} className="rounded-[22px] bg-white p-4 text-sm text-slate-600">
                {t(`alert.item${idx + 1}`)}
              </li>
            ))}
          </ul>
          {director ? (
            <div className="mt-4 rounded-[24px] border border-dashed border-[#ccefd1] bg-[#e8f8ea] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1a9d36]">{t("dashboard.owner_seat")}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{director.name}</p>
              <p className="text-xs text-slate-600">{director.email}</p>
            </div>
          ) : null}
        </article>
      </section>

      <article className="mt-3 rounded-[28px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">{t("dashboard.sourcing_mix")}</h3>
        <div className="grid gap-3 md:grid-cols-4">
          {sourcingBreakdown.map((item) => (
            <div key={item.label} className="rounded-[22px] border border-[#ece6db] bg-white p-4">
              <p className="text-sm text-slate-600">{t(sourcingKey[item.label] ?? item.label)}</p>
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
