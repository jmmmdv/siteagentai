import type { Metadata } from "next";
import Link from "next/link";
import { LeadCard } from "@/components/LeadCard";
import { isAiConfigured } from "@/lib/ai-summary";
import { isDatabaseConfigured } from "@/lib/db";
import { getLeads } from "@/lib/leads";
import { sampleLeads } from "@/lib/sample-leads";

export const metadata: Metadata = {
  title: "Admin Preview",
  description: "Leads dashboard for SiteAgentAI",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const dbConfigured = isDatabaseConfigured();
  const aiConfigured = isAiConfigured();
  let liveLeads = sampleLeads;
  let usingSampleData = true;
  let loadError: string | null = null;

  if (dbConfigured) {
    try {
      liveLeads = await getLeads();
      usingSampleData = false;
    } catch (error) {
      console.error("Failed to load leads:", error);
      loadError =
        "Unable to load live leads. Check DATABASE_URL and run scripts/init-db.sql.";
      liveLeads = sampleLeads;
      usingSampleData = true;
    }
  }

  const newLeads = liveLeads.filter((lead) => lead.status === "New").length;
  const highUrgency = liveLeads.filter((lead) => lead.urgency === "High").length;

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
              <p className="text-xs text-slate-500">Owner Dashboard</p>
            </div>
          </Link>
          <Link
            href="/"
            className="min-h-11 shrink-0 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-white sm:px-4"
          >
            <span className="sm:hidden">← Back</span>
            <span className="hidden sm:inline">← Back to demo</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              {usingSampleData ? "Demo Dashboard" : "Live Dashboard"}
            </p>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                usingSampleData
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              }`}
            >
              {usingSampleData ? "Sample data" : "Live leads"}
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Leads Overview</h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Every website inquiry in one place — contact details, urgency, an
            AI summary of what the customer needs, and the recommended next step
            for your team.
          </p>
          {loadError && (
            <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {loadError}
            </p>
          )}
          {!dbConfigured && (
            <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              Connect <code className="text-amber-100">DATABASE_URL</code> to
              save widget submissions and show live leads here.
            </p>
          )}
          {dbConfigured && (
            <p
              className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                aiConfigured
                  ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-200"
                  : "border-slate-700 bg-slate-900/60 text-slate-400"
              }`}
            >
              {aiConfigured
                ? "AI summaries enabled — new leads use OpenAI for summary and next steps."
                : "Rule-based summaries active — add OPENAI_API_KEY for GPT-powered summaries."}
            </p>
          )}
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-400">Total leads</p>
            <p className="mt-1 text-3xl font-bold text-white">
              {liveLeads.length}
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

        {liveLeads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-12 text-center">
            <p className="text-lg font-semibold text-white">No leads yet</p>
            <p className="mt-2 text-sm text-slate-400">
              Submit a test lead from the homepage widget. It will appear here
              automatically.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-400"
            >
              Go to homepage widget
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {liveLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
