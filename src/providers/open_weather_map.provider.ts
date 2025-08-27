import config from "../config/config";
import { Weather, WeatherByCityIdRequest, WeatherByCityNameRequest, WeatherByCoordinateRequest, WeatherByZipCodeRequest } from "../interfaces/weather";
import { CustomError } from "../middlewares/error.middleware";

export interface OpenWeatherMapProvider {
  getWeatherByCoordinate(req: WeatherByCoordinateRequest): Promise<Weather | null>;
  getWeatherByCityName(req: WeatherByCityNameRequest): Promise<Weather | null>;
  getWeatherByCityId(req: WeatherByCityIdRequest): Promise<Weather | null>;
  getWeatherByZipCode(req: WeatherByZipCodeRequest): Promise<Weather | null>;
}

export const openWeatherMapProvider = (): OpenWeatherMapProvider => {
  const getWeatherByCoordinate = async (req: WeatherByCoordinateRequest): Promise<Weather | null> => {
    const { lat, lon } = req;
    const url = `${config.weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${config.weather_api_key}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new CustomError(response.status, response.statusText);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  const getWeatherByCityName = async (req: WeatherByCityNameRequest): Promise<Weather | null> => {
    const { q } = req;
    const url = `${config.weather_api_url}/weather?q=${q}&appid=${config.weather_api_key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  const getWeatherByCityId = async (req: WeatherByCityIdRequest): Promise<Weather | null> => {
    const { id } = req;
    const url = `${config.weather_api_url}/weather?id=${id}&appid=${config.weather_api_key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  const getWeatherByZipCode = async (req: WeatherByZipCodeRequest): Promise<Weather | null> => {
    const { zip } = req;
    const url = `${config.weather_api_url}/weather?zip=${zip}&appid=${config.weather_api_key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    getWeatherByCoordinate,
    getWeatherByCityName,
    getWeatherByCityId,
    getWeatherByZipCode,
  };
};
