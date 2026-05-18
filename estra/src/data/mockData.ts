export type AgentStatus =
  | "In-Office"
  | "Coffee Break"
  | "Lunch Break"
  | "On-Field"
  | "Available"
  | "In Visit"
  | "Traveling"
  | "Offline";

export type VisitStatus = "Scheduled" | "In Progress" | "Completed" | "Delayed";

export type PropertyStatus =
  | "Exclusive"
  | "Open Inventory"
  | "Visited by Team"
  | "Client Match"
  | "Closed"
  | "Available"
  | "Visited"
  | "Interested Client"
  | "Rented/Sold";

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: AgentStatus;
  location: string;
  district: string;
  specialty: string;
  role: "Director" | "Secretary" | "Agent";
  visitsToday: number;
  score: number;
  phone: string;
  email: string;
  dailyTarget: number;
  actualOptions: number;
  sourcingMethod: string;
  completedDeals: number;
  revenue: string;
}

export interface Property {
  id: string;
  name: string;
  district: string;
  address: string;
  price: string;
  owner: string;
  type: "Apartment" | "House" | "Commercial" | "Studio";
  status: PropertyStatus;
  image: string;
  exclusive: boolean;
  sourcingMethod: string;
  lastVisitedBy: string;
  lastVisitedAt: string;
  conflictNote: string;
}

export interface Visit {
  id: string;
  propertyId: string;
  agentId: string;
  clientName: string;
  status: VisitStatus;
  date: string;
  start: string;
  end: string;
  feedback: string;
  notes: string;
}

export interface NodeSubscription {
  id: string;
  agency: string;
  director: string;
  region: string;
  plan: string;
  seats: number;
  status: "Active" | "Trial" | "At Risk";
  billingDate: string;
  mrr: string;
  activatedAt: string;
}

export interface RoleWindow {
  role: "Director" | "Secretary" | "Agent";
  access: string[];
  primaryOutcome: string;
}

export interface CommissionScenario {
  id: string;
  title: string;
  gross: string;
  logic: string;
  agencyShare: string;
  agentShare: string;
  collaborationShare?: string;
}

export const kpis = [
  { label: "Subscribed Nodes", value: "12", change: "+2 this month" },
  { label: "Active Agents Today", value: "46", change: "38 on-field now" },
  { label: "Exclusive Listings", value: "91", change: "+11 protected" },
  { label: "Monthly Revenue", value: "$84.5k", change: "+14% vs April" },
  { label: "Options Logged", value: "128", change: "93% target pace" },
];

export const nodes: NodeSubscription[] = [
  {
    id: "n1",
    agency: "Ernest Realty",
    director: "Ernest Harutyunyan",
    region: "Yerevan",
    plan: "Growth",
    seats: 28,
    status: "Active",
    billingDate: "2026-05-28",
    mrr: "$1,250",
    activatedAt: "2025-11-02",
  },
  {
    id: "n2",
    agency: "Capital Spaces",
    director: "Mariam Safaryan",
    region: "Yerevan",
    plan: "Starter",
    seats: 12,
    status: "Trial",
    billingDate: "2026-05-25",
    mrr: "$620",
    activatedAt: "2026-05-04",
  },
  {
    id: "n3",
    agency: "North District Homes",
    director: "Levon Ghazaryan",
    region: "Vanadzor",
    plan: "Scale",
    seats: 36,
    status: "At Risk",
    billingDate: "2026-05-18",
    mrr: "$1,780",
    activatedAt: "2025-07-19",
  },
  {
    id: "n4",
    agency: "Metro Commercial Hub",
    director: "Anna Vardanyan",
    region: "Yerevan",
    plan: "Growth",
    seats: 19,
    status: "Active",
    billingDate: "2026-06-01",
    mrr: "$990",
    activatedAt: "2025-12-10",
  },
];

export const roleWindows: RoleWindow[] = [
  {
    role: "Director",
    primaryOutcome: "Full node oversight and financial performance control",
    access: ["Agent roster", "Revenue and leaderboard", "Exclusive inventory", "Commission approvals"],
  },
  {
    role: "Secretary",
    primaryOutcome: "Administrative workflow coordination",
    access: ["Status board", "Scheduling windows", "Owner and client records", "Follow-up queues"],
  },
  {
    role: "Agent",
    primaryOutcome: "Fast field execution and daily goal tracking",
    access: ["Personal dashboard", "Status updates", "Listing capture", "Options target vs actual"],
  },
];

