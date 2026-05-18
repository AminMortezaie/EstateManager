import {
  Apple,
  ArrowRight,
  Bell,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  Eye,
  Home,
  ImagePlus,
  Lock,
  Mail,
  MapPinned,
  Menu,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Navigation,
  Phone,
  PhoneCall,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { ReactNode } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { Topbar } from "../components/Topbar";
import { agents, properties, visits } from "../data/mockData";
import { cls } from "../lib/ui";

function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <article className="mx-auto w-full max-w-[350px] rounded-[2.6rem] border border-slate-300 bg-slate-100 p-2 shadow-xl">
      <div className="relative overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-inner">
        <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-900" />
        <div className="flex items-center justify-between px-5 pt-8 text-[11px] font-semibold text-slate-900">
          <span>9:41</span>
          <span className="text-slate-500">EstateFlow</span>
        </div>
        <div className="px-4 pb-3 pt-2">{children}</div>
      </div>
    </article>
  );
}

function ScreenHeader({
  title,
  subtitle,
  showBack,
}: {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}) {
  return (
    <header className="mb-3 flex items-start justify-between">
      <div className="flex items-start gap-2">
        {showBack ? (
          <button className="mt-0.5 rounded-full p-1 text-slate-500">
            <ChevronLeft size={16} />
          </button>
        ) : null}
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          {subtitle ? <p className="text-[11px] text-slate-500">{subtitle}</p> : null}
        </div>
      </div>
      <button className="rounded-full border border-slate-200 p-1.5 text-slate-600">
        <Bell size={14} />
      </button>
    </header>
  );
}

