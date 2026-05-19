import { useTranslation } from "react-i18next";
import { Visit } from "../data/mockData";
import { cls } from "../lib/ui";

const colorByStatus = {
  Scheduled: "bg-slate-100 text-slate-700",
  "In Progress": "bg-indigo-50 text-indigo-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Delayed: "bg-rose-50 text-rose-700",
};

const statusKeyMap: Record<Visit["status"], string> = {
  Scheduled: "visit_status.scheduled",
  "In Progress": "visit_status.in_progress",
  Completed: "visit_status.completed",
  Delayed: "visit_status.delayed",
};

interface VisitTimelineProps {
  visits: Visit[];
}

export function VisitTimeline({ visits }: VisitTimelineProps) {
  const { t } = useTranslation();
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">{t("visit_timeline.title")}</h3>
      <div className="space-y-4">
        {visits.map((visit) => (
          <article key={visit.id} className="flex gap-3">
            <div className="w-12 pt-1 text-xs font-semibold text-slate-500">{visit.start}</div>
            <div className="relative w-full border-l border-slate-200 pl-4">
              <span className="absolute -left-1.5 top-2 h-3 w-3 rounded-full bg-brand-500" />
              <p className="font-medium text-slate-900">{visit.clientName}</p>
              <p className="text-sm text-slate-500">
                {visit.feedback} ({visit.end})
              </p>
              <span
                className={cls(
                  "mt-2 inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                  colorByStatus[visit.status]
                )}
              >
                {t(statusKeyMap[visit.status])}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
