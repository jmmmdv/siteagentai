import { Resend } from "resend";
import type { Lead } from "@/lib/lead-types";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendLeadNotificationEmail(
  lead: Lead,
  notificationEmail: string | null,
): Promise<void> {
  const toEmail =
    notificationEmail?.trim() || process.env.OWNER_NOTIFICATION_EMAIL?.trim();

  if (!isEmailConfigured() || !toEmail) {
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "SiteAgentAI <onboarding@resend.dev>";

  await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject: `New lead: ${lead.serviceNeeded} (${lead.urgency} urgency)`,
    text: [
      "New SiteAgentAI lead",
      "",
      `Name: ${lead.customerName}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      `Service: ${lead.serviceNeeded}`,
      `Urgency: ${lead.urgency}`,
      "",
      "AI Summary:",
      lead.aiSummary,
      "",
      "Recommended next action:",
      lead.recommendedAction,
      "",
      "View all leads in your SiteAgentAI admin dashboard.",
    ].join("\n"),
  });
}
