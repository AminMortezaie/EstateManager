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
import { Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
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

export function BottomDock({ role }: { role: UserRole }) {
  const items =
    role === "agent"
      ? [
          { to: `/dashboard`, label: "My Day" },
          { to: `/add-listing`, label: "Add" },
          { to: `/conflict-check`, label: "Check" },
          { to: `/more`, label: "More" },
        ]
      : role === "secretary"
      ? [
          { to: `/dashboard`, label: "Overview" },
          { to: `/ops`, label: "Live" },
          { to: `/properties`, label: "Inventory" },
          { to: `/more`, label: "More" },
        ]
      : [
          { to: `/dashboard`, label: "Overview" },
          { to: `/ops`, label: "Live" },
          { to: `/leaderboard`, label: "Leaderboard" },
          { to: `/more`, label: "More" },
        ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 flex justify-center px-5 pointer-events-none"
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <div className="w-full max-w-[430px] rounded-[28px] border border-white/80 bg-[#fbfaf6]/95 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur pointer-events-auto">
        <div className="grid grid-cols-4 gap-2">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cls(
                  "rounded-[22px] px-3 py-3 text-center text-[12px] font-medium transition",
                  isActive ? "bg-black text-white" : "text-slate-500"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

function OverviewScreen({ role }: { role: UserRole }) {
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
          { label: "Review node subscription health and at-risk renewals.", to: "/nodes" },
          { label: "Approve exclusive listing ownership and conflict routing.", to: "/conflict-check" },
          { label: "Check leaderboard and commission approval queue.", to: "/leaderboard" },
        ]
      : role === "secretary"
      ? [
          { label: "Monitor live agent statuses and district coverage.", to: "/ops" },
          { label: "Coordinate owner paperwork and follow-up queues.", to: "/owners" },
          { label: "Prevent duplicate field assignments from the inventory history.", to: "/conflict-check" },
        ]
      : [
          { label: "Update your field status before leaving the office.", to: "/ops" },
          { label: "Review exclusive and recently visited properties.", to: "/properties" },
          { label: "Log sourcing method and progress toward today\u2019s options goal.", to: "/add-listing" },
        ];

  return (
    <AppShell role={role}>
      <PageHeader
        title={role === "agent" ? "My Day" : role === "secretary" ? "Operations Board" : "Director Board"}
        left={<CircleLink to="/notifications"><Bell size={18} /></CircleLink>}
        right={<CircleLink to={`/more`}><Share2 size={18} /></CircleLink>}
      />

      <Surface className="overflow-hidden p-3">
        <img src={roleImage} alt={role} className="h-[220px] w-full rounded-[24px] object-cover" />
        <div className="p-2 pt-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[24px] font-light">{roleMeta[role].label}</p>
              <p className="text-sm text-slate-500">{roleMeta[role].subtitle}</p>
            </div>
            <Pill>{roleMeta[role].badge}</Pill>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className={`${mintBg} rounded-[22px] p-4`}>
              <p className="text-sm text-slate-500">{role === "director" ? "Nodes" : role === "secretary" ? "Open Tasks" : "Target"}</p>
              <p className="mt-1 text-[32px] font-medium">{role === "director" ? "12" : role === "secretary" ? "18" : "3"}</p>
            </div>
            <div className={`${mintBg} rounded-[22px] p-4`}>
              <p className="text-sm text-slate-500">{role === "director" ? "Revenue" : role === "secretary" ? "Live Agents" : "Actual"}</p>
              <p className="mt-1 text-[32px] font-medium">{role === "director" ? "$84k" : role === "secretary" ? "8" : "2"}</p>
            </div>
            <div className={`${mintBg} rounded-[22px] p-4`}>
              <p className="text-sm text-slate-500">{role === "director" ? "Exclusives" : role === "secretary" ? "Follow-ups" : "Status"}</p>
              <p className="mt-1 text-[22px] font-medium">{role === "agent" ? "Field" : role === "director" ? "91" : "14"}</p>
            </div>
          </div>
        </div>
      </Surface>

      <Surface className="mt-4 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[18px] font-medium">Priority Flow</p>
        </div>
        <div className="space-y-4">
          {priorityItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className="flex items-start justify-between gap-3 rounded-[22px] p-2 transition active:bg-white/70"
            >
              <p className="text-[15px] text-slate-600">{item.label}</p>
              <ChevronRight size={18} className="mt-1 text-slate-300" />
            </NavLink>
          ))}
        </div>
      </Surface>
    </AppShell>
  );
}

function WorkspaceScreen({ role }: { role: UserRole }) {
  const property = properties[0];

  return (
    <AppShell role={role}>
      <PageHeader
        title={role === "agent" ? "Property Details" : role === "secretary" ? "Operations Detail" : "Agency Detail"}
        left={<CircleLink to={`/dashboard`}><ArrowLeft size={18} /></CircleLink>}
        right={<CircleLink to={`/properties`}><Share2 size={18} /></CircleLink>}
      />

      <Surface className="overflow-hidden p-3">
        <div className="relative">
          <img src={property.image} alt={property.name} className="h-[260px] w-full rounded-[24px] object-cover" />
          <Pill dark>{role === "agent" ? "Exclusive Lead" : role === "secretary" ? "Workflow" : "Agency Node"}</Pill>
          <div className="absolute right-4 top-4"><Pill>{role === "agent" ? "On-Field" : role === "secretary" ? "In Progress" : "Active"}</Pill></div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className={`${mintBg} rounded-[22px] p-4`}>
            <Building2 size={18} />
            <p className="mt-3 text-sm text-slate-500">{role === "director" ? "Seats" : role === "secretary" ? "Agents" : "Floor"}</p>
            <p className="mt-1 text-[30px] font-medium">{role === "director" ? nodes[0].seats : role === "secretary" ? 8 : 2}</p>
          </div>
          <div className={`${mintBg} rounded-[22px] p-4`}>
            <BedDouble size={18} />
            <p className="mt-3 text-sm text-slate-500">{role === "director" ? "Exclusives" : role === "secretary" ? "Queue" : "Bedroom"}</p>
            <p className="mt-1 text-[30px] font-medium">{role === "director" ? 91 : role === "secretary" ? 14 : 4}</p>
          </div>
          <div className={`${mintBg} rounded-[22px] p-4`}>
            <Bath size={18} />
            <p className="mt-3 text-sm text-slate-500">{role === "director" ? "At Risk" : role === "secretary" ? "Calls" : "Bathroom"}</p>
            <p className="mt-1 text-[30px] font-medium">{role === "director" ? 1 : role === "secretary" ? 6 : 3}</p>
          </div>
        </div>
      </Surface>

      <Surface className="mt-4 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[18px] font-medium">Details</p>
        </div>
        <div className="space-y-4 text-[15px]">
          {(role === "director"
            ? [
                ["Director", nodes[0].director],
                ["MRR", nodes[0].mrr],
                ["Renewal", nodes[0].billingDate],
                ["Plan", nodes[0].plan],
              ]
            : role === "secretary"
            ? [
                ["Open paperwork", "6 owner files"],
                ["Follow-ups", "14 pending"],
                ["Coverage", "Arabkir + Nor Nork"],
                ["Escalations", "2 blocked visits"],
              ]
            : [
                ["Owner", property.owner],
                ["Source", property.sourcingMethod],
                ["District", property.district],
                ["Conflict note", property.conflictNote],
              ]).map(([label, value]) => (
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
  const avatar = role === "director" ? agents[5].avatar : role === "secretary" ? agents[3].avatar : agents[0].avatar;
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((m) => [...m, draft.trim()]);
    setDraft("");
  };

  return (
    <AppShell role={role}>
      <PageHeader
        title={role === "agent" ? "Field Chat" : role === "secretary" ? "Coordination Chat" : "Leadership Chat"}
        left={<CircleLink to={`/dashboard`}><ArrowLeft size={18} /></CircleLink>}
        right={<Pill>23 Online</Pill>}
      />

      <div className="space-y-4">
        <Surface className="p-4">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
            <span>10:45 am</span>
            <div className="flex items-center gap-3">
              <span className="font-medium text-black">
                {role === "director" ? "Agency Group" : role === "secretary" ? "Office Team" : "Field Team"}
              </span>
              <img src={avatar} alt="avatar" className="h-12 w-12 rounded-full object-cover" />
            </div>
          </div>
          <div className={`${mintBg} rounded-[26px] p-4`}>
            <p className="text-[15px] text-slate-700">
              {role === "director"
                ? "North District Homes renewal is flagged. Review before tomorrow."
                : role === "secretary"
                ? "Owner document package is ready. Reassign Nor Nork follow-up after lunch."
                : "Neighbor confirmed a second-floor vacancy. Logging it as on-field source."}
            </p>
          </div>
          <div className="mt-4 rounded-[26px] bg-white px-4 py-4">
            <p className="text-[15px] text-slate-700">
              {role === "director"
                ? "Approve exclusive ownership after secretary confirms paperwork."
                : role === "secretary"
                ? "I\u2019ll update the status board and block duplicate outreach."
                : "Need owner phone number and whether the listing is already visited."}
            </p>
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
          placeholder="Enter your message"
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
  const navigate = useNavigate();
  const links = desktopLinksByRole[role];

  return (
    <AppShell role={role}>
      <PageHeader
        title={roleMeta[role].label}
        left={<CircleLink to={`/dashboard`}><ArrowLeft size={18} /></CircleLink>}
        right={<Pill>{roleMeta[role].badge}</Pill>}
      />

      {state.user && (
        <Surface className="mb-4 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Signed in</p>
          <p className="mt-1 text-[18px] font-medium">{state.user.displayName}</p>
          <p className="text-sm text-slate-500">{state.user.username} · {state.user.role}</p>
          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-[18px] bg-black px-4 py-2.5 text-sm font-medium text-white"
          >
            <LogOut size={14} /> Sign out
          </button>
        </Surface>
      )}

      <Surface className="mt-4 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[18px] font-medium">All Features</p>
          <Users size={18} className="text-slate-500" />
        </div>
        <div className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink key={link.to} to={link.to} className="flex items-center justify-between rounded-[18px] p-2 transition active:bg-white">
                <div className="flex items-center gap-3">
                  <Icon size={16} className="text-slate-500" />
                  <p className="text-[15px] text-slate-700">{link.label}</p>
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
          <Plus size={16} /> Add new listing
        </NavLink>
      )}

      <Surface className="mt-4 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[18px] font-medium">Sourcing Mix</p>
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
