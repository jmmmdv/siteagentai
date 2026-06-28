import { isDatabaseConfigured } from "@/lib/db";
import { createLead } from "@/lib/leads";
import { getBusinessByWidgetKey } from "@/lib/businesses";
import { isBusinessSubscriptionActive } from "@/lib/stripe-config";
import { NextResponse } from "next/server";
import { getClientIp, checkRateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { validateLeadPayload } from "@/lib/lead-validation";

const LEAD_RATE_LIMIT = {
  maxRequests: 10,
  windowMs: 10 * 60 * 1000,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Lead capture is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const clientIp = getClientIp(request.headers);
  const rateLimit = checkRateLimit(`leads:${clientIp}`, LEAD_RATE_LIMIT);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429, headers: rateLimitHeaders(rateLimit) },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400, headers: rateLimitHeaders(rateLimit) },
    );
  }

  if (isRecord(body) && typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json(
      { success: true },
      { headers: rateLimitHeaders(rateLimit) },
    );
  }

  const parsed = validateLeadPayload(body);

  if ("error" in parsed) {
    return NextResponse.json(
      { error: parsed.error },
      { status: 400, headers: rateLimitHeaders(rateLimit) },
    );
  }

  const business = await getBusinessByWidgetKey(parsed.data.widgetKey);
  if (!business) {
    return NextResponse.json(
      { error: "This widget is not active." },
      { status: 404, headers: rateLimitHeaders(rateLimit) },
    );
  }

  if (!isBusinessSubscriptionActive(business)) {
    return NextResponse.json(
      { error: "This widget is temporarily unavailable." },
      { status: 403, headers: rateLimitHeaders(rateLimit) },
    );
  }

  try {
    const lead = await createLead(
      {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        serviceNeeded: parsed.data.serviceNeeded,
        urgency: parsed.data.urgency,
        message: parsed.data.message,
      },
      business.id,
    );
    return NextResponse.json(
      { success: true, id: lead.id },
      { headers: rateLimitHeaders(rateLimit) },
    );
  } catch (error) {
    console.error("Failed to create lead:", error);
    return NextResponse.json(
      { error: "Unable to save your request. Please try again." },
      { status: 500, headers: rateLimitHeaders(rateLimit) },
    );
  }
}
