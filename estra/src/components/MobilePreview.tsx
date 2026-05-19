import { ReactNode, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  ChevronRight,
  CircleEllipsis,
  Compass,
  Paperclip,
  SendHorizontal,
  Share2,
} from "lucide-react";
import { agents, nodes, properties, roleWindows, sourcingBreakdown } from "../data/mockData";
import { cls } from "../lib/ui";

type ScreenId = "overview" | "property" | "chat" | "workspace";
type Screen = { id: ScreenId; titleKey: string; detailKey: string };

const screens: Screen[] = [
  { id: "overview", titleKey: "mobile_preview.screen.overview", detailKey: "mobile_preview.screen.overview_detail" },
  { id: "property", titleKey: "mobile_preview.screen.property", detailKey: "mobile_preview.screen.property_detail" },
  { id: "chat", titleKey: "mobile_preview.screen.chat", detailKey: "mobile_preview.screen.chat_detail" },
  { id: "workspace", titleKey: "mobile_preview.screen.workspace", detailKey: "mobile_preview.screen.workspace_detail" },
];

const shellBg = "bg-[#f6f4ee]";
const cardBg = "bg-[#fbfaf6]";
const mintBg = "bg-[#e8f8ea]";

function Phone({
  label,
  children,
  compact = false,
}: {
  label: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <article className={cls(`rounded-[2rem] border border-slate-300 ${shellBg} p-2.5`, compact && "p-2")}>
      <div className={cls("rounded-[1.7rem] border border-black/10 shadow-[0_10px_32px_rgba(0,0,0,0.08)]", compact ? "p-2" : "p-3")}>
        <div className={cls(`${shellBg} rounded-[1.4rem]`, compact ? "p-2" : "p-3")}>
          <div className="mb-2 flex items-center justify-between text-[10px] text-slate-700">
            <span>13:13</span>
            <div className="h-6 w-20 rounded-full bg-[#102022]" />
            <span>●●●</span>
          </div>
          <p className={cls("mb-3 font-semibold text-slate-900", compact ? "text-[11px]" : "text-sm")}>{label}</p>
          {children}
        </div>
      </div>
    </article>
  );
}

function CircleButton({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70">
      {children}
    </span>
  );
}

function Surface({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cls(`rounded-[26px] border border-white/80 ${cardBg} shadow-[0_8px_28px_rgba(0,0,0,0.04)]`, className)}>
      {children}
    </div>
  );
}

const previewSourcingKey: Record<string, string> = {
  "On-field search": "sourcing.on_field_search",
  "Word of mouth": "sourcing.word_of_mouth",
  "Referral network": "sourcing.referral_network",
  "Commercial network": "sourcing.commercial_network",
};

