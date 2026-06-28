"use client";

import Link from "next/link";

type PilotSubscribeButtonProps = {
  stripeEnabled: boolean;
  mailtoHref: string;
};

export function PilotSubscribeButton({
  stripeEnabled,
  mailtoHref,
}: PilotSubscribeButtonProps) {
  if (stripeEnabled) {
    return (
      <div className="mt-6 space-y-3">
        <Link
          href="/login"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 transition-colors hover:bg-cyan-400 sm:w-auto"
        >
          Start early pilot — $49/mo
        </Link>
        <p className="text-xs text-slate-500">
          Sign in to your owner account, then subscribe securely with Stripe.
        </p>
      </div>
    );
  }

  return (
    <a
      href={mailtoHref}
      className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 transition-colors hover:bg-cyan-400 sm:w-auto"
    >
      Request early pilot
    </a>
  );
}
