import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { MobilePreview } from "./components/MobilePreview";
import {
  ClientsPage,
  MessagesPage,
  NotificationsPage,
  OwnersPage,
  SettingsPage,
} from "./pages/BackofficePages";
import { Dashboard } from "./pages/Dashboard";
import { Landing } from "./pages/Landing";
import { MapPage } from "./pages/MapPage";
import { AppShell, MobileNativeApp } from "./pages/MobileNativeApp";
import { Properties } from "./pages/Properties";
import { Reports } from "./pages/Reports";
import { RoleSelect } from "./pages/RoleSelect";
import { Agents } from "./pages/Agents";
import { desktopLinksByRole, UserRole } from "./lib/roles";

function DesktopRoleHome({ role }: { role: UserRole }) {
  if (role === "director") return <Dashboard />;
  if (role === "secretary") return <Agents />;
  return <Reports />;
}

function RoleAwareDesktopRoutes({ role }: { role: UserRole }) {
  return (
    <Routes>
      <Route path="/dashboard" element={<DesktopRoleHome role={role} />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/owners" element={<OwnersPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/mobile-preview" element={<MobilePreview />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function MobileRoutes({ role }: { role: UserRole }) {
  return (
    <Routes>
      <Route path="/agents" element={<AppShell role={role}><Agents /></AppShell>} />
      <Route path="/clients" element={<AppShell role={role}><ClientsPage /></AppShell>} />
      <Route path="/owners" element={<AppShell role={role}><OwnersPage /></AppShell>} />
      <Route path="/messages" element={<AppShell role={role}><MessagesPage /></AppShell>} />
      <Route path="/map" element={<AppShell role={role}><MapPage /></AppShell>} />
      <Route path="/reports" element={<AppShell role={role}><Reports /></AppShell>} />
      <Route path="/notifications" element={<AppShell role={role}><NotificationsPage /></AppShell>} />
      <Route path="/settings" element={<AppShell role={role}><SettingsPage /></AppShell>} />
      <Route path="/*" element={<MobileNativeApp role={role} />} />
    </Routes>
  );
}

function AppLayout({
  role,
}: {
  role: UserRole;
}) {
  const links = useMemo(() => desktopLinksByRole[role], [role]);

  return (
    <div className="min-h-screen bg-[#f6f4ee] lg:flex">
      <Sidebar links={links} />
      <main className="mx-auto w-full max-w-[1380px] px-4 pb-20 pt-4 sm:px-6 lg:px-6 lg:pb-8">
        <RoleAwareDesktopRoutes role={role} />
      </main>
    </div>
  );
}


export default function App() {
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  const [role, setRole] = useState<UserRole>(() => {
    if (typeof window === "undefined") return "director";
    const saved = window.localStorage.getItem("estateflow-role") as UserRole | null;
    return saved ?? "director";
  });

  useEffect(() => {
    const onResize = () => setIsMobileViewport(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("estateflow-role", role);
  }, [role]);

  if (isMobileViewport) {
    return (
      <Routes>
        <Route path="/" element={<RoleSelect setRole={setRole} mobile />} />
        <Route path="/*" element={<MobileRoutes role={role} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<RoleSelect setRole={setRole} />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/*" element={<AppLayout role={role} />} />
    </Routes>
  );
}
