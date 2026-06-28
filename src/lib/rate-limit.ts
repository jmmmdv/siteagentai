type RateLimitOptions = {
  maxRequests: number;
  windowMs: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfter: number;
};

const buckets = new Map<string, RateLimitEntry>();

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}

export function checkRateLimit(
  key: string,
  options: RateLimitOptions,
  now = Date.now(),
): RateLimitResult {
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + options.windowMs;
    buckets.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      limit: options.maxRequests,
      remaining: options.maxRequests - 1,
      resetAt,
      retryAfter: 0,
    };
  }

  existing.count += 1;

  const remaining = Math.max(options.maxRequests - existing.count, 0);
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  return {
    allowed: existing.count <= options.maxRequests,
    limit: options.maxRequests,
    remaining,
    resetAt: existing.resetAt,
    retryAfter,
  };
}

export function rateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(result.remaining),
    "RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
    ...(result.allowed ? {} : { "Retry-After": String(result.retryAfter) }),
  };
}
