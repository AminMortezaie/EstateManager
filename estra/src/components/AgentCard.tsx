import { Activity, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Agent } from "../data/mockData";
import { cls } from "../lib/ui";

const agentStatusKey: Record<Agent["status"], string> = {
  "In-Office": "agent_status.in_office",
  "Coffee Break": "agent_status.coffee_break",
  "Lunch Break": "agent_status.lunch_break",
  "On-Field": "agent_status.on_field",
  Available: "agent_status.available",
  "In Visit": "agent_status.in_visit",
  Traveling: "agent_status.traveling",
  Offline: "agent_status.offline",
};

const statusClasses: Record<Agent["status"], string> = {
  "In-Office": "bg-emerald-50 text-emerald-700",
  "Coffee Break": "bg-amber-50 text-amber-700",
  "Lunch Break": "bg-orange-50 text-orange-700",
  "On-Field": "bg-indigo-50 text-indigo-700",
  Available: "bg-emerald-50 text-emerald-700",
  "In Visit": "bg-indigo-50 text-indigo-700",
  Traveling: "bg-amber-50 text-amber-700",
  Offline: "bg-slate-100 text-slate-600",
};

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const { t } = useTranslation();
  return (
    <article
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft"
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      <div className="mb-4 flex items-center gap-3">
        <img src={agent.avatar} alt={agent.name} className="h-11 w-11 rounded-xl object-cover" />
        <div>
          <h3 className="font-semibold text-slate-900">{agent.name}</h3>
          <span
            className={cls(
              "mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
              statusClasses[agent.status]
            )}
          >
            {t(agentStatusKey[agent.status])}
          </span>
        </div>
      </div>
      <div className="space-y-2 text-sm text-slate-600">
        <p className="flex items-center gap-2">
          <MapPin size={14} />
          {agent.location}
        </p>
        <p className="flex items-center gap-2">
          <Activity size={14} />
          {t("agent_card.options_today")}: {agent.actualOptions} - {t("agent_card.score")} {agent.score}
        </p>
      </div>
    </article>
  );
}
