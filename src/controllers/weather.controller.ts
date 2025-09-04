import { NextFunction, Request, Response } from "express";
import { WeatherByCityIdRequest, WeatherByCityNameRequest, WeatherByCoordinateRequest, WeatherByZipCodeRequest } from "../interfaces/weather";
import { responseUtil } from "../utils/response.util";
import status from "http-status";
import { Services } from "../services";

export interface WeatherController {
  getWeatherByCoordinate: (req: Request, res: Response, next: NextFunction) => void;
  getWeatherByCityName: (req: Request, res: Response, next: NextFunction) => void;
  getWeatherByCityId: (req: Request, res: Response, next: NextFunction) => void;
  getWeatherByZipCode: (req: Request, res: Response, next: NextFunction) => void;
}

export const weatherController = (s: Services): WeatherController => {
  const getWeatherByCoordinate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lat, lon } = req.query as unknown as WeatherByCoordinateRequest;
      const data = await s.weatherService.getWeatherByCoordinate({ lat, lon });
      const responseData = responseUtil.responseData(status.OK, status["200_NAME"], data);
      return res.status(status.OK).json(responseData);
    } catch (err) {
      next(err);
    }
  };

  const getWeatherByCityName = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { q } = req.query as unknown as WeatherByCityNameRequest;
      const data = await s.weatherService.getWeatherByCityName({ q: q });
      const responseData = responseUtil.responseData(status.OK, status["200_NAME"], data);
      return res.status(status.OK).json(responseData);
    } catch (err) {
      next(err);
    }
  };

  const getWeatherByCityId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.query as unknown as WeatherByCityIdRequest;
      const data = await s.weatherService.getWeatherByCityId({ id: id });
      const responseData = responseUtil.responseData(status.OK, status["200_NAME"], data);
      return res.status(status.OK).json(responseData);
    } catch (err) {
      next(err);
    }
  };

  const getWeatherByZipCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { zip } = req.query as unknown as WeatherByZipCodeRequest;
      const data = await s.weatherService.getWeatherByZipCode({ zip: zip });
      const responseData = responseUtil.responseData(status.OK, status["200_NAME"], data);
      return res.status(status.OK).json(responseData);
    } catch (err) {
      next(err);
    }
  };

  return {
    getWeatherByCoordinate,
    getWeatherByCityName,
    getWeatherByCityId,
    getWeatherByZipCode,
  };
};
