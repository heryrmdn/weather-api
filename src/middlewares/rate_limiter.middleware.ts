import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

export interface RateLimiterMiddleware {
  rateLimiterHandler: () => void;
}

export const rateLimiterMiddleware = (): RateLimiterMiddleware => {
  const rateLimiterHandler = (): RateLimitRequestHandler => {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: true,
      legacyHeaders: false,
      ipv6Subnet: 56,
    });

    return limiter;
  };
  return {
    rateLimiterHandler,
  };
};
