import { useState, FormEvent } from "react";
import { Bell, Calendar, LogOut, Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../state/AppState";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  const { state, logout } = useAppState();
  const navigate = useNavigate();
  const user = state.user;
  const [search, setSearch] = useState("");
  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/properties?q=${encodeURIComponent(search.trim())}`);
  };
  return (
    <header className="mb-4 rounded-[20px] lg:rounded-[30px] border border-white/80 bg-[#fbfaf6] px-4 py-3 lg:px-5 lg:py-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[200px]">
          <h1 className="text-xl lg:text-2xl font-medium tracking-tight text-[#111111]">{title}</h1>
          {subtitle && <p className="text-xs lg:text-sm text-slate-500 line-clamp-1 lg:line-clamp-none">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 lg:gap-2.5">
          <form onSubmit={onSearch} className="hidden items-center gap-2 rounded-[20px] border border-[#ece6db] bg-white px-4 py-3 lg:flex">
            <Search size={16} className="text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search inventory... (press Enter)"
              className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </form>
          <button
            onClick={() => navigate("/reports")}
            className="hidden sm:inline-flex items-center gap-1 rounded-[18px] border border-[#ece6db] bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
            title="Reports"
          >
            <Calendar size={13} />
            May 17, 2026
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="rounded-[18px] border border-[#ece6db] bg-white p-2.5 lg:p-3 text-slate-500 hover:bg-slate-100"
            title="Settings"
          >
            <SlidersHorizontal size={15} />
          </button>
          <button
            onClick={() => navigate("/notifications")}
            className="rounded-[18px] border border-[#ece6db] bg-white p-2.5 lg:p-3 text-slate-500 hover:bg-slate-100"
            title="Notifications"
          >
            <Bell size={18} />
          </button>
          {user && (
            <div className="hidden sm:flex flex-col items-end leading-tight">
              <span className="text-xs font-medium text-[#111111]">{user.displayName}</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{user.role}</span>
            </div>
          )}
          {user && (
            <button
              onClick={logout}
              title="Sign out"
              className="rounded-[18px] border border-[#ece6db] bg-white p-2.5 lg:p-3 text-slate-500 hover:bg-slate-100"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
