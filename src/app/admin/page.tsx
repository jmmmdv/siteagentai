import type { Metadata } from "next";
import Link from "next/link";
import { LeadCard } from "@/components/LeadCard";
import { sampleLeads } from "@/lib/sample-leads";

export const metadata: Metadata = {
  title: "Admin Preview",
  description: "Sample leads dashboard preview for SiteAgentAI",
};

export default function AdminPage() {
  const newLeads = sampleLeads.filter((lead) => lead.status === "New").length;
  const highUrgency = sampleLeads.filter(
    (lead) => lead.urgency === "High",
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20 text-sm font-bold text-cyan-400">
              SA
            </div>
            <div>
              <p className="text-sm font-bold text-white">SiteAgentAI</p>
              <p className="text-xs text-slate-500">Admin Preview</p>
            </div>
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
          >
            ← Back to demo
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Demo Dashboard
            </p>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-300">
              Sample data
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Leads Overview</h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            This is a preview of what business owners would see — AI-summarized
            leads with recommended next actions.
          </p>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-400">Total leads</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {sampleLeads.length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-400">New leads</p>
            <p className="mt-1 text-3xl font-bold text-cyan-400">{newLeads}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-400">High urgency</p>
            <p className="mt-1 text-3xl font-bold text-red-400">
              {highUrgency}
            </p>
          </div>
        </div>

        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Recent leads
        </h2>

        <div className="space-y-5">
          {sampleLeads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      </main>
    </div>
  );
}
