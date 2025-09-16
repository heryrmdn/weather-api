import Redis from "ioredis";
import { Direct, Forecast, Weather, WeatherRequest } from "../interfaces/weather";
import { Providers } from "../providers";
import { paramUtil } from "../utils/param.util";

export interface WeatherRepository {
  getWeather: (req: WeatherRequest) => Promise<Weather | null>;
  getForecast: (req: WeatherRequest) => Promise<Forecast | null>;
  getDirect: (req: WeatherRequest) => Promise<Direct[]>;
}

export const weatherRepository = (p: Providers, c: Redis): WeatherRepository => {
  const getWeather = async (req: WeatherRequest): Promise<Weather | null> => {
    const params = paramUtil.checkParamWeather(req);
    const searchParams = paramUtil.setParamWeather(params);
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
    const params = paramUtil.checkParamWeather(req);
    const searchParams = paramUtil.setParamWeather(params);
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

  const getDirect = async (req: WeatherRequest): Promise<Direct[]> => {
    const params = paramUtil.checkParamWeather(req);
    const searchParams = paramUtil.setParamWeather(params);
    const cachedKey = `direct:${searchParams.toString()}`;

    try {
      const cachedData = await c.get(cachedKey);
      if (cachedData !== null) {
        return JSON.parse(cachedData);
      }
      const data = await p.openWeatherMapProvider.getDirect(req);
      await c.set(cachedKey, JSON.stringify(data), "EX", 600);
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    getWeather,
    getForecast,
    getDirect,
  };
};