export const agents: Agent[] = [
  {
    id: "a1",
    name: "Tatevik Martirosyan",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    status: "On-Field",
    location: "Komitas Ave, Arabkir",
    district: "Arabkir",
    specialty: "Apartments",
    role: "Agent",
    visitsToday: 4,
    score: 94,
    phone: "+374 91 120101",
    email: "tatevik@estateflow.am",
    dailyTarget: 3,
    actualOptions: 4,
    sourcingMethod: "On-field search",
    completedDeals: 6,
    revenue: "$14,200",
  },
  {
    id: "a2",
    name: "Karen Petrosyan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    status: "Coffee Break",
    location: "Tigran Mets Ave, Shengavit",
    district: "Shengavit",
    specialty: "Commercial Spaces",
    role: "Agent",
    visitsToday: 3,
    score: 88,
    phone: "+374 93 221100",
    email: "karen@estateflow.am",
    dailyTarget: 3,
    actualOptions: 2,
    sourcingMethod: "Referral network",
    completedDeals: 4,
    revenue: "$11,100",
  },
  {
    id: "a3",
    name: "Aram Gevorgyan",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    status: "In-Office",
    location: "HQ - Kentron",
    district: "Nor Nork",
    specialty: "Family Homes",
    role: "Agent",
    visitsToday: 2,
    score: 86,
    phone: "+374 95 102030",
    email: "aram@estateflow.am",
    dailyTarget: 3,
    actualOptions: 3,
    sourcingMethod: "Word of mouth",
    completedDeals: 3,
    revenue: "$8,900",
  },
  {
    id: "a4",
    name: "Lilit Hakobyan",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    status: "Lunch Break",
    location: "Bagratunyats Ave, Ajapnyak",
    district: "Ajapnyak",
    specialty: "Resale Apartments",
    role: "Secretary",
    visitsToday: 0,
    score: 91,
    phone: "+374 94 888777",
    email: "lilit@estateflow.am",
    dailyTarget: 0,
    actualOptions: 0,
    sourcingMethod: "Desk workflow",
    completedDeals: 0,
    revenue: "$0",
  },
  {
    id: "a5",
    name: "Vardan Sargsyan",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    status: "On-Field",
    location: "Gai Ave, Nor Nork",
    district: "Nor Nork",
    specialty: "New Buildings",
    role: "Agent",
    visitsToday: 5,
    score: 96,
    phone: "+374 98 765432",
    email: "vardan@estateflow.am",
    dailyTarget: 3,
    actualOptions: 5,
    sourcingMethod: "On-field search",
    completedDeals: 7,
    revenue: "$16,700",
  },
  {
    id: "a6",
    name: "Ernest Harutyunyan",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    status: "In-Office",
    location: "Director Office - Kentron",
    district: "All Districts",
    specialty: "Oversight",
    role: "Director",
    visitsToday: 0,
    score: 98,
    phone: "+374 77 500600",
    email: "ernest@estateflow.am",
    dailyTarget: 0,
    actualOptions: 0,
    sourcingMethod: "Management",
    completedDeals: 0,
    revenue: "$33,000",
  },
];

export const properties: Property[] = [
  {
    id: "p1",
    name: "Exclusive Family Apartment",
    district: "Arabkir",
    address: "Komitas Ave, Arabkir",
    price: "$145,000",
    owner: "Narek Avetisyan",
    type: "Apartment",
    status: "Exclusive",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    exclusive: true,
    sourcingMethod: "Word of mouth",
    lastVisitedBy: "Tatevik Martirosyan",
    lastVisitedAt: "2026-05-16 11:20",
    conflictNote: "Protected - no duplicate outreach",
  },
  {
    id: "p2",
    name: "New Building Lead",
    district: "Nor Nork",
    address: "Gai Ave, Nor Nork",
    price: "$210,000",
    owner: "Mariam Harutyunyan",
    type: "Apartment",
    status: "Client Match",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
    exclusive: false,
    sourcingMethod: "On-field search",
    lastVisitedBy: "Vardan Sargsyan",
    lastVisitedAt: "2026-05-17 09:05",
    conflictNote: "Visited today - assign follow-up only to Vardan",
  },
  {
    id: "p3",
    name: "Ajapnyak Private House",
    district: "Ajapnyak",
    address: "Margaryan St, Ajapnyak",
    price: "$320,000",
    owner: "Arsen Simonyan",
    type: "House",
    status: "Visited by Team",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=900&q=80",
    exclusive: false,
    sourcingMethod: "On-field search",
    lastVisitedBy: "Aram Gevorgyan",
    lastVisitedAt: "2026-05-15 16:40",
    conflictNote: "Second visit blocked until owner callback",
  },
  {
    id: "p4",
    name: "Republic Square Retail Unit",
    district: "Kentron",
    address: "Amiryan St, Kentron",
    price: "$480,000",
    owner: "Sona Melkonyan",
    type: "Commercial",
    status: "Exclusive",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    exclusive: true,
    sourcingMethod: "Commercial network",
    lastVisitedBy: "Karen Petrosyan",
    lastVisitedAt: "2026-05-14 13:15",
    conflictNote: "Commercial specialist only",
  },
  {
    id: "p5",
    name: "Shengavit Studio Deal",
    district: "Shengavit",
    address: "Tigran Mets Ave, Shengavit",
    price: "$98,000",
    owner: "Ruben Manukyan",
    type: "Studio",
    status: "Closed",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    exclusive: false,
    sourcingMethod: "Referral network",
    lastVisitedBy: "Karen Petrosyan",
    lastVisitedAt: "2026-05-09 12:10",
    conflictNote: "Archived in monthly leaderboard",
  },
];

