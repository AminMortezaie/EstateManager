import { useMemo, useState } from "react";
import { Trophy, Medal, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Topbar } from "../components/Topbar";
import { useAppState } from "../state/AppState";
import { cls } from "../lib/ui";

function parseRevenue(s: string) {
  return Number(s.replace(/[^0-9.]/g, "")) || 0;
}

type SortKey = "revenue" | "deals" | "score" | "options";

export function Leaderboard() {
  const { t } = useTranslation();
  const { state } = useAppState();
  const [sortBy, setSortBy] = useState<SortKey>("revenue");
  const { user } = state;

  const ranked = useMemo(() => {
    const list = state.agents.filter((a) => a.role === "Agent");
    const sorted = [...list].sort((a, b) => {
      if (sortBy === "revenue") return parseRevenue(b.revenue) - parseRevenue(a.revenue);
      if (sortBy === "deals") return b.completedDeals - a.completedDeals;
      if (sortBy === "score") return b.score - a.score;
      return b.actualOptions - a.actualOptions;
    });
    return sorted.map((a, i) => ({ ...a, rank: i + 1 }));
  }, [state.agents, sortBy]);

  const totalRevenue = ranked.reduce((s, a) => s + parseRevenue(a.revenue), 0);
  const totalDeals = ranked.reduce((s, a) => s + a.completedDeals, 0);

  // For agent view, only highlight own row
  const isAgentRole = user?.role === "agent";

  return (
    <div>
      <Topbar
        title={isAgentRole ? t("leaderboard.my_title") : t("leaderboard.title")}
        subtitle={isAgentRole ? t("leaderboard.my_subtitle") : t("leaderboard.subtitle")}
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Kpi label={t("leaderboard.kpi.total_revenue")} value={`$${totalRevenue.toLocaleString()}`} />
        <Kpi label={t("leaderboard.kpi.completed_deals")} value={String(totalDeals)} />
        <Kpi label={t("leaderboard.kpi.active_agents")} value={String(ranked.length)} />
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {(["revenue", "deals", "score", "options"] as SortKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setSortBy(k)}
            className={cls(
              "rounded-full border px-3 py-1.5 text-xs capitalize",
              sortBy === k ? "border-black bg-black text-white" : "border-[#ece6db] bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            {t("leaderboard.sort_by", { key: t(`leaderboard.sort.${k}`) })}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-[24px] border border-white/80 bg-[#fbfaf6] shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
        <table className="w-full text-sm">
          <thead className="bg-white/60 text-left text-[11px] uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">{t("leaderboard.col.agent")}</th>
              <th className="px-4 py-3 hidden sm:table-cell">{t("leaderboard.col.district")}</th>
              <th className="px-4 py-3">{t("leaderboard.col.deals")}</th>
              <th className="px-4 py-3 hidden md:table-cell">{t("leaderboard.col.options")}</th>
              <th className="px-4 py-3 hidden md:table-cell">{t("leaderboard.col.score")}</th>
              <th className="px-4 py-3 text-right">{t("leaderboard.col.revenue")}</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((a) => {
              const isMe = isAgentRole && user?.agentId === a.id;
              return (
                <tr
                  key={a.id}
                  className={cls(
                    "border-t border-[#efe9dd] transition",
                    isMe ? "bg-[#e9f5ec]" : "hover:bg-white/50"
                  )}
                >
                  <td className="px-4 py-3">
                    <RankBadge rank={a.rank} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img src={a.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                      <div>
                        <p className="font-medium text-slate-800">{a.name}{isMe && <span className="ml-2 text-[10px] uppercase tracking-wider text-emerald-700">{t("leaderboard.you")}</span>}</p>
                        <p className="text-xs text-slate-500">{a.specialty}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell text-slate-600">{a.district}</td>
                  <td className="px-4 py-3 text-slate-700">{a.completedDeals}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-slate-700">{a.actualOptions}/{a.dailyTarget}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-xs text-slate-700 border border-[#ece6db]">
                      <TrendingUp size={12} /> {a.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-slate-800">{a.revenue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] border border-white/80 bg-[#fbfaf6] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1)
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
        <Trophy size={14} />
      </span>
    );
  if (rank <= 3)
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
        <Medal size={14} />
      </span>
    );
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600 border border-[#ece6db] text-xs font-semibold">
      {rank}
    </span>
  );
}
