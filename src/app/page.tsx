import Link from "next/link";
import { WebsiteAssistant } from "@/components/WebsiteAssistant";

const features = [
  {
    title: "Captures leads 24/7",
    description:
      "Your AI employee never sleeps. Visitors can describe what they need and leave contact info any time of day.",
    icon: "◎",
  },
  {
    title: "AI-powered summaries",
    description:
      "Every submission becomes a clear, actionable lead summary — so you know exactly what the customer wants.",
    icon: "✦",
  },
  {
    title: "Recommended next steps",
    description:
      "Get smart suggestions on how to follow up, what to say, and when to reach out.",
    icon: "→",
  },
  {
    title: "Built for service businesses",
    description:
      "HVAC, plumbing, landscaping, roofing, remodeling — SiteAgentAI speaks your customers' language.",
    icon: "◈",
  },
];

const steps = [
  {
    step: "01",
    title: "Visitor lands on your site",
    description: "A floating AI assistant invites them to describe what they need.",
  },
  {
    step: "02",
    title: "They share their request",
    description:
      "Name, contact info, service needed, urgency, and details — all in one simple form.",
  },
  {
    step: "03",
    title: "You get a qualified lead",
    description:
      "AI summarizes the request and recommends your next action. No missed opportunities.",
  },
];

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-slate-950 pb-28 text-white sm:pb-32">
        {/* Navigation */}
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
            <nav className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/admin"
                className="min-h-11 inline-flex items-center text-sm text-slate-400 transition-colors hover:text-white"
              >
                <span className="sm:hidden">Admin</span>
                <span className="hidden sm:inline">Admin preview</span>
              </Link>
              <a
                href="#demo"
                className="inline-flex min-h-11 items-center rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 sm:px-4"
              >
                Try the demo
              </a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              AI Website Employee
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              An AI employee on your website that{" "}
              <span className="text-cyan-400">captures leads</span> for you.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              SiteAgentAI gives small service businesses a floating website
              assistant. Visitors describe what they need, leave their contact
              info, and you receive a ready-to-act lead with an AI summary and
              recommended follow-up.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <a
                href="#demo"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 transition-colors hover:bg-cyan-400"
              >
                1. Try the lead widget
              </a>
              <Link
                href="/admin"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 px-8 py-4 text-base font-semibold text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
              >
                2. View owner dashboard
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Step 1: click{" "}
              <span className="font-medium text-slate-400">
                Talk to AI Employee
              </span>{" "}
              in the bottom-right corner and submit a test request.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-slate-800/60 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Why SiteAgentAI
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Everything a small business needs
            </h2>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-slate-700"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-lg text-cyan-400">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-slate-800/60 px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From visitor to lead in seconds
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
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

        {/* CTA */}
        <section
          id="demo"
          className="border-t border-slate-800/60 px-4 py-20 sm:px-6"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Try the demo in 2 minutes
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Submit a test lead as a visitor, then open the owner dashboard to
              see how SiteAgentAI presents the request to your team.
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <p className="flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-4 text-sm text-slate-300 sm:max-w-sm">
                <span>
                  Open{" "}
                  <span className="font-semibold text-cyan-400">
                    Talk to AI Employee
                  </span>{" "}
                  ↘ and submit a test lead
                </span>
              </p>
              <Link
                href="/admin"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 transition-colors hover:bg-cyan-400 sm:max-w-xs"
              >
                Open owner dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800/60 px-6 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-500">
              © 2026 SiteAgentAI — MVP Demo
            </p>
            <Link
              href="/admin"
              className="text-sm text-slate-500 transition-colors hover:text-slate-300"
            >
              Admin preview
            </Link>
          </div>
        </footer>
      </div>

      <WebsiteAssistant />
    </>
  );
}
