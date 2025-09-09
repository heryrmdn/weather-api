import { Config } from "../config/config";
import { Weather, WeatherRequest } from "../interfaces/weather";
import { CustomError } from "../middlewares/error.middleware";
import { paramUtil } from "../utils/param.util";

export interface OpenWeatherMapProvider {
  getWeather: (req: WeatherRequest) => Promise<Weather | null>;
}

export const openWeatherMapProvider = (con: Config): OpenWeatherMapProvider => {
  const getWeather = async (req: WeatherRequest): Promise<Weather | null> => {
    const searchParams = new URLSearchParams();

    const params = paramUtil.checkParamWeather(req);
    params.forEach((item) => {
      searchParams.append(item.name, item.value);
    });

    searchParams.append("appid", con.weather_api_key);

    const url = `${con.weather_api_url}/weather?${searchParams.toString()}&appid=${con.weather_api_key}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new CustomError(response.status, response.statusText);
      }
      const data = (await response.json()) as Weather;
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    getWeather,
  };
};
