import { Config } from "../config/config";
import { OpenWeatherMapProvider, openWeatherMapProvider } from "./open_weather_map.provider";
import { RedisProvider, redisProvider } from "./redis.provider";

export interface Providers {
  openWeatherMapProvider: OpenWeatherMapProvider;
  redisProvider: RedisProvider;
}

export interface ProvidersLoader {
  load: () => Providers;
}

export const providersLoader = (con: Config): ProvidersLoader => {
  const load = () => {
    return {
      openWeatherMapProvider: openWeatherMapProvider(con),
      redisProvider: redisProvider(con),
    };
  };

  return {
    load,
  };
};
