import { ReactNode } from "react";
import {
  BellRing,
  CreditCard,
  Layers3,
  Presentation,
  Settings2,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { MobilePreview } from "../components/MobilePreview";
import { Topbar } from "../components/Topbar";
import { commissionScenarios, nodes, roleWindows } from "../data/mockData";

function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof UsersRound;
  children: ReactNode;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
        <Icon size={15} className="text-brand-600" />
        {title}
      </p>
      {children}
    </article>
  );
}

export function ClientsPage() {
  return (
    <div>
      <Topbar title="Master Admin - Node & Subscription Management" subtitle="Platform owner view for agency onboarding, activation, and renewals" />
      <section className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
        <Card title="Agency Node Onboarding" icon={ShieldCheck}>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Step 1</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Create agency node</p>
              <p className="mt-1 text-xs text-slate-500">Provision a secure workspace for the subscribing agency.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Step 2</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Assign director and seats</p>
              <p className="mt-1 text-xs text-slate-500">Define node owner, roles, and package capacity.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Step 3</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Activate billing</p>
              <p className="mt-1 text-xs text-slate-500">Start subscription cycle and mark continuity checks.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-500">Step 4</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Enable scale</p>
              <p className="mt-1 text-xs text-slate-500">New nodes can be added without changing the product structure.</p>
            </div>
          </div>
        </Card>

        <Card title="Subscription Tracking" icon={Layers3}>
          <div className="space-y-3">
            {nodes.map((node) => (
              <div key={node.id} className="rounded-xl border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{node.agency}</p>
                    <p className="text-xs text-slate-500">
                      {node.plan} • {node.seats} seats • {node.mrr}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      node.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : node.status === "Trial"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {node.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Director: {node.director} • Renewal: {node.billingDate}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

export function OwnersPage() {
  return (
    <div>
      <Topbar title="Per-Node Role Access" subtitle="Secure role separation for directors, secretaries, and agents inside each agency node" />
      <Card title="Internal User Roles" icon={UsersRound}>
        <div className="grid gap-3 md:grid-cols-3">
          {roleWindows.map((roleWindow) => (
            <div key={roleWindow.role} className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">{roleWindow.role}</p>
              <p className="mt-1 text-xs text-slate-500">{roleWindow.primaryOutcome}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {roleWindow.access.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function MessagesPage() {
  return (
    <div>
      <Topbar title="Financial Engine - Commission Logic" subtitle="Automated commission splits for standard deals and collaboration scenarios" />
      <Card title="Commission Scenarios" icon={CreditCard}>
        <div className="grid gap-3 md:grid-cols-3">
          {commissionScenarios.map((scenario) => (
            <div key={scenario.id} className="rounded-xl border border-slate-200 p-4">
              <p className="text-sm font-semibold text-slate-900">{scenario.title}</p>
              <p className="mt-1 text-xs text-slate-500">{scenario.logic}</p>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <p>Gross commission: {scenario.gross}</p>
                <p>Agency share: {scenario.agencyShare}</p>
                <p>Lead agent share: {scenario.agentShare}</p>
                {scenario.collaborationShare ? <p>Second agent share: {scenario.collaborationShare}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function NotificationsPage() {
  return (
    <div className="space-y-4">
      <Topbar title="Presentation Flow" subtitle="Recommended stakeholder sequence for showing scalability, control, and field usability" />
      <Card title="Presentation Sequence" icon={Presentation}>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">1. Master Node Panel</p>
            <p className="mt-2 text-sm text-slate-600">Lead with scalability, onboarding, and subscription continuity.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">2. Director Overview</p>
            <p className="mt-2 text-sm text-slate-600">Show live operations, exclusive inventory, and team performance control.</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">3. Agent Mobile View</p>
            <p className="mt-2 text-sm text-slate-600">End with the simplest field workflow to demonstrate adoption.</p>
          </div>
        </div>
      </Card>
      <MobilePreview />
    </div>
  );
}

export function SettingsPage() {
  return (
    <div>
      <Topbar title="Platform Notes" subtitle="High-level product framing for this mock UI" />
      <Card title="Mock Scope" icon={Settings2}>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Multi-node SaaS model with subscription management",
            "Per-node role isolation for director, secretary, and agent",
            "Live operational tracker replacing Telegram-style coordination",
            "Protected inventory for exclusives and duplicate-visit prevention",
            "Target vs actual goal view and monthly leaderboard",
            "Configurable commission splits for solo and collaborative deals",
          ].map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </Card>
      <Card title="Stakeholder Reminder" icon={BellRing}>
        <p className="text-sm text-slate-600">
          This prototype is intentionally optimized for a professional walkthrough, not deep workflow completeness.
        </p>
      </Card>
    </div>
  );
}