function MobileBottomNav() {
  const itemClass = ({ isActive }: { isActive: boolean }) =>
    cls(
      "flex flex-col items-center gap-0.5 rounded-lg px-2 py-1 text-[10px] font-medium",
      isActive ? "text-brand-700" : "text-slate-500"
    );

  return (
    <div className="relative mt-10 pt-2">
      <nav className="grid grid-cols-5 items-center rounded-2xl border border-slate-200 bg-white px-2 py-2 text-slate-500 shadow-sm">
        <NavLink to="/mobile-app/home" className={itemClass}>
          <Home size={16} />
          Home
        </NavLink>
        <NavLink to="/mobile-app/visits" className={itemClass}>
          <CheckCircle2 size={16} />
          Visits
        </NavLink>
        <span aria-hidden className="block" />
        <NavLink to="/mobile-app/clients" className={itemClass}>
          <Users size={16} />
          Clients
        </NavLink>
        <NavLink to="/mobile-app/profile" className={itemClass}>
          <MoreHorizontal size={16} />
          More
        </NavLink>
      </nav>
      <button
        type="button"
        style={{ top: "-22px" }}
        className="absolute left-1/2 z-50 inline-flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-brand-600 text-white shadow-[0_18px_30px_rgba(79,70,229,0.45)] ring-4 ring-white"
      >
        <Plus size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
}

function LoginScreen() {
  return (
    <PhoneShell>
      <div className="-mx-4 -mt-2 pb-2">
        <div className="px-5 pt-2 text-center">
          <p className="text-3xl font-semibold tracking-tight text-slate-900">
            Estate<span className="text-brand-600">Flow</span>
          </p>
          <p className="mt-1 text-[12px] font-semibold text-slate-700">Real Estate Operations Platform</p>
          <p className="mt-0.5 text-[11px] text-slate-500">Manage agents. Track visits. Close more deals.</p>
        </div>
        <div className="mt-4 h-24 bg-gradient-to-b from-white via-brand-50/40 to-brand-100/80">
          <svg viewBox="0 0 420 120" className="h-full w-full text-brand-300">
            <path
              d="M0 88 C45 75, 78 48, 110 56 C143 65, 172 95, 210 82 C239 72, 260 41, 294 50 C332 61, 360 87, 420 73"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8 102 L412 102 M24 102 L24 82 L38 82 L38 102 M58 102 L58 74 L74 74 L74 102 M94 102 L94 78 L114 78 L114 102 M136 102 L136 68 L156 68 L156 102 M178 102 L178 70 L198 70 L198 102 M224 102 L224 64 L246 64 L246 102 M272 102 L272 75 L292 75 L292 102 M316 102 L316 69 L338 69 L338 102 M356 102 L356 80 L378 80 L378 102"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="mt-[-4px] rounded-t-[2rem] bg-white px-5 pb-5 pt-4 shadow-[0_-8px_24px_rgba(15,23,42,0.06)]">
          <p className="text-center text-[22px] font-semibold text-slate-900">Welcome back!</p>
          <p className="mt-1 text-center text-[15px] text-slate-500">Please sign in to continue</p>

          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
              <Mail size={16} className="text-brand-600" />
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-slate-700">Email</p>
                <p className="truncate text-[13px] text-slate-400">Enter your email</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5">
              <Lock size={16} className="text-brand-600" />
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-medium text-slate-700">Password</p>
                <p className="truncate text-[13px] text-slate-400">Enter your password</p>
              </div>
              <Eye size={16} className="text-slate-400" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[12px]">
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-brand-600 text-white">
                <Check size={12} />
              </span>
              Remember me
            </span>
            <button className="font-semibold text-brand-600">Forgot password?</button>
          </div>

          <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 py-3 text-lg font-semibold text-white">
            Log In
            <ArrowRight size={18} />
          </button>

          <div className="mt-4 flex items-center gap-2 text-[13px] text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            or continue with
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <button className="rounded-xl border border-slate-200 py-2.5 text-base font-semibold text-slate-700">
              G
            </button>
            <button className="rounded-xl border border-slate-200 py-2.5 text-slate-700">
              <Apple size={18} className="mx-auto" />
            </button>
            <button className="rounded-xl border border-slate-200 py-2.5 text-brand-600">
              <Phone size={18} className="mx-auto" />
            </button>
          </div>

          <p className="mt-4 text-center text-[14px] text-slate-600">
            Don&apos;t have an account? <span className="font-semibold text-brand-600">Sign up</span>
          </p>
        </div>
      </div>
    </PhoneShell>
  );
}

function HomeScreen() {
  const kpiCards = [
    { label: "Active Agents", value: "12", sub: "2 today", icon: Users, positive: true },
    { label: "Visits Today", value: "28", sub: "15%", icon: Calendar, positive: true },
    { label: "New Leads", value: "7", sub: "3 today", icon: User, positive: true },
    { label: "Deals Closed", value: "4", sub: "This Week", icon: CheckCircle2, positive: null },
    { label: "Pending follow-ups", value: "3", sub: "2 today", icon: Clock3, positive: false },
  ];

  const visitRows = [
    { time: "10:00", property: "Apartment in Center", client: "Mariam S.", agent: "Tatevik M.", status: "Completed" },
    { time: "12:30", property: "New Building", client: "Artak H.", agent: "Karen P.", status: "Completed" },
    { time: "14:15", property: "Private House", client: "Sona K.", agent: "Aram G.", status: "In Progress" },
    { time: "16:00", property: "Apartment in Arabkir", client: "Narek A.", agent: "Lilit H.", status: "Scheduled" },
  ];

  return (
    <PhoneShell>
      <div className="mb-3 flex items-center justify-between">
        <button className="rounded-lg p-1.5 text-brand-600">
          <Menu size={19} />
        </button>
        <div className="mr-auto ml-2">
          <p className="text-[13px] font-medium text-slate-700">Good morning,</p>
          <p className="text-xl font-semibold leading-6 text-slate-900">
            Tatevik <span className="text-[17px]">👋</span>
          </p>
        </div>
        <button className="relative rounded-full p-1 text-slate-700">
          <Bell size={18} />
          <span className="absolute -right-1 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-semibold text-white">
            3
          </span>
        </button>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {kpiCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
            <card.icon size={15} className="text-brand-600" />
            <p className="mt-1 text-3xl font-semibold leading-7 text-slate-900">{card.value}</p>
            <p className="mt-1 text-[9px] font-semibold leading-3 text-slate-700">{card.label}</p>
            <div className="mt-1 inline-flex items-center gap-1 text-[9px] text-slate-500">
              {card.positive === true ? <TrendingUp size={10} className="text-emerald-500" /> : null}
              {card.positive === false ? <TrendingDown size={10} className="text-rose-500" /> : null}
              <span>{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <article className="mt-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-900">Live Agents</p>
          <button className="text-[11px] font-semibold text-brand-600">See all</button>
        </div>
        <div className="relative h-40 overflow-hidden rounded-xl border border-slate-100 bg-sky-50">
          <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full text-brand-400/80">
            <path d="M8 52 C22 42, 32 38, 46 24 S70 16, 82 11" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M22 52 C34 41, 44 33, 62 24 S82 18, 95 8" fill="none" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          <p className="absolute left-[44%] top-[42%] -translate-x-1/2 text-xl font-medium text-slate-700">Yerevan</p>
          {[agents[0], agents[1], agents[2], agents[3]].map((agent, idx) => (
            <img
              key={agent.id}
              src={agent.avatar}
              alt={agent.name}
              className="absolute h-9 w-9 rounded-full border-2 border-white object-cover shadow"
              style={{
                left: `${15 + idx * 23}%`,
                top: `${idx % 2 === 0 ? 18 : 58}%`,
              }}
            />
          ))}
          <button className="absolute bottom-2 right-2 rounded-full bg-white p-2 text-brand-600 shadow">
            <MapPinned size={13} />
          </button>
        </div>
      </article>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <article className="rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-900">Today&apos;s Timeline</p>
            <button className="text-[11px] font-semibold text-brand-600">See all</button>
          </div>
          <div className="space-y-2">
            {["10:00", "12:30", "14:15", "16:00"].map((time, idx) => (
              <div key={time} className="flex items-center gap-1.5">
                <span className="w-7 text-[11px] font-medium text-slate-500">{time}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <img
                  src={agents[idx % agents.length].avatar}
                  alt={agents[idx % agents.length].name}
                  className="h-5 w-5 rounded-full object-cover"
                />
                <div>
                  <p className="text-[11px] font-semibold leading-3 text-slate-900">{agents[idx % agents.length].name.split(" ")[0]} visited</p>
                  <p className="text-[10px] text-slate-500">{properties[idx % properties.length].name.split(" ").slice(0, 2).join(" ")}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-900">Alerts</p>
            <button className="text-[11px] font-semibold text-brand-600">See all</button>
          </div>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-50 text-rose-500">!</span>
              <div>
                <p className="text-[11px] font-semibold leading-4 text-slate-900">Visit delayed</p>
                <p className="text-[10px] leading-3 text-slate-500">Karen is delayed by 25 min</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-50 text-amber-500">•</span>
              <div>
                <p className="text-[11px] font-semibold leading-4 text-slate-900">No check-out</p>
                <p className="text-[10px] leading-3 text-slate-500">Aram did not check out yet</p>
              </div>
            </div>
            <div className="rounded-xl bg-brand-50 p-2">
              <p className="text-[11px] font-semibold text-slate-900">Agent App</p>
              <p className="text-[10px] leading-3 text-slate-600">Track visits, upload photos, and get updates.</p>
            </div>
          </div>
        </article>
      </div>

      <article className="mt-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-900">Today&apos;s Visits</p>
          <button className="text-[11px] font-semibold text-brand-600">See all</button>
        </div>
        <div className="space-y-1.5">
          {visitRows.map((row, idx) => (
            <div key={`${row.time}-${row.property}`} className="grid grid-cols-[36px_1fr_56px_64px_16px] items-center gap-1">
              <p className="text-[10px] font-semibold text-slate-500">{row.time}</p>
              <div className="flex items-center gap-1.5">
                <img src={properties[idx % properties.length].image} alt={row.property} className="h-7 w-7 rounded-md object-cover" />
                <div>
                  <p className="truncate text-[11px] font-semibold leading-3 text-slate-900">{row.property}</p>
                  <p className="text-[10px] text-slate-500">{row.client}</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1">
                <img src={agents[idx % agents.length].avatar} alt={row.agent} className="h-4 w-4 rounded-full object-cover" />
                <p className="truncate text-[10px] font-medium text-slate-700">{row.agent.split(" ")[0]}</p>
              </div>
              <span
                className={cls(
                  "rounded-full px-1.5 py-0.5 text-center text-[9px] font-semibold",
                  row.status === "Completed" && "bg-emerald-50 text-emerald-600",
                  row.status === "In Progress" && "bg-amber-50 text-amber-600",
                  row.status === "Scheduled" && "bg-brand-50 text-brand-700"
                )}
              >
                {row.status}
              </span>
              <ChevronRight size={12} className="text-slate-400" />
            </div>
          ))}
        </div>
      </article>

      <MobileBottomNav />
    </PhoneShell>
  );
}

function VisitsScreen() {
  return (
    <PhoneShell>
      <div className="flex min-h-[620px] flex-col">
        <ScreenHeader title="Visits" subtitle="May 15, 2024" showBack />
        <div className="mb-2 flex rounded-xl bg-slate-100 p-1 text-[10px]">
          {["Today", "Upcoming", "History"].map((tab, idx) => (
            <button
              key={tab}
              className={cls(
                "flex-1 rounded-lg py-1 font-semibold",
                idx === 0 ? "bg-brand-600 text-white" : "text-slate-600"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {visits.map((visit) => {
            const property = properties.find((item) => item.id === visit.propertyId);
            return (
              <div key={visit.id} className="rounded-xl border border-slate-200 bg-white p-2">
                <p className="text-[11px] font-semibold text-slate-900">{property?.name}</p>
                <p className="text-[10px] text-slate-500">{property?.address}</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-500">{visit.start}</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                    {visit.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <button className="mt-auto inline-flex w-full items-center justify-center gap-1 rounded-xl bg-brand-600 py-2 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(79,70,229,0.25)]">
          <Plus size={14} /> Add Visit
        </button>
        <MobileBottomNav />
      </div>
    </PhoneShell>
  );
}

function VisitDetailsScreen() {
  const property = properties[0];
  const agent = agents[2];

  return (
    <PhoneShell>
      <ScreenHeader title="Visit Details" showBack />
      <img src={property.image} alt={property.name} className="h-28 w-full rounded-xl object-cover" />
      <div className="mt-2">
        <p className="text-sm font-semibold text-slate-900">{property.name}</p>
        <p className="text-[11px] text-slate-500">{property.address}</p>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-[10px]">
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="text-slate-500">Price</p>
          <p className="font-semibold text-slate-900">{property.price}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2">
          <p className="text-slate-500">Duration</p>
          <p className="font-semibold text-slate-900">30 min</p>
        </div>
      </div>
      <div className="mt-2 rounded-xl border border-slate-200 p-2">
        <p className="mb-1 text-[10px] font-semibold text-slate-500">Owner</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={agent.avatar} alt={agent.name} className="h-8 w-8 rounded-full object-cover" />
            <div>
              <p className="text-[11px] font-semibold text-slate-900">{agent.name}</p>
              <p className="text-[10px] text-slate-500">{agent.phone}</p>
            </div>
          </div>
          <button className="rounded-full bg-brand-50 p-2 text-brand-700">
            <PhoneCall size={13} />
          </button>
        </div>
      </div>
      <button className="mt-3 w-full rounded-xl bg-brand-600 py-2 text-xs font-semibold text-white">Complete Visit</button>
      <MobileBottomNav />
    </PhoneShell>
  );
}

function AddPhotosScreen() {
  return (
    <PhoneShell>
      <ScreenHeader title="Add Visit Photos" showBack />
      <div className="grid grid-cols-3 gap-2">
        {[properties[0].image, properties[1].image, properties[2].image, properties[3].image, properties[4].image].map(
          (src) => (
            <img key={src} src={src} alt="Property room" className="h-20 w-full rounded-xl object-cover" />
          )
        )}
        <button className="flex h-20 items-center justify-center rounded-xl border border-dashed border-brand-300 text-brand-700">
          <ImagePlus size={16} />
        </button>
      </div>
      <button className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-brand-600 py-2 text-xs font-semibold text-white">
        <Camera size={13} />
        Add Photo
      </button>
      <MobileBottomNav />
    </PhoneShell>
  );
}

function FeedbackScreen() {
  const reactions = ["Loved it", "Liked", "Neutral", "Not interested"];
  const tags = ["Location", "Price", "Design", "View", "Kitchen", "Layout"];

  return (
    <PhoneShell>
      <ScreenHeader title="Client Feedback" showBack />
      <p className="text-[11px] font-medium text-slate-700">How did the client like this property?</p>
      <div className="mt-1 grid grid-cols-4 gap-1">
        {reactions.map((label, idx) => (
          <button
            key={label}
            className={cls(
              "rounded-lg border px-1 py-1 text-[10px]",
              idx === 0 ? "border-brand-200 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600"
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] font-medium text-slate-700">What did the client like?</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {tags.map((tag, idx) => (
          <span
            key={tag}
            className={cls(
              "rounded-full px-2 py-1 text-[10px] font-semibold",
              idx < 3 ? "bg-brand-50 text-brand-700" : "bg-slate-100 text-slate-600"
            )}
          >
            {tag}
          </span>
        ))}
      </div>
      <textarea
        readOnly
        className="mt-2 h-20 w-full rounded-xl border border-slate-200 p-2 text-[11px] text-slate-600"
        value="Client loved the location and balcony view. Interested in visiting again this week."
      />
      <button className="mt-3 w-full rounded-xl bg-brand-600 py-2 text-xs font-semibold text-white">Save Feedback</button>
      <MobileBottomNav />
    </PhoneShell>
  );
}

function MapNavigationScreen() {
  return (
    <PhoneShell>
      <ScreenHeader title="Navigate" showBack />
      <div className="relative h-48 overflow-hidden rounded-xl border border-slate-200 bg-sky-50">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-brand-500">
          <path d="M18 82 C26 71, 38 62, 53 52 S75 36, 86 18" fill="none" stroke="currentColor" strokeWidth="2.8" />
        </svg>
        <span className="absolute left-[20%] top-[78%] rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-semibold text-white">
          Start
        </span>
        <span className="absolute right-[14%] top-[14%] rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white">
          Visit
        </span>
      </div>
      <div className="mt-2 rounded-xl border border-slate-200 p-2">
        <p className="text-xs font-semibold text-slate-900">12 min (4.2 km)</p>
        <p className="text-[11px] text-slate-500">via Mashtots Ave</p>
      </div>
      <button className="mt-3 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-brand-600 py-2 text-xs font-semibold text-white">
        <Navigation size={13} />
        Start Navigation
      </button>
      <MobileBottomNav />
    </PhoneShell>
  );
}

function MapScreen() {
  return (
    <PhoneShell>
      <ScreenHeader title="Map" showBack />
      <div className="relative h-48 overflow-hidden rounded-xl border border-slate-200 bg-sky-50">
        {agents.slice(1, 4).map((agent, idx) => (
          <div
            key={agent.id}
            className="absolute rounded-full border-2 border-white shadow"
            style={{
              left: `${25 + idx * 20}%`,
              top: `${35 + (idx % 2) * 24}%`,
            }}
          >
            <img src={agent.avatar} alt={agent.name} className="h-8 w-8 rounded-full object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-xl border border-slate-200 bg-white p-2">
        <p className="mb-2 text-xs font-semibold text-slate-900">Nearby Agents</p>
        <div className="space-y-2">
          {agents.slice(1, 4).map((agent, idx) => (
            <div key={agent.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={agent.avatar} alt={agent.name} className="h-7 w-7 rounded-full object-cover" />
                <div>
                  <p className="text-[11px] font-semibold text-slate-900">{agent.name}</p>
                  <p className="text-[10px] text-slate-500">{agent.location.split(",")[0]}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-500">{2 + idx} min ago</span>
            </div>
          ))}
        </div>
      </div>
      <MobileBottomNav />
    </PhoneShell>
  );
}

function DailySummaryScreen() {
  return (
    <PhoneShell>
      <ScreenHeader title="Daily Summary" subtitle="May 15, 2024" showBack />
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-brand-50 p-2">
          <p className="text-[10px] text-slate-500">Visits Completed</p>
          <p className="text-base font-semibold text-slate-900">2</p>
        </div>
        <div className="rounded-xl bg-brand-50 p-2">
          <p className="text-[10px] text-slate-500">New Leads</p>
          <p className="text-base font-semibold text-slate-900">1</p>
        </div>
        <div className="rounded-xl bg-brand-50 p-2">
          <p className="text-[10px] text-slate-500">Time Traveled</p>
          <p className="text-base font-semibold text-slate-900">24.5 km</p>
        </div>
        <div className="rounded-xl bg-brand-50 p-2">
          <p className="text-[10px] text-slate-500">Time Worked</p>
          <p className="text-base font-semibold text-slate-900">6h 45m</p>
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-slate-200 bg-white p-2">
        <p className="text-xs font-semibold text-slate-900">Activity Timeline</p>
        <div className="mt-2 space-y-2">
          {["10:22 AM - Apartment in Center", "10:58 AM - Checked out", "12:35 PM - New Building"].map((item) => (
            <p key={item} className="text-[11px] text-slate-600">
              {item}
            </p>
          ))}
        </div>
      </div>
      <MobileBottomNav />
    </PhoneShell>
  );
}

function MessagesScreen() {
  return (
    <PhoneShell>
      <ScreenHeader title="Messages" />
      <div className="relative">
        <Search size={13} className="absolute left-3 top-2.5 text-slate-400" />
        <input
          value="Search messages"
          readOnly
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-8 pr-3 text-xs text-slate-400"
        />
      </div>
      <div className="mt-2 space-y-2">
        {agents.slice(0, 4).map((agent, idx) => (
          <div key={agent.id} className="flex items-center gap-2 rounded-xl border border-slate-200 p-2">
            <img src={agent.avatar} alt={agent.name} className="h-9 w-9 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-900">{agent.name}</p>
              <p className="truncate text-[11px] text-slate-500">
                {idx % 2 === 0 ? "Thanks! for sharing the details..." : "Can we schedule for tomorrow?"}
              </p>
            </div>
            <span className="text-[10px] text-slate-400">10:{idx}0</span>
          </div>
        ))}
      </div>
      <MobileBottomNav />
    </PhoneShell>
  );
}

function PropertiesScreen() {
  return (
    <PhoneShell>
      <ScreenHeader title="Properties" />
      <div className="mb-2 flex rounded-xl bg-slate-100 p-1 text-[10px]">
        {["All", "Viewed", "Interested", "Closed"].map((tab, idx) => (
          <button
            key={tab}
            className={cls(
              "flex-1 rounded-lg py-1 font-semibold",
              idx === 0 ? "bg-white text-brand-700 shadow-sm" : "text-slate-600"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {properties.slice(0, 4).map((property) => (
          <div key={property.id} className="flex gap-2 rounded-xl border border-slate-200 p-2">
            <img src={property.image} alt={property.name} className="h-14 w-16 rounded-lg object-cover" />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-slate-900">{property.name}</p>
              <p className="text-[10px] text-slate-500">{property.address}</p>
              <p className="text-[11px] font-semibold text-slate-900">{property.price}</p>
            </div>
          </div>
        ))}
      </div>
      <MobileBottomNav />
    </PhoneShell>
  );
}

function ProfileScreen() {
  const menu = [
    { icon: User, label: "My Profile" },
    { icon: CheckCircle2, label: "Performance" },
    { icon: Calendar, label: "Documents" },
    { icon: Compass, label: "Settings" },
    { icon: MessageCircle, label: "Help & Support" },
  ];

  return (
    <PhoneShell>
      <ScreenHeader title="Profile" />
      <div className="rounded-xl border border-slate-200 p-3">
        <div className="flex items-center gap-3">
          <img src={agents[0].avatar} alt={agents[0].name} className="h-12 w-12 rounded-full object-cover" />
          <div>
            <p className="text-sm font-semibold text-slate-900">{agents[0].name}</p>
            <p className="text-[11px] text-slate-500">Real Estate Agent</p>
          </div>
        </div>
      </div>
      <div className="mt-2 space-y-1">
        {menu.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-left"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-700">
              <item.icon size={14} />
              {item.label}
            </span>
            <span className="text-slate-400">›</span>
          </button>
        ))}
      </div>
      <button className="mt-2 w-full rounded-xl border border-rose-200 bg-rose-50 py-2 text-xs font-semibold text-rose-600">
        Logout
      </button>
      <MobileBottomNav />
    </PhoneShell>
  );
}

function QuickGrid() {
  const cards = [
    { label: "Visits", to: "/mobile-app/visits", icon: CheckCircle2 },
    { label: "Visit Details", to: "/mobile-app/visit-details", icon: Clock3 },
    { label: "Add Photos", to: "/mobile-app/add-photos", icon: ImagePlus },
    { label: "Feedback", to: "/mobile-app/client-feedback", icon: MessageCircle },
    { label: "Navigate", to: "/mobile-app/map-navigation", icon: Navigation },
    { label: "Map", to: "/mobile-app/map", icon: MapPinned },
    { label: "Summary", to: "/mobile-app/daily-summary", icon: Calendar },
    { label: "Messages", to: "/mobile-app/messages", icon: MessageSquare },
    { label: "Properties", to: "/mobile-app/properties", icon: Home },
    { label: "Profile", to: "/mobile-app/profile", icon: Users },
  ];

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-3">
      <p className="mb-2 text-sm font-semibold text-slate-900">Screens</p>
      <div className="grid grid-cols-2 gap-2">
        <NavLink
          to="/mobile-app/login"
          className={({ isActive }) =>
            cls(
              "flex items-center gap-2 rounded-xl border px-2 py-2 text-xs font-medium",
              isActive ? "border-brand-200 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600"
            )
          }
        >
          <User size={14} />
          Login
        </NavLink>
        <NavLink
          to="/mobile-app/home"
          className={({ isActive }) =>
            cls(
              "flex items-center gap-2 rounded-xl border px-2 py-2 text-xs font-medium",
              isActive ? "border-brand-200 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600"
            )
          }
        >
          <Home size={14} />
          Home
        </NavLink>
        {cards.map((card) => (
          <NavLink
            key={card.to}
            to={card.to}
            className={({ isActive }) =>
              cls(
                "flex items-center gap-2 rounded-xl border px-2 py-2 text-xs font-medium",
                isActive ? "border-brand-200 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600"
              )
            }
          >
            <card.icon size={14} />
            {card.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export function MobileApp() {
  return (
    <div>
      <Topbar
        title="Mobile Agent App Preview"
        subtitle="Redesigned to match a modern iOS-inspired EstateFlow interface"
      />
      <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
        <QuickGrid />
        <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/mobile-app/home" replace />} />
            <Route path="login" element={<LoginScreen />} />
            <Route path="home" element={<HomeScreen />} />
            <Route path="visits" element={<VisitsScreen />} />
            <Route path="visit-details" element={<VisitDetailsScreen />} />
            <Route path="add-photos" element={<AddPhotosScreen />} />
            <Route path="client-feedback" element={<FeedbackScreen />} />
            <Route path="map-navigation" element={<MapNavigationScreen />} />
            <Route path="map" element={<MapScreen />} />
            <Route path="daily-summary" element={<DailySummaryScreen />} />
            <Route path="messages" element={<MessagesScreen />} />
            <Route path="clients" element={<MessagesScreen />} />
            <Route path="properties" element={<PropertiesScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/mobile-app/home" replace />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}
