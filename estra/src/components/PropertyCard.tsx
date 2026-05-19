import { Building2, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Property } from "../data/mockData";
import { cls } from "../lib/ui";

const propertyStatusKey: Record<Property["status"], string> = {
  Exclusive: "property_status.exclusive",
  "Open Inventory": "property_status.open_inventory",
  "Visited by Team": "property_status.visited_by_team",
  "Client Match": "property_status.client_match",
  Closed: "property_status.closed",
  Available: "property_status.available",
  Visited: "property_status.visited",
  "Interested Client": "property_status.interested_client",
  "Rented/Sold": "property_status.rented_sold",
};

const statusColors: Record<Property["status"], string> = {
  Exclusive: "bg-amber-50 text-amber-700",
  "Open Inventory": "bg-emerald-50 text-emerald-700",
  "Visited by Team": "bg-blue-50 text-blue-700",
  "Client Match": "bg-purple-50 text-purple-700",
  Closed: "bg-slate-100 text-slate-700",
  Available: "bg-emerald-50 text-emerald-700",
  Visited: "bg-blue-50 text-blue-700",
  "Interested Client": "bg-purple-50 text-purple-700",
  "Rented/Sold": "bg-slate-100 text-slate-700",
};

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { t } = useTranslation();
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
      <img src={property.image} alt={property.name} className="h-44 w-full object-cover" />
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900">{property.name}</h3>
          <span
            className={cls(
              "rounded-full px-2 py-1 text-xs font-medium",
              statusColors[property.status]
            )}
          >
            {t(propertyStatusKey[property.status])}
          </span>
        </div>
        <p className="text-sm text-slate-500">{property.address}</p>
        <div className="mt-3 flex items-center justify-between text-sm">
          <p className="flex items-center gap-1 text-slate-700">
            <Building2 size={14} />
            {property.type}
          </p>
          <p className="font-semibold text-brand-700">{property.price}</p>
        </div>
        <p className="mt-2 flex items-center gap-1 text-sm text-slate-600">
          <UserRound size={14} />
          {property.owner}
        </p>
      </div>
    </article>
  );
}
