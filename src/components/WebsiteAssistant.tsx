"use client";

import { type FormEvent, useState } from "react";
import type { Urgency } from "@/lib/lead-types";

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  serviceNeeded: string;
  urgency: Urgency;
  message: string;
  website: string;
};

const initialForm: LeadForm = {
  name: "",
  email: "",
  phone: "",
  serviceNeeded: "",
  urgency: "Medium",
  message: "",
  website: "",
};

const inputClassName =
  "w-full min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 sm:text-sm";

type WebsiteAssistantProps = {
  widgetKey?: string | null;
  defaultOpen?: boolean;
};

export function WebsiteAssistant({
  widgetKey,
  defaultOpen = false,
}: WebsiteAssistantProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState<LeadForm>(initialForm);

  function updateField(field: keyof LeadForm, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    if (!widgetKey) {
      setSubmitError(
        "Lead capture is not configured yet. The business owner needs to connect their widget key.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          serviceNeeded: form.serviceNeeded,
          urgency: form.urgency,
          message: form.message,
          website: form.website,
          widgetKey,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setSubmitError(
          data.error ?? "Unable to send your request. Please try again.",
        );
        return;
      }

      setIsSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleToggle() {
    setIsOpen((current) => !current);
  }

  function handleReset() {
    setForm(initialForm);
    setIsSubmitted(false);
    setSubmitError(null);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] sm:bottom-6 sm:right-6">
      {isOpen && (
        <div
          id="website-assistant-panel"
          className="mb-3 w-[calc(100vw-2rem)] max-w-[380px] overflow-hidden rounded-2xl border border-slate-700/50 bg-white shadow-2xl shadow-black/40 sm:mb-4"
        >
          <div className="relative bg-slate-950 p-5 text-white">
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close assistant"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              ✕
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-lg">
                ✦
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
                  SiteAgentAI
                </p>
                <h3 className="text-base font-bold">AI Website Employee</h3>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Hi! Tell me what you need and I&apos;ll make sure the team gets
              your request with a clear summary.
            </p>
          </div>

          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="max-h-[60vh] space-y-3 overflow-y-auto p-5"
            >
              <p className="text-xs leading-relaxed text-slate-500">
                A quick form — usually under a minute. The business owner
                receives your details and an AI summary of your request.
              </p>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="lead-website">Website</label>
                <input
                  id="lead-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) =>
                    updateField("website", event.target.value)
                  }
                />
              </div>

              <div>
                <label htmlFor="lead-name" className="sr-only">
                  Your name
                </label>
                <input
                  id="lead-name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className={inputClassName}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="lead-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="lead-email"
                  required
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  className={inputClassName}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="lead-phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="lead-phone"
                  required
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                  className={inputClassName}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="lead-service" className="sr-only">
                  Service needed
                </label>
                <input
                  id="lead-service"
                  required
                  placeholder="Service needed (e.g. AC repair)"
                  value={form.serviceNeeded}
                  onChange={(event) =>
                    updateField("serviceNeeded", event.target.value)
                  }
                  className={inputClassName}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="lead-urgency"
                  className="mb-1.5 block text-xs font-medium text-slate-500"
                >
                  How urgent is this?
                </label>
                <select
                  id="lead-urgency"
                  value={form.urgency}
                  onChange={(event) =>
                    updateField("urgency", event.target.value as Urgency)
                  }
                  className={inputClassName}
                  disabled={isSubmitting}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label htmlFor="lead-message" className="sr-only">
                  Message details
                </label>
                <textarea
                  id="lead-message"
                  required
                  placeholder="Tell us a little more about what you need..."
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  className={`${inputClassName} min-h-24 resize-none`}
                  disabled={isSubmitting}
                />
              </div>

              {submitError && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-12 rounded-xl bg-cyan-500 px-4 py-3.5 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send my request"}
              </button>
            </form>
          ) : (
            <div className="p-5">
              <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-xl text-white">
                  ✓
                </div>
                <h4 className="mt-4 text-lg font-bold text-slate-950">
                  Thank you, {form.name || "there"}!
                </h4>
                <p className="mt-2 text-sm font-medium text-slate-800">
                  Your request has been received.
                </p>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  <p className="font-medium text-slate-700">
                    What the business owner receives:
                  </p>
                  <ul className="list-disc space-y-1 pl-4">
                    <li>
                      Your contact details (name, email, and phone)
                    </li>
                    <li>
                      An AI-written summary of your service request and urgency
                    </li>
                    <li>
                      A recommended next step so they can follow up quickly
                    </li>
                  </ul>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  The business owner has been notified and can view this lead in
                  their dashboard.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="mt-4 w-full min-h-12 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Submit another request
              </button>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="website-assistant-panel"
        className={`flex min-h-12 max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full bg-cyan-500 px-4 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-500/25 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/30 sm:max-w-none sm:px-6 sm:py-4 ${!isOpen ? "widget-trigger-pulse" : ""}`}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950/20 text-xs">
          ✦
        </span>
        <span className="truncate">
          {isOpen ? "Close" : "Talk to AI Employee"}
        </span>
      </button>
    </div>
  );
}
