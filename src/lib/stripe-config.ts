import Stripe from "stripe";
import type { Business, SubscriptionStatus } from "@/lib/businesses";

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY && process.env.STRIPE_PRICE_ID,
  );
}

export function isStripeEnforced(): boolean {
  return (
    isStripeConfigured() &&
    process.env.STRIPE_ENFORCE_SUBSCRIPTIONS !== "false"
  );
}

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export function getStripePriceId(): string {
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    throw new Error("STRIPE_PRICE_ID is not configured");
  }
  return priceId;
}

export function mapStripeSubscriptionStatus(
  status: Stripe.Subscription.Status,
): SubscriptionStatus {
  switch (status) {
    case "active":
      return "active";
    case "trialing":
      return "trialing";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "incomplete_expired":
      return "canceled";
    default:
      return "inactive";
  }
}

export function isBusinessSubscriptionActive(business: Business): boolean {
  if (!isStripeEnforced()) {
    return true;
  }

  return business.subscriptionStatus === "active" ||
    business.subscriptionStatus === "trialing";
}

export function getSubscriptionLabel(status: SubscriptionStatus): string {
  switch (status) {
    case "active":
      return "Active";
    case "trialing":
      return "Trial";
    case "past_due":
      return "Past due";
    case "canceled":
      return "Canceled";
    default:
      return "Inactive";
  }
}
