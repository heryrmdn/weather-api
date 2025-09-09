import { Forecast, Weather, WeatherRequest } from "../interfaces/weather";
import { Repositories } from "../repositories";

export interface WeatherService {
  getWeather(req: WeatherRequest): Promise<Weather | null>;
  getForecast(req: WeatherRequest): Promise<Forecast | null>;
}

export const weatherService = (r: Repositories): WeatherService => {
  const getWeather = async (req: WeatherRequest): Promise<Weather | null> => {
    const data = await r.weatherRepository.getWeather(req);
    return data;
  };

  const getForecast = async (req: WeatherRequest): Promise<Forecast | null> => {
    const data = await r.weatherRepository.getForecast(req);
    return data;
  };

  return {
    getWeather,
    getForecast,
  };
};
