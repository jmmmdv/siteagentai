import type { CreateLeadInput, Urgency } from "@/lib/lead-types";

function urgencyFollowUp(urgency: Urgency): string {
  switch (urgency) {
    case "High":
      return "Call within 15 minutes. Confirm availability today and offer the earliest service window.";
    case "Medium":
      return "Follow up within 24 hours. Offer a consultation or diagnostic visit this week.";
    case "Low":
      return "Send pricing or scheduling options within 48 hours. Mention any first-visit promotions.";
  }
}

export function buildLeadSummary(input: CreateLeadInput): {
  aiSummary: string;
  recommendedAction: string;
} {
  const trimmedMessage = input.message.trim();
  const messagePreview =
    trimmedMessage.length > 280
      ? `${trimmedMessage.slice(0, 277)}...`
      : trimmedMessage;

  const aiSummary = [
    `${input.name} requested ${input.serviceNeeded.toLowerCase()} (${input.urgency} urgency).`,
    messagePreview,
  ].join(" ");

  return {
    aiSummary,
    recommendedAction: urgencyFollowUp(input.urgency),
  };
}
