import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-400">Last updated: June 2026</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
          <p>
            SiteAgentAI helps small service businesses capture website leads
            through an AI-powered website assistant and owner dashboard.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-white">Information we collect</h2>
            <p className="mt-2">
              When a website visitor submits a lead through the SiteAgentAI
              widget, we collect the information they provide, such as name,
              email, phone number, service request, urgency, and message details.
            </p>
            <p className="mt-2">
              Business owners provide account information such as email address
              and business name when signing in.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">How we use information</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Display leads in the business owner dashboard</li>
              <li>Generate AI-style summaries and recommended follow-up actions</li>
              <li>Send email notifications to business owners when configured</li>
              <li>Process subscriptions and billing through Stripe</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Third-party services</h2>
            <p className="mt-2">
              SiteAgentAI may use third-party providers such as hosting,
              database, email, OpenAI, and Stripe to operate the service. These
              providers process data according to their own policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Data retention</h2>
            <p className="mt-2">
              Lead data is retained while the business account is active unless
              deleted by the business owner or as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
            <p className="mt-2">
              Questions about this policy can be sent to{" "}
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
