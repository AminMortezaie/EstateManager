import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Home as HomeIcon,
  ImageOff,
  Lock,
  MapPin,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Store,
  User as UserIcon,
  X,
} from "lucide-react";
import { Topbar } from "../components/Topbar";
import { useAppState } from "../state/AppState";
import { Property } from "../data/mockData";
import { cls } from "../lib/ui";

/* Fallback images per property type — used when a listing has no image */
const TYPE_FALLBACK: Record<Property["type"], string> = {
  Apartment:
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  House:
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=900&q=80",
  Commercial:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  Studio:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
};

const TYPE_ICON: Record<Property["type"], typeof HomeIcon> = {
  Apartment: Building2,
  House: HomeIcon,
  Commercial: Store,
  Studio: HomeIcon,
};

type Tab = "all" | "exclusive" | "conflicts" | "mine";

function PropertyImage({ property }: { property: Property }) {
  const [errored, setErrored] = useState(false);
  const src = errored || !property.image ? TYPE_FALLBACK[property.type] : property.image;
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-t-2xl bg-slate-100">
      <img
        src={src}
        alt={property.name}
        loading="lazy"
        onError={() => setErrored(true)}
        className="h-full w-full object-cover transition group-hover:scale-105"
      />
      {property.exclusive && (
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber-500/95 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
          <Star size={10} /> Exclusive
        </span>
      )}
      <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white">
        {property.type}
      </span>
      {errored && (
        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-white/85 px-2 py-0.5 text-[10px] text-slate-500">
          <ImageOff size={10} /> placeholder
        </span>
      )}
    </div>
  );
}

