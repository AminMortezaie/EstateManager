import { useMemo, useState } from "react";
import { Coffee, Building, UtensilsCrossed, MapPin, Filter } from "lucide-react";
import { Topbar } from "../components/Topbar";
import { useAppState, STATUS_OPTIONS } from "../state/AppState";
import { AgentStatus } from "../data/mockData";
import { cls } from "../lib/ui";

const STATUS_META: Record<AgentStatus, { color: string; bg: string; icon: typeof Coffee }> = {
  "In-Office": { color: "text-blue-700", bg: "bg-blue-50", icon: Building },
  "Coffee Break": { color: "text-amber-700", bg: "bg-amber-50", icon: Coffee },
  "Lunch Break": { color: "text-orange-700", bg: "bg-orange-50", icon: UtensilsCrossed },
  "On-Field": { color: "text-emerald-700", bg: "bg-emerald-50", icon: MapPin },
  Available: { color: "text-slate-700", bg: "bg-slate-100", icon: Building },
  "In Visit": { color: "text-violet-700", bg: "bg-violet-50", icon: MapPin },
  Traveling: { color: "text-cyan-700", bg: "bg-cyan-50", icon: MapPin },
  Offline: { color: "text-slate-500", bg: "bg-slate-100", icon: Building },
};

export function OpsBoard() {
  const { state, setStatus } = useAppState();
  const [filter, setFilter] = useState<AgentStatus | "All">("All");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(
    () => state.agents.filter((a) => filter === "All" || a.status === filter),
    [state.agents, filter]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: state.agents.length };
    STATUS_OPTIONS.forEach((s) => (c[s] = state.agents.filter((a) => a.status === s).length));
    return c;
  }, [state.agents]);

  const me = state.user;
  const myAgent = state.agents.find((a) => a.id === me?.agentId);

  return (
    <>
      <Topbar title="Live Status Board" subtitle="See where every agent is right now" />

      {me?.role === "agent" && myAgent && (
        <div className="mb-4 rounded-[24px] border border-white/80 bg-[#fbfaf6] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">My Status</p>
          <p className="mt-1 text-lg font-medium text-[#111111]">{myAgent.status} · {myAgent.location}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STATUS_OPTIONS.map((s) => {
              const Icon = STATUS_META[s].icon;
              const active = myAgent.status === s;
              return (
                <button
                  key={s}
                  onClick={() => setStatus(myAgent.id, s)}
                  className={cls(
                    "flex items-center justify-center gap-2 rounded-[18px] px-3 py-3 text-sm font-medium transition",
                    active
                      ? "bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
                      : "border border-[#ece6db] bg-white text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <Icon size={14} />
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-slate-500">
          <Filter size={12} /> Filter
        </span>
        {(["All", ...STATUS_OPTIONS] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cls(
              "rounded-full px-3 py-1.5 text-xs font-medium transition",
              filter === s
                ? "bg-black text-white"
                : "border border-[#ece6db] bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            {s} · {counts[s] ?? 0}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => {
          const meta = STATUS_META[a.status];
          const Icon = meta.icon;
          return (
            <button
              key={a.id}
              onClick={() => setSelected(selected === a.id ? null : a.id)}
              className="text-left rounded-[24px] border border-white/80 bg-[#fbfaf6] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)] transition hover:bg-white"
            >
              <div className="flex items-center gap-3">
                <img src={a.avatar} alt={a.name} className="h-12 w-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-[#111111]">{a.name}</p>
                  <p className="truncate text-xs text-slate-500">{a.role} · {a.district}</p>
                </div>
                <span className={cls("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium", meta.bg, meta.color)}>
                  <Icon size={12} />
                  {a.status}
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-500">📍 {a.location}</p>
              <p className="mt-1 text-xs text-slate-500">Visits today: {a.visitsToday} · Options: {a.actualOptions}/{a.dailyTarget}</p>

              {selected === a.id && me?.role !== "agent" && a.role === "Agent" && (
                <div className="mt-3 border-t border-[#ece6db] pt-3">
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-slate-500">Override status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={(e) => {
                          e.stopPropagation();
                          setStatus(a.id, s);
                        }}
                        className={cls(
                          "rounded-[14px] px-2 py-2 text-xs font-medium transition",
                          a.status === s
                            ? "bg-black text-white"
                            : "border border-[#ece6db] bg-white text-slate-600 hover:bg-slate-50"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-center text-sm text-slate-500">No agents match this filter.</p>
      )}
    </>
  );
}
