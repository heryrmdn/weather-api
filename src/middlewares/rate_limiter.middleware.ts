import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

export interface RateLimiter {
  limiter: RateLimitRequestHandler;
}

export interface RateLimiterMiddleware {
  load: () => RateLimiter;
}

export const rateLimiterMiddleware = (): RateLimiterMiddleware => {
  const load = (): RateLimiter => {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: true,
      legacyHeaders: false,
      ipv6Subnet: 56,
    });

    return {
      limiter,
    };
  };

  return {
    load,
  };
};
