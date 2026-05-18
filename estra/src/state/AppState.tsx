import { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from "react";
import {
  agents as seedAgents,
  properties as seedProperties,
  nodes as seedNodes,
  Agent,
  AgentStatus,
  NodeSubscription,
  Property,
} from "../data/mockData";
import { UserRole } from "../lib/roles";

export interface AuthUser {
  username: string;
  role: UserRole;
  agentId: string; // links to agents[] for status/listing ownership
  displayName: string;
}

// Hardcoded accounts
export const ACCOUNTS: Array<AuthUser & { password: string }> = [
  { username: "ernest", password: "director", role: "director", agentId: "a6", displayName: "Ernest Harutyunyan" },
  { username: "secretary", password: "secretary", role: "secretary", agentId: "a4", displayName: "Lilit Hakobyan" },
  { username: "agent", password: "agent", role: "agent", agentId: "a1", displayName: "Tatevik Martirosyan" },
];

export const SOURCING_OPTIONS = [
  "Talking to neighbors",
  "Building guards",
  "On-field research",
  "Referral network",
  "Word of mouth",
  "Online listing",
];

export const DISTRICTS = ["Arabkir", "Ajapnyak", "Nor Nork", "Shengavit", "Kentron", "Commercial"];

export const STATUS_OPTIONS: AgentStatus[] = ["In-Office", "Coffee Break", "Lunch Break", "On-Field"];

interface ListingLog {
  propertyId: string;
  agentId: string;
  loggedAt: string; // ISO date
}

interface State {
  user: AuthUser | null;
  agents: Agent[];
  properties: Property[];
  listingLog: ListingLog[];
  nodes: NodeSubscription[];
}

type Action =
  | { type: "LOGIN"; user: AuthUser }
  | { type: "LOGOUT" }
  | { type: "SET_STATUS"; agentId: string; status: AgentStatus; location?: string }
  | { type: "ADD_LISTING"; property: Property; agentId: string }
  | { type: "ADD_NODE"; node: NodeSubscription }
  | { type: "REMOVE_NODE"; nodeId: string };

const initialState: State = {
  user: null,
  agents: seedAgents,
  properties: seedProperties,
  listingLog: [],
  nodes: seedNodes,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user };
    case "LOGOUT":
      return { ...state, user: null };
    case "SET_STATUS":
      return {
        ...state,
        agents: state.agents.map((a) =>
          a.id === action.agentId
            ? { ...a, status: action.status, location: action.location ?? a.location }
            : a
        ),
      };
    case "ADD_LISTING": {
      const today = new Date().toISOString().slice(0, 10);
      return {
        ...state,
        properties: [action.property, ...state.properties],
        listingLog: [
          ...state.listingLog,
          { propertyId: action.property.id, agentId: action.agentId, loggedAt: today },
        ],
        agents: state.agents.map((a) =>
          a.id === action.agentId ? { ...a, actualOptions: a.actualOptions + 1 } : a
        ),
      };
    }
    case "ADD_NODE":
      return { ...state, nodes: [action.node, ...state.nodes] };
    case "REMOVE_NODE":
      return { ...state, nodes: state.nodes.filter((n) => n.id !== action.nodeId) };
    default:
      return state;
  }
}

interface Ctx {
  state: State;
  login: (username: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  setStatus: (agentId: string, status: AgentStatus, location?: string) => void;
  addListing: (input: Omit<Property, "id" | "lastVisitedBy" | "lastVisitedAt" | "conflictNote" | "image"> & { image?: string }, agentId: string) => { ok: boolean; conflict?: Property };
  findConflict: (address: string) => Property | undefined;
  todayCount: (agentId: string) => number;
  addNode: (node: Omit<NodeSubscription, "id" | "activatedAt">) => void;
  removeNode: (nodeId: string) => void;
}

const AppStateContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "estateflow-auth-v1";

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    if (typeof window === "undefined") return init;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const user = JSON.parse(raw) as AuthUser;
        return { ...init, user };
      }
    } catch {}
    return init;
  });

  useEffect(() => {
    if (state.user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [state.user]);

  const ctx = useMemo<Ctx>(() => {
    const findConflict = (address: string) => {
      const norm = address.trim().toLowerCase();
      if (!norm) return undefined;
      return state.properties.find((p) => p.address.toLowerCase().includes(norm) || norm.includes(p.address.toLowerCase()));
    };
    return {
      state,
      login: (username, password) => {
        const acc = ACCOUNTS.find((a) => a.username === username && a.password === password);
        if (!acc) return { ok: false, error: "Invalid username or password" };
        const { password: _pw, ...user } = acc;
        dispatch({ type: "LOGIN", user });
        return { ok: true };
      },
      logout: () => dispatch({ type: "LOGOUT" }),
      setStatus: (agentId, status, location) => dispatch({ type: "SET_STATUS", agentId, status, location }),
      addListing: (input, agentId) => {
        const conflict = findConflict(input.address);
        if (conflict) return { ok: false, conflict };
        const agent = state.agents.find((a) => a.id === agentId);
        const now = new Date();
        const property: Property = {
          id: `p${Date.now()}`,
          name: input.name,
          district: input.district,
          address: input.address,
          price: input.price,
          owner: input.owner,
          type: input.type,
          status: input.exclusive ? "Exclusive" : "Open Inventory",
          image:
            input.image ??
            "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
          exclusive: input.exclusive,
          sourcingMethod: input.sourcingMethod,
          lastVisitedBy: agent?.name ?? "Unknown",
          lastVisitedAt: now.toISOString().slice(0, 16).replace("T", " "),
          conflictNote: "Newly added - protected against duplicate outreach",
        };
        dispatch({ type: "ADD_LISTING", property, agentId });
        return { ok: true };
      },
      findConflict,
      todayCount: (agentId) => {
        const today = new Date().toISOString().slice(0, 10);
        return state.listingLog.filter((l) => l.agentId === agentId && l.loggedAt === today).length;
      },
      addNode: (input) => {
        const node: NodeSubscription = {
          ...input,
          id: `n${Date.now()}`,
          activatedAt: new Date().toISOString().slice(0, 10),
        };
        dispatch({ type: "ADD_NODE", node });
      },
      removeNode: (nodeId) => dispatch({ type: "REMOVE_NODE", nodeId }),
    };
  }, [state]);

  return <AppStateContext.Provider value={ctx}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
