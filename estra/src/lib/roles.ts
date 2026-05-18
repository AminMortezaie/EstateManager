import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  LayoutDashboard,
  MapPinned,
  ShieldCheck,
  Users,
  Activity,
  Search,
  Plus,
  Trophy,
  Boxes,
} from "lucide-react";

export type UserRole = "director" | "secretary" | "agent";

export const roleMeta: Record<
  UserRole,
  {
    label: string;
    subtitle: string;
    badge: string;
  }
> = {
  director: {
    label: "Director",
    subtitle: "Full visibility across agents, inventory, performance, and commissions",
    badge: "Full Access",
  },
  secretary: {
    label: "Secretary",
    subtitle: "Operational coordination, status tracking, schedules, and records",
    badge: "Operations",
  },
  agent: {
    label: "Agent",
    subtitle: "Field sourcing, personal targets, listings, and mobile execution",
    badge: "Mobile First",
  },
};

export const desktopLinksByRole: Record<
  UserRole,
  Array<{ to: string; label: string; icon: typeof LayoutDashboard }>
> = {
  director: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/ops", label: "Live Status", icon: Activity },
    { to: "/agents", label: "Agents", icon: BriefcaseBusiness },
    { to: "/properties", label: "Inventory", icon: Building2 },
    { to: "/conflict-check", label: "Conflict Check", icon: Search },
    { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { to: "/commission", label: "Commissions", icon: CreditCard },
    { to: "/reports", label: "Performance", icon: BarChart3 },
    { to: "/nodes", label: "Nodes", icon: Boxes },
    { to: "/map", label: "Districts", icon: MapPinned },
  ],
  secretary: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/ops", label: "Live Status", icon: Activity },
    { to: "/properties", label: "Listings", icon: Building2 },
    { to: "/conflict-check", label: "Conflict Check", icon: Search },
    { to: "/commission", label: "Commissions", icon: CreditCard },
    { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { to: "/map", label: "Districts", icon: MapPinned },
    { to: "/owners", label: "Owners", icon: Users },
  ],
  agent: [
    { to: "/dashboard", label: "My Day", icon: LayoutDashboard },
    { to: "/add-listing", label: "Add Listing", icon: Plus },
    { to: "/conflict-check", label: "Conflict Check", icon: Search },
    { to: "/ops", label: "Live Status", icon: Activity },
    { to: "/properties", label: "All Listings", icon: Building2 },
    { to: "/leaderboard", label: "My Ranking", icon: Trophy },
    { to: "/map", label: "My Districts", icon: MapPinned },
    { to: "/owners", label: "Permissions", icon: ShieldCheck },
  ],
};

// suppress unused import warning for ShieldCheck if not referenced above
void ShieldCheck;
