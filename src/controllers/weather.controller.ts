import { NextFunction, Request, Response } from "express";
import { WeatherService } from "../services/weather.service";

const weatherController = (service: WeatherService) => {
  const getWeatherByCoordinate = (req: Request, res: Response, next: NextFunction) => {
    // return service.getWeatherByCoordinate();
  };

  const getWeatherByCityName = (req: Request, res: Response, next: NextFunction) => {
    // return service.getWeatherByCityName();
  };

  const getWeatherByCityId = (req: Request, res: Response, next: NextFunction) => {
    // return service.getWeatherByCityId();
  };

  const getWeatherByZipCode = (req: Request, res: Response, next: NextFunction) => {
    // return service.getWeatherByZipCode();
  };

  return {
    getWeatherByCoordinate,
    getWeatherByCityName,
    getWeatherByCityId,
    getWeatherByZipCode,
  };
};

export default weatherController;
