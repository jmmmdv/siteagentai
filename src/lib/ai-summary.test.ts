import { afterEach, describe, expect, it } from "vitest";
import { generateLeadSummary } from "@/lib/ai-summary";

describe("generateLeadSummary", () => {
  const originalApiKey = process.env.OPENAI_API_KEY;

  afterEach(() => {
    process.env.OPENAI_API_KEY = originalApiKey;
  });

  it("uses the rule-based fallback when OpenAI is not configured", async () => {
    delete process.env.OPENAI_API_KEY;

    const result = await generateLeadSummary({
      name: "Sam",
      email: "sam@example.com",
      phone: "555-0101",
      serviceNeeded: "Roof inspection",
      urgency: "High",
      message: "Hail damaged the south-facing roof.",
    });

    expect(result.source).toBe("rules");
    expect(result.aiSummary).toContain("Sam requested roof inspection");
    expect(result.recommendedAction).toContain("Call within 15 minutes");
  });
});
