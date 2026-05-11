export type AgentStatus = "Available" | "In Visit" | "Traveling" | "Offline";
export type VisitStatus = "Scheduled" | "In Progress" | "Completed" | "Delayed";
export type PropertyStatus =
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
  visitsToday: number;
  score: number;
  phone: string;
  email: string;
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

export const kpis = [
  { label: "Active Agents", value: "18", change: "+2" },
  { label: "Visits Today", value: "34", change: "+12%" },
  { label: "New Leads", value: "21", change: "+6" },
  { label: "Closed Deals", value: "7", change: "+1" },
  { label: "Pending Follow-ups", value: "14", change: "-3" },
];

export const agents: Agent[] = [
  {
    id: "a1",
    name: "Tatevik Martirosyan",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    status: "In Visit",
    location: "Sayat-Nova Ave, Yerevan",
    visitsToday: 4,
    score: 92,
    phone: "+374 91 120101",
    email: "tatevik@estateflow.am",
  },
  {
    id: "a2",
    name: "Karen Petrosyan",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    status: "Traveling",
    location: "Komitas Ave, Arabkir",
    visitsToday: 5,
    score: 89,
    phone: "+374 93 221100",
    email: "karen@estateflow.am",
  },
  {
    id: "a3",
    name: "Aram Gevorgyan",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    status: "Available",
    location: "Mashtots Ave, Kentron",
    visitsToday: 3,
    score: 87,
    phone: "+374 95 102030",
    email: "aram@estateflow.am",
  },
  {
    id: "a4",
    name: "Lilit Hakobyan",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    status: "Offline",
    location: "Buzand Street, Yerevan",
    visitsToday: 2,
    score: 84,
    phone: "+374 94 888777",
    email: "lilit@estateflow.am",
  },
  {
    id: "a5",
    name: "Vardan Sargsyan",
    avatar:
      "https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=crop&w=200&q=80",
    status: "In Visit",
    location: "Davtashen, Yerevan",
    visitsToday: 4,
    score: 90,
    phone: "+374 98 765432",
    email: "vardan@estateflow.am",
  },
];

export const properties: Property[] = [
  {
    id: "p1",
    name: "Apartment in Center",
    district: "Kentron",
    address: "Northern Ave, Kentron",
    price: "$145,000",
    owner: "Narek Avetisyan",
    type: "Apartment",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p2",
    name: "New Building in Arabkir",
    district: "Arabkir",
    address: "Komitas Ave, Arabkir",
    price: "$210,000",
    owner: "Mariam Harutyunyan",
    type: "Apartment",
    status: "Interested Client",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p3",
    name: "Private House in Avan",
    district: "Avan",
    address: "Avan-Arinj 2nd St",
    price: "$320,000",
    owner: "Arsen Simonyan",
    type: "House",
    status: "Visited",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p4",
    name: "Commercial Space near Republic Square",
    district: "Kentron",
    address: "Amiryan St, Kentron",
    price: "$480,000",
    owner: "Sona Melkonyan",
    type: "Commercial",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p5",
    name: "Studio Apartment in Komitas",
    district: "Arabkir",
    address: "Mamikonyants St, Arabkir",
    price: "$98,000",
    owner: "Ruben Manukyan",
    type: "Studio",
    status: "Rented/Sold",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
];

export const visits: Visit[] = [
  {
    id: "v1",
    propertyId: "p1",
    agentId: "a1",
    clientName: "Ani Grigoryan",
    status: "Completed",
    date: "2026-05-11",
    start: "09:30",
    end: "10:15",
    feedback: "Loved the location and natural light.",
    notes: "Requested final negotiation call tomorrow.",
  },
  {
    id: "v2",
    propertyId: "p2",
    agentId: "a2",
    clientName: "Levon Baghdasaryan",
    status: "In Progress",
    date: "2026-05-11",
    start: "11:00",
    end: "11:45",
    feedback: "Considering if parking is included.",
    notes: "Follow up with owner about parking rights.",
  },
  {
    id: "v3",
    propertyId: "p3",
    agentId: "a5",
    clientName: "Mane Davtyan",
    status: "Scheduled",
    date: "2026-05-11",
    start: "14:00",
    end: "14:40",
    feedback: "Family buyer looking for a garden.",
    notes: "Prepare utility cost breakdown.",
  },
  {
    id: "v4",
    propertyId: "p4",
    agentId: "a3",
    clientName: "Gor Hovhannisyan",
    status: "Delayed",
    date: "2026-05-10",
    start: "16:20",
    end: "17:00",
    feedback: "Requested alternative plan layouts.",
    notes: "Share full floor plans via WhatsApp.",
  },
];

export const alerts = [
  "Karen is delayed 20 min near Komitas Ave.",
  "2 visits need feedback submissions.",
  "Follow-up for Ani Grigoryan due by 18:00.",
];

export const mapMarkers = [
  { id: "m1", label: "Tatevik", type: "agent", x: "28%", y: "42%" },
  { id: "m2", label: "Karen", type: "agent", x: "55%", y: "30%" },
  { id: "m3", label: "Aram", type: "agent", x: "46%", y: "53%" },
  { id: "m4", label: "Center Apt", type: "property", x: "38%", y: "38%" },
  { id: "m5", label: "Arabkir Bldg", type: "property", x: "64%", y: "26%" },
];

export const timeline = [
  { time: "09:00", title: "Daily briefing", subtitle: "All agents online" },
  { time: "10:30", title: "4 visits completed", subtitle: "Kentron + Arabkir" },
  { time: "13:00", title: "Lunch sync", subtitle: "Lead assignment updated" },
  { time: "15:15", title: "Client call", subtitle: "Commercial offer review" },
  { time: "17:00", title: "Wrap-up pending", subtitle: "3 feedback forms left" },
];

