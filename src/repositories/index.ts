import Redis from "ioredis";
import { Providers } from "../providers";
import { weatherRepository, WeatherRepository } from "./weather.repository";

export interface Repositories {
  weatherRepository: WeatherRepository;
}

export interface RepositoriesLoader {
  load: () => Repositories;
}

export const repositoriesLoader = (p: Providers, c: Redis): RepositoriesLoader => {
  const load = () => {
    return {
      weatherRepository: weatherRepository(p, c),
    };
  };

  return {
    load,
  };
};
