import { useMemo, useState } from "react";
import { Calculator, Users, Percent, DollarSign } from "lucide-react";
import { Topbar } from "../components/Topbar";
import { cls } from "../lib/ui";

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function CommissionCalculator() {
  const [dealPrice, setDealPrice] = useState(120000);
  const [commissionPct, setCommissionPct] = useState(3);
  const [agencyPct, setAgencyPct] = useState(60);
  const [collab, setCollab] = useState(false);
  const [collabSplit, setCollabSplit] = useState(50); // % for agent A

  const result = useMemo(() => {
    const gross = (dealPrice * commissionPct) / 100;
    const agency = (gross * agencyPct) / 100;
    const agentTotal = gross - agency;
    if (collab) {
      const a = (agentTotal * collabSplit) / 100;
      const b = agentTotal - a;
      return { gross, agency, agentTotal, agentA: a, agentB: b };
    }
    return { gross, agency, agentTotal, agentA: agentTotal, agentB: 0 };
  }, [dealPrice, commissionPct, agencyPct, collab, collabSplit]);

  return (
    <div>
      <Topbar title="Commission Calculator" subtitle="Split gross commission between agency and agents" />
      <div className="grid gap-4 lg:grid-cols-[1.1fr,1fr]">
        <div className="rounded-[24px] border border-white/80 bg-[#fbfaf6] p-5 lg:p-6 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
          <div className="mb-4 flex items-center gap-2 text-slate-700">
            <Calculator size={18} /> <h3 className="text-base font-medium">Deal Inputs</h3>
          </div>
          <div className="space-y-4">
            <Field label="Deal price (USD)" icon={<DollarSign size={14} />}>
              <input
                type="number"
                value={dealPrice}
                onChange={(e) => setDealPrice(Number(e.target.value) || 0)}
                className="w-full bg-transparent text-base outline-none"
              />
            </Field>
            <Field label="Commission %" icon={<Percent size={14} />}>
              <input
                type="number"
                step="0.1"
                value={commissionPct}
                onChange={(e) => setCommissionPct(Number(e.target.value) || 0)}
                className="w-full bg-transparent text-base outline-none"
              />
            </Field>
            <Field label="Agency share %" icon={<Percent size={14} />}>
              <input
                type="range"
                min={0}
                max={100}
                value={agencyPct}
                onChange={(e) => setAgencyPct(Number(e.target.value))}
                className="w-full"
              />
              <p className="mt-1 text-xs text-slate-500">Agency {agencyPct}% · Agent {100 - agencyPct}%</p>
            </Field>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={collab} onChange={(e) => setCollab(e.target.checked)} />
              <Users size={14} /> Two agents collaborated
            </label>
            {collab && (
              <Field label={`Agent A share %`}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={collabSplit}
                  onChange={(e) => setCollabSplit(Number(e.target.value))}
                  className="w-full"
                />
                <p className="mt-1 text-xs text-slate-500">Agent A {collabSplit}% · Agent B {100 - collabSplit}%</p>
              </Field>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <ResultCard label="Gross commission" value={fmt(result.gross)} accent="bg-black text-white" />
          <ResultCard label={`Agency cut (${agencyPct}%)`} value={fmt(result.agency)} />
          <ResultCard label={`Agent pool (${100 - agencyPct}%)`} value={fmt(result.agentTotal)} />
          {collab ? (
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label={`Agent A (${collabSplit}%)`} value={fmt(result.agentA)} accent="bg-[#e9f5ec]" />
              <ResultCard label={`Agent B (${100 - collabSplit}%)`} value={fmt(result.agentB)} accent="bg-[#e9f5ec]" />
            </div>
          ) : (
            <ResultCard label="Agent payout" value={fmt(result.agentA)} accent="bg-[#e9f5ec]" />
          )}
          <div className="rounded-[20px] border border-dashed border-[#ddd6c4] p-4 text-xs text-slate-500">
            Example: $120,000 deal × 3% = $3,600 gross. With 60/40 split, agency keeps $2,160 and the agent pool is $1,440. Toggle collaboration to split the agent pool (e.g. 20/20).
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block rounded-[18px] border border-[#ece6db] bg-white px-4 py-3">
      <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-slate-500">
        {icon} {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function ResultCard({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className={cls("rounded-[20px] border border-white/80 p-5 shadow-[0_10px_28px_rgba(0,0,0,0.04)]", accent ?? "bg-[#fbfaf6]")}>
      <p className="text-[11px] uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
