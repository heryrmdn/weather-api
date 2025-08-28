import { NextFunction, Request, Response } from "express";
import { WeatherService } from "../services/weather.service";
import { WeatherByCityIdRequest, WeatherByCityNameRequest, WeatherByCoordinateRequest, WeatherByZipCodeRequest } from "../interfaces/weather";
import { responseUtil } from "../utils/response.util";
import status from "http-status";

interface WeatherController {
  getWeatherByCoordinate(req: Request, res: Response, next: NextFunction): void;
  getWeatherByCityName(req: Request, res: Response, next: NextFunction): void;
  getWeatherByCityId(req: Request, res: Response, next: NextFunction): void;
  getWeatherByZipCode(req: Request, res: Response, next: NextFunction): void;
}

const weatherController = (service: WeatherService): WeatherController => {
  const getWeatherByCoordinate = async (req: Request, res: Response, next: NextFunction) => {
    const { lat, lon } = req.query as unknown as WeatherByCoordinateRequest;
    const data = await service.getWeatherByCoordinate({ lat, lon });
    const responseData = responseUtil.responseData(status.OK, status["200_NAME"], data);
    return res.json(responseData);
  };

  const getWeatherByCityName = async (req: Request, res: Response, next: NextFunction) => {
    const { q } = req.query as unknown as WeatherByCityNameRequest;
    const data = await service.getWeatherByCityName({ q: q });
    const responseData = responseUtil.responseData(status.OK, status["200_NAME"], data);
    return res.json(responseData);
  };

  const getWeatherByCityId = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query as unknown as WeatherByCityIdRequest;
    const data = await service.getWeatherByCityId({ id: id });
    const responseData = responseUtil.responseData(status.OK, status["200_NAME"], data);
    return res.json(responseData);
  };

  const getWeatherByZipCode = async (req: Request, res: Response, next: NextFunction) => {
    const { zip } = req.query as unknown as WeatherByZipCodeRequest;
    const data = await service.getWeatherByZipCode({ zip: zip });
    const responseData = responseUtil.responseData(status.OK, status["200_NAME"], data);
    return res.json(responseData);
  };

  return {
    getWeatherByCoordinate,
    getWeatherByCityName,
    getWeatherByCityId,
    getWeatherByZipCode,
  };
};

export default weatherController;
