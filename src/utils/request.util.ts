import { WeatherRequest } from "../interfaces/weather";

interface RequestUtil {
  checkRequestWeather: (req: any) => WeatherRequest;
}

const request = (): RequestUtil => {
  const checkRequestWeather = (req: any): WeatherRequest => {
    return {
      lat: req.lat ?? null,
      lon: req.lon ?? null,
      q: req.q ?? null,
      id: req.id ?? null,
      zip: req.zip ?? null,
      cnt: req.cnt ?? null,
      limit: req.limit ?? null,
    };
  };

  return { checkRequestWeather };
};

export const requestUtil = request();
