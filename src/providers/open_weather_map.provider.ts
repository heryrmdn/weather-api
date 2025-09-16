import { Config } from "../config/config";
import { Direct, Forecast, Weather, WeatherRequest } from "../interfaces/weather";
import { CustomError } from "../middlewares/error.middleware";
import { paramUtil } from "../utils/param.util";

export interface OpenWeatherMapProvider {
  getWeather: (req: WeatherRequest) => Promise<Weather | null>;
  getForecast: (req: WeatherRequest) => Promise<Forecast | null>;
  getDirect: (req: WeatherRequest) => Promise<Direct[]>;
}

export const openWeatherMapProvider = (con: Config): OpenWeatherMapProvider => {
  const getWeather = async (req: WeatherRequest): Promise<Weather | null> => {
    const params = paramUtil.checkParamWeather(req);
    const searchParams = paramUtil.setParamWeather(params);
    searchParams.append("appid", con.weather_api_key);

    const url = `${con.weather_data_api_url}/weather?${searchParams.toString()}`;
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
    const params = paramUtil.checkParamWeather(req);
    const searchParams = paramUtil.setParamWeather(params);
    searchParams.append("appid", con.weather_api_key);

    const url = `${con.weather_data_api_url}/forecast?${searchParams.toString()}`;
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

  const getDirect = async (req: WeatherRequest): Promise<Direct[]> => {
    const params = paramUtil.checkParamWeather(req);
    const searchParams = paramUtil.setParamWeather(params);
    searchParams.append("appid", con.weather_api_key);

    const url = `${con.weather_geo_api_url}/direct?${searchParams.toString()}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new CustomError(response.status, response.statusText);
      }
      const data = (await response.json()) as Direct[];
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    getWeather,
    getForecast,
    getDirect,
  };
};
