import {
  BarChart3,
  Building2,
  LayoutDashboard,
  MapPinned,
  Smartphone,
  Users,
  Waypoints,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cls } from "../lib/ui";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/agents", label: "Agents", icon: Users },
  { to: "/properties", label: "Properties", icon: Building2 },
  { to: "/visits", label: "Visits", icon: Waypoints },
  { to: "/map", label: "Map", icon: MapPinned },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/mobile-app", label: "Mobile App", icon: Smartphone },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white p-4 lg:block">
      <NavLink to="/" className="mb-7 block rounded-xl bg-brand-600 px-4 py-3 text-white">
        <p className="text-xs uppercase tracking-[0.25em] text-brand-100">EstateFlow</p>
        <p className="mt-1 text-lg font-semibold">Agency Platform</p>
      </NavLink>
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cls(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )
            }
          >
            <link.icon size={18} />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
