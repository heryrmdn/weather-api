import { Weather, WeatherByCityIdRequest, WeatherByCityNameRequest, WeatherByCoordinateRequest, WeatherByZipCodeRequest } from "../interfaces/weather";

export interface WeatherRepository {
  getWeatherByCoordinate(req: WeatherByCoordinateRequest): Promise<Weather | null>;
  getWeatherByCityName(req: WeatherByCityNameRequest): Promise<Weather | null>;
  getWeatherByCityId(req: WeatherByCityIdRequest): Promise<Weather | null>;
  getWeatherByZipCode(req: WeatherByZipCodeRequest): Promise<Weather | null>;
}

export const weatherRepository = (): WeatherRepository => {
  const getWeatherByCoordinate = async (req: WeatherByCoordinateRequest): Promise<Weather | null> => {
    return null;
  };

  const getWeatherByCityName = async (req: WeatherByCityNameRequest): Promise<Weather | null> => {
    return null;
  };

  const getWeatherByCityId = async (req: WeatherByCityIdRequest): Promise<Weather | null> => {
    return null;
  };

  const getWeatherByZipCode = async (req: WeatherByZipCodeRequest): Promise<Weather | null> => {
    return null;
  };

  return {
    getWeatherByCoordinate,
    getWeatherByCityName,
    getWeatherByCityId,
    getWeatherByZipCode,
  };
};
