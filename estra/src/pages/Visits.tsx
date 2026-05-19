import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Topbar } from "../components/Topbar";
import { VisitTimeline } from "../components/VisitTimeline";
import { agents, properties, visits } from "../data/mockData";
import { cls } from "../lib/ui";

export function Visits() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"Today" | "History">("Today");
  const tabLabel: Record<"Today" | "History", string> = { Today: t("visits.tab.today"), History: t("visits.tab.history") };
  const visitStatusKey: Record<string, string> = { Scheduled: "visit_status.scheduled", "In Progress": "visit_status.in_progress", Completed: "visit_status.completed", Delayed: "visit_status.delayed" };

  const current = useMemo(
    () => visits.filter((visit) => (activeTab === "Today" ? visit.date === "2026-05-11" : visit.date !== "2026-05-11")),
    [activeTab]
  );

  return (
    <div>
      <Topbar title={t("visits.title")} subtitle={t("visits.subtitle")} />
      <div className="mb-4 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-soft">
        {(["Today", "History"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cls(
              "rounded-lg px-4 py-2 text-sm font-medium",
              activeTab === tab ? "bg-brand-600 text-white" : "text-slate-600"
            )}
          >
            {tabLabel[tab]}
          </button>
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <VisitTimeline visits={current} />
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">{t("visits.records")}</h3>
          <div className="space-y-3">
            {current.map((visit) => (
              <article key={visit.id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-slate-900">
                    {properties.find((property) => property.id === visit.propertyId)?.name}
                  </p>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                    {t(visitStatusKey[visit.status] || visit.status)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  {t("visits.agent")}: {agents.find((agent) => agent.id === visit.agentId)?.name}
                </p>
                <p className="text-sm text-slate-500">{t("visits.client")}: {visit.clientName}</p>
                <p className="mt-2 text-xs text-slate-600">{visit.feedback}</p>
                <Link to={`/visits/${visit.id}`} className="mt-3 inline-block text-sm font-semibold text-brand-700">
                  {t("visits.open_details")}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
