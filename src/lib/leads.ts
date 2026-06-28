import { generateLeadSummary } from "@/lib/ai-summary";
import { getBusinessById } from "@/lib/businesses";
import { getDb, isDatabaseConfigured } from "@/lib/db";
import { sendLeadNotificationEmail } from "@/lib/email";
import { formatRelativeTime } from "@/lib/format-relative-time";
import type { CreateLeadInput, Lead, LeadStatus, Urgency } from "@/lib/lead-types";

type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_needed: string;
  urgency: Urgency;
  message: string;
  status: LeadStatus;
  ai_summary: string;
  recommended_action: string;
  created_at: Date;
  business_id: string;
};

function mapRowToLead(row: LeadRow): Lead {
  return {
    id: row.id,
    customerName: row.name,
    email: row.email,
    phone: row.phone,
    serviceNeeded: row.service_needed,
    urgency: row.urgency,
    status: row.status,
    aiSummary: row.ai_summary,
    recommendedAction: row.recommended_action,
    submittedAt: formatRelativeTime(new Date(row.created_at)),
  };
}

export async function getLeads(businessId: string): Promise<Lead[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  const sql = getDb();
  const rows = await sql<LeadRow[]>`
    SELECT
      id,
      name,
      email,
      phone,
      service_needed,
      urgency,
      message,
      status,
      ai_summary,
      recommended_action,
      created_at,
      business_id
    FROM leads
    WHERE business_id = ${businessId}
    ORDER BY created_at DESC
    LIMIT 100
  `;

  return rows.map(mapRowToLead);
}

export async function createLead(
  input: CreateLeadInput,
  businessId: string,
): Promise<Lead> {
  const sql = getDb();
  const { aiSummary, recommendedAction } = await generateLeadSummary(input);
  const business = await getBusinessById(businessId);

  const rows = await sql<LeadRow[]>`
    INSERT INTO leads (
      business_id,
      name,
      email,
      phone,
      service_needed,
      urgency,
      message,
      ai_summary,
      recommended_action
    ) VALUES (
      ${businessId},
      ${input.name.trim()},
      ${input.email.trim().toLowerCase()},
      ${input.phone.trim()},
      ${input.serviceNeeded.trim()},
      ${input.urgency},
      ${input.message.trim()},
      ${aiSummary},
      ${recommendedAction}
    )
    RETURNING
      id,
      name,
      email,
      phone,
      service_needed,
      urgency,
      message,
      status,
      ai_summary,
      recommended_action,
      created_at,
      business_id
  `;

  const lead = mapRowToLead(rows[0]);

  try {
    await sendLeadNotificationEmail(
      lead,
      business?.notificationEmail ?? process.env.OWNER_NOTIFICATION_EMAIL ?? null,
    );
  } catch (error) {
    console.error("Failed to send lead notification email:", error);
  }

  return lead;
}
