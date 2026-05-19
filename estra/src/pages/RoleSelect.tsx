import { Crown, ShieldCheck, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { roleMeta, UserRole } from "../lib/roles";

const roleCards: Array<{
  role: UserRole;
  icon: typeof Crown;
  image: string;
}> = [
  {
    role: "director",
    icon: Crown,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  },
  {
    role: "secretary",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80",
  },
  {
    role: "agent",
    icon: Smartphone,
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
  },
];

export function RoleSelect({
  setRole,
  mobile,
}: {
  setRole: (role: UserRole) => void;
  mobile?: boolean;
}) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const openRole = (role: UserRole) => {
    setRole(role);
    if (mobile) {
      navigate(`/${role}/overview`);
      return;
    }
    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#f6f4ee] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#2ca64a]">{t("role_select.eyebrow")}</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-[#111111] sm:text-4xl">
            {t("role_select.title")}
          </h1>
          <p className="mt-3 text-base text-slate-500">
            {t("role_select.subtitle")}
          </p>
        </div>

        <section className="grid gap-6 xl:grid-cols-3">
          {roleCards.map((card) => (
            <button
              key={card.role}
              onClick={() => openRole(card.role)}
              className={`overflow-hidden rounded-[38px] border text-left shadow-[0_12px_34px_rgba(0,0,0,0.05)] transition hover:-translate-y-1 ${
                card.role === "secretary"
                  ? "border-black bg-black text-white"
                  : "border-white/80 bg-[#fbfaf6] text-[#111111]"
              }`}
            >
              <img src={card.image} alt={card.role} className="h-64 w-full object-cover" />
              <div className="p-7">
                <div className="mb-5 inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f8ea] text-[#1a9d36]">
                  <card.icon size={30} />
                </div>
                <h2 className="text-[28px] font-medium tracking-tight">{t(roleMeta[card.role].label)}</h2>
                <p className={`mt-5 max-w-[28rem] text-xl leading-relaxed ${card.role === "secretary" ? "text-white/70" : "text-slate-500"}`}>
                  {t(roleMeta[card.role].subtitle)}
                </p>
              </div>
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}
