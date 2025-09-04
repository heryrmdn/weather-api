import { Services } from "../services";
import { weatherController, WeatherController } from "./weather.controller";

export interface Controllers {
  weatherController: WeatherController;
}

export interface ControllersLoader {
  load: () => Controllers;
}

export const controllersLoader = (s: Services): ControllersLoader => {
  const load = () => {
    return {
      weatherController: weatherController(s),
    };
  };

  return {
    load,
  };
};
