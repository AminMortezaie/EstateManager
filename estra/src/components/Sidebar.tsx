import type { ComponentType } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cls } from "../lib/ui";

export function Sidebar({
  links,
}: {
  links: Array<{ to: string; label: string; icon: ComponentType<{ size?: number }> }>;
}) {
  const { t } = useTranslation();
  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-[#e7e1d6] bg-[#f1ede3] p-4 text-slate-900 lg:sticky lg:top-0 lg:flex lg:flex-col">
      <NavLink to="/" className="mb-5 block rounded-[28px] border border-white/80 bg-[#fbfaf6] px-5 py-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
        <p className="text-xs uppercase tracking-[0.25em] text-[#2ca64a]">{t("app.name")}</p>
        <p className="mt-1 text-lg font-semibold text-[#111111]">{t("app.tagline")}</p>
      </NavLink>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {links.map((link) => (
          <NavLink
            key={`${link.to}-${link.label}`}
            to={link.to}
            className={({ isActive }) =>
              cls(
                "flex items-center gap-3 rounded-[22px] px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-black text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
                  : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
              )
            }
          >
            <link.icon size={18} />
            {t(link.label)}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
