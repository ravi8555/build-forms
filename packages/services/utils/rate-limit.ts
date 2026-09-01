// packages/services/utils/rate-limit.ts
import "dotenv/config"
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// export const redis = Redis.fromEnv();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// console.log("redis===>",redis);

export const loginLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "15 m"),
});

export const registerLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
});

export const forgotPasswordLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 h"),
});

export const reportLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});
