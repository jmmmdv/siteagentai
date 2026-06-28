import { isDatabaseConfigured } from "@/lib/db";
import { createLead } from "@/lib/leads";
import type { Urgency } from "@/lib/lead-types";
import { NextResponse } from "next/server";

const URGENCY_VALUES: Urgency[] = ["Low", "Medium", "High"];

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  serviceNeeded?: string;
  urgency?: string;
  message?: string;
  website?: string;
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parsePayload(body: LeadPayload) {
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const serviceNeeded = body.serviceNeeded?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const urgency = body.urgency?.trim() as Urgency | undefined;

  if (!name || !email || !phone || !serviceNeeded || !message) {
    return { error: "All fields are required." as const };
  }

  if (!isValidEmail(email)) {
    return { error: "Please enter a valid email address." as const };
  }

  if (!urgency || !URGENCY_VALUES.includes(urgency)) {
    return { error: "Please select a valid urgency level." as const };
  }

  if (name.length > 120 || email.length > 254 || phone.length > 40) {
    return { error: "One or more fields are too long." as const };
  }

  if (serviceNeeded.length > 200 || message.length > 2000) {
    return { error: "Service or message is too long." as const };
  }

  return {
    data: {
      name,
      email,
      phone,
      serviceNeeded,
      urgency,
      message,
    },
  };
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Lead capture is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website?.trim()) {
    return NextResponse.json({ success: true });
  }

  const parsed = parsePayload(body);

  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const lead = await createLead(parsed.data);
    return NextResponse.json({ success: true, id: lead.id });
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json(
      { error: "Unable to save your request. Please try again." },
      { status: 500 },
    );
  }
}
