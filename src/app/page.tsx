import Link from "next/link";
import { WebsiteAssistant } from "@/components/WebsiteAssistant";
import { getDefaultBusiness } from "@/lib/businesses";
import { isDatabaseConfigured } from "@/lib/db";

const pilotMailto =
  "mailto:info@jlobglobal.com?subject=SiteAgentAI%20Early%20Pilot%20Request&body=Hi%2C%20I%27m%20interested%20in%20the%20SiteAgentAI%20early%20pilot.%0A%0ABusiness%20name%3A%20%0AService%20type%3A%20%0AWebsite%3A%20%0APhone%3A%20";

const problems = [
  "Visitors leave without calling or filling out a long contact form.",
  "After hours and weekends, nobody is there to answer questions.",
  "Leads arrive as messy messages with no clear next step.",
  "Owners lose time figuring out who to call back first.",
];

const solutions = [
  {
    title: "24/7 website assistant",
    description:
      "A floating AI employee invites visitors to describe what they need — any time, on any page.",
    icon: "◎",
  },
  {
    title: "Structured lead capture",
    description:
      "Name, email, phone, service needed, urgency, and details — collected in under a minute.",
    icon: "▣",
  },
  {
    title: "Owner-ready summaries",
    description:
      "Every submission becomes a clear lead summary with a recommended follow-up action.",
    icon: "✦",
  },
];

const steps = [
  {
    step: "01",
    title: "Visitor opens the widget",
    description:
      "They click Talk to AI Employee and describe what they need in a simple guided form.",
  },
  {
    step: "02",
    title: "SiteAgentAI captures the lead",
    description:
      "Contact info, service request, urgency, and message details are saved instantly.",
  },
  {
    step: "03",
    title: "You follow up faster",
    description:
      "The owner dashboard shows a summary and recommended next action — ready to call back.",
  },
];

const ownerReceives = [
  "Customer name, email, and phone",
  "Service needed and urgency level",
  "Full message details from the visitor",
  "AI-style summary of the request",
  "Recommended next action for your team",
];

const industries = [
  { name: "Real estate agents", example: "Buyers, sellers, and rental inquiries" },
  { name: "Cleaning companies", example: "Recurring service and move-out requests" },
  { name: "Law offices", example: "Consultation and case intake requests" },
  { name: "Clinics", example: "Appointment and new patient inquiries" },
  { name: "Consultants", example: "Discovery calls and project inquiries" },
  { name: "Home repair", example: "HVAC, plumbing, roofing, and remodeling" },
  { name: "Transportation", example: "Quotes, bookings, and route requests" },
];

const pilotIncludes = [
  "Live website widget for lead capture",
  "Owner dashboard with lead inbox",
  "AI-style summaries and next actions",
  "Embed code for your website",
  "Early pilot support while we onboard",
];

