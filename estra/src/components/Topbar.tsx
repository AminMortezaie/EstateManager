import { Bell, Calendar, Plus, Search, SlidersHorizontal } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="mb-4 rounded-[20px] lg:rounded-[30px] border border-white/80 bg-[#fbfaf6] px-4 py-3 lg:px-5 lg:py-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[200px]">
          <h1 className="text-xl lg:text-2xl font-medium tracking-tight text-[#111111]">{title}</h1>
          {subtitle && <p className="text-xs lg:text-sm text-slate-500 line-clamp-1 lg:line-clamp-none">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 lg:gap-2.5">
          <div className="hidden items-center gap-2 rounded-[20px] border border-[#ece6db] bg-white px-4 py-3 lg:flex">
            <Search size={16} className="text-slate-400" />
            <input
              placeholder="Search nodes, agents, districts..."
              className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <button className="hidden sm:inline-flex items-center gap-1 rounded-[18px] border border-[#ece6db] bg-white px-3 py-2 text-sm text-slate-600">
            <Calendar size={13} />
            May 17, 2026
          </button>
          <button className="rounded-[18px] border border-[#ece6db] bg-white p-2.5 lg:p-3 text-slate-500 hover:bg-slate-100">
            <SlidersHorizontal size={15} />
          </button>
          <button className="rounded-[18px] border border-[#ece6db] bg-white p-2.5 lg:p-3 text-slate-500 hover:bg-slate-100">
            <Bell size={18} />
          </button>
          <button className="hidden sm:inline-flex items-center gap-1 rounded-[20px] bg-black px-4 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
            <Plus size={14} />
            <span className="hidden md:inline">Add Node</span>
          </button>
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"
            alt="Director avatar"
            className="h-8 w-8 rounded-lg object-cover"
          />
        </div>
      </div>
    </header>
  );
}
