import { Clock3, Image, MessageCircle, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { agents, properties, visits } from "../data/mockData";

export function VisitDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const visit = visits.find((item) => item.id === id) ?? visits[0];
  const property = properties.find((item) => item.id === visit.propertyId) ?? properties[0];
  const agent = agents.find((item) => item.id === visit.agentId) ?? agents[0];

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
        <Link to="/visits" className="text-sm font-semibold text-brand-700">
          {t("visit_detail.back")}
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">{t("visit_detail.title", { id: visit.id.toUpperCase() })}</h1>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        <img src={property.image} alt={property.name} className="h-64 w-full object-cover" />
        <div className="grid gap-6 p-5 xl:grid-cols-[1.3fr_1fr]">
          <article>
            <h2 className="text-xl font-semibold text-slate-900">{property.name}</h2>
            <p className="text-sm text-slate-500">{property.address}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <p className="rounded-xl bg-slate-50 p-3 text-sm">
                <span className="font-semibold text-slate-900">{t("visit_detail.price")}:</span> {property.price}
              </p>
              <p className="rounded-xl bg-slate-50 p-3 text-sm">
                <span className="font-semibold text-slate-900">{t("visit_detail.status")}:</span> {property.status}
              </p>
              <p className="rounded-xl bg-slate-50 p-3 text-sm">
                <span className="font-semibold text-slate-900">{t("visit_detail.owner")}:</span> {property.owner}
              </p>
              <p className="rounded-xl bg-slate-50 p-3 text-sm">
                <span className="font-semibold text-slate-900">{t("visit_detail.type")}:</span> {property.type}
              </p>
            </div>
            <div className="mt-5 rounded-xl border border-slate-200 p-4">
              <p className="mb-2 text-sm font-semibold text-slate-900">{t("visit_detail.uploaded_photos")}</p>
              <div className="grid grid-cols-3 gap-2">
                {[property.image, properties[1].image, properties[2].image].map((src) => (
                  <img key={src} src={src} alt="Visit upload" className="h-20 w-full rounded-lg object-cover" />
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-3">
            <article className="rounded-xl border border-slate-200 p-4">
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                <UserRound size={15} /> {t("visit_detail.agent_info")}
              </p>
              <p className="text-sm text-slate-700">{agent.name}</p>
              <p className="text-sm text-slate-500">{agent.phone}</p>
            </article>
            <article className="rounded-xl border border-slate-200 p-4">
              <p className="mb-2 text-sm font-semibold text-slate-900">{t("visit_detail.client_info")}</p>
              <p className="text-sm text-slate-700">{visit.clientName}</p>
              <p className="text-sm text-slate-500">{t("visit_detail.interest_high")}</p>
            </article>
            <article className="rounded-xl border border-slate-200 p-4">
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Clock3 size={15} /> {t("visit_detail.timing")}
              </p>
              <p className="text-sm text-slate-600">{t("visit_detail.check_in")}: {visit.start}</p>
              <p className="text-sm text-slate-600">{t("visit_detail.check_out")}: {visit.end}</p>
              <p className="text-sm text-slate-600">{t("visit_detail.duration")}</p>
            </article>
            <article className="rounded-xl border border-slate-200 p-4">
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                <MessageCircle size={15} /> {t("visit_detail.feedback")}
              </p>
              <p className="text-sm text-slate-600">{visit.feedback}</p>
              <p className="mt-2 text-sm text-slate-600">{t("visit_detail.notes")}: {visit.notes}</p>
            </article>
            <div className="grid grid-cols-2 gap-2">
              <button className="rounded-xl bg-brand-600 px-3 py-2 text-sm font-semibold text-white">{t("visit_detail.schedule_followup")}</button>
              <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">
                <span className="inline-flex items-center gap-1">
                  <Image size={14} />
                  {t("visit_detail.export_summary")}
                </span>
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
