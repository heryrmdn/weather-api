import Redis from "ioredis";
import { Weather, WeatherRequest } from "../interfaces/weather";
import { Providers } from "../providers";
import { paramUtil } from "../utils/param.util";

export interface WeatherRepository {
  getWeather: (req: WeatherRequest) => Promise<Weather | null>;
}

export const weatherRepository = (p: Providers, c: Redis): WeatherRepository => {
  const getWeather = async (req: WeatherRequest): Promise<Weather | null> => {
    const searchParams = new URLSearchParams();

    const params = paramUtil.checkParamWeather(req);
    params.forEach((item) => {
      searchParams.append(item.name, item.value);
    });

    const cachedKey = `weather:${searchParams.toString()}`;

    try {
      const cachedData = await c.get(cachedKey);
      if (cachedData !== null) {
        return JSON.parse(cachedData);
      }
      const data = await p.openWeatherMapProvider.getWeather(req);
      await c.set(cachedKey, JSON.stringify(data), "EX", 10000);
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    getWeather,
  };
};
