import { Activity, Coffee, MapPinned, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Topbar } from "../components/Topbar";
import { agents } from "../data/mockData";

const statusTone: Record<string, string> = {
  "In-Office": "bg-emerald-50 text-emerald-700",
  "Coffee Break": "bg-amber-50 text-amber-700",
  "Lunch Break": "bg-orange-50 text-orange-700",
  "On-Field": "bg-indigo-50 text-indigo-700",
};

export function Agents() {
  const { t } = useTranslation();
  return (
    <div>
      <Topbar
        title={t("agents.title")}
        subtitle={t("agents.subtitle")}
      />
      <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Activity size={17} className="text-brand-600" />
            <h3 className="text-lg font-semibold text-slate-900">{t("agents.live_tracker")}</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {agents.map((agent) => (
              <article key={agent.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-start gap-3">
                  <img src={agent.avatar} alt={agent.name} className="h-12 w-12 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">{agent.name}</h3>
                      <span className={`rounded-full px-2 py-1 text-[11px] font-medium ${statusTone[agent.status] ?? "bg-slate-100 text-slate-700"}`}>
                        {agent.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{agent.role} • {agent.specialty}</p>
                    <p className="mt-3 text-sm text-slate-600">{agent.location}</p>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">{t("agents.district")}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{agent.district}</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3">
                    <p className="text-xs text-slate-500">{t("agents.options_today")}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {agent.actualOptions}/{agent.dailyTarget || 0}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500">{t("agents.primary_sourcing")} {agent.sourcingMethod}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <MapPinned size={16} className="text-brand-600" />
              <h3 className="text-lg font-semibold text-slate-900">{t("agents.district_coverage")}</h3>
            </div>
            <div className="space-y-2">
              {["Arabkir", "Ajapnyak", "Nor Nork", "Shengavit", "Commercial Spaces"].map((zone) => {
                const assigned = agents.filter(
                  (agent) => agent.district === zone || agent.specialty === zone
                );
                return (
                  <div key={zone} className="rounded-xl bg-slate-50 p-3">
                    <p className="text-sm font-medium text-slate-900">{zone}</p>
                    <p className="text-xs text-slate-500">
                      {assigned.length > 0 ? assigned.map((agent) => agent.name).join(", ") : t("agents.unassigned")}
                    </p>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <Target size={16} className="text-brand-600" />
              <h3 className="text-lg font-semibold text-slate-900">{t("agents.field_rules")}</h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>{t("agents.rule_1")}</li>
              <li>{t("agents.rule_2")}</li>
              <li>{t("agents.rule_3")}</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-3 flex items-center gap-2">
              <Coffee size={16} className="text-amber-500" />
              <h3 className="text-lg font-semibold text-slate-900">{t("agents.break_visibility")}</h3>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              {agents
                .filter((agent) => agent.status === "Coffee Break" || agent.status === "Lunch Break")
                .map((agent) => (
                  <div key={agent.id} className="rounded-xl bg-slate-50 p-3">
                    {agent.name} • {agent.status}
                  </div>
                ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
