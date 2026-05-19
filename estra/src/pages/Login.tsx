import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Crown, ShieldCheck, Smartphone, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppState } from "../state/AppState";
import { cls } from "../lib/ui";

const HINTS = [
  { icon: Crown, labelKey: "role.director.label", username: "ernest", password: "director" },
  { icon: ShieldCheck, labelKey: "role.secretary.label", username: "secretary", password: "secretary" },
  { icon: Smartphone, labelKey: "role.agent.label", username: "agent", password: "agent" },
];

export function Login() {
  const { login, state } = useAppState();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (state.user) {
    return <Navigate to="/dashboard" replace />;
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const res = login(username.trim(), password);
    if (!res.ok) {
      setError(res.error ?? t("login.error_failed"));
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  const quickFill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#f6f4ee] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-[420px]">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{t("app.name")}</p>
          <h1 className="mt-2 text-3xl font-semibold text-[#111111]">{t("login.title")}</h1>
          <p className="mt-2 text-sm text-slate-500">{t("login.subtitle")}</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-[28px] border border-white/80 bg-[#fbfaf6] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
        >
          <label className="block text-xs uppercase tracking-[0.18em] text-slate-500">{t("login.username")}</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full rounded-[18px] border border-[#ece6db] bg-white px-4 py-3 text-sm outline-none focus:border-black"
            placeholder={t("login.placeholder.email")}
            autoFocus
          />

          <label className="mt-4 block text-xs uppercase tracking-[0.18em] text-slate-500">{t("login.password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-[18px] border border-[#ece6db] bg-white px-4 py-3 text-sm outline-none focus:border-black"
            placeholder="••••••"
          />

          {error && (
            <p className="mt-3 rounded-[14px] bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>
          )}

          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[20px] bg-black px-4 py-3 text-sm font-medium text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)]"
          >
            <LogIn size={16} />
            {t("login.signin")}
          </button>
        </form>

        <div className="mt-5 rounded-[24px] border border-white/80 bg-[#fbfaf6] p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{t("login.demo_accounts")}</p>
          <div className="mt-3 space-y-2">
            {HINTS.map((h) => (
              <button
                key={h.username}
                type="button"
                onClick={() => quickFill(h.username, h.password)}
                className={cls(
                  "flex w-full items-center gap-3 rounded-[18px] border border-[#ece6db] bg-white px-4 py-3 text-left text-sm transition hover:bg-slate-50"
                )}
              >
                <h.icon size={16} className="text-slate-500" />
                <div className="flex-1">
                  <p className="font-medium text-[#111111]">{t(h.labelKey)}</p>
                  <p className="text-xs text-slate-500">
                    {h.username} / {h.password}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
