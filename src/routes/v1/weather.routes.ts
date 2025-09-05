import { Router } from "express";
import { Controllers } from "../../controllers";
import { Middlewares } from "../../middlewares";

export const weatherRoutesLoader = (r: Router, m: Middlewares, c: Controllers) => {
  const load = () => {
    r.get("/weather/coordinate", m.rateLimiterMiddleware.rateLimiterHandler, c.weatherController.getWeatherByCoordinate);
    r.get("/weather/city_name", m.rateLimiterMiddleware.rateLimiterHandler, c.weatherController.getWeatherByCityName);
    r.get("/weather/city_id", m.rateLimiterMiddleware.rateLimiterHandler, c.weatherController.getWeatherByCityId);
    r.get("/weather/zip_code", m.rateLimiterMiddleware.rateLimiterHandler, c.weatherController.getWeatherByZipCode);

    return r;
  };

  return {
    load,
  };
};
