import { useMemo, useState } from "react";
import { Search, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Topbar } from "../components/Topbar";
import { useAppState } from "../state/AppState";

export function ConflictCheck() {
  const { state } = useAppState();
  const { t } = useTranslation();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return state.properties.filter(
      (p) =>
        p.address.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q)
    );
  }, [query, state.properties]);

  return (
    <>
      <Topbar title={t("conflict.title")} subtitle={t("conflict.subtitle")} />

      <div className="mb-4 rounded-[24px] border border-white/80 bg-[#fbfaf6] p-4">
        <div className="flex items-center gap-2 rounded-[18px] border border-[#ece6db] bg-white px-4 py-3">
          <Search size={16} className="text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("conflict.search_placeholder")}
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {query.trim().length >= 2 && results.length === 0 && (
        <div className="rounded-[20px] bg-emerald-50 px-4 py-4 text-sm text-emerald-800 inline-flex items-center gap-2">
          <CheckCircle2 size={16} /> {t("conflict.no_matches")}
        </div>
      )}

      <div className="space-y-3">
        {results.map((p) => (
          <div key={p.id} className="rounded-[24px] border border-white/80 bg-[#fbfaf6] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-[#111111]">{p.name}</p>
                <p className="text-xs text-slate-500">{p.address} · {p.district}</p>
              </div>
              {p.exclusive && (
                <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">{t("conflict.exclusive")}</span>
              )}
            </div>
            <div className="mt-3 inline-flex items-start gap-2 rounded-[14px] bg-amber-50 px-3 py-2 text-xs text-amber-800">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <span>
                {t("conflict.last_worked")} <strong>{p.lastVisitedBy}</strong> on {p.lastVisitedAt}. {p.conflictNote}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">{t("conflict.owner_label")} {p.owner} · {p.price} · {p.status}</p>
          </div>
        ))}
      </div>
    </>
  );
}
