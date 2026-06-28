import { describe, expect, it } from "vitest";
import { validateLeadPayload } from "@/lib/lead-validation";

const validPayload = {
  name: "  Sarah  ",
  email: "SARAH@example.com ",
  phone: "555-0101",
  serviceNeeded: "AC repair",
  urgency: "High",
  message: "The unit stopped cooling.",
  widgetKey: "widget-123",
};

describe("validateLeadPayload", () => {
  it("trims and normalizes a valid lead payload", () => {
    const result = validateLeadPayload(validPayload);

    expect(result).toEqual({
      data: {
        ...validPayload,
        name: "Sarah",
        email: "sarah@example.com",
      },
    });
  });

  it("returns a safe error for invalid email", () => {
    const result = validateLeadPayload({
      ...validPayload,
      email: "not-an-email",
    });

    expect(result).toEqual({
      error: "Please enter a valid email address.",
    });
  });

  it("returns a safe error for oversized fields", () => {
    const result = validateLeadPayload({
      ...validPayload,
      message: "x".repeat(2001),
    });

    expect(result).toEqual({
      error: "One or more fields are too long.",
    });
  });
});
