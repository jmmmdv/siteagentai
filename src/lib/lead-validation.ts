import { z } from "zod";

const trimmedString = z.string().trim();

export const leadPayloadSchema = z.object({
  name: trimmedString.min(1).max(120),
  email: trimmedString.email().max(254).toLowerCase(),
  phone: trimmedString.min(1).max(40),
  serviceNeeded: trimmedString.min(1).max(200),
  urgency: z.enum(["Low", "Medium", "High"]),
  message: trimmedString.min(1).max(2000),
  website: z.string().optional(),
  widgetKey: trimmedString.min(1).max(120),
});

export type LeadPayload = z.input<typeof leadPayloadSchema>;
export type ValidatedLeadPayload = z.output<typeof leadPayloadSchema>;

export function validateLeadPayload(body: unknown):
  | { data: ValidatedLeadPayload }
  | { error: string } {
  const result = leadPayloadSchema.safeParse(body);

  if (result.success) {
    return { data: result.data };
  }

  const firstIssue = result.error.issues[0];
  const field = firstIssue?.path[0];

  if (field === "email") {
    return { error: "Please enter a valid email address." };
  }

  if (field === "urgency") {
    return { error: "Please select a valid urgency level." };
  }

  if (firstIssue?.code === "too_big") {
    return { error: "One or more fields are too long." };
  }

  if (field === "widgetKey") {
    return { error: "Widget is not configured for this site." };
  }

  return { error: "All fields are required." };
}
