import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { AdminSignOutButton } from "@/components/AdminSignOutButton";
import { BillingPanel } from "@/components/BillingPanel";
import { EmbedCodeCard } from "@/components/EmbedCodeCard";
import { LeadCard } from "@/components/LeadCard";
import { authOptions } from "@/lib/auth-options";
import { getAppUrl, getBusinessById } from "@/lib/businesses";
import { isDatabaseConfigured } from "@/lib/db";
import type { Lead } from "@/lib/lead-types";
import { getLeads } from "@/lib/leads";
import {
  isBusinessSubscriptionActive,
  isStripeConfigured,
} from "@/lib/stripe-config";

export const metadata: Metadata = {
  title: "Owner Dashboard",
  description: "Leads dashboard for SiteAgentAI",
};

export const dynamic = "force-dynamic";

type AdminPageProps = {
  searchParams: Promise<{ billing?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { billing } = await searchParams;
  const session = await getServerSession(authOptions);
  const businessId = session?.user.businessId ?? "";
  const businessName = session?.user.businessName ?? "Your business";
  const widgetKey = session?.user.widgetKey ?? "";
  const dbConfigured = isDatabaseConfigured();
  const stripeEnabled = isStripeConfigured();
  const business = businessId ? await getBusinessById(businessId) : null;
  const subscriptionActive = business
    ? isBusinessSubscriptionActive(business)
    : true;

  let liveLeads: Lead[] = [];
  let loadError: string | null = null;

  if (dbConfigured && businessId) {
    try {
      liveLeads = await getLeads(businessId);
    } catch (error) {
      console.error("Failed to load leads:", error);
      loadError =
        "Unable to load leads. Check DATABASE_URL and run scripts/migrate-phase4.sql.";
    }
  }

  const newLeads = liveLeads.filter((lead) => lead.status === "New").length;
  const highUrgency = liveLeads.filter((lead) => lead.urgency === "High").length;
  const appUrl = getAppUrl();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20 text-sm font-bold text-cyan-400">
              SA
            </div>
            <div>
              <p className="text-sm font-bold text-white">SiteAgentAI</p>
              <p className="text-xs text-slate-500">{businessName}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden min-h-11 items-center rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-white sm:inline-flex sm:px-4"
            >
              Demo site
            </Link>
            <AdminSignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Owner Dashboard
            </p>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
              Live account
            </span>
          </div>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Lead Inbox</h1>
          <p className="mt-2 max-w-2xl text-slate-400">
            Signed in as {session?.user.email}. Every website submission appears
            here with contact info, a lead summary, and a recommended follow-up.
          </p>
          {loadError && (
            <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {loadError}
            </p>
          )}
        </div>

        {business && (
          <BillingPanel
            subscriptionStatus={business.subscriptionStatus}
            stripeEnabled={stripeEnabled}
            billingMessage={billing ?? null}
          />
        )}

        {widgetKey && subscriptionActive && (
          <EmbedCodeCard
            appUrl={appUrl}
            widgetKey={widgetKey}
            businessName={businessName}
          />
        )}

        {!subscriptionActive && stripeEnabled && (
          <p className="mb-10 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            Subscribe to activate your website widget and start capturing leads.
          </p>
        )}

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
          Incoming leads
        </h2>

        {liveLeads.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-12 text-center">
            <p className="text-lg font-semibold text-white">No leads yet</p>
            <p className="mt-2 text-sm text-slate-400">
              {subscriptionActive
                ? "Embed your widget on your website or submit a test lead from your widget page."
                : "Subscribe to activate your widget, then submit a test lead."}
            </p>
            {widgetKey && subscriptionActive && (
              <Link
                href={`/widget/${widgetKey}`}
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-400"
              >
                Open your widget page
              </Link>
            )}
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
