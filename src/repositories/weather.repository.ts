import { Weather, WeatherByCityIdRequest, WeatherByCityNameRequest, WeatherByCoordinateRequest, WeatherByZipCodeRequest } from "../interfaces/weather";
import { OpenWeatherMapProvider } from "../providers/open_weather_map.provider";

export interface WeatherRepository {
  getWeatherByCoordinate(req: WeatherByCoordinateRequest): Promise<Weather | null>;
  getWeatherByCityName(req: WeatherByCityNameRequest): Promise<Weather | null>;
  getWeatherByCityId(req: WeatherByCityIdRequest): Promise<Weather | null>;
  getWeatherByZipCode(req: WeatherByZipCodeRequest): Promise<Weather | null>;
}

export const weatherRepository = (provider: OpenWeatherMapProvider): WeatherRepository => {
  const getWeatherByCoordinate = async (req: WeatherByCoordinateRequest): Promise<Weather | null> => {
    const data = provider.getWeatherByCoordinate(req);
    return data;
  };

  const getWeatherByCityName = async (req: WeatherByCityNameRequest): Promise<Weather | null> => {
    const data = provider.getWeatherByCityName(req);
    return data;
  };

  const getWeatherByCityId = async (req: WeatherByCityIdRequest): Promise<Weather | null> => {
    const data = provider.getWeatherByCityId(req);
    return data;
  };

  const getWeatherByZipCode = async (req: WeatherByZipCodeRequest): Promise<Weather | null> => {
    const data = provider.getWeatherByZipCode(req);
    return data;
  };

  return {
    getWeatherByCoordinate,
    getWeatherByCityName,
    getWeatherByCityId,
    getWeatherByZipCode,
  };
};
