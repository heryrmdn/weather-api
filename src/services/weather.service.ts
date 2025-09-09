import { Weather, WeatherRequest } from "../interfaces/weather";
import { Repositories } from "../repositories";

export interface WeatherService {
  getWeather(req: WeatherRequest): Promise<Weather | null>;
}

export const weatherService = (r: Repositories): WeatherService => {
  const getWeather = async (req: WeatherRequest): Promise<Weather | null> => {
    const data = await r.weatherRepository.getWeather(req);
    return data;
  };

  return {
    getWeather,
  };
};
