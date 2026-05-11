import { Bell, Search } from "lucide-react";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 md:flex">
            <Search size={16} className="text-slate-400" />
            <input
              placeholder="Search properties, agents..."
              className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <button className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100">
            <Bell size={18} />
          </button>
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
            alt="Manager avatar"
            className="h-9 w-9 rounded-xl object-cover"
          />
        </div>
      </div>
    </header>
  );
}
