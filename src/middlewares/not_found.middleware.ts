import { NextFunction, Request, Response } from "express";
import { CustomError } from "./error.middleware";
import status from "http-status";

export interface NotFoundMiddleware {
  notFoundHandler: (req: Request, res: Response, next: NextFunction) => void;
}

export const notFoundMiddleware = (): NotFoundMiddleware => {
  const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const err = new CustomError(status.NOT_FOUND, status["404_NAME"]);
    next(err);
  };
  return {
    notFoundHandler,
  };
};
