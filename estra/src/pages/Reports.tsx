import { Topbar } from "../components/Topbar";
import { agents } from "../data/mockData";

const visitsPerDay = [24, 29, 31, 27, 34, 30, 36];
const interestBars = [
  { label: "High Interest", value: 62 },
  { label: "Medium Interest", value: 27 },
  { label: "Low Interest", value: 11 },
];

export function Reports() {
  return (
    <div>
      <Topbar title="Reports" subtitle="Performance snapshots and conversion indicators" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">Visits / Day Avg</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">30.1</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">Follow-up Conversion</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">48%</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">Client Interest Index</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">74/100</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <p className="text-sm text-slate-500">Deals Won This Week</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">13</p>
        </article>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Visits per day</h3>
          <div className="flex h-48 items-end gap-3">
            {visitsPerDay.map((value, index) => (
              <div key={value + index.toString()} className="flex-1">
                <div
                  className="rounded-t-xl bg-gradient-to-t from-brand-600 to-brand-300"
                  style={{ height: `${value * 3}px` }}
                />
                <p className="mt-2 text-center text-xs text-slate-500">D{index + 1}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Top agents</h3>
          <div className="space-y-3">
            {agents
              .slice()
              .sort((left, right) => right.score - left.score)
              .map((agent) => (
                <div key={agent.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <p className="font-medium text-slate-900">{agent.name}</p>
                    <p className="text-slate-500">{agent.score}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full rounded-full bg-brand-600" style={{ width: `${agent.score}%` }} />
                  </div>
                </div>
              ))}
          </div>
        </article>
      </div>

      <article className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Client interest level</h3>
        <div className="grid gap-3 md:grid-cols-3">
          {interestBars.map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 p-3">
              <p className="text-sm text-slate-600">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}%</p>
              <div className="mt-2 h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand-500" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
