import { NavLink } from "react-router-dom";
import { Plus, Search, MapPin, Building, Coffee, UtensilsCrossed, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Topbar } from "../components/Topbar";
import { useAppState, STATUS_OPTIONS } from "../state/AppState";
import { AgentStatus } from "../data/mockData";
import { cls } from "../lib/ui";

const ICONS: Record<AgentStatus, any> = {
  "In-Office": Building,
  "Coffee Break": Coffee,
  "Lunch Break": UtensilsCrossed,
  "On-Field": MapPin,
  Available: Building,
  "In Visit": MapPin,
  Traveling: MapPin,
  Offline: Building,
};

export function AgentHome() {
  const { t } = useTranslation();
  const { state, setStatus, todayCount, logout } = useAppState();
  const statusKey: Record<string, string> = { "In-Office": "agent_status.in_office", "Coffee Break": "agent_status.coffee_break", "Lunch Break": "agent_status.lunch_break", "On-Field": "agent_status.on_field", Available: "agent_status.available", "In Visit": "agent_status.in_visit", Traveling: "agent_status.traveling", Offline: "agent_status.offline" };
  const me = state.user;
  if (!me) return null;
  const myAgent = state.agents.find((a) => a.id === me.agentId);
  if (!myAgent) return null;

  const target = myAgent.dailyTarget || 3;
  const done = todayCount(me.agentId);
  const pct = Math.min(100, (done / target) * 100);

  return (
    <>
      <Topbar title={t("agent_home.greeting", { name: myAgent.name.split(" ")[0] })} subtitle={t("agent_home.day_glance")} />

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-4">
          <div className="rounded-[24px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{t("agent_home.my_status")}</p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-xl font-medium text-[#111111]">{t(statusKey[myAgent.status] || myAgent.status)}</p>
              <p className="text-xs text-slate-500">📍 {myAgent.location}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {STATUS_OPTIONS.map((s) => {
                const Icon = ICONS[s];
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
                    <Icon size={14} /> {t(statusKey[s] || s)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{t("agent_home.todays_options")}</p>
                <p className="mt-1 text-3xl font-semibold text-[#111111]">{done} / {target}</p>
              </div>
              <NavLink
                to="/add-listing"
                className="inline-flex items-center gap-2 rounded-[20px] bg-black px-4 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
              >
                <Plus size={14} /> {t("agent_home.add_listing")}
              </NavLink>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#ece6db]">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {done >= target ? t("agent_home.goal_achieved") : t("agent_home.more_listings", { count: target - done })}
            </p>
          </div>
        </section>

        <aside className="space-y-3">
          <NavLink
            to="/conflict-check"
            className="block rounded-[24px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)] transition hover:bg-white"
          >
            <Search size={18} className="text-slate-500" />
            <p className="mt-2 font-medium text-[#111111]">{t("agent_home.conflict_check")}</p>
            <p className="text-xs text-slate-500">{t("agent_home.conflict_check_desc")}</p>
          </NavLink>

          <NavLink
            to="/properties"
            className="block rounded-[24px] border border-white/80 bg-[#fbfaf6] p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)] transition hover:bg-white"
          >
            <Building size={18} className="text-slate-500" />
            <p className="mt-2 font-medium text-[#111111]">{t("agent_home.my_listings")}</p>
            <p className="text-xs text-slate-500">{t("agent_home.my_listings_desc")}</p>
          </NavLink>

          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-[18px] border border-[#ece6db] bg-white px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <LogOut size={14} /> {t("agent_home.sign_out")}
          </button>
        </aside>
      </div>
    </>
  );
}
