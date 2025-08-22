import { Weather, WeatherByCityIdRequest, WeatherByCityNameRequest, WeatherByCoordinateRequest, WeatherByZipCodeRequest } from "../interfaces/weather";
import { WeatherRepository } from "../repositories/weather.repository";

export interface WeatherService {
  getWeatherByCoordinate(req: WeatherByCoordinateRequest): Promise<Weather | null>;
  getWeatherByCityName(req: WeatherByCityNameRequest): Promise<Weather | null>;
  getWeatherByCityId(req: WeatherByCityIdRequest): Promise<Weather | null>;
  getWeatherByZipCode(req: WeatherByZipCodeRequest): Promise<Weather | null>;
}

export const weatherService = (repo: WeatherRepository): WeatherService => {
  const getWeatherByCoordinate = async (req: WeatherByCoordinateRequest): Promise<Weather | null> => {
    const data = repo.getWeatherByCoordinate(req);
    return data;
  };

  const getWeatherByCityName = async (req: WeatherByCityNameRequest): Promise<Weather | null> => {
    const data = repo.getWeatherByCityName(req);
    return data;
  };

  const getWeatherByCityId = async (req: WeatherByCityIdRequest): Promise<Weather | null> => {
    const data = repo.getWeatherByCityId(req);
    return data;
  };

  const getWeatherByZipCode = async (req: WeatherByZipCodeRequest): Promise<Weather | null> => {
    const data = repo.getWeatherByZipCode(req);
    return data;
  };

  return {
    getWeatherByCoordinate,
    getWeatherByCityName,
    getWeatherByCityId,
    getWeatherByZipCode,
  };
};
