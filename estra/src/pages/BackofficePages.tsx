import { ReactNode, useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  BellRing,
  CheckCheck,
  CreditCard,
  Layers3,
  LogOut,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Activity,
  AlertTriangle,
  Building2,
  Trash2,
  Plus,
  Settings2,
  Moon,
  Sun,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Topbar } from "../components/Topbar";
import { useAppState, ACCOUNTS } from "../state/AppState";
import { desktopLinksByRole, UserRole, roleMeta } from "../lib/roles";
import { cls } from "../lib/ui";

function Card({
  title,
  icon: Icon,
  children,
  action,
}: {
  title: string;
  icon: typeof UsersRound;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-[#efe9dd] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Icon size={15} className="text-brand-600" />
          {title}
        </p>
        {action}
      </div>
      {children}
    </article>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="rounded-2xl border border-[#efe9dd] bg-white p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className={cls("mt-1 text-xl font-semibold", accent ?? "text-slate-800")}>{value}</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ClientsPage — live subscription / nodes overview                          */
/* -------------------------------------------------------------------------- */
export function ClientsPage() {
  const { state } = useAppState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const nodes = state.nodes;

  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Trial" | "At Risk">("All");
  const filtered = statusFilter === "All" ? nodes : nodes.filter((n) => n.status === statusFilter);

  const active = nodes.filter((n) => n.status === "Active").length;
  const trial = nodes.filter((n) => n.status === "Trial").length;
  const pastDue = nodes.filter((n) => n.status === "At Risk").length;
  const mrr = nodes
    .filter((n) => n.status !== "At Risk")
    .reduce((sum, n) => sum + (parseFloat(String(n.mrr).replace(/[^0-9.]/g, "")) || 0), 0);

  const canManage = state.user?.role === "director";

  return (
    <div>
      <Topbar
        title={t("clients.title")}
        subtitle={t("clients.subtitle")}
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        <Kpi label={t("clients.kpi.total_nodes")} value={nodes.length} />
        <Kpi label={t("clients.kpi.active")} value={active} accent="text-emerald-700" />
        <Kpi label={t("clients.kpi.trial")} value={trial} accent="text-blue-700" />
        <Kpi label={t("clients.kpi.at_risk")} value={pastDue} accent="text-rose-700" />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {(["All", "Active", "Trial", "At Risk"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cls(
              "rounded-full border px-3 py-1.5 text-xs transition",
              statusFilter === s
                ? "border-black bg-black text-white"
                : "border-[#ece6db] bg-white text-slate-600 hover:bg-slate-50"
            )}
          >
            {s}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-500">
          {t("clients.approx_mrr")} <strong className="text-slate-800">${mrr.toLocaleString()}</strong>
        </span>
        {canManage && (
          <button
            onClick={() => navigate("/nodes")}
            className="inline-flex items-center gap-1 rounded-full bg-black px-3 py-1.5 text-xs text-white hover:bg-slate-800"
          >
            <Plus size={12} /> {t("clients.manage_nodes")}
          </button>
        )}
      </div>

      <Card title={t("clients.subscriptions")} icon={Layers3}>
        {filtered.length === 0 && (
          <p className="rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-500">{t("clients.no_nodes")}</p>
        )}
        <div className="space-y-2">
          {filtered.map((node) => (
            <div key={node.id} className="rounded-xl border border-[#efe9dd] p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">{node.agency}</p>
                  <p className="truncate text-xs text-slate-500">
                    {node.plan} · {node.seats} {t("clients.seats")} · {node.mrr}
                  </p>
                </div>
                <span
                  className={cls(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium",
                    node.status === "Active"
                      ? "bg-emerald-50 text-emerald-700"
                      : node.status === "Trial"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-rose-50 text-rose-700"
                  )}
                >
                  {node.status}
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {t("clients.director")} {node.director} · {t("clients.region")} {node.region} · {t("clients.renewal")} {node.billingDate}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  OwnersPage — live Users & Permissions matrix                              */
/* -------------------------------------------------------------------------- */
export function OwnersPage() {
  const { state } = useAppState();
  const { t } = useTranslation();
  const me = state.user;

  return (
    <div>
      <Topbar
        title={t("owners.title")}
        subtitle={t("owners.subtitle")}
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        {(Object.keys(roleMeta) as UserRole[]).map((role) => {
          const count = ACCOUNTS.filter((a) => a.role === role).length;
          const features = desktopLinksByRole[role].length;
          return (
            <div key={role} className="rounded-2xl border border-[#efe9dd] bg-white p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                {t(roleMeta[role].label)}
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-800">{count} {t("owners.user")}</p>
              <p className="mt-1 text-xs text-slate-500">{features} {t("owners.features")}</p>
            </div>
          );
        })}
      </div>

      <Card title={t("owners.accounts")} icon={UsersRound}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                <th className="py-2">{t("owners.col.user")}</th>
                <th className="py-2">{t("owners.col.role")}</th>
                <th className="py-2">{t("owners.col.username")}</th>
                <th className="py-2">{t("owners.col.linked_agent")}</th>
                <th className="py-2 text-right">{t("owners.col.status")}</th>
              </tr>
            </thead>
            <tbody>
              {ACCOUNTS.map((acc) => {
                const linkedAgent = state.agents.find((a) => a.id === acc.agentId);
                const isMe = me?.username === acc.username;
                return (
                  <tr key={acc.username} className="border-t border-[#efe9dd]">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{acc.displayName}</span>
                        {isMe && (
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700">
                            {t("owners.you")}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                        {t(roleMeta[acc.role].label)}
                      </span>
                    </td>
                    <td className="py-3 text-slate-600">{acc.username}</td>
                    <td className="py-3 text-slate-600">
                      {linkedAgent ? `${linkedAgent.name} · ${linkedAgent.district}` : "—"}
                    </td>
                    <td className="py-3 text-right text-xs text-emerald-700">{t("owners.active")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {(Object.keys(roleMeta) as UserRole[]).map((role) => (
          <div key={role} className="rounded-2xl border border-[#efe9dd] bg-white p-4">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ShieldCheck size={14} className="text-brand-600" />
              {t(roleMeta[role].label)} {t("owners.access")}
            </p>
            <p className="mt-1 text-xs text-slate-500">{t(roleMeta[role].subtitle)}</p>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              {desktopLinksByRole[role].map((l) => (
                <li key={l.to} className="flex items-center justify-between gap-2">
                  <span>• {t(l.label)}</span>
                  <Link to={l.to} className="text-[11px] text-slate-400 hover:text-slate-700">
                    {l.to}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MessagesPage — redirect to the real Commission Calculator                 */
/* -------------------------------------------------------------------------- */
export function MessagesPage() {
  return <Navigate to="/commission" replace />;
}

/* -------------------------------------------------------------------------- */
/*  NotificationsPage — live feed                                             */
/* -------------------------------------------------------------------------- */
interface Notice {
  id: string;
  icon: ReactNode;
  title: string;
  body: string;
  to?: string;
  tone: "info" | "warn" | "ok";
}

export function NotificationsPage() {
  const { state } = useAppState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const items = useMemo<Notice[]>(() => {
    const onField = state.agents.filter((a) => a.status === "On-Field");
    const recentListings = [...state.listingLog]
      .sort((a, b) => (a.loggedAt < b.loggedAt ? 1 : -1))
      .slice(0, 5);
    const conflicts = state.properties.filter(
      (p) =>
        p.conflictNote?.toLowerCase().includes("visited") ||
        p.conflictNote?.toLowerCase().includes("blocked")
    );

    const out: Notice[] = [];

    onField.forEach((a) =>
      out.push({
        id: `field-${a.id}`,
        tone: "ok",
        icon: <Activity size={14} className="text-emerald-700" />,
        title: `${a.name} ${t("notifications.on_field")}`,
        body: `${a.location} · ${a.district}`,
        to: "/ops",
      })
    );

    recentListings.forEach((l) => {
      const prop = state.properties.find((p) => p.id === l.propertyId);
      const agent = state.agents.find((a) => a.id === l.agentId);
      if (!prop) return;
      out.push({
        id: `listing-${l.propertyId}`,
        tone: "info",
        icon: <Building2 size={14} className="text-brand-600" />,
        title: `${agent?.name ?? "An agent"} ${t("notifications.added")} "${prop.name}"`,
        body: `${prop.address} · ${prop.price}`,
        to: "/properties",
      });
    });

    conflicts.slice(0, 3).forEach((p) =>
      out.push({
        id: `conflict-${p.id}`,
        tone: "warn",
        icon: <AlertTriangle size={14} className="text-amber-700" />,
        title: `${t("notifications.conflict_on")} ${p.address}`,
        body: p.conflictNote ?? t("notifications.possible_duplicate"),
        to: "/conflict-check",
      })
    );

    return out;
  }, [state, t]);

  const unread = items.filter((i) => !readIds.has(i.id)).length;

  return (
    <div>
      <Topbar
        title={t("notifications.title")}
        subtitle={t("notifications.subtitle")}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          <strong className="text-slate-900">{unread}</strong> {t("notifications.unread")} {items.length}
        </p>
        <button
          onClick={() => setReadIds(new Set(items.map((i) => i.id)))}
          className="inline-flex items-center gap-1 rounded-full border border-[#ece6db] bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
        >
          <CheckCheck size={12} /> {t("notifications.mark_all_read")}
        </button>
      </div>

      <Card title={t("notifications.recent_activity")} icon={BellRing}>
        {items.length === 0 && (
          <p className="rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-500">
            {t("notifications.nothing")}
          </p>
        )}
        <ul className="divide-y divide-[#efe9dd]">
          {items.map((n) => {
            const isRead = readIds.has(n.id);
            return (
              <li
                key={n.id}
                className={cls(
                  "flex items-start gap-3 py-3",
                  isRead ? "opacity-60" : ""
                )}
              >
                <span
                  className={cls(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    n.tone === "warn"
                      ? "bg-amber-50"
                      : n.tone === "ok"
                      ? "bg-emerald-50"
                      : "bg-slate-100"
                  )}
                >
                  {n.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">{n.title}</p>
                  <p className="truncate text-xs text-slate-500">{n.body}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {n.to && (
                    <button
                      onClick={() => navigate(n.to!)}
                      className="rounded-full border border-[#ece6db] px-2 py-1 text-[11px] text-slate-700 hover:bg-slate-50"
                    >
                      {t("notifications.open")}
                    </button>
                  )}
                  {!isRead && (
                    <button
                      onClick={() =>
                        setReadIds((prev) => {
                          const next = new Set(prev);
                          next.add(n.id);
                          return next;
                        })
                      }
                      className="text-[11px] text-slate-500 underline-offset-2 hover:underline"
                    >
                      {t("notifications.mark_read")}
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  SettingsPage — real account + working preferences                         */
/* -------------------------------------------------------------------------- */
const THEME_KEY = "estateflow-theme-v1";
const DENSITY_KEY = "estateflow-density-v1";

export function SettingsPage() {
  const { state, logout } = useAppState();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const me = state.user;
  const linkedAgent = me ? state.agents.find((a) => a.id === me.agentId) : null;

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (window.localStorage.getItem(THEME_KEY) as "light" | "dark") ?? "light";
  });
  const [density, setDensity] = useState<"comfortable" | "compact">(() => {
    if (typeof window === "undefined") return "comfortable";
    return (window.localStorage.getItem(DENSITY_KEY) as "comfortable" | "compact") ?? "comfortable";
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(DENSITY_KEY, density);
    document.documentElement.dataset.density = density;
  }, [density]);

  const onSignOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (!me) return <Navigate to="/login" replace />;

  return (
    <div>
      <Topbar title={t("settings.title")} subtitle={t("settings.subtitle")} />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <Card title={t("settings.account")} icon={UsersRound}>
          <div className="space-y-2 text-sm">
            <Row label={t("settings.signed_in_as")} value={me.displayName} />
            <Row label={t("settings.username")} value={me.username} />
            <Row label={t("settings.role")} value={t(roleMeta[me.role].label)} />
            {linkedAgent && (
              <>
                <Row label={t("settings.linked_agent")} value={linkedAgent.name} />
                <Row label={t("settings.district")} value={linkedAgent.district} />
                <Row label={t("settings.todays_status")} value={linkedAgent.status} />
              </>
            )}
          </div>
          <button
            onClick={onSignOut}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm text-white hover:bg-rose-700"
          >
            <LogOut size={14} /> {t("settings.sign_out")}
          </button>
        </Card>

        <Card title={t("settings.preferences")} icon={Settings2}>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">{t("settings.theme")}</p>
                <p className="text-xs text-slate-500">{t("settings.theme_desc")}</p>
              </div>
              <div className="flex rounded-full border border-[#ece6db] bg-white p-1">
                <button
                  onClick={() => setTheme("light")}
                  className={cls(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs",
                    theme === "light" ? "bg-black text-white" : "text-slate-600"
                  )}
                >
                  <Sun size={12} /> {t("settings.light")}
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={cls(
                    "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs",
                    theme === "dark" ? "bg-black text-white" : "text-slate-600"
                  )}
                >
                  <Moon size={12} /> {t("settings.dark")}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">{t("settings.density")}</p>
                <p className="text-xs text-slate-500">{t("settings.density_desc")}</p>
              </div>
              <div className="flex rounded-full border border-[#ece6db] bg-white p-1">
                <button
                  onClick={() => setDensity("comfortable")}
                  className={cls(
                    "rounded-full px-3 py-1 text-xs",
                    density === "comfortable" ? "bg-black text-white" : "text-slate-600"
                  )}
                >
                  {t("settings.comfortable")}
                </button>
                <button
                  onClick={() => setDensity("compact")}
                  className={cls(
                    "rounded-full px-3 py-1 text-xs",
                    density === "compact" ? "bg-black text-white" : "text-slate-600"
                  )}
                >
                  {t("settings.compact")}
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-[#ece6db] bg-slate-50 px-3 py-3 text-xs text-slate-500">
              <p className="inline-flex items-center gap-1 text-slate-700">
                <Sparkles size={12} /> {t("settings.tip")}
              </p>
              {t("settings.tip_text")}
            </div>
          </div>
        </Card>
      </div>

      {me.role === "director" && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <ActionCard
            icon={<CreditCard size={14} className="text-brand-600" />}
            title={t("settings.commissions")}
            desc={t("settings.commissions_desc")}
            to="/commission"
          />
          <ActionCard
            icon={<Trash2 size={14} className="text-rose-600" />}
            title={t("settings.manage_nodes")}
            desc={t("settings.manage_nodes_desc")}
            to="/nodes"
          />
          <ActionCard
            icon={<ShieldCheck size={14} className="text-emerald-700" />}
            title={t("settings.users_permissions")}
            desc={t("settings.users_permissions_desc")}
            to="/owners"
          />
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#efe9dd] py-2 last:border-0">
      <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  desc,
  to,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-[#efe9dd] bg-white p-4 transition hover:border-slate-400"
    >
      <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
        {icon} {title}
      </p>
      <p className="mt-1 text-xs text-slate-500">{desc}</p>
    </Link>
  );
}
