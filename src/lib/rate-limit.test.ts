import { describe, expect, it } from "vitest";
import { checkRateLimit, getClientIp, rateLimitHeaders } from "@/lib/rate-limit";

describe("rate limit helpers", () => {
  it("allows requests until the configured limit is exceeded", () => {
    const key = `test:${crypto.randomUUID()}`;
    const options = { maxRequests: 2, windowMs: 60_000 };

    expect(checkRateLimit(key, options, 1000).allowed).toBe(true);
    expect(checkRateLimit(key, options, 1001).allowed).toBe(true);

    const blocked = checkRateLimit(key, options, 1002);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfter).toBe(60);
  });

  it("extracts the first forwarded IP address", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.10, 10.0.0.1",
    });

    expect(getClientIp(headers)).toBe("203.0.113.10");
  });

  it("returns standard rate limit response headers", () => {
    const headers = rateLimitHeaders({
      allowed: false,
      limit: 10,
      remaining: 0,
      resetAt: 2000,
      retryAfter: 30,
    });

    expect(headers).toMatchObject({
      "RateLimit-Limit": "10",
      "RateLimit-Remaining": "0",
      "RateLimit-Reset": "2",
      "Retry-After": "30",
    });
  });
});
