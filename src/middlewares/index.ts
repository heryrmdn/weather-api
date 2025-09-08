import { errorMiddleware, ErrorMiddleware } from "./error.middleware";
import { Morgan, morganMiddleware, MorganMiddleware } from "./morgan.middleware";
import { notFoundMiddleware, NotFoundMiddleware } from "./not_found.middleware";
import { RateLimiter, RateLimiterMiddleware, rateLimiterMiddleware } from "./rate_limiter.middleware";

export interface Middlewares {
  errorMiddleware: ErrorMiddleware;
  notFoundMiddleware: NotFoundMiddleware;
  rateLimiterMiddleware: RateLimiter;
  morganMiddleware: Morgan;
}

export interface MiddlewaresLoader {
  load: () => Middlewares;
}

export const middlewaresLoader = (): MiddlewaresLoader => {
  const load = (): Middlewares => {
    const rl = rateLimiterMiddleware();
    const mm = morganMiddleware();

    return {
      errorMiddleware: errorMiddleware(),
      notFoundMiddleware: notFoundMiddleware(),
      rateLimiterMiddleware: rl.load(),
      morganMiddleware: mm.load(),
    };
  };

  return {
    load,
  };
};
