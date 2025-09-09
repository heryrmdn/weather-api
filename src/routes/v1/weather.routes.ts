import { Router } from "express";
import { Controllers } from "../../controllers";

export const weatherRoutesLoader = (r: Router, c: Controllers) => {
  const load = () => {
    r.get("/weather/", c.weatherController.getWeather);

    return r;
  };

  return {
    load,
  };
};
