import express from "express";
import weatherController from "../../controllers/weather.controller";
import { weatherService } from "../../services/weather.service";
import { weatherRepository } from "../../repositories/weather.repository";
import { openWeatherMapProvider } from "../../providers/open_weather_map.provider";
const weatherRoutes = express.Router();
const ow = openWeatherMapProvider();
const wr = weatherRepository(ow);
const ws = weatherService(wr);
const wc = weatherController(ws);

weatherRoutes.get("/weather/coordinate", wc.getWeatherByCoordinate);
weatherRoutes.get("/weather/city_name", wc.getWeatherByCityName);
weatherRoutes.get("/weather/city_id", wc.getWeatherByCityId);
weatherRoutes.get("/weather/zip_code", wc.getWeatherByZipCode);

export default weatherRoutes;
