import { Request, Response } from "express";

const weatherController = () => {
  const getWeatherByCoordinate = (req: Request, res: Response) => {};

  const getWeatherByCityName = (req: Request, res: Response) => {};

  const getWeatherByCityId = (req: Request, res: Response) => {};

  const getWeatherByZipCode = (req: Request, res: Response) => {};

  return {
    getWeatherByCoordinate,
    getWeatherByCityName,
    getWeatherByCityId,
    getWeatherByZipCode,
  };
};

export default weatherController;
