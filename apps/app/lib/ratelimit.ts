import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "https://dummy.upstash.io",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "dummy",
});

// Rate limit: 10 requests per 10 seconds per user
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
  prefix: "clarise:ratelimit",
});
