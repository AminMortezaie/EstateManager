import { CheckCircle2, ImagePlus, MapPinned, MessageSquare, User } from "lucide-react";

const screens = [
  { title: "Login", detail: "Agent ID + secure code entry" },
  { title: "Home / Today’s Visits", detail: "Agenda with next property and ETA" },
  { title: "Visit Details", detail: "Client + property quick summary" },
  { title: "Add Photos", detail: "Upload room photos and notes", icon: ImagePlus },
  { title: "Client Feedback", detail: "Interest level + objections", icon: MessageSquare },
  { title: "Map Navigation", detail: "Turn-by-turn mock route", icon: MapPinned },
  { title: "Daily Summary", detail: "Completed visits and pending follow-ups", icon: CheckCircle2 },
  { title: "Profile", detail: "Personal KPI and status controls", icon: User },
];

export function MobilePreview() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <h3 className="text-lg font-semibold text-slate-900">Mobile agent app preview</h3>
      <p className="mb-4 text-sm text-slate-500">Phone-like static screens for stakeholder demos.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {screens.map((screen, index) => (
          <div key={screen.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-3">
            <div className="mx-auto h-52 w-full rounded-[1.4rem] border border-slate-200 bg-white p-3 shadow-sm">
              <p className="text-xs font-semibold text-brand-600">Screen {index + 1}</p>
              <h4 className="mt-3 font-semibold text-slate-900">{screen.title}</h4>
              <p className="mt-2 text-xs text-slate-500">{screen.detail}</p>
              {screen.icon && (
                <div className="mt-4 inline-flex rounded-xl bg-brand-50 p-2 text-brand-700">
                  <screen.icon size={16} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 text-center text-xs text-slate-500">
        <span>Home</span>
        <span>Visits</span>
        <span>Profile</span>
      </div>
    </section>
  );
}
