import { Router } from "express";
import { Controllers } from "../../controllers";

export const weatherRoutesLoader = (r: Router, c: Controllers) => {
  const load = () => {
    r.get("/weather/coordinate", c.weatherController.getWeatherByCoordinate);
    r.get("/weather/city_name", c.weatherController.getWeatherByCityName);
    r.get("/weather/city_id", c.weatherController.getWeatherByCityId);
    r.get("/weather/zip_code", c.weatherController.getWeatherByZipCode);

    return r;
  };

  return {
    load,
  };
};
