import { NextFunction, Request, Response } from "express";
import { WeatherService } from "../services/weather.service";

interface WeatherController {
  getWeatherByCoordinate(req: Request, res: Response, next: NextFunction): void;
  getWeatherByCityName(req: Request, res: Response, next: NextFunction): void;
  getWeatherByCityId(req: Request, res: Response, next: NextFunction): void;
  getWeatherByZipCode(req: Request, res: Response, next: NextFunction): void;
}

const weatherController = (service: WeatherService): WeatherController => {
  const getWeatherByCoordinate = async (req: Request, res: Response, next: NextFunction) => {
    // return service.getWeatherByCoordinate();
  };

  const getWeatherByCityName = async (req: Request, res: Response, next: NextFunction) => {
    // return service.getWeatherByCityName();
  };

  const getWeatherByCityId = async (req: Request, res: Response, next: NextFunction) => {
    // return service.getWeatherByCityId();
  };

  const getWeatherByZipCode = async (req: Request, res: Response, next: NextFunction) => {
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
