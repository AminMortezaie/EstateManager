import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Compass,
  MapPinned,
  Building2,
  AlertTriangle,
  Activity,
  Search,
  ArrowRight,
} from "lucide-react";
import { Topbar } from "../components/Topbar";
import { useAppState } from "../state/AppState";
import { cls } from "../lib/ui";

const ALL = "All";

export function MapPage() {
  const { state } = useAppState();
  const navigate = useNavigate();
  const { agents, properties, user } = state;

  // Build district list from real data
  const districts = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => set.add(p.district));
    agents.forEach((a) => {
      if (a.district && a.district !== "All Districts") set.add(a.district);
    });
    return [ALL, ...Array.from(set).sort()];
  }, [agents, properties]);

  // Default district: agent's own district if available
  const defaultDistrict =
    user?.role === "agent"
      ? agents.find((a) => a.id === user.agentId)?.district ?? ALL
      : ALL;

  const [active, setActive] = useState<string>(defaultDistrict);

  const filteredAgents =
    active === ALL ? agents : agents.filter((a) => a.district === active);
  const filteredProps =
    active === ALL ? properties : properties.filter((p) => p.district === active);

  const exclusiveCount = filteredProps.filter((p) => p.exclusive).length;
  const conflictCount = filteredProps.filter((p) =>
    p.conflictNote?.toLowerCase().includes("visited") || p.conflictNote?.toLowerCase().includes("blocked")
  ).length;
  const onFieldCount = filteredAgents.filter((a) => a.status === "On-Field").length;

  // Per-district summary for the overview strip
  const districtStats = useMemo(() => {
    return districts
      .filter((d) => d !== ALL)
      .map((d) => ({
        name: d,
        listings: properties.filter((p) => p.district === d).length,
        agents: agents.filter((a) => a.district === d).length,
        onField: agents.filter((a) => a.district === d && a.status === "On-Field").length,
      }));
  }, [districts, agents, properties]);

  return (
    <div>
      <Topbar
        title="District & Field Coverage"
        subtitle="Live view of agents, exclusives, and conflicts per district"
      />

      {/* District chips */}
      <div className="mb-4 flex flex-wrap gap-2">
        {districts.map((d) => {
          const count =
            d === ALL
              ? properties.length
              : properties.filter((p) => p.district === d).length;
          return (
            <button
              key={d}
              onClick={() => setActive(d)}
              className={cls(
                "rounded-full border px-3 py-1.5 text-xs transition",
                active === d
                  ? "border-black bg-black text-white"
                  : "border-[#ece6db] bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              {d} <span className="opacity-60">· {count}</span>
            </button>
          );
        })}
      </div>

      {/* KPIs for selected district */}
      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        <Kpi icon={<Building2 size={14} />} label="Listings" value={filteredProps.length} />
        <Kpi icon={<MapPinned size={14} />} label="Exclusives" value={exclusiveCount} />
        <Kpi icon={<AlertTriangle size={14} />} label="Conflicts" value={conflictCount} accent="text-amber-700" />
        <Kpi icon={<Activity size={14} />} label="On-field now" value={onFieldCount} accent="text-emerald-700" />
      </div>

      <section className="grid gap-4 xl:grid-cols-[1fr_1.3fr]">
        {/* Agents column */}
        <div className="rounded-[24px] border border-white/80 bg-[#fbfaf6] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Compass size={15} /> Agents in {active}
            </h3>
            <button
              onClick={() => navigate("/ops")}
              className="text-xs text-slate-500 underline-offset-2 hover:underline"
            >
              Open Live Status →
            </button>
          </div>
          {filteredAgents.length === 0 && (
            <p className="rounded-xl bg-white px-3 py-3 text-xs text-slate-500">
              No agents assigned to this district.
            </p>
          )}
          <div className="space-y-2">
            {filteredAgents.map((a) => (
              <article
                key={a.id}
                className="flex items-center gap-3 rounded-xl border border-[#efe9dd] bg-white p-3"
              >
                <img src={a.avatar} alt={a.name} className="h-9 w-9 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{a.name}</p>
                  <p className="truncate text-xs text-slate-500">
                    {a.specialty} · {a.location}
                  </p>
                </div>
                <span
                  className={cls(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium",
                    a.status === "On-Field"
                      ? "bg-emerald-50 text-emerald-700"
                      : a.status === "In-Office"
                      ? "bg-slate-100 text-slate-700"
                      : "bg-amber-50 text-amber-700"
                  )}
                >
                  {a.status}
                </span>
              </article>
            ))}
          </div>
        </div>

        {/* Listings column */}
        <div className="rounded-[24px] border border-white/80 bg-[#fbfaf6] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Building2 size={15} /> Listings in {active}
            </h3>
            <Link
              to="/conflict-check"
              className="inline-flex items-center gap-1 text-xs text-slate-500 underline-offset-2 hover:underline"
            >
              <Search size={12} /> Check before visit
            </Link>
          </div>
          {filteredProps.length === 0 && (
            <p className="rounded-xl bg-white px-3 py-3 text-xs text-slate-500">
              No listings yet for this district.
            </p>
          )}
          <div className="space-y-2">
            {filteredProps.slice(0, 8).map((p) => (
              <article
                key={p.id}
                className="rounded-xl border border-[#efe9dd] bg-white p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{p.name}</p>
                    <p className="truncate text-xs text-slate-500">
                      {p.address} · {p.owner}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800">{p.price}</p>
                    {p.exclusive && (
                      <span className="mt-1 inline-block rounded-full bg-black px-2 py-0.5 text-[10px] text-white">
                        Exclusive
                      </span>
                    )}
                  </div>
                </div>
                {p.lastVisitedBy && (
                  <p className="mt-2 text-[11px] text-slate-500">
                    Last by <strong>{p.lastVisitedBy}</strong> · {p.lastVisitedAt}
                  </p>
                )}
              </article>
            ))}
            {filteredProps.length > 8 && (
              <button
                onClick={() => navigate("/properties")}
                className="mt-1 inline-flex items-center gap-1 text-xs text-slate-600 underline-offset-2 hover:underline"
              >
                View all {filteredProps.length} listings <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Per-district overview (only when "All" selected) */}
      {active === ALL && (
        <section className="mt-4 rounded-[24px] border border-white/80 bg-[#fbfaf6] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <h3 className="mb-3 text-sm font-semibold text-slate-800">District overview</h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {districtStats.map((d) => (
              <button
                key={d.name}
                onClick={() => setActive(d.name)}
                className="rounded-xl border border-[#efe9dd] bg-white p-3 text-left hover:border-slate-400"
              >
                <p className="text-sm font-medium text-slate-900">{d.name}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {d.listings} listings · {d.agents} agents · {d.onField} on-field
                </p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Kpi({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  accent?: string;
}) {
  return (
    <div className="rounded-[20px] border border-white/80 bg-[#fbfaf6] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
      <p className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
        {icon} {label}
      </p>
      <p className={cls("mt-1 text-xl font-semibold", accent ?? "text-slate-800")}>{value}</p>
    </div>
  );
}
