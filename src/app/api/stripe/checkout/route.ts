import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getAppUrl, getBusinessById } from "@/lib/businesses";
import { getStripe, getStripePriceId, isStripeConfigured } from "@/lib/stripe-config";

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
  if (!business) {
    return NextResponse.json({ error: "Business not found." }, { status: 404 });
  }

  const stripe = getStripe();
  const appUrl = getAppUrl();

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: business.stripeCustomerId ?? undefined,
    customer_email: business.stripeCustomerId ? undefined : session.user.email ?? undefined,
    line_items: [
      {
        price: getStripePriceId(),
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    success_url: `${appUrl}/admin?billing=success`,
    cancel_url: `${appUrl}/admin?billing=canceled`,
    metadata: {
      businessId: business.id,
    },
    subscription_data: {
      metadata: {
        businessId: business.id,
      },
    },
  });

  if (!checkoutSession.url) {
    return NextResponse.json(
      { error: "Unable to start checkout." },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: checkoutSession.url });
}
