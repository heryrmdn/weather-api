import { NextFunction, Request, Response } from "express";

const notFound = () => {
  const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {};
  return {
    notFoundHandler,
  };
};

export const notFoundMiddleware = notFound();
