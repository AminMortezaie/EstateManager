<div align="center">

<img src="public/favicon.svg" width="96" alt="EstateFlow logo" />

# EstateFlow

**A real-time operations console for real-estate agencies — built as an installable PWA.**

Manage agents, prevent listing conflicts, track daily goals, and run the agency from one unified web + mobile experience.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

</div>

---

### ✨ Why EstateFlow

Real-estate agencies often coordinate over Telegram groups, spreadsheets and gut feel. This leads to:

- 🤼 **Conflicts** — two agents visiting the same property.
- 🕵️ **No visibility** — managers don't know where agents are.
- 📉 **Untracked goals** — no objective view of who's productive.
- 🧾 **Manual commissions** — split calculations done on paper.

EstateFlow replaces all of that with **one role-aware front-end** — Director, Secretary and Agent each get exactly the surface they need.

---

### 🖼️ Screenshots

> Drop your screenshots into `docs/screenshots/` with the names below to make them render. PNG or WebP recommended.

#### Desktop

| Login & role-based home | Live operations board |
| --- | --- |
| ![Login](docs/screenshots/desktop-login.png) | ![Ops board](docs/screenshots/desktop-ops.png) |

| Inventory with image cards | Leaderboard |
| --- | --- |
| ![Inventory](docs/screenshots/desktop-inventory.png) | ![Leaderboard](docs/screenshots/desktop-leaderboard.png) |

| Commission calculator | Nodes / subscriptions admin |
| --- | --- |
| ![Commission](docs/screenshots/desktop-commission.png) | ![Nodes](docs/screenshots/desktop-nodes.png) |

#### Mobile (installable PWA)

| Agent — My Day | Add listing + conflict guard | More menu |
| --- | --- | --- |
| ![My Day](docs/screenshots/mobile-myday.png) | ![Add listing](docs/screenshots/mobile-add-listing.png) | ![More](docs/screenshots/mobile-more.png) |

---

### 🚀 Features

#### 1. Authentication & roles
Hardcoded mock accounts with full route-level guards.

| Role | Username | Password |
| --- | --- | --- |
| Director | `ernest` | `director` |
| Secretary | `secretary` | `secretary` |
| Agent | `agent` | `agent` |

#### 2. Real-time status dashboard
Agents toggle their own status (`Office` · `Coffee Break` · `Lunch Break` · `On-Field`). Director/Secretary see a live grid with filters and live counts.

#### 3. Inventory & conflict prevention
- 3-tab inventory (**All · Exclusive · Conflicts · Mine**) with image cards and per-type fallback images.
- Search across address / owner / agent / district.
- **Conflict check** screen blocks duplicate listings before they're saved.

#### 4. Daily goals & sourcing
Each agent has a daily target (3 listings). `Add Listing` form captures address, district, type, owner, price, exclusive flag, and **sourcing method** (neighbors / building guards / on-field / referral). Today's progress bar updates instantly.

#### 5. Financials & ranking
- **Commission calculator** — deal price × agency / agent split, with a "two agents collaborated" 20/20 mode.
- **Leaderboard** — rank agents by revenue, deals, score, or options; top-3 get medals.
- **Reports** — monthly KPIs.

#### 6. Admin
- **Nodes / subscriptions** — director-only CRUD with status pills and MRR.
- **Users & permissions** — accounts table + permission matrix derived from role config.
- **Settings** — persisted theme (light/dark) and density (comfortable/compact).

#### 7. Mobile-first PWA
- Installable on iOS & Android (Add to Home Screen) — manifest + service worker.
- Offline precache of the full app shell.
- Respects iOS safe areas (status bar + home indicator).
- Bottom dock auto-adapts per role.

---

### 🧱 Tech stack

- **React 19** + **TypeScript 6**
- **Vite 8** build, **vite-plugin-pwa** for service worker & manifest
- **TailwindCSS 3** for styling
- **React Router 7** (`HashRouter`)
- **lucide-react** icons
- Client-side state via a typed `useReducer` context (`src/state/AppState.tsx`) — seeded from `src/data/mockData.ts` and persisted to `localStorage`.

No backend — everything runs against mock data so the front-end behaviour is fully real (form submits, conflict detection, status updates, commissions, etc.).

---

### 🛠️ Getting started

```bash
# install
npm install

# run dev server
npm run dev

# production build (also generates PWA assets)
npm run build

# preview the production build
npm run preview
```

Open [`http://localhost:5173`](http://localhost:5173). To test the **installable PWA**, run `npm run build && npm run preview` and open the preview URL on Chrome / Safari — you'll get the "Install app" / "Add to Home Screen" prompt.

---

### 📁 Project structure

```
src/
├── components/      # Sidebar, Topbar, MobilePreview
├── data/            # mockData.ts (agents, properties, nodes, …)
├── lib/             # roles, ui helpers
├── pages/           # All screens (desktop + mobile)
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── OpsBoard.tsx
│   ├── AgentHome.tsx
│   ├── Properties.tsx
│   ├── AddListing.tsx
│   ├── ConflictCheck.tsx
│   ├── Leaderboard.tsx
│   ├── CommissionCalculator.tsx
│   ├── NodesAdmin.tsx
│   ├── MapPage.tsx
│   ├── BackofficePages.tsx
│   └── MobileNativeApp.tsx   # mobile AppShell + BottomDock + MoreScreen
├── state/AppState.tsx        # context + reducer + persistence
├── App.tsx                   # routing, role guards, scroll-to-top
└── main.tsx
```

---

### 🧭 Routes (high level)

| Route | Who | What |
| --- | --- | --- |
| `/login` | Public | Mock auth form with demo accounts |
| `/dashboard` | All (role-aware) | Director Overview / Secretary Ops / Agent's Day |
| `/ops` | Director, Secretary | Live agent status board |
| `/properties` | All | Inventory (image cards + filters) |
| `/add-listing` | Agent | Add listing with live conflict check |
| `/conflict-check` | All | Search "has this property been visited?" |
| `/leaderboard` | All | Ranked performance table |
| `/commission` | Director, Secretary | Commission calculator |
| `/nodes` | Director | Subscription / node admin |
| `/agents` | Director, Secretary | Agent roster |
| `/map` | All | District board (live) |
| `/clients` `/owners` `/messages` `/reports` `/notifications` `/settings` | All (role-aware) | Backoffice surfaces |

---

### 📦 Deployment

The project ships with `gh-pages`:

```bash
npm run deploy
```

This builds the project and publishes `dist/` to the `gh-pages` branch. Adjust `base` in `vite.config.ts` if you fork it under a different repo name.

---

### 📝 License

MIT — use it, fork it, ship it.

---

<div align="center">
Made with care for real-estate teams who deserve better tools than a Telegram group.
</div>
