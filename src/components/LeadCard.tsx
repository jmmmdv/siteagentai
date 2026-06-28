import type { Lead } from "@/lib/lead-types";

const urgencyStyles: Record<Lead["urgency"], string> = {
  Low: "bg-slate-700/60 text-slate-300",
  Medium: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  High: "bg-red-500/15 text-red-300 border border-red-500/30",
};

const statusStyles: Record<Lead["status"], string> = {
  New: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
  Contacted: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  Qualified: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  Closed: "bg-slate-600/40 text-slate-400 border border-slate-600/50",
};

type LeadCardProps = {
  lead: Lead;
};

export function LeadCard({ lead }: LeadCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-slate-700 sm:p-6">
      <div className="flex flex-col gap-4 border-b border-slate-800/80 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Customer
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">
            {lead.customerName}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{lead.submittedAt}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${urgencyStyles[lead.urgency]}`}
          >
            {lead.urgency} urgency
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[lead.status]}`}
          >
            {lead.status}
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Email
          </p>
          <a
            href={`mailto:${lead.email}`}
            className="mt-0.5 block break-all text-sm text-cyan-400 hover:underline"
          >
            {lead.email}
          </a>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Phone
          </p>
          <a
            href={`tel:${lead.phone.replace(/\s/g, "")}`}
            className="mt-0.5 block break-all text-sm text-cyan-400 hover:underline"
          >
            {lead.phone}
          </a>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Service needed
          </p>
          <p className="mt-0.5 text-sm font-medium text-white">
            {lead.serviceNeeded}
          </p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Message / details
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-slate-300">
            {lead.message}
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/20 text-xs">
            ✦
          </span>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Lead summary
          </p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          {lead.aiSummary}
        </p>
      </div>

      <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Recommended next action
        </p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200">
          {lead.recommendedAction}
        </p>
      </div>
    </article>
  );
}
