import OpenAI from "openai";
import { buildLeadSummary } from "@/lib/lead-summary";
import type { CreateLeadInput } from "@/lib/lead-types";

export type SummarySource = "ai" | "rules";

export type LeadSummaryResult = {
  aiSummary: string;
  recommendedAction: string;
  source: SummarySource;
};

const DEFAULT_MODEL = "gpt-4o-mini";
const MAX_MESSAGE_CHARS = 1500;

export function isAiConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY);
}

function getOpenAiClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

function truncateMessage(message: string): string {
  const trimmed = message.trim();
  if (trimmed.length <= MAX_MESSAGE_CHARS) {
    return trimmed;
  }
  return `${trimmed.slice(0, MAX_MESSAGE_CHARS - 3)}...`;
}

function parseAiResponse(content: string): LeadSummaryResult | null {
  try {
    const parsed = JSON.parse(content) as {
      aiSummary?: string;
      recommendedAction?: string;
    };

    const aiSummary = parsed.aiSummary?.trim();
    const recommendedAction = parsed.recommendedAction?.trim();

    if (!aiSummary || !recommendedAction) {
      return null;
    }

    return {
      aiSummary,
      recommendedAction,
      source: "ai",
    };
  } catch {
    return null;
  }
}

export async function generateLeadSummary(
  input: CreateLeadInput,
): Promise<LeadSummaryResult> {
  if (!isAiConfigured()) {
    const fallback = buildLeadSummary(input);
    return { ...fallback, source: "rules" };
  }

  const model = process.env.OPENAI_MODEL ?? DEFAULT_MODEL;
  const client = getOpenAiClient();

  try {
    const response = await client.chat.completions.create({
      model,
      max_tokens: 350,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: [
            "You summarize website leads for small service businesses (HVAC, plumbing, landscaping, roofing, remodeling).",
            "Return JSON only with keys: aiSummary, recommendedAction.",
            "aiSummary: 2-3 sentences in plain English explaining who the customer is, what they need, urgency context, and any useful details.",
            "recommendedAction: one specific next step for the business owner (who to call, when, and what to offer).",
            "Be practical and concise. Do not invent facts not present in the lead.",
          ].join(" "),
        },
        {
          role: "user",
          content: [
            `Customer name: ${input.name}`,
            `Email: ${input.email}`,
            `Phone: ${input.phone}`,
            `Service needed: ${input.serviceNeeded}`,
            `Urgency: ${input.urgency}`,
            `Message: ${truncateMessage(input.message)}`,
          ].join("\n"),
        },
      ],
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty OpenAI response");
    }

    const parsed = parseAiResponse(content);
    if (!parsed) {
      throw new Error("Invalid OpenAI JSON response");
    }

    return parsed;
  } catch (error) {
    console.error("OpenAI lead summary failed, using rule-based fallback:", error);
    const fallback = buildLeadSummary(input);
    return { ...fallback, source: "rules" };
  }
}
