import { NextFunction, Request, Response } from "express";
import { responseUtil } from "../utils/response.util";

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
  const errorHandler = (err: CustomError, _: any, res: Response) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const error = err.error || null;
    const responseError = responseUtil.responseError(status, message, error);
    return res.status(status).json(responseError);
  };
  return {
    errorHandler,
  };
};

export const errorMiddleware = error();
