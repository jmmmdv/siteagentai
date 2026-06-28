"use client";

import { useState } from "react";
import type { SubscriptionStatus } from "@/lib/businesses";

type BillingPanelProps = {
  subscriptionStatus: SubscriptionStatus;
  stripeEnabled: boolean;
  billingMessage?: string | null;
};

export function BillingPanel({
  subscriptionStatus,
  stripeEnabled,
  billingMessage,
}: BillingPanelProps) {
  const [isLoading, setIsLoading] = useState<"checkout" | "portal" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isActive =
    subscriptionStatus === "active" || subscriptionStatus === "trialing";

  async function startCheckout() {
    setError(null);
    setIsLoading("checkout");

    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? "Unable to start checkout.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(null);
    }
  }

  async function openPortal() {
    setError(null);
    setIsLoading("portal");

    try {
      const response = await fetch("/api/stripe/portal", { method: "POST" });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? "Unable to open billing portal.");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(null);
    }
  }

  if (!stripeEnabled) {
    return null;
  }

  return (
    <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Billing
          </p>
          <h2 className="mt-2 text-xl font-bold text-white">
            Early pilot — $49/month
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            {isActive
              ? "Your subscription is active. Your widget and dashboard are fully enabled."
              : "Subscribe to activate lead capture on your website widget and owner dashboard."}
          </p>
          <p className="mt-3 text-sm font-medium text-slate-300">
            Status:{" "}
            <span className="text-cyan-400">{subscriptionStatus}</span>
          </p>
          {billingMessage === "success" && (
            <p className="mt-3 text-sm text-emerald-300">
              Payment successful. Your subscription should be active shortly.
            </p>
          )}
          {billingMessage === "canceled" && (
            <p className="mt-3 text-sm text-amber-300">
              Checkout canceled. You can subscribe whenever you are ready.
            </p>
          )}
          {error && (
            <p className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:items-end">
          {!isActive ? (
            <button
              type="button"
              onClick={startCheckout}
              disabled={isLoading !== null}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading === "checkout" ? "Redirecting..." : "Subscribe for $49/mo"}
            </button>
          ) : (
            <button
              type="button"
              onClick={openPortal}
              disabled={isLoading !== null}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading === "portal" ? "Opening..." : "Manage billing"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
