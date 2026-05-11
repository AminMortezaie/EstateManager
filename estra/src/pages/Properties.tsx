import { useMemo, useState } from "react";
import { PropertyCard } from "../components/PropertyCard";
import { Topbar } from "../components/Topbar";
import { properties } from "../data/mockData";

const districtOptions = ["All", ...new Set(properties.map((property) => property.district))];
const typeOptions = ["All", ...new Set(properties.map((property) => property.type))];
const priceOptions = ["All", "Under $120k", "$120k-$250k", "$250k+"];

export function Properties() {
  const [district, setDistrict] = useState("All");
  const [type, setType] = useState("All");
  const [price, setPrice] = useState("All");

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const value = Number(property.price.replace(/[$,]/g, ""));
      const districtOk = district === "All" || property.district === district;
      const typeOk = type === "All" || property.type === type;
      const priceOk =
        price === "All" ||
        (price === "Under $120k" && value < 120000) ||
        (price === "$120k-$250k" && value >= 120000 && value <= 250000) ||
        (price === "$250k+" && value > 250000);
      return districtOk && typeOk && priceOk;
    });
  }, [district, type, price]);

  return (
    <div>
      <Topbar title="Properties" subtitle="Portfolio with status, owners, and price filters" />
      <section className="mb-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft md:grid-cols-3">
        <select
          value={district}
          onChange={(event) => setDistrict(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none"
        >
          {districtOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <select
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none"
        >
          {priceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none"
        >
          {typeOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </section>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
