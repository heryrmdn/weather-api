import { NextFunction, Request, Response } from "express";
import { WeatherRequest } from "../interfaces/weather";
import { responseUtil } from "../utils/response.util";
import status from "http-status";
import { Services } from "../services";

export interface WeatherController {
  getWeather: (req: Request, res: Response, next: NextFunction) => void;
}

export const weatherController = (s: Services): WeatherController => {
  const getWeather = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lat, lon, q, id, zip }: WeatherRequest = req.query;
      const weatherReq: WeatherRequest = {};

      weatherReq.lat = lat ?? null;
      weatherReq.lon = lon ?? null;
      weatherReq.q = q ?? null;
      weatherReq.id = id ?? null;
      weatherReq.zip = zip ?? null;

      const data = await s.weatherService.getWeather(weatherReq);
      const responseData = responseUtil.responseData(status.OK, status["200_NAME"], data);

      return res.status(status.OK).json(responseData);
    } catch (err) {
      next(err);
    }
  };

  return {
    getWeather,
  };
};