export default async function Home() {
  let widgetKey: string | null = null;
  let demoReady = false;

  if (isDatabaseConfigured()) {
    try {
      const business = await getDefaultBusiness();
      widgetKey = business?.widgetKey ?? null;
      demoReady = Boolean(widgetKey);
    } catch (error) {
      console.error("Failed to load default business widget:", error);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-slate-950 pb-28 text-white sm:pb-32">
        <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20 text-sm font-bold text-cyan-400">
                SA
              </div>
              <span className="text-lg font-bold tracking-tight">
                SiteAgentAI
              </span>
            </Link>
            <nav className="flex items-center gap-2 sm:gap-3">
              <a
                href="#pilot"
                className="hidden min-h-11 items-center text-sm text-slate-400 transition-colors hover:text-white sm:inline-flex"
              >
                Pricing
              </a>
              <Link
                href="/login"
                className="min-h-11 inline-flex items-center text-sm text-slate-400 transition-colors hover:text-white"
              >
                <span className="sm:hidden">Login</span>
                <span className="hidden sm:inline">Owner login</span>
              </Link>
              <a
                href="#demo"
                className="inline-flex min-h-11 items-center rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 sm:px-4"
              >
                Try the live demo
              </a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Turn passive websites into lead machines
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Your website should capture leads{" "}
              <span className="text-cyan-400">24/7</span> — not just sit there.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              SiteAgentAI adds an AI website employee to small service businesses.
              Visitors describe what they need, leave contact info, and you receive
              a qualified lead with a summary and recommended follow-up — even
              after hours.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={pilotMailto}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 transition-colors hover:bg-cyan-400"
              >
                Request early pilot — $49/mo
              </a>
              <a
                href="#demo"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 px-8 py-4 text-base font-semibold text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
              >
                Try the live demo
              </a>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-500">
              {demoReady ? (
                <>
                  <span className="font-medium text-slate-400">Live demo:</span>{" "}
                  click{" "}
                  <span className="font-medium text-cyan-400/90">
                    Talk to AI Employee
                  </span>{" "}
                  in the bottom-right corner, submit a test lead, then sign in to
                  the owner dashboard to see it appear.
                </>
              ) : (
                <>
                  Demo widget loads when the production database is connected.
                  Contact us to request an early pilot spot.
                </>
              )}
            </p>
          </div>
        </section>

        {/* Problem */}
        <section className="border-t border-slate-800/60 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-400/90">
              The problem
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
              Most small business websites don&apos;t convert visitors into calls
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {problems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-5"
                >
                  <span className="mt-0.5 text-red-400">✕</span>
                  <span className="text-sm leading-relaxed text-slate-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Solution */}
        <section className="border-t border-slate-800/60 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              The solution
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
              An AI employee that turns visitors into actionable leads
            </h2>
            <p className="mt-4 max-w-2xl text-slate-400">
              SiteAgentAI sits on your website, guides visitors through a short
              request form, and delivers everything your team needs to follow up
              fast.
            </p>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {solutions.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-lg text-cyan-400">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-slate-800/60 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From website visitor to booked job
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
                >
                  <span className="text-3xl font-black text-cyan-500/30">
                    {item.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for + industries */}
        <section className="border-t border-slate-800/60 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Who it&apos;s for
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
              Built for local service businesses that live on leads
            </h2>
            <p className="mt-4 max-w-2xl text-slate-400">
              If your business depends on inbound requests, SiteAgentAI helps you
              capture more of them — without hiring extra staff.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <div
                  key={industry.name}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-slate-700"
                >
                  <h3 className="font-semibold text-white">{industry.name}</h3>
                  <p className="mt-1.5 text-sm text-slate-400">
                    {industry.example}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What owner receives */}
        <section className="border-t border-slate-800/60 px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                  What you receive
                </p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  Every lead arrives ready for follow-up
                </h2>
                <p className="mt-4 text-slate-400">
                  No digging through emails or voicemails. The owner dashboard
                  shows exactly who to call, what they need, and what to do next.
                </p>
              </div>
              <ul className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
                {ownerReceives.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs text-cyan-400">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Demo CTA */}
        <section
          id="demo"
          className="border-t border-slate-800/60 px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Live demo
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              See it work in under 2 minutes
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Play the role of a customer. Submit a test request, then open the
              owner dashboard to see how SiteAgentAI presents the lead.
            </p>

            <ol className="mx-auto mt-8 max-w-md space-y-3 text-left text-sm text-slate-300">
              <li className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <span className="font-bold text-cyan-400">1</span>
                Click Talk to AI Employee ↘
              </li>
              <li className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <span className="font-bold text-cyan-400">2</span>
                Fill in name, email, phone, service, urgency, and details
              </li>
              <li className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <span className="font-bold text-cyan-400">3</span>
                Sign in to the owner dashboard and view your lead
              </li>
            </ol>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
              <p className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-4 text-sm font-medium text-slate-300 sm:max-w-xs">
                Widget is in the bottom-right corner ↘
              </p>
              <Link
                href="/login"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 transition-colors hover:bg-cyan-400 sm:max-w-xs"
              >
                Owner login
              </Link>
            </div>
          </div>
        </section>

        {/* Early pilot pricing */}
        <section
          id="pilot"
          className="border-t border-slate-800/60 px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 to-slate-950">
              <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                      Early pilot pricing
                    </p>
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                      Limited spots
                    </span>
                  </div>
                  <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                    Get your AI website employee live
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-slate-400">
                    We&apos;re onboarding a small group of service business owners
                    who want to stop missing website leads. Founder pricing while
                    we refine the product with real customers.
                  </p>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">$49</span>
                    <span className="text-lg text-slate-400">/ month</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">
                    Request a spot — we&apos;ll reply with next steps.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 sm:p-8">
                  <p className="text-sm font-semibold text-white">
                    What&apos;s included
                  </p>
                  <ul className="mt-4 space-y-3">
                    {pilotIncludes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-slate-300"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs text-cyan-400">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={pilotMailto}
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 transition-colors hover:bg-cyan-400 sm:w-auto"
                  >
                    Request early pilot
                  </a>
                  <p className="mt-4 text-center text-xs text-slate-500 sm:text-left">
                    Prefer to see it first?{" "}
                    <a
                      href="#demo"
                      className="text-cyan-400 underline-offset-2 hover:underline"
                    >
                      Try the live demo
                    </a>{" "}
                    — no signup needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-800/60 px-6 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-500">
              © 2026 SiteAgentAI — AI Website Employee for service businesses
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
              <Link
                href="/privacy"
                className="text-sm text-slate-500 transition-colors hover:text-slate-300"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-slate-500 transition-colors hover:text-slate-300"
              >
                Terms
              </Link>
              <Link
                href="/login"
                className="text-sm text-slate-500 transition-colors hover:text-slate-300"
              >
                Owner login
              </Link>
            </div>
          </div>
        </footer>
      </div>

      <WebsiteAssistant widgetKey={widgetKey} />
    </>
  );
}