function PropertyCard({
  property,
  onOpen,
}: {
  property: Property;
  onOpen: (p: Property) => void;
}) {
  const Icon = TYPE_ICON[property.type];
  const hasConflict =
    property.conflictNote?.toLowerCase().includes("visited") ||
    property.conflictNote?.toLowerCase().includes("blocked");
  return (
    <button
      type="button"
      onClick={() => onOpen(property)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#efe9dd] bg-white text-left shadow-[0_10px_28px_rgba(0,0,0,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]"
    >
      <PropertyImage property={property} />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-slate-900">{property.name}</p>
          <span className="shrink-0 text-sm font-semibold text-slate-900">{property.price}</span>
        </div>
        <p className="inline-flex items-center gap-1 text-xs text-slate-500">
          <MapPin size={12} /> {property.address}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">
            {property.district}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">
            <Icon size={10} /> {property.type}
          </span>
          <span
            className={cls(
              "rounded-full px-2 py-0.5",
              property.status === "Exclusive"
                ? "bg-amber-50 text-amber-700"
                : property.status === "Closed"
                ? "bg-slate-100 text-slate-600"
                : property.status === "Visited by Team"
                ? "bg-rose-50 text-rose-700"
                : "bg-emerald-50 text-emerald-700"
            )}
          >
            {property.status}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-[#efe9dd] pt-2 text-[11px] text-slate-500">
          <span>Last: {property.lastVisitedBy || "—"}</span>
          {hasConflict ? (
            <span className="inline-flex items-center gap-1 text-amber-700">
              <AlertTriangle size={11} /> Conflict
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-emerald-700">
              <ShieldCheck size={11} /> Safe
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function DetailDrawer({
  property,
  onClose,
}: {
  property: Property | null;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  if (!property) return null;
  const Icon = TYPE_ICON[property.type];
  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/40" onClick={onClose}>
      <aside
        className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <PropertyImage property={property} />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow hover:bg-white"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex-1 space-y-4 p-5">
          <div>
            <p className="text-xl font-semibold text-slate-900">{property.name}</p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-slate-500">
              <MapPin size={13} /> {property.address}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Price</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{property.price}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">District</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{property.district}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Type</p>
              <p className="mt-1 inline-flex items-center gap-1 text-base font-semibold text-slate-900">
                <Icon size={14} /> {property.type}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Status</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{property.status}</p>
            </div>
          </div>

          <div className="rounded-xl border border-[#efe9dd] p-3">
            <p className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700">
              <UserIcon size={12} /> Owner
            </p>
            <p className="mt-1 text-sm text-slate-900">{property.owner}</p>
            <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-slate-500">
              <Phone size={11} /> Contact via agency desk
            </p>
          </div>

          <div className="rounded-xl border border-[#efe9dd] p-3">
            <p className="text-xs font-semibold text-slate-700">Sourcing & history</p>
            <p className="mt-1 text-xs text-slate-500">Source: {property.sourcingMethod}</p>
            <p className="mt-1 text-xs text-slate-500">
              Last visited by <strong className="text-slate-700">{property.lastVisitedBy}</strong> on{" "}
              {property.lastVisitedAt}
            </p>
          </div>

          {property.conflictNote && (
            <div
              className={cls(
                "rounded-xl px-3 py-2 text-xs",
                property.conflictNote.toLowerCase().includes("blocked") ||
                  property.conflictNote.toLowerCase().includes("visited")
                  ? "bg-amber-50 text-amber-800"
                  : "bg-emerald-50 text-emerald-800"
              )}
            >
              <p className="inline-flex items-center gap-1 font-semibold">
                {property.conflictNote.toLowerCase().includes("blocked") ||
                property.conflictNote.toLowerCase().includes("visited") ? (
                  <AlertTriangle size={12} />
                ) : (
                  <CheckCircle2 size={12} />
                )}
                Conflict status
              </p>
              <p className="mt-1">{property.conflictNote}</p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => navigate(`/conflict-check?q=${encodeURIComponent(property.address)}`)}
              className="flex-1 rounded-full border border-[#ece6db] bg-white px-3 py-2 text-xs text-slate-700 hover:bg-slate-50"
            >
              Run conflict check
            </button>
            <button
              onClick={() => navigate("/ops")}
              className="flex-1 rounded-full bg-black px-3 py-2 text-xs text-white hover:bg-slate-800"
            >
              See team activity
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function Properties() {
  const { state } = useAppState();
  const me = state.user;
  const myAgentId = me?.agentId;
  const [searchParams] = useSearchParams();

  const [tab, setTab] = useState<Tab>("all");
  const [district, setDistrict] = useState("All");
  const [type, setType] = useState<"All" | Property["type"]>("All");
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [selected, setSelected] = useState<Property | null>(null);

  const districts = useMemo(
    () => ["All", ...Array.from(new Set(state.properties.map((p) => p.district)))],
    [state.properties]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return state.properties.filter((p) => {
      if (district !== "All" && p.district !== district) return false;
      if (type !== "All" && p.type !== type) return false;
      if (tab === "exclusive" && !p.exclusive) return false;
      if (
        tab === "conflicts" &&
        !(
          p.conflictNote?.toLowerCase().includes("blocked") ||
          p.conflictNote?.toLowerCase().includes("visited")
        )
      )
        return false;
      if (tab === "mine") {
        const myAgent = state.agents.find((a) => a.id === myAgentId);
        if (!myAgent) return false;
        if (p.lastVisitedBy !== myAgent.name) return false;
      }
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.owner.toLowerCase().includes(q) ||
        p.lastVisitedBy.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q)
      );
    });
  }, [state.properties, state.agents, district, type, tab, query, myAgentId]);

  const counts = useMemo(() => {
    const myAgent = state.agents.find((a) => a.id === myAgentId);
    return {
      all: state.properties.length,
      exclusive: state.properties.filter((p) => p.exclusive).length,
      conflicts: state.properties.filter(
        (p) =>
          p.conflictNote?.toLowerCase().includes("blocked") ||
          p.conflictNote?.toLowerCase().includes("visited")
      ).length,
      mine: myAgent
        ? state.properties.filter((p) => p.lastVisitedBy === myAgent.name).length
        : 0,
    };
  }, [state.properties, state.agents, myAgentId]);

  const tabs: { key: Tab; label: string; count: number; hide?: boolean }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "exclusive", label: "Exclusive", count: counts.exclusive },
    { key: "conflicts", label: "Conflicts", count: counts.conflicts },
    { key: "mine", label: "Mine", count: counts.mine, hide: !myAgentId },
  ];

  return (
    <div>
      <Topbar
        title="Inventory & Listings"
        subtitle="Searchable database with exclusives, conflict prevention, and full sourcing history"
      />

      {/* KPI strip */}
      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        <Kpi label="Total" value={counts.all} />
        <Kpi label="Exclusive" value={counts.exclusive} accent="text-amber-700" />
        <Kpi label="Conflicts" value={counts.conflicts} accent="text-rose-700" />
        <Kpi label="Districts" value={districts.length - 1} />
      </div>

      {/* Tabs + Add CTA */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {tabs
          .filter((t) => !t.hide)
          .map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cls(
                "rounded-full border px-3 py-1.5 text-xs transition",
                tab === t.key
                  ? "border-black bg-black text-white"
                  : "border-[#ece6db] bg-white text-slate-600 hover:bg-slate-50"
              )}
            >
              {t.label} <span className="ml-1 opacity-70">{t.count}</span>
            </button>
          ))}
        <div className="ml-auto flex gap-2">
          <Link
            to="/conflict-check"
            className="inline-flex items-center gap-1 rounded-full border border-[#ece6db] bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
          >
            <ShieldCheck size={12} /> Conflict check
          </Link>
          {me?.role === "agent" && (
            <Link
              to="/add-listing"
              className="inline-flex items-center gap-1 rounded-full bg-black px-3 py-1.5 text-xs text-white hover:bg-slate-800"
            >
              <Plus size={12} /> Add listing
            </Link>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-full border border-[#ece6db] bg-white px-3 py-2">
          <Search size={14} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, address, owner, or agent…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </label>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="rounded-full border border-[#ece6db] bg-white px-3 py-2 text-sm text-slate-700 outline-none"
        >
          {districts.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
          className="rounded-full border border-[#ece6db] bg-white px-3 py-2 text-sm text-slate-700 outline-none"
        >
          {(["All", "Apartment", "House", "Commercial", "Studio"] as const).map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#efe9dd] bg-white p-10 text-center">
          <Lock className="mx-auto mb-2 text-slate-400" size={20} />
          <p className="text-sm font-medium text-slate-700">No listings match these filters.</p>
          <p className="mt-1 text-xs text-slate-500">
            Try clearing the search or switching tab.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} onOpen={setSelected} />
          ))}
        </div>
      )}

      <DetailDrawer property={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function Kpi({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#efe9dd] bg-white p-4">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className={cls("mt-1 text-xl font-semibold", accent ?? "text-slate-800")}>{value}</p>
    </div>
  );
}
