import { Config } from "../config/config";
import { Forecast, Weather, WeatherRequest } from "../interfaces/weather";
import { CustomError } from "../middlewares/error.middleware";
import { paramUtil } from "../utils/param.util";

export interface OpenWeatherMapProvider {
  getWeather: (req: WeatherRequest) => Promise<Weather | null>;
  getForecast: (req: WeatherRequest) => Promise<Forecast | null>;
}

export const openWeatherMapProvider = (con: Config): OpenWeatherMapProvider => {
  const getWeather = async (req: WeatherRequest): Promise<Weather | null> => {
    const searchParams = paramUtil.setParamWeather(req);
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

  const getForecast = async (req: WeatherRequest): Promise<Forecast | null> => {
    const searchParams = paramUtil.setParamWeather(req);
    searchParams.append("appid", con.weather_api_key);

    const url = `${con.weather_api_url}/forecast?${searchParams.toString()}&cnt=8&appid=${con.weather_api_key}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new CustomError(response.status, response.statusText);
      }
      const data = (await response.json()) as Forecast;
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    getWeather,
    getForecast,
  };
};
