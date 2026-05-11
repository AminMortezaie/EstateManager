import { Home, MapPinned, Smartphone } from "lucide-react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Agents } from "./pages/Agents";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { MapPage } from "./pages/MapPage";
import { MobileApp } from "./pages/MobileApp";
import { Properties } from "./pages/Properties";
import { Reports } from "./pages/Reports";
import { VisitDetail } from "./pages/VisitDetail";
import { Visits } from "./pages/Visits";

function MobileNav() {
  const links = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "/map", icon: MapPinned, label: "Map" },
    { to: "/mobile-app", icon: Smartphone, label: "Mobile" },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-soft lg:hidden">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `rounded-xl px-3 py-2 text-xs font-medium ${
              isActive ? "bg-brand-600 text-white" : "text-slate-600"
            }`
          }
        >
          <span className="flex items-center gap-1">
            <link.icon size={14} />
            {link.label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar />
      <main className="mx-auto w-full max-w-[1280px] px-4 pb-20 pt-4 sm:px-6 lg:px-8 lg:pb-8">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/visits" element={<Visits />} />
          <Route path="/visits/:id" element={<VisitDetail />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/mobile-app" element={<MobileApp />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      <MobileNav />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
}
