import { ReactNode } from "react";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  ChevronRight,
  CircleEllipsis,
  Paperclip,
  SendHorizontal,
  Share2,
  Trophy,
  Users,
} from "lucide-react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { agents, nodes, properties, roleWindows, sourcingBreakdown } from "../data/mockData";
import { roleMeta, UserRole } from "../lib/roles";
import { cls } from "../lib/ui";

const shellBg = "bg-[#f6f4ee]";
const cardBg = "bg-[#fbfaf6]";
const mintBg = "bg-[#e8f8ea]";

export function AppShell({ children, dock = true, role }: { children: ReactNode; dock?: boolean; role: UserRole }) {
  return (
    <main className={`mx-auto min-h-screen w-full max-w-[430px] ${shellBg} text-[#111111] pb-24`}>
      <div className="sticky top-0 z-20 bg-[#f6f4ee]/95 px-5 pb-3 pt-4 backdrop-blur">
        <div className="flex items-center justify-between text-[13px] font-semibold">
          <span>13:13</span>
          <div className="h-8 w-28 rounded-full bg-[#102022]" />
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-700" />
            <span className="h-2 w-2 rounded-full bg-slate-700" />
            <span className="h-2 w-2 rounded-full bg-slate-700" />
          </div>
        </div>
      </div>
      <div className="px-5 pb-6">{children}</div>
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

export function BottomDock({ role: _role }: { role: UserRole }) {
  const items = [
    { to: `/dashboard`, label: "Overview" },
    { to: `/properties`, label: "Inventory" },
    { to: `/chat`, label: "Chat" },
    { to: `/more`, label: "More" },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 flex justify-center px-5 pb-4 pointer-events-none">
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

  return (
    <AppShell role={role}>
      <PageHeader
        title={role === "agent" ? "My Day" : role === "secretary" ? "Operations Board" : "Director Board"}
        left={<CircleLink to="/"><ArrowLeft size={18} /></CircleLink>}
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
          <CircleEllipsis size={18} className="text-slate-500" />
        </div>
        <div className="space-y-4">
          {(role === "director"
            ? [
                "Review node subscription health and at-risk renewals.",
                "Approve exclusive listing ownership and conflict routing.",
                "Check leaderboard and commission approval queue.",
              ]
            : role === "secretary"
            ? [
                "Monitor live agent statuses and district coverage.",
                "Coordinate owner paperwork and follow-up queues.",
                "Prevent duplicate field assignments from the inventory history.",
              ]
            : [
                "Update your field status before leaving the office.",
                "Review exclusive and recently visited properties.",
                "Log sourcing method and progress toward today’s options goal.",
              ]).map((item) => (
            <NavLink
              key={item}
              to={role === "agent" ? `/properties` : role === "secretary" ? `/chat` : `/more`}
              className="flex items-start justify-between gap-3 rounded-[22px] p-2 transition active:bg-white/70"
            >
              <p className="text-[15px] text-slate-600">{item}</p>
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
        right={<CircleLink to={`/chat`}><Share2 size={18} /></CircleLink>}
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
          <CircleEllipsis size={18} className="text-slate-500" />
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
                ? "I’ll update the status board and block duplicate outreach."
                : "Need owner phone number and whether the listing is already visited."}
            </p>
          </div>
        </Surface>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-[32px] bg-white px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.05)]">
        <span className="flex-1 text-[17px] text-slate-400">Enter your message</span>
        <Paperclip size={20} className="text-slate-500" />
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
          <SendHorizontal size={20} />
        </button>
      </div>
    </AppShell>
  );
}

function MoreScreen({ role }: { role: UserRole }) {
  const permissions = roleWindows.find(
    (window) =>
      window.role.toLowerCase() === (role === "director" ? "director" : role === "secretary" ? "secretary" : "agent")
  );

  return (
    <AppShell role={role}>
      <PageHeader
        title={roleMeta[role].label}
        left={<CircleLink to={`/dashboard`}><ArrowLeft size={18} /></CircleLink>}
        right={<Pill>{roleMeta[role].badge}</Pill>}
      />

      <Surface className="mt-4 p-5">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[18px] font-medium">Allowed Access</p>
          <Users size={18} className="text-slate-500" />
        </div>
        <div className="space-y-4">
          {(permissions?.access ?? []).map((item) => {
            const link = item.toLowerCase().includes("agents") ? "/agents" :
                         item.toLowerCase().includes("inventory") || item.toLowerCase().includes("listings") ? "/properties" :
                         item.toLowerCase().includes("map") || item.toLowerCase().includes("districts") ? "/map" :
                         item.toLowerCase().includes("dashboard") || item.toLowerCase().includes("overview") ? "/dashboard" : "/properties";
            return (
              <NavLink key={item} to={link} className="flex items-center justify-between rounded-[18px] p-1.5 transition active:bg-white">
                <p className="text-[15px] text-slate-600">{item}</p>
                <ChevronRight size={18} className="text-slate-300" />
              </NavLink>
            );
          })}
        </div>
      </Surface>

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
      <Route path="properties" element={<WorkspaceScreen role={role} />} />
      <Route path="chat" element={<ChatScreen role={role} />} />
      <Route path="more" element={<MoreScreen role={role} />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
