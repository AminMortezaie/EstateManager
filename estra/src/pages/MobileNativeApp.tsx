import { ReactNode, useState, FormEvent } from "react";
import {
  ArrowLeft,
  Bath,
  Bell,
  BedDouble,
  Building2,
  ChevronRight,
  LogOut,
  Paperclip,
  Plus,
  SendHorizontal,
  Share2,
  Trophy,
  Users,
} from "lucide-react";
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { agents, nodes, properties, sourcingBreakdown } from "../data/mockData";
import { roleMeta, UserRole, desktopLinksByRole } from "../lib/roles";
import { cls } from "../lib/ui";
import { useAppState } from "../state/AppState";

const shellBg = "bg-[#f6f4ee]";
const cardBg = "bg-[#fbfaf6]";
const mintBg = "bg-[#e8f8ea]";

export function AppShell({ children, dock = true, role }: { children: ReactNode; dock?: boolean; role: UserRole }) {
  return (
    <main
      className={`mx-auto min-h-screen w-full max-w-[430px] ${shellBg} text-[#111111]`}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: dock ? "calc(8rem + env(safe-area-inset-bottom))" : "env(safe-area-inset-bottom)",
      }}
    >
      <div className="px-4 pt-4 pb-6 overflow-x-hidden [&_table]:text-xs">{children}</div>
      {dock ? <BottomDock role={role} /> : null}
    </main>
  );
}

function CircleLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <NavLink to={to} className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/70 shadow-[0_6px_18px_rgba(0,0,0,0.04)]">
      {children}
    </NavLink>
  );
}

export function PageHeader({
  title,
  left,
  right,
}: {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <header className="mb-5 flex items-center justify-between">
      <div className="flex w-12 justify-start">{left}</div>
      <h1 className="text-[22px] font-medium tracking-tight text-[#131313]">{title}</h1>
      <div className="flex w-12 justify-end">{right}</div>
    </header>
  );
}

export function Surface({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <article
      className={cls(
        `rounded-[28px] border border-white/80 ${cardBg} shadow-[0_8px_28px_rgba(0,0,0,0.04)]`,
        className
      )}
    >
      {children}
    </article>
  );
}

export function Pill({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={cls("inline-flex items-center rounded-full px-4 py-2 text-sm font-medium", dark ? "bg-black text-white" : `${mintBg} text-[#1a8f36]`)}>
      {children}
    </span>
  );
}

type DockItem = { to: string; labelKey: string };

