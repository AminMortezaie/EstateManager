import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Topbar } from "../components/Topbar";
import { useAppState, SOURCING_OPTIONS, DISTRICTS } from "../state/AppState";
import { Property } from "../data/mockData";

export function AddListing() {
  const { state, addListing, findConflict, todayCount } = useAppState();
  const navigate = useNavigate();
  const me = state.user;
  const myAgent = state.agents.find((a) => a.id === me?.agentId);
  const target = myAgent?.dailyTarget ?? 3;
  const done = todayCount(me?.agentId ?? "");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [price, setPrice] = useState("");
  const [owner, setOwner] = useState("");
  const [type, setType] = useState<Property["type"]>("Apartment");
  const [sourcing, setSourcing] = useState(SOURCING_OPTIONS[0]);
  const [exclusive, setExclusive] = useState(false);

  const [conflict, setConflict] = useState<Property | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!me) return null;

  const liveConflict = address.trim().length > 4 ? findConflict(address) : undefined;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!name || !address || !price || !owner) {
      setError("Please fill in all required fields");
      return;
    }
    const res = addListing(
      { name, address, district, price, owner, type, sourcingMethod: sourcing, exclusive, status: exclusive ? "Exclusive" : "Open Inventory" },
      me.agentId
    );
    if (!res.ok && res.conflict) {
      setConflict(res.conflict);
      return;
    }
    setSuccess(true);
    setConflict(null);
    setName("");
    setAddress("");
    setPrice("");
    setOwner("");
    setExclusive(false);
  };

  return (
    <>
      <Topbar title="Add Listing" subtitle={`Today's progress: ${done + (success ? 0 : 0)}/${target} options`} />

      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 rounded-[18px] border border-[#ece6db] bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
      >
        <ArrowLeft size={14} /> Back
      </button>

      <div className="mb-4 rounded-[24px] border border-white/80 bg-[#fbfaf6] p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Daily Goal</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-2xl font-semibold text-[#111111]">{done} / {target}</p>
          <span className="text-xs text-slate-500">
            {done >= target ? "✅ Goal reached" : `${target - done} more to go`}
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#ece6db]">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${Math.min(100, (done / target) * 100)}%` }}
          />
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4 rounded-[24px] border border-white/80 bg-[#fbfaf6] p-5">
        <Field label="Listing name">
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="2BR Apartment near Komitas" />
        </Field>

        <Field label="Address">
          <input value={address} onChange={(e) => setAddress(e.target.value)} className={inputCls} placeholder="Komitas Ave 12, Arabkir" />
          {liveConflict && (
            <p className="mt-2 inline-flex items-start gap-2 rounded-[14px] bg-amber-50 px-3 py-2 text-xs text-amber-800">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <span>
                ⚠️ Possible conflict: <strong>{liveConflict.lastVisitedBy}</strong> already worked on
                <em> "{liveConflict.address}"</em> on {liveConflict.lastVisitedAt}.
              </span>
            </p>
          )}
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="District">
            <select value={district} onChange={(e) => setDistrict(e.target.value)} className={inputCls}>
              {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Type">
            <select value={type} onChange={(e) => setType(e.target.value as Property["type"])} className={inputCls}>
              {["Apartment", "House", "Commercial", "Studio"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Price">
            <input value={price} onChange={(e) => setPrice(e.target.value)} className={inputCls} placeholder="$145,000" />
          </Field>
          <Field label="Owner">
            <input value={owner} onChange={(e) => setOwner(e.target.value)} className={inputCls} placeholder="Owner name" />
          </Field>
        </div>

        <Field label="How did you find this listing?">
          <select value={sourcing} onChange={(e) => setSourcing(e.target.value)} className={inputCls}>
            {SOURCING_OPTIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>

        <label className="flex items-center gap-3 rounded-[18px] border border-[#ece6db] bg-white px-4 py-3">
          <input type="checkbox" checked={exclusive} onChange={(e) => setExclusive(e.target.checked)} />
          <span className="text-sm">Mark as <strong>Exclusive</strong> (owner committed to our agency only)</span>
        </label>

        {error && <p className="rounded-[14px] bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}

        {conflict && (
          <div className="rounded-[14px] bg-red-50 px-4 py-3 text-sm text-red-800">
            <p className="font-semibold flex items-center gap-2"><AlertTriangle size={14} /> Conflict — cannot save</p>
            <p className="mt-1 text-xs">
              <strong>{conflict.lastVisitedBy}</strong> already visited <em>"{conflict.address}"</em> on {conflict.lastVisitedAt}.
            </p>
          </div>
        )}

        {success && (
          <div className="rounded-[14px] bg-emerald-50 px-4 py-3 text-sm text-emerald-800 inline-flex items-center gap-2">
            <CheckCircle2 size={16} /> Listing saved. Counter updated.
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-[20px] bg-black px-4 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
        >
          Save listing
        </button>
      </form>
    </>
  );
}

const inputCls = "w-full rounded-[18px] border border-[#ece6db] bg-white px-4 py-3 text-sm outline-none focus:border-black";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">{label}</label>
      {children}
    </div>
  );
}
