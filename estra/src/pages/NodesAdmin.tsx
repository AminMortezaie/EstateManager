import { FormEvent, useState } from "react";
import { Plus, Trash2, Boxes, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Topbar } from "../components/Topbar";
import { useAppState } from "../state/AppState";
import { NodeSubscription } from "../data/mockData";
import { cls } from "../lib/ui";

const PLANS = ["Starter", "Growth", "Scale"] as const;
const STATUSES: NodeSubscription["status"][] = ["Active", "Trial", "At Risk"];

export function NodesAdmin() {
  const { t } = useTranslation();
  const { state, addNode, removeNode } = useAppState();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Topbar title={t("nodes_admin.title")} subtitle={t("nodes_admin.subtitle")} />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Stat icon={<Boxes size={14} />} label={t("nodes_admin.total")} value={state.nodes.length} />
        <Stat icon={<CheckCircle2 size={14} />} label={t("nodes_admin.active")} value={state.nodes.filter((n) => n.status === "Active").length} />
        <Stat icon={<AlertTriangle size={14} />} label={t("nodes_admin.at_risk")} value={state.nodes.filter((n) => n.status === "At Risk").length} />
      </div>

      <div className="mb-3 flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-[18px] bg-black px-4 py-2.5 text-sm font-medium text-white"
        >
          <Plus size={14} /> {t("nodes_admin.add_node")}
        </button>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-white/80 bg-[#fbfaf6] shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
        <table className="w-full text-sm">
          <thead className="bg-white/60 text-left text-[11px] uppercase tracking-[0.16em] text-slate-500">
            <tr>
              <th className="px-4 py-3">{t("nodes_admin.col.agency")}</th>
              <th className="px-4 py-3 hidden md:table-cell">{t("nodes_admin.col.director")}</th>
              <th className="px-4 py-3 hidden sm:table-cell">{t("nodes_admin.col.region")}</th>
              <th className="px-4 py-3">{t("nodes_admin.col.plan")}</th>
              <th className="px-4 py-3">{t("nodes_admin.col.seats")}</th>
              <th className="px-4 py-3">{t("nodes_admin.col.status")}</th>
              <th className="px-4 py-3 hidden lg:table-cell">{t("nodes_admin.col.billing")}</th>
              <th className="px-4 py-3 text-right">{t("nodes_admin.col.mrr")}</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {state.nodes.map((n) => (
              <tr key={n.id} className="border-t border-[#efe9dd] hover:bg-white/50">
                <td className="px-4 py-3 font-medium text-slate-800">{n.agency}</td>
                <td className="px-4 py-3 hidden md:table-cell text-slate-600">{n.director}</td>
                <td className="px-4 py-3 hidden sm:table-cell text-slate-600">{n.region}</td>
                <td className="px-4 py-3 text-slate-700">{n.plan}</td>
                <td className="px-4 py-3 text-slate-700">{n.seats}</td>
                <td className="px-4 py-3"><StatusPill status={n.status} /></td>
                <td className="px-4 py-3 hidden lg:table-cell text-slate-600">{n.billingDate}</td>
                <td className="px-4 py-3 text-right font-medium">{n.mrr}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => {
                      if (confirm(t("nodes_admin.remove_confirm", { agency: n.agency }))) removeNode(n.id);
                    }}
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    title={t("nodes_admin.remove")}
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {state.nodes.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-sm text-slate-500">
                  {t("nodes_admin.no_nodes")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && <AddNodeModal onClose={() => setOpen(false)} onAdd={addNode} />}
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-[20px] border border-white/80 bg-[#fbfaf6] p-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
      <p className="flex items-center gap-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
        {icon} {label}
      </p>
      <p className="mt-1 text-xl font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function StatusPill({ status }: { status: NodeSubscription["status"] }) {
  const { t } = useTranslation();
  const labelKey: Record<NodeSubscription["status"], string> = {
    Active: "nodes_admin.status.active",
    Trial: "nodes_admin.status.trial",
    "At Risk": "nodes_admin.status.at_risk",
  };
  const styles: Record<NodeSubscription["status"], string> = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Trial: "bg-blue-50 text-blue-700 border-blue-200",
    "At Risk": "bg-red-50 text-red-700 border-red-200",
  };
  const Icon = status === "Active" ? CheckCircle2 : status === "Trial" ? Clock : AlertTriangle;
  return (
    <span className={cls("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs", styles[status])}>
      <Icon size={11} /> {t(labelKey[status])}
    </span>
  );
}

function AddNodeModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (node: Omit<NodeSubscription, "id" | "activatedAt">) => void;
}) {
  const { t } = useTranslation();
  const [agency, setAgency] = useState("");
  const [director, setDirector] = useState("");
  const [region, setRegion] = useState("Yerevan");
  const [plan, setPlan] = useState<(typeof PLANS)[number]>("Growth");
  const [seats, setSeats] = useState(10);
  const [status, setStatus] = useState<NodeSubscription["status"]>("Trial");
  const [mrr, setMrr] = useState("$0");
  const [billingDate, setBillingDate] = useState(new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!agency.trim() || !director.trim()) return;
    onAdd({ agency: agency.trim(), director: director.trim(), region, plan, seats, status, mrr, billingDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-[24px] border border-white/80 bg-[#fbfaf6] p-5 shadow-xl"
      >
        <h3 className="mb-4 text-lg font-semibold">{t("nodes_admin.modal.title")}</h3>
        <div className="space-y-3">
          <Input label={t("nodes_admin.modal.agency")} value={agency} onChange={setAgency} required />
          <Input label={t("nodes_admin.modal.director")} value={director} onChange={setDirector} required />
          <Input label={t("nodes_admin.modal.region")} value={region} onChange={setRegion} />
          <div className="grid grid-cols-2 gap-3">
            <Select label={t("nodes_admin.modal.plan")} value={plan} onChange={(v) => setPlan(v as any)} options={[...PLANS]} />
            <Select label={t("nodes_admin.modal.status")} value={status} onChange={(v) => setStatus(v as any)} options={STATUSES} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block rounded-[16px] border border-[#ece6db] bg-white px-3 py-2">
              <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{t("nodes_admin.modal.seats")}</span>
              <input
                type="number"
                min={1}
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value) || 1)}
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
            <Input label={t("nodes_admin.modal.mrr")} value={mrr} onChange={setMrr} />
          </div>
          <Input label={t("nodes_admin.modal.billing")} value={billingDate} onChange={setBillingDate} type="date" />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-[16px] border border-[#ece6db] bg-white px-4 py-2 text-sm">
            {t("nodes_admin.modal.cancel")}
          </button>
          <button type="submit" className="rounded-[16px] bg-black px-4 py-2 text-sm font-medium text-white">
            {t("nodes_admin.modal.add")}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block rounded-[16px] border border-[#ece6db] bg-white px-3 py-2">
      <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent text-sm outline-none"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <label className="block rounded-[16px] border border-[#ece6db] bg-white px-3 py-2">
      <span className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
