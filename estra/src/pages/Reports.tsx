import { Medal, Target, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Topbar } from "../components/Topbar";
import { agents, sourcingBreakdown } from "../data/mockData";

export function Reports() {
  const { t } = useTranslation();
  const rankedAgents = agents
    .filter((agent) => agent.role === "Agent")
    .slice()
    .sort((left, right) => right.completedDeals - left.completedDeals || right.actualOptions - left.actualOptions);

  return (
    <div>
      <Topbar
        title={t("reports.title")}
        subtitle={t("reports.subtitle")}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">{t("reports.kpi.at_target")}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">3 / 4</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">{t("reports.kpi.options_today")}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">14</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">{t("reports.kpi.deals_month")}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">20</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">{t("reports.kpi.revenue_month")}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">$50.9k</p>
        </article>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Target size={18} className="text-brand-600" />
            <h3 className="text-lg font-semibold text-slate-900">{t("reports.target_vs_actual")}</h3>
          </div>
          <div className="space-y-4">
            {rankedAgents.map((agent) => {
              const progress = Math.min((agent.actualOptions / agent.dailyTarget) * 100, 100);
              return (
                <div key={agent.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <p className="font-medium text-slate-900">{agent.name}</p>
                    <p className="text-slate-500">
                      {agent.actualOptions}/{agent.dailyTarget} {t("reports.options_suffix")}
                    </p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand-600" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{t("reports.primary_source")}: {agent.sourcingMethod}</p>
                </div>
              );
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex items-center gap-2">
            <Medal size={18} className="text-amber-500" />
            <h3 className="text-lg font-semibold text-slate-900">{t("reports.monthly_leaderboard")}</h3>
          </div>
          <div className="space-y-3">
            {rankedAgents.map((agent, index) => (
              <div key={agent.id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">
                    #{index + 1} {agent.name}
                  </p>
                  <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-semibold text-brand-700">
                    {agent.completedDeals} {t("reports.deals_suffix")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{agent.revenue} {t("reports.revenue_suffix")} • {agent.district}</p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-brand-600" />
          <h3 className="text-lg font-semibold text-slate-900">{t("reports.sourcing_analysis")}</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {sourcingBreakdown.map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 p-3">
              <p className="text-sm text-slate-600">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}%</p>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand-500" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
