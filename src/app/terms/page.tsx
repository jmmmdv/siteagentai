import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-sm font-bold text-cyan-400">
            SiteAgentAI
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-white">
            Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-400">Last updated: June 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
          <p>
            These Terms of Service govern your use of SiteAgentAI, an AI website
            assistant and lead dashboard for small service businesses.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-white">Service description</h2>
            <p className="mt-2">
              SiteAgentAI provides a website widget, lead capture flow, owner
              dashboard, AI-style lead summaries, and recommended follow-up
              actions. Features may change as the product evolves during early
              pilot releases.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Early pilot pricing</h2>
            <p className="mt-2">
              Early pilot subscriptions are billed monthly through Stripe at the
              price shown at checkout unless otherwise stated. Subscriptions
              renew automatically until canceled through the billing portal.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Acceptable use</h2>
            <p className="mt-2">
              You agree to use SiteAgentAI lawfully and only for legitimate
              business lead capture. You are responsible for how you collect,
              store, and follow up on customer information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Disclaimer</h2>
            <p className="mt-2">
              SiteAgentAI is provided on an &ldquo;as is&rdquo; basis during the
              early pilot period. AI-generated summaries are assistive and should
              be reviewed by a human before customer follow-up.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to{" "}
              <a
                href="mailto:info@jlobglobal.com"
                className="text-cyan-400 hover:underline"
              >
                info@jlobglobal.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
