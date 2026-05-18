import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CreditCard,
  LayoutDashboard,
  MapPinned,
  ShieldCheck,
  Users,
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
    { to: "/agents", label: "Operations", icon: BriefcaseBusiness },
    { to: "/properties", label: "Inventory", icon: Building2 },
    { to: "/reports", label: "Performance", icon: BarChart3 },
    { to: "/messages", label: "Commissions", icon: CreditCard },
    { to: "/map", label: "Districts", icon: MapPinned },
  ],
  secretary: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/agents", label: "Status Board", icon: BriefcaseBusiness },
    { to: "/properties", label: "Listings", icon: Building2 },
    { to: "/map", label: "Districts", icon: MapPinned },
    { to: "/owners", label: "Role Access", icon: Users },
  ],
  agent: [
    { to: "/dashboard", label: "My Dashboard", icon: LayoutDashboard },
    { to: "/properties", label: "Listings", icon: Building2 },
    { to: "/reports", label: "My Goals", icon: BarChart3 },
    { to: "/map", label: "My Districts", icon: MapPinned },
    { to: "/owners", label: "Permissions", icon: ShieldCheck },
  ],
};
