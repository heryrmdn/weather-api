import { NextFunction, Request, Response } from "express";
import { responseUtil } from "../utils/response.util";
import status from "http-status";
import { Services } from "../services";
import { requestUtil } from "../utils/request.util";

export interface WeatherController {
  getWeather: (req: Request, res: Response, next: NextFunction) => void;
  getForecast: (req: Request, res: Response, next: NextFunction) => void;
}

export const weatherController = (s: Services): WeatherController => {
  const getWeather = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const weatherReq = requestUtil.checkRequestWeather(req.query);

      const data = await s.weatherService.getWeather(weatherReq);
      const responseData = responseUtil.responseData(status.OK, status["200_NAME"], data);

      return res.status(status.OK).json(responseData);
    } catch (err) {
      next(err);
    }
  };

  const getForecast = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const weatherReq = requestUtil.checkRequestWeather(req.query);

      const data = await s.weatherService.getForecast(weatherReq);
      const responseData = responseUtil.responseData(status.OK, status["200_NAME"], data);

      return res.status(status.OK).json(responseData);
    } catch (err) {
      next(err);
    }
  };

  return {
    getWeather,
    getForecast,
  };
};
