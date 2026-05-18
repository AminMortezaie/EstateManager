import { ReactNode, useEffect, useMemo, useState } from "react";
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
import { Agents } from "./pages/Agents";
import { Login } from "./pages/Login";
import { OpsBoard } from "./pages/OpsBoard";
import { AddListing } from "./pages/AddListing";
import { ConflictCheck } from "./pages/ConflictCheck";
import { AgentHome } from "./pages/AgentHome";
import { CommissionCalculator } from "./pages/CommissionCalculator";
import { Leaderboard } from "./pages/Leaderboard";
import { NodesAdmin } from "./pages/NodesAdmin";
import { desktopLinksByRole, UserRole } from "./lib/roles";
import { useAppState } from "./state/AppState";

function DesktopRoleHome({ role }: { role: UserRole }) {
  if (role === "director") return <Dashboard />;
  if (role === "secretary") return <OpsBoard />;
  return <AgentHome />;
}

function RoleGuard({ allow, children }: { allow: UserRole[]; children: ReactNode }) {
  const { state } = useAppState();
  if (!state.user) return <Navigate to="/login" replace />;
  if (!allow.includes(state.user.role)) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function RoleAwareDesktopRoutes({ role }: { role: UserRole }) {
  return (
    <Routes>
      <Route path="/dashboard" element={<DesktopRoleHome role={role} />} />
      <Route path="/ops" element={<OpsBoard />} />
      <Route path="/conflict-check" element={<ConflictCheck />} />
      <Route
        path="/add-listing"
        element={
          <RoleGuard allow={["agent"]}>
            <AddListing />
          </RoleGuard>
        }
      />
      <Route path="/agents" element={<RoleGuard allow={["director", "secretary"]}><Agents /></RoleGuard>} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/commission" element={<RoleGuard allow={["director", "secretary"]}><CommissionCalculator /></RoleGuard>} />
      <Route path="/nodes" element={<RoleGuard allow={["director"]}><NodesAdmin /></RoleGuard>} />
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
      <Route path="/ops" element={<AppShell role={role}><OpsBoard /></AppShell>} />
      <Route path="/conflict-check" element={<AppShell role={role}><ConflictCheck /></AppShell>} />
      <Route
        path="/add-listing"
        element={
          <RoleGuard allow={["agent"]}>
            <AppShell role={role}><AddListing /></AppShell>
          </RoleGuard>
        }
      />
      <Route path="/agents" element={<RoleGuard allow={["director", "secretary"]}><AppShell role={role}><Agents /></AppShell></RoleGuard>} />
      <Route path="/leaderboard" element={<AppShell role={role}><Leaderboard /></AppShell>} />
      <Route path="/commission" element={<RoleGuard allow={["director", "secretary"]}><AppShell role={role}><CommissionCalculator /></AppShell></RoleGuard>} />
      <Route path="/nodes" element={<RoleGuard allow={["director"]}><AppShell role={role}><NodesAdmin /></AppShell></RoleGuard>} />
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

function AppLayout({ role }: { role: UserRole }) {
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
  const { state } = useAppState();
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobileViewport(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Not authenticated → only login + landing are reachable.
  if (!state.user) {
    return (
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const role = state.user.role;

  if (isMobileViewport) {
    return (
      <Routes>
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/*" element={<MobileRoutes role={role} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/dashboard" replace />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/*" element={<AppLayout role={role} />} />
    </Routes>
  );
}
