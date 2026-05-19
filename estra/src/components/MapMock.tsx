import { Navigation, Radio } from "lucide-react";
import { useTranslation } from "react-i18next";
import { mapMarkers } from "../data/mockData";
import { cls } from "../lib/ui";

export function MapMock() {
  const { t } = useTranslation();
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-[#fbfaf6] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">{t("map_mock.title")}</h3>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f8ea] px-3 py-1 text-[11px] text-[#1a9d36]">
          <Radio size={13} className="text-[#1a9d36]" />
          {t("map_mock.live")}
        </span>
      </div>
      <div
        className="relative h-48 rounded-[24px] border border-[#ece6db] md:h-56"
        style={{
          backgroundColor: "#f6f4ee",
          backgroundImage:
            "linear-gradient(rgba(148,163,184,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.16) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      >
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
                "rounded-full px-2 py-1 text-[10px] font-semibold shadow",
                marker.type === "agent"
                  ? "bg-black text-white ring-2 ring-white"
                  : "bg-[#22a73b] text-white"
              )}
            >
              {marker.label}
            </div>
          </div>
        ))}
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 rounded-lg bg-white/95 px-3 py-1 text-xs font-medium text-slate-700 shadow">
          {t("map_mock.city")}
        </p>
      </div>
      <p className="mt-2 inline-flex items-center gap-1 text-[11px] text-slate-600">
        <Navigation size={13} /> {t("map_mock.route")}
      </p>
    </div>
  );
}