export const visits: Visit[] = [
  {
    id: "v1",
    propertyId: "p1",
    agentId: "a1",
    clientName: "Ani Grigoryan",
    status: "Completed",
    date: "2026-05-17",
    start: "09:30",
    end: "10:15",
    feedback: "Owner agreed to exclusive contract terms.",
    notes: "Ready for director approval.",
  },
  {
    id: "v2",
    propertyId: "p2",
    agentId: "a5",
    clientName: "Levon Baghdasaryan",
    status: "In Progress",
    date: "2026-05-17",
    start: "11:00",
    end: "11:45",
    feedback: "On-field sourcing with building guard contact.",
    notes: "Potential second-floor vacancy next week.",
  },
  {
    id: "v3",
    propertyId: "p4",
    agentId: "a2",
    clientName: "Mane Davtyan",
    status: "Scheduled",
    date: "2026-05-17",
    start: "14:00",
    end: "14:40",
    feedback: "Commercial buyer wants traffic data.",
    notes: "Prepare collaboration split scenario.",
  },
  {
    id: "v4",
    propertyId: "p3",
    agentId: "a3",
    clientName: "Gor Hovhannisyan",
    status: "Delayed",
    date: "2026-05-16",
    start: "16:20",
    end: "17:00",
    feedback: "Family requires financing support.",
    notes: "Secretary to coordinate owner paperwork.",
  },
];

export const alerts = [
  "North District Homes subscription renews on 2026-05-18 and is marked At Risk.",
  "Two on-field agents are working the same Nor Nork cluster; conflict prevention requires reassignment.",
  "Exclusive listing approval pending for Komitas Ave apartment.",
];

export const mapMarkers = [
  { id: "m1", label: "Arabkir • Tatevik", type: "agent", x: "30%", y: "36%" },
  { id: "m2", label: "Shengavit • Karen", type: "agent", x: "61%", y: "70%" },
  { id: "m3", label: "Nor Nork • Vardan", type: "agent", x: "72%", y: "28%" },
  { id: "m4", label: "Exclusive • Komitas", type: "property", x: "33%", y: "31%" },
  { id: "m5", label: "Commercial • Amiryan", type: "property", x: "49%", y: "46%" },
];

export const timeline = [
  { time: "09:00", title: "Director briefing", subtitle: "Targets confirmed by district and specialty" },
  { time: "10:15", title: "Exclusive secured", subtitle: "Arabkir apartment moved to protected inventory" },
  { time: "12:10", title: "Secretary workflow", subtitle: "Owner documents queued for signing" },
  { time: "14:30", title: "On-field check-in", subtitle: "Nor Nork sourcing route updated live" },
  { time: "17:00", title: "Daily options review", subtitle: "Target vs actual closes at 93% pace" },
];

export const sourcingBreakdown = [
  { label: "On-field search", value: 44 },
  { label: "Word of mouth", value: 26 },
  { label: "Referral network", value: 18 },
  { label: "Commercial network", value: 12 },
];

export const commissionScenarios: CommissionScenario[] = [
  {
    id: "c1",
    title: "Standard 60/40 split",
    gross: "$8,000",
    logic: "Agency retains 60%, listing agent receives 40%",
    agencyShare: "$4,800",
    agentShare: "$3,200",
  },
  {
    id: "c2",
    title: "Collaboration split-split",
    gross: "$10,000",
    logic: "Agency 60%, agent pool 40% split 20/20 between listing and buyer agents",
    agencyShare: "$6,000",
    agentShare: "$2,000",
    collaborationShare: "$2,000",
  },
  {
    id: "c3",
    title: "Exclusive commercial bonus",
    gross: "$15,000",
    logic: "Agency 60%, lead agent 30%, support agent 10%",
    agencyShare: "$9,000",
    agentShare: "$4,500",
    collaborationShare: "$1,500",
  },
];
