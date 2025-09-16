import { Router } from "express";
import { Controllers } from "../../controllers";

export const weatherRoutesLoader = (r: Router, c: Controllers) => {
  const load = () => {
    r.get("/weather/", c.weatherController.getWeather);
    r.get("/forecast/", c.weatherController.getForecast);
    r.get("/direct/", c.weatherController.getDirect);

    return r;
  };

  return {
    load,
  };
};
