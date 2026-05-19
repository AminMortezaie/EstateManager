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
    label: "role.director.label",
    subtitle: "role.director.subtitle",
    badge: "role.director.badge",
  },
  secretary: {
    label: "role.secretary.label",
    subtitle: "role.secretary.subtitle",
    badge: "role.secretary.badge",
  },
  agent: {
    label: "role.agent.label",
    subtitle: "role.agent.subtitle",
    badge: "role.agent.badge",
  },
};

export const desktopLinksByRole: Record<
  UserRole,
  Array<{ to: string; label: string; icon: typeof LayoutDashboard }>
> = {
  director: [
    { to: "/dashboard", label: "nav.overview", icon: LayoutDashboard },
    { to: "/ops", label: "nav.live_status", icon: Activity },
    { to: "/agents", label: "nav.agents", icon: BriefcaseBusiness },
    { to: "/properties", label: "nav.inventory", icon: Building2 },
    { to: "/conflict-check", label: "nav.conflict_check", icon: Search },
    { to: "/leaderboard", label: "nav.leaderboard", icon: Trophy },
    { to: "/commission", label: "nav.commissions", icon: CreditCard },
    { to: "/reports", label: "nav.performance", icon: BarChart3 },
    { to: "/nodes", label: "nav.nodes", icon: Boxes },
    { to: "/map", label: "nav.districts", icon: MapPinned },
  ],
  secretary: [
    { to: "/dashboard", label: "nav.overview", icon: LayoutDashboard },
    { to: "/ops", label: "nav.live_status", icon: Activity },
    { to: "/properties", label: "nav.listings", icon: Building2 },
    { to: "/conflict-check", label: "nav.conflict_check", icon: Search },
    { to: "/commission", label: "nav.commissions", icon: CreditCard },
    { to: "/leaderboard", label: "nav.leaderboard", icon: Trophy },
    { to: "/map", label: "nav.districts", icon: MapPinned },
    { to: "/owners", label: "nav.owners", icon: Users },
  ],
  agent: [
    { to: "/dashboard", label: "nav.my_day", icon: LayoutDashboard },
    { to: "/add-listing", label: "nav.add_listing", icon: Plus },
    { to: "/conflict-check", label: "nav.conflict_check", icon: Search },
    { to: "/ops", label: "nav.live_status", icon: Activity },
    { to: "/properties", label: "nav.all_listings", icon: Building2 },
    { to: "/leaderboard", label: "nav.my_ranking", icon: Trophy },
    { to: "/map", label: "nav.my_districts", icon: MapPinned },
    { to: "/owners", label: "nav.permissions", icon: ShieldCheck },
  ],
};

// suppress unused import warning for ShieldCheck if not referenced above
void ShieldCheck;
