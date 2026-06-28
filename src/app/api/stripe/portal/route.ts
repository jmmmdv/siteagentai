import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getAppUrl, getBusinessById } from "@/lib/businesses";
import { getStripe, isStripeConfigured } from "@/lib/stripe-config";

export async function POST() {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: "Billing is not configured yet." },
      { status: 503 },
    );
  }

  const session = await getServerSession(authOptions);
  if (!session?.user.businessId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const business = await getBusinessById(session.user.businessId);
  if (!business?.stripeCustomerId) {
    return NextResponse.json(
      { error: "No billing account found. Start a subscription first." },
      { status: 400 },
    );
  }

  const stripe = getStripe();
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: business.stripeCustomerId,
    return_url: `${getAppUrl()}/admin`,
  });

  return NextResponse.json({ url: portalSession.url });
}
