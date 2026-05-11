import { ArrowRight, Building2, ChartSpline, MapPinned, Users } from "lucide-react";
import { Link } from "react-router-dom";

const featureCards = [
  { title: "Live Agent Oversight", icon: Users, desc: "Track who is visiting, traveling, or available." },
  { title: "Visit Intelligence", icon: ChartSpline, desc: "See feedback and conversion signals in one dashboard." },
  { title: "Route & Map Visibility", icon: MapPinned, desc: "Mock map for Yerevan operations and route activity." },
];

export function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50/60 via-white to-slate-50">
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-12 md:pt-16">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-soft">
          <Building2 size={14} className="text-brand-600" />
          EstateFlow - Real Estate Agency Management Platform
        </div>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Modern operations command center for Yerevan agencies
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Presentation-ready prototype to demonstrate how office managers can monitor agents,
              visits, properties, routes, and daily performance from one premium dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                View Demo <ArrowRight size={16} />
              </Link>
              <Link
                to="/reports"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Explore Reports
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-indigo-50 p-4">
                <p className="text-xs text-indigo-700">Today</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">34 visits</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-xs text-emerald-700">Active Agents</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">18</p>
              </div>
              <div className="h-36 rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 p-4 sm:col-span-2">
                <p className="text-sm font-medium text-brand-700">Map + route visibility mock</p>
                <p className="mt-2 text-xs text-slate-600">Kentron to Arabkir to Davtashen</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {featureCards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
              <div className="mb-3 inline-flex rounded-xl bg-brand-50 p-2 text-brand-700">
                <card.icon size={18} />
              </div>
              <h3 className="font-semibold text-slate-900">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
