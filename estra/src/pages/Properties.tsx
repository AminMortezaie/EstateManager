import { useMemo, useState } from "react";
import { Lock, Search, ShieldAlert, Star } from "lucide-react";
import { Topbar } from "../components/Topbar";
import { properties } from "../data/mockData";

export function Properties() {
  const [district, setDistrict] = useState("All");
  const [query, setQuery] = useState("");

  const districts = ["All", ...new Set(properties.map((property) => property.district))];

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const matchesDistrict = district === "All" || property.district === district;
      const text = `${property.name} ${property.address} ${property.owner} ${property.lastVisitedBy}`.toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      return matchesDistrict && matchesQuery;
    });
  }, [district, query]);

  const exclusiveListings = properties.filter((property) => property.exclusive);

  return (
    <div>
      <Topbar
        title="Inventory & Listing Management"
        subtitle="Protected exclusives, searchable sourcing history, and conflict prevention across the team"
      />
      <section className="mb-4 grid gap-4 xl:grid-cols-[340px_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-3 flex items-center gap-2">
            <Star size={16} className="text-amber-500" />
            <h3 className="text-lg font-semibold text-slate-900">Exclusive listings window</h3>
          </div>
          <div className="space-y-3">
            {exclusiveListings.map((property) => (
              <div key={property.id} className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{property.name}</p>
                  <span className="rounded-full bg-white px-2 py-1 text-[11px] font-medium text-amber-700">
                    Protected
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600">{property.address}</p>
                <p className="mt-2 text-xs text-slate-500">
                  Owner: {property.owner} • Source: {property.sourcingMethod}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
          <div className="mb-4 flex flex-wrap gap-3">
            <label className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
              <Search size={15} className="text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by property, owner, or agent visit"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </label>
            <select
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none"
            >
              {districts.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-3">Listing</th>
                  <th className="py-2 pr-3">District</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Last visited by</th>
                  <th className="py-2 pr-3">Sourcing</th>
                  <th className="py-2 pr-3">Conflict note</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((property) => (
                  <tr key={property.id} className="border-b border-slate-100 align-top">
                    <td className="py-3 pr-3">
                      <p className="font-medium text-slate-900">{property.name}</p>
                      <p className="text-slate-500">{property.price}</p>
                    </td>
                    <td className="py-3 pr-3 text-slate-600">{property.district}</td>
                    <td className="py-3 pr-3">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                        {property.status}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-slate-600">
                      {property.lastVisitedBy}
                      <p className="mt-1 text-[11px] text-slate-400">{property.lastVisitedAt}</p>
                    </td>
                    <td className="py-3 pr-3 text-slate-600">{property.sourcingMethod}</td>
                    <td className="py-3 pr-3 text-slate-600">{property.conflictNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="mb-3 flex items-center gap-2">
          <ShieldAlert size={16} className="text-rose-500" />
          <h3 className="text-lg font-semibold text-slate-900">Conflict prevention logic</h3>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            Before an on-field search starts, the agent checks if the address was already touched by a colleague.
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            If a listing is exclusive, only the assigned owner and director can re-route the task.
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            Search history shows source method, last visitor, and the next approved step for the team.
          </div>
        </div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-700">
          <Lock size={14} />
          Duplicate outreach is blocked by surfacing prior visits before any new assignment is made.
        </div>
      </article>
    </div>
  );
}
