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
import { AppShell, MoreScreen } from "./pages/MobileNativeApp";
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

function M({ role, children }: { role: UserRole; children: ReactNode }) {
  return <AppShell role={role}>{children}</AppShell>;
}

function MobileRoutes({ role }: { role: UserRole }) {
  return (
    <Routes>
      <Route path="/dashboard" element={<M role={role}><DesktopRoleHome role={role} /></M>} />
      <Route path="/ops" element={<M role={role}><OpsBoard /></M>} />
      <Route path="/conflict-check" element={<M role={role}><ConflictCheck /></M>} />
      <Route
        path="/add-listing"
        element={
          <RoleGuard allow={["agent"]}>
            <M role={role}><AddListing /></M>
          </RoleGuard>
        }
      />
      <Route path="/agents" element={<RoleGuard allow={["director", "secretary"]}><M role={role}><Agents /></M></RoleGuard>} />
      <Route path="/leaderboard" element={<M role={role}><Leaderboard /></M>} />
      <Route path="/commission" element={<RoleGuard allow={["director", "secretary"]}><M role={role}><CommissionCalculator /></M></RoleGuard>} />
      <Route path="/nodes" element={<RoleGuard allow={["director"]}><M role={role}><NodesAdmin /></M></RoleGuard>} />
      <Route path="/properties" element={<M role={role}><Properties /></M>} />
      <Route path="/clients" element={<M role={role}><ClientsPage /></M>} />
      <Route path="/owners" element={<M role={role}><OwnersPage /></M>} />
      <Route path="/messages" element={<M role={role}><MessagesPage /></M>} />
      <Route path="/map" element={<M role={role}><MapPage /></M>} />
      <Route path="/reports" element={<M role={role}><Reports /></M>} />
      <Route path="/notifications" element={<M role={role}><NotificationsPage /></M>} />
      <Route path="/settings" element={<M role={role}><SettingsPage /></M>} />
      <Route path="/more" element={<MoreScreen role={role} />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
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
