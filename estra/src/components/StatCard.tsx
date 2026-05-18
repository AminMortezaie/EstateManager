import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, change, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-[28px] border border-white/80 bg-[#fbfaf6] px-5 py-4 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className="rounded-[18px] bg-[#e8f8ea] p-2 text-[#1a9d36]">
          <Icon size={15} />
        </div>
      </div>
      <p className="text-3xl font-medium leading-none tracking-tight text-[#111111]">{value}</p>
      <p className="mt-2 text-sm font-medium text-slate-400">{change}</p>
    </article>
  );
}