export function BottomDock({ role }: { role: UserRole }) {
  const { t } = useTranslation();
  const items: DockItem[] =
    role === "agent"
      ? [
          { to: `/dashboard`, labelKey: "mobile.my_day" },
          { to: `/add-listing`, labelKey: "mobile.add" },
          { to: `/conflict-check`, labelKey: "mobile.check" },
          { to: `/more`, labelKey: "mobile.more" },
        ]
      : role === "secretary"
      ? [
          { to: `/dashboard`, labelKey: "mobile.overview" },
          { to: `/ops`, labelKey: "mobile.live" },
          { to: `/properties`, labelKey: "mobile.inventory" },
          { to: `/more`, labelKey: "mobile.more" },
        ]
      : [
          { to: `/dashboard`, labelKey: "mobile.overview" },
          { to: `/ops`, labelKey: "mobile.live" },
          { to: `/leaderboard`, labelKey: "mobile.ranking" },
          { to: `/more`, labelKey: "mobile.more" },
        ];

  const { pathname } = useLocation();
  const primaryRoutes = items.filter((i) => i.to !== "/more").map((i) => i.to);
  const matchesAnyPrimary = primaryRoutes.some(
    (r) => pathname === r || pathname.startsWith(r + "/")
  );

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 flex justify-center px-5 pointer-events-none"
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <div className="w-full max-w-[430px] rounded-[28px] border border-white/80 bg-[#fbfaf6]/95 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur pointer-events-auto">
        <div className="grid grid-cols-4 gap-2">
          {items.map((item) => {
            const matchesOwn = pathname === item.to || pathname.startsWith(item.to + "/");
            const isMoreItem = item.to === "/more";
            const isActive = matchesOwn || (isMoreItem && !matchesAnyPrimary);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={cls(
                  "rounded-[22px] px-3 py-3 text-center text-[12px] font-medium transition",
                  isActive ? "bg-black text-white" : "text-slate-500"
                )}
              >
                {t(item.labelKey)}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function OverviewScreen({ role }: { role: UserRole }) {
  const { t } = useTranslation();
  const property = properties[0];
  const roleImage =
    role === "director"
      ? "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
      : role === "secretary"
      ? "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
      : property.image;

  const priorityItems =
    role === "director"
      ? [
          { labelKey: "mobile.priority.director.1", to: "/nodes" },
          { labelKey: "mobile.priority.director.2", to: "/conflict-check" },
          { labelKey: "mobile.priority.director.3", to: "/leaderboard" },
        ]
      : role === "secretary"
      ? [
          { labelKey: "mobile.priority.secretary.1", to: "/ops" },
          { labelKey: "mobile.priority.secretary.2", to: "/owners" },
          { labelKey: "mobile.priority.secretary.3", to: "/conflict-check" },
        ]
      : [
          { labelKey: "mobile.priority.agent.1", to: "/ops" },
          { labelKey: "mobile.priority.agent.2", to: "/properties" },
          { labelKey: "mobile.priority.agent.3", to: "/add-listing" },
        ];

  const pageTitle =
    role === "agent"
      ? t("mobile.my_day")
      : role === "secretary"
      ? t("mobile.operations_board")
      : t("mobile.director_board");

  return (
    <AppShell role={role}>
      <PageHeader
        title={pageTitle}
        left={<CircleLink to="/notifications"><Bell size={18} /></CircleLink>}
        right={<CircleLink to={`/more`}><Share2 size={18} /></CircleLink>}
      />

      <Surface className="overflow-hidden p-3">
        <img src={roleImage} alt={role} className="h-[220px] w-full rounded-[24px] object-cover" />
        <div className="p-2 pt-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[24px] font-light">{t(roleMeta[role].label)}</p>
              <p className="text-sm text-slate-500">{t(roleMeta[role].subtitle)}</p>
            </div>
            <Pill>{t(roleMeta[role].badge)}</Pill>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className={`${mintBg} rounded-[22px] p-4`}>
              <p className="text-sm text-slate-500">
                {role === "director" ? t("mobile.nodes_stat") : role === "secretary" ? t("mobile.open_tasks_stat") : t("mobile.target_stat")}
              </p>
              <p className="mt-1 text-[32px] font-medium">{role === "director" ? "12" : role === "secretary" ? "18" : "3"}</p>
            </div>
            <div className={`${mintBg} rounded-[22px] p-4`}>
              <p className="text-sm text-slate-500">
                {role === "director" ? t("mobile.revenue_stat") : role === "secretary" ? t("mobile.live_agents_stat") : t("mobile.actual_stat")}
              </p>
              <p className="mt-1 text-[32px] font-medium">{role === "director" ? "$84k" : role === "secretary" ? "8" : "2"}</p>
            </div>
            <div className={`${mintBg} rounded-[22px] p-4`}>
              <p className="text-sm text-slate-500">
                {role === "director" ? t("mobile.exclusives_stat") : role === "secretary" ? t("mobile.follow_ups_stat") : t("mobile.status_stat")}
              </p>
              <p className="mt-1 text-[22px] font-medium">{role === "agent" ? t("mobile.field_stat") : role === "director" ? "91" : "14"}</p>
            </div>
          </div>
        </div>
      </Surface>

      <Surface className="mt-4 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[18px] font-medium">{t("mobile.priority_flow")}</p>
        </div>
        <div className="space-y-4">
          {priorityItems.map((item) => (
            <NavLink
              key={item.labelKey}
              to={item.to}
              className="flex items-start justify-between gap-3 rounded-[22px] p-2 transition active:bg-white/70"
            >
              <p className="text-[15px] text-slate-600">{t(item.labelKey)}</p>
              <ChevronRight size={18} className="mt-1 text-slate-300" />
            </NavLink>
          ))}
        </div>
      </Surface>
    </AppShell>
  );
}

function WorkspaceScreen({ role }: { role: UserRole }) {
  const { t } = useTranslation();
  const property = properties[0];

  const pageTitle =
    role === "agent"
      ? t("mobile.agent_detail")
      : role === "secretary"
      ? t("mobile.secretary_detail")
      : t("mobile.director_detail");

  const pill1 =
    role === "agent"
      ? t("mobile.exclusive_lead")
      : role === "secretary"
      ? t("mobile.workflow")
      : t("mobile.agency_node");

  const pill2 =
    role === "agent"
      ? t("mobile.on_field_pill")
      : role === "secretary"
      ? t("mobile.in_progress_pill")
      : t("mobile.active_pill");

  const stat1Label =
    role === "director" ? t("mobile.seats_stat") : role === "secretary" ? t("mobile.agents_stat") : t("mobile.floor_stat");
  const stat1Val =
    role === "director" ? nodes[0].seats : role === "secretary" ? 8 : 2;

  const stat2Label =
    role === "director" ? t("mobile.exclusives_stat") : role === "secretary" ? t("mobile.queue_stat") : t("mobile.bedroom_stat");
  const stat2Val =
    role === "director" ? 91 : role === "secretary" ? 14 : 4;

  const stat3Label =
    role === "director" ? t("mobile.at_risk_stat") : role === "secretary" ? t("mobile.calls_stat") : t("mobile.bathroom_stat");
  const stat3Val =
    role === "director" ? 1 : role === "secretary" ? 6 : 3;

  const detailRows: [string, string][] =
    role === "director"
      ? [
          [t("dashboard.director_label"), nodes[0].director],
          ["MRR", nodes[0].mrr],
          [t("dashboard.renewal_date"), nodes[0].billingDate],
          ["Plan", nodes[0].plan],
        ]
      : role === "secretary"
      ? [
          [t("mobile.open_paperwork"), "6 owner files"],
          [t("mobile.follow_ups_stat"), "14 pending"],
          [t("mobile.coverage_label"), "Arabkir + Nor Nork"],
          [t("mobile.escalations_label"), "2 blocked visits"],
        ]
      : [
          [t("properties.detail.owner"), property.owner],
          [t("mobile.source_label"), property.sourcingMethod],
          [t("properties.detail.district"), property.district],
          [t("mobile.conflict_note_label"), property.conflictNote ?? "—"],
        ];

  return (
    <AppShell role={role}>
      <PageHeader
        title={pageTitle}
        left={<CircleLink to={`/dashboard`}><ArrowLeft size={18} /></CircleLink>}
        right={<CircleLink to={`/properties`}><Share2 size={18} /></CircleLink>}
      />

      <Surface className="overflow-hidden p-3">
        <div className="relative">
          <img src={property.image} alt={property.name} className="h-[260px] w-full rounded-[24px] object-cover" />
          <Pill dark>{pill1}</Pill>
          <div className="absolute right-4 top-4"><Pill>{pill2}</Pill></div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className={`${mintBg} rounded-[22px] p-4`}>
            <Building2 size={18} />
            <p className="mt-3 text-sm text-slate-500">{stat1Label}</p>
            <p className="mt-1 text-[30px] font-medium">{stat1Val}</p>
          </div>
          <div className={`${mintBg} rounded-[22px] p-4`}>
            <BedDouble size={18} />
            <p className="mt-3 text-sm text-slate-500">{stat2Label}</p>
            <p className="mt-1 text-[30px] font-medium">{stat2Val}</p>
          </div>
          <div className={`${mintBg} rounded-[22px] p-4`}>
            <Bath size={18} />
            <p className="mt-3 text-sm text-slate-500">{stat3Label}</p>
            <p className="mt-1 text-[30px] font-medium">{stat3Val}</p>
          </div>
        </div>
      </Surface>

      <Surface className="mt-4 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[18px] font-medium">{t("mobile.details")}</p>
        </div>
        <div className="space-y-4 text-[15px]">
          {detailRows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4">
              <span className="text-slate-500">{label}</span>
              <span className="text-right font-medium text-black">{value}</span>
            </div>
          ))}
        </div>
      </Surface>
    </AppShell>
  );
}

function ChatScreen({ role }: { role: UserRole }) {
  const { t } = useTranslation();
  const avatar = role === "director" ? agents[5].avatar : role === "secretary" ? agents[3].avatar : agents[0].avatar;
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((m) => [...m, draft.trim()]);
    setDraft("");
  };

  const chatTitle =
    role === "agent" ? t("mobile.field_chat") : role === "secretary" ? t("mobile.coordination_chat") : t("mobile.leadership_chat");
  const groupName =
    role === "director" ? t("mobile.agency_group") : role === "secretary" ? t("mobile.office_team") : t("mobile.field_team");
  const msg1 = t(`mobile.chat.${role}.1`);
  const msg2 = t(`mobile.chat.${role}.2`);

  return (
    <AppShell role={role}>
      <PageHeader
        title={chatTitle}
        left={<CircleLink to={`/dashboard`}><ArrowLeft size={18} /></CircleLink>}
        right={<Pill>23 Online</Pill>}
      />

      <div className="space-y-4">
        <Surface className="p-4">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
            <span>10:45 am</span>
            <div className="flex items-center gap-3">
              <span className="font-medium text-black">{groupName}</span>
              <img src={avatar} alt="avatar" className="h-12 w-12 rounded-full object-cover" />
            </div>
          </div>
          <div className={`${mintBg} rounded-[26px] p-4`}>
            <p className="text-[15px] text-slate-700">{msg1}</p>
          </div>
          <div className="mt-4 rounded-[26px] bg-white px-4 py-4">
            <p className="text-[15px] text-slate-700">{msg2}</p>
          </div>
          {messages.map((m, i) => (
            <div key={i} className="mt-3 rounded-[26px] bg-black px-4 py-3 text-white">
              <p className="text-[15px]">{m}</p>
            </div>
          ))}
        </Surface>
      </div>

      <form onSubmit={send} className="mt-6 flex items-center gap-3 rounded-[32px] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)]">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={t("mobile.message_placeholder")}
          className="flex-1 bg-transparent text-[17px] outline-none placeholder:text-slate-400"
        />
        <button type="button" className="text-slate-500" title="Attach">
          <Paperclip size={20} />
        </button>
        <button type="submit" className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white disabled:opacity-40" disabled={!draft.trim()}>
          <SendHorizontal size={20} />
        </button>
      </form>
    </AppShell>
  );
}

export function MoreScreen({ role }: { role: UserRole }) {
  const { state, logout } = useAppState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const links = desktopLinksByRole[role];

  return (
    <AppShell role={role}>
      <PageHeader
        title={t(roleMeta[role].label)}
        left={<CircleLink to={`/dashboard`}><ArrowLeft size={18} /></CircleLink>}
        right={<Pill>{t(roleMeta[role].badge)}</Pill>}
      />

      {state.user && (
        <Surface className="mb-4 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{t("mobile.signed_in")}</p>
          <p className="mt-1 text-[18px] font-medium">{state.user.displayName}</p>
          <p className="text-sm text-slate-500">{state.user.username} · {state.user.role}</p>
          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-[18px] bg-black px-4 py-2.5 text-sm font-medium text-white"
          >
            <LogOut size={14} /> {t("mobile.sign_out")}
          </button>
        </Surface>
      )}

      <Surface className="mt-4 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[18px] font-medium">{t("mobile.all_features")}</p>
          <Users size={18} className="text-slate-500" />
        </div>
        <div className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink key={link.to} to={link.to} className="flex items-center justify-between rounded-[18px] p-2 transition active:bg-white">
                <div className="flex items-center gap-3">
                  <Icon size={16} className="text-slate-500" />
                  <p className="text-[15px] text-slate-700">{t(link.label)}</p>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </NavLink>
            );
          })}
        </div>
      </Surface>

      {role === "agent" && (
        <NavLink
          to="/add-listing"
          className="mt-4 flex items-center justify-center gap-2 rounded-[22px] bg-black px-4 py-4 text-sm font-medium text-white"
        >
          <Plus size={16} /> {t("mobile.add_new_listing")}
        </NavLink>
      )}

      <Surface className="mt-4 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[18px] font-medium">{t("mobile.sourcing_mix")}</p>
          <Trophy size={18} className="text-slate-500" />
        </div>
        <div className="space-y-4">
          {sourcingBreakdown.slice(0, 3).map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-500">{item.label}</span>
                <span className="font-medium text-black">{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#e5e2d9]">
                <div className="h-full rounded-full bg-[#11a82e]" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Surface>
    </AppShell>
  );
}

export function MobileNativeApp({
  role,
}: {
  role: UserRole;
}) {
  return (
    <Routes>
      <Route path="dashboard" element={<OverviewScreen role={role} />} />
      <Route path="workspace" element={<WorkspaceScreen role={role} />} />
      <Route path="chat" element={<ChatScreen role={role} />} />
      <Route path="more" element={<MoreScreen role={role} />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
