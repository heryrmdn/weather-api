import { errorMiddleware, ErrorMiddleware } from "./error.middleware";
import { notFoundMiddleware, NotFoundMiddleware } from "./not_found.middleware";

export interface Middlewares {
  errorMiddleware: ErrorMiddleware;
  notFoundMiddleware: NotFoundMiddleware;
}

export interface MiddlewaresLoader {
  load: () => Middlewares;
}

export const middlewaresLoader = (): MiddlewaresLoader => {
  const load = () => {
    return {
      errorMiddleware: errorMiddleware(),
      notFoundMiddleware: notFoundMiddleware(),
    };
  };

  return {
    load,
  };
};
