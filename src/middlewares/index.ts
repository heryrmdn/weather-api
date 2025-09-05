import { errorMiddleware, ErrorMiddleware } from "./error.middleware";
import { notFoundMiddleware, NotFoundMiddleware } from "./not_found.middleware";
import { rateLimiterMiddleware, RateLimiterMiddleware } from "./rate_limiter.middleware";

export interface Middlewares {
  errorMiddleware: ErrorMiddleware;
  notFoundMiddleware: NotFoundMiddleware;
  rateLimiterMiddleware: RateLimiterMiddleware;
}

export interface MiddlewaresLoader {
  load: () => Middlewares;
}

export const middlewaresLoader = (): MiddlewaresLoader => {
  const load = () => {
    return {
      errorMiddleware: errorMiddleware(),
      notFoundMiddleware: notFoundMiddleware(),
      rateLimiterMiddleware: rateLimiterMiddleware(),
    };
  };

  return {
    load,
  };
};
