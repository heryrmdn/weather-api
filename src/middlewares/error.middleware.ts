import { NextFunction, Request, Response } from "express";
import { responseUtil } from "../utils/response.util";
import status from "http-status";

export class CustomError extends Error {
  status: number;
  error: any;

  constructor(status: number, message: string, error?: any) {
    super(message);
    this.status = status;
    this.error = error;
  }
}

const error = () => {
  const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const errStatus = err.status || status.INTERNAL_SERVER_ERROR;
    const message = err.message || status["500_NAME"];
    const error = err.error || null;
    const responseError = responseUtil.responseError(errStatus, message, error);
    return res.status(errStatus).json(responseError);
  };
  return {
    errorHandler,
  };
};

export const errorMiddleware = error();
