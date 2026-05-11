import { Navigation, Radio } from "lucide-react";
import { mapMarkers } from "../data/mockData";
import { cls } from "../lib/ui";

export function MapMock() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-indigo-50 p-4 shadow-soft">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Yerevan route activity</h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs text-slate-600">
          <Radio size={13} className="text-emerald-500" />
          Live mock
        </span>
      </div>
      <div className="relative h-72 rounded-xl border border-dashed border-brand-200 bg-white/70">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-brand-300">
          <path
            d="M10 80 C30 65, 45 62, 70 40 S85 20, 90 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
        </svg>
        {mapMarkers.map((marker) => (
          <div
            key={marker.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: marker.x, top: marker.y }}
          >
            <div
              className={cls(
                "rounded-full px-2 py-1 text-[11px] font-semibold shadow",
                marker.type === "agent"
                  ? "bg-brand-600 text-white"
                  : "bg-emerald-500 text-white"
              )}
            >
              {marker.label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 inline-flex items-center gap-1 text-xs text-slate-600">
        <Navigation size={13} /> Mock route overlays between visits in Kentron and Arabkir
      </p>
    </div>
  );
}
