import Redis from "ioredis";
import { Weather, WeatherByCityIdRequest, WeatherByCityNameRequest, WeatherByCoordinateRequest, WeatherByZipCodeRequest } from "../interfaces/weather";
import { Providers } from "../providers";

export interface WeatherRepository {
  getWeatherByCoordinate(req: WeatherByCoordinateRequest): Promise<Weather | null>;
  getWeatherByCityName(req: WeatherByCityNameRequest): Promise<Weather | null>;
  getWeatherByCityId(req: WeatherByCityIdRequest): Promise<Weather | null>;
  getWeatherByZipCode(req: WeatherByZipCodeRequest): Promise<Weather | null>;
}

export const weatherRepository = (p: Providers, c: Redis): WeatherRepository => {
  const getWeatherByCoordinate = async (req: WeatherByCoordinateRequest): Promise<Weather | null> => {
    const { lat, lon } = req;
    const cachedKey = `${lat}&${lon}`;

    try {
      const cachedData = await c.get(cachedKey);
      if (cachedData !== null) {
        return JSON.parse(cachedData);
      }
      const data = await p.openWeatherMapProvider.getWeatherByCoordinate(req);
      await c.set(cachedKey, JSON.stringify(data));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const getWeatherByCityName = async (req: WeatherByCityNameRequest): Promise<Weather | null> => {
    const { q } = req;
    const cachedKey = q;

    try {
      const cachedData = await c.get(cachedKey);
      if (cachedData !== null) {
        return JSON.parse(cachedData);
      }
      const data = await p.openWeatherMapProvider.getWeatherByCityName(req);
      await c.set(cachedKey, JSON.stringify(data));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const getWeatherByCityId = async (req: WeatherByCityIdRequest): Promise<Weather | null> => {
    const { id } = req;
    const cachedKey = id;

    try {
      const cachedData = await c.get(cachedKey);
      if (cachedData !== null) {
        return JSON.parse(cachedData);
      }
      const data = await p.openWeatherMapProvider.getWeatherByCityId(req);
      await c.set(cachedKey, JSON.stringify(data));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const getWeatherByZipCode = async (req: WeatherByZipCodeRequest): Promise<Weather | null> => {
    const { zip } = req;
    const cachedKey = zip;

    try {
      const cachedData = await c.get(cachedKey);
      if (cachedData !== null) {
        return JSON.parse(cachedData);
      }
      const data = await p.openWeatherMapProvider.getWeatherByZipCode(req);
      await c.set(cachedKey, JSON.stringify(data));
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    getWeatherByCoordinate,
    getWeatherByCityName,
    getWeatherByCityId,
    getWeatherByZipCode,
  };
};
