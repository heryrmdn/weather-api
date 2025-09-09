import Redis from "ioredis";
import { Forecast, Weather, WeatherRequest } from "../interfaces/weather";
import { Providers } from "../providers";
import { paramUtil } from "../utils/param.util";

export interface WeatherRepository {
  getWeather: (req: WeatherRequest) => Promise<Weather | null>;
  getForecast: (req: WeatherRequest) => Promise<Forecast | null>;
}

export const weatherRepository = (p: Providers, c: Redis): WeatherRepository => {
  const getWeather = async (req: WeatherRequest): Promise<Weather | null> => {
    const searchParams = paramUtil.setParamWeather(req);
    const cachedKey = `weather:${searchParams.toString()}`;

    try {
      const cachedData = await c.get(cachedKey);
      if (cachedData !== null) {
        return JSON.parse(cachedData);
      }
      const data = await p.openWeatherMapProvider.getWeather(req);
      await c.set(cachedKey, JSON.stringify(data), "EX", 600);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const getForecast = async (req: WeatherRequest): Promise<Forecast | null> => {
    const searchParams = paramUtil.setParamWeather(req);
    const cachedKey = `forecast:${searchParams.toString()}`;

    try {
      const cachedData = await c.get(cachedKey);
      if (cachedData !== null) {
        return JSON.parse(cachedData);
      }
      const data = await p.openWeatherMapProvider.getForecast(req);
      await c.set(cachedKey, JSON.stringify(data), "EX", 600);
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    getWeather,
    getForecast,
  };
};
