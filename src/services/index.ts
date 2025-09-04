import { Repositories } from "../repositories";
import { weatherService, WeatherService } from "./weather.service";

export interface Services {
  weatherService: WeatherService;
}

export interface ServicesLoader {
  load: () => Services;
}

export const servicesLoader = (r: Repositories): ServicesLoader => {
  const load = () => {
    return {
      weatherService: weatherService(r),
    };
  };

  return {
    load,
  };
};