function ScreenContent(id: ScreenId, t: (key: string, opts?: any) => string, compact = false) {
  const property = properties[0];
  const text = compact ? "text-[10px]" : "text-xs";

  if (id === "overview") {
    return (
      <div className={cls("space-y-3", text)}>
        <div className="flex items-center justify-between">
          <CircleButton><ArrowLeft size={14} /></CircleButton>
          <p className="text-center text-[18px] font-medium text-slate-900">{t("mobile_preview.modern_house")}</p>
          <CircleButton><Share2 size={14} /></CircleButton>
        </div>
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-lg">1.</span>
          <div className={`${mintBg} flex h-10 w-10 items-center justify-center rounded-full`}>1</div>
          {agents.slice(0, 3).map((agent, index) => (
            <img key={agent.id} src={agent.avatar} alt={agent.name} className={cls("h-10 w-10 rounded-full object-cover", index === 0 ? "ring-2 ring-[#2db24c] ring-offset-2 ring-offset-[#f6f4ee]" : "")} />
          ))}
        </div>
        <Surface className="p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-medium text-slate-900">{t("mobile_preview.price")}</p>
            <CircleEllipsis size={14} className="text-slate-400" />
          </div>
          <div className="py-6 text-center">
            <p className="text-slate-500">{t("mobile_preview.target_home_price")}</p>
            <p className="mt-2 text-5xl font-light text-slate-900">$864K</p>
            <p className="mt-2 text-lg text-[#df5757]">{t("mobile_preview.high_risk")}</p>
          </div>
          <div className="mb-2 h-2 rounded-full bg-[#e5e2d9]">
            <div className="h-full w-[72%] rounded-full bg-[#12a82d]" />
          </div>
          <div className="h-2 rounded-full bg-[#e5e2d9]">
            <div className="h-full w-[84%] rounded-full bg-[#f2c31d]" />
          </div>
        </Surface>
      </div>
    );
  }

  if (id === "property") {
    return (
      <div className={cls("space-y-3", text)}>
        <div className="flex items-center justify-between">
          <CircleButton><ArrowLeft size={14} /></CircleButton>
          <p className="text-center text-[18px] font-medium text-slate-900">{t("mobile_preview.property_details")}</p>
          <CircleButton><Share2 size={14} /></CircleButton>
        </div>
        <Surface className="p-2">
          <img src={property.image} alt={property.name} className="h-36 w-full rounded-[20px] object-cover" />
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[properties[1].image, properties[2].image, properties[3].image].map((src) => (
              <img key={src} src={src} alt="thumb" className="h-14 w-full rounded-[16px] object-cover" />
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className={`${mintBg} rounded-[18px] p-2`}>
              <Building2 size={14} />
              <p className="mt-2 text-slate-500">{t("mobile_preview.floor")}</p>
              <p className="text-lg font-medium text-slate-900">2</p>
            </div>
            <div className={`${mintBg} rounded-[18px] p-2`}>
              <BedDouble size={14} />
              <p className="mt-2 text-slate-500">{t("mobile_preview.bedroom")}</p>
              <p className="text-lg font-medium text-slate-900">4</p>
            </div>
            <div className={`${mintBg} rounded-[18px] p-2`}>
              <Bath size={14} />
              <p className="mt-2 text-slate-500">{t("mobile_preview.bathroom")}</p>
              <p className="text-lg font-medium text-slate-900">3</p>
            </div>
          </div>
        </Surface>
      </div>
    );
  }

  if (id === "chat") {
    return (
      <div className={cls("space-y-3", text)}>
        <div className="flex items-center justify-between">
          <CircleButton><ArrowLeft size={14} /></CircleButton>
          <p className="text-center text-[18px] font-medium text-slate-900">{t("mobile_preview.screen.chat")}</p>
          <span className={`${mintBg} rounded-full px-3 py-1 text-[#199336]`}>{t("mobile_preview.online", { count: 23 })}</span>
        </div>
        <Surface className="p-3">
          <div className="rounded-[22px] bg-white p-3">
            <div className="flex items-center gap-2">
              <div className={`${mintBg} flex h-10 w-10 items-center justify-center rounded-full`}>
                <Compass size={14} className="text-[#18a538]" />
              </div>
              <div className="flex-1">
                <div className="flex h-5 items-center gap-1">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <span key={index} className={cls("w-1 rounded-full", index < 8 ? "bg-[#18a538]" : "bg-[#e6e6df]")} style={{ height: `${6 + ((index * 5) % 10)}px` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-3 rounded-[22px] ${mintBg} p-3`}>
            <img src={properties[1].image} alt="shared" className="h-28 w-full rounded-[18px] object-cover" />
          </div>
          <div className="mt-3 rounded-[22px] bg-white px-4 py-3 text-slate-700">{t("mobile_preview.chat_msg1")}</div>
          <div className={`ml-auto mt-3 max-w-[70%] rounded-[22px] ${mintBg} px-4 py-3 text-slate-700`}>{t("mobile_preview.chat_msg2")}</div>
        </Surface>
        <div className="flex items-center gap-2 rounded-[26px] bg-white px-4 py-3 shadow-[0_8px_18px_rgba(0,0,0,0.04)]">
          <span className="flex-1 text-slate-400">{t("mobile_preview.enter_message")}</span>
          <Paperclip size={16} className="text-slate-500" />
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
            <SendHorizontal size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cls("space-y-3", text)}>
      <div className="flex items-center justify-between">
        <CircleButton><ArrowLeft size={14} /></CircleButton>
        <p className="text-center text-[18px] font-medium text-slate-900">{t("mobile_preview.screen.workspace")}</p>
        <CircleButton><Compass size={14} /></CircleButton>
      </div>
      <Surface className="p-3">
        <p className="text-lg font-medium text-slate-900">{nodes[0].agency}</p>
        <p className="mt-1 text-slate-500">{nodes[0].director}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className={`${mintBg} rounded-[18px] p-3`}>
            <p className="text-slate-500">{t("mobile_preview.seats")}</p>
            <p className="text-2xl font-medium text-slate-900">{nodes[0].seats}</p>
          </div>
          <div className={`${mintBg} rounded-[18px] p-3`}>
            <p className="text-slate-500">{t("mobile_preview.renewal")}</p>
            <p className="text-lg font-medium text-slate-900">{nodes[0].billingDate}</p>
          </div>
        </div>
      </Surface>
      <Surface className="p-3">
        {roleWindows.slice(0, 2).map((role) => (
          <div key={role.role} className="mb-3 flex items-center justify-between last:mb-0">
            <div>
              <p className="font-medium text-slate-900">{role.role}</p>
              <p className="text-slate-500">{role.primaryOutcome}</p>
            </div>
            <ChevronRight size={14} className="text-slate-300" />
          </div>
        ))}
      </Surface>
      <Surface className="p-3">
        <p className="mb-3 font-medium text-slate-900">{t("mobile_preview.sourcing_mix")}</p>
        {sourcingBreakdown.slice(0, 2).map((item) => (
          <div key={item.label} className="mb-3 last:mb-0">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-slate-500">{t(previewSourcingKey[item.label] ?? item.label)}</span>
              <span className="text-slate-900">{item.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-[#e5e2d9]">
              <div className="h-full rounded-full bg-[#12a82d]" style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </Surface>
    </div>
  );
}

export function MobilePreview() {
  const { t } = useTranslation();
  const [activeScreenId, setActiveScreenId] = useState<ScreenId>("overview");
  const activeScreen = useMemo(
    () => screens.find((screen) => screen.id === activeScreenId) ?? screens[0],
    [activeScreenId]
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
      <h3 className="text-lg font-semibold text-slate-900">{t("mobile_preview.section_title")}</h3>
      <p className="mb-4 text-sm text-slate-500">
        {t("mobile_preview.section_subtitle")}
      </p>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_1fr]">
        <div>
          <div className="mb-3 grid grid-cols-2 gap-2 md:grid-cols-4">
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreenId(screen.id)}
                className={cls(
                  "rounded-xl border px-3 py-2 text-left transition",
                  screen.id === activeScreen.id
                    ? "border-brand-300 bg-brand-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                )}
              >
                <p className="text-[11px] font-semibold text-slate-900">{t(screen.titleKey)}</p>
                <p className="text-[10px] text-slate-500">{t(screen.detailKey)}</p>
              </button>
            ))}
          </div>
          <Phone label={t(activeScreen.titleKey)}>
            {ScreenContent(activeScreen.id, t)}
          </Phone>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-sm font-semibold text-slate-900">{t("mobile_preview.system_notes")}</p>
          <div className="space-y-2 text-sm text-slate-600">
            <div className="rounded-xl bg-white p-3">{t("mobile_preview.note1")}</div>
            <div className="rounded-xl bg-white p-3">{t("mobile_preview.note2")}</div>
            <div className="rounded-xl bg-white p-3">{t("mobile_preview.note3")}</div>
            <div className="rounded-xl bg-white p-3">{t("mobile_preview.note4")}</div>
            <div className="rounded-xl bg-white p-3">{t("mobile_preview.note5")}</div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {screens.map((screen) => (
              <div key={`thumb-${screen.id}`} className="rounded-xl border border-slate-200 bg-white p-1.5">
                <Phone label={t(screen.titleKey)} compact>
                  {ScreenContent(screen.id, t, true)}
                </Phone>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
