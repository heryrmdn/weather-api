import express from "express";
import weatherController from "../../controllers/weather.controller";
const weatherRoutes = express.Router();
const wc = weatherController();

weatherRoutes.get("/weather/coordinate", wc.getWeatherByCoordinate);
weatherRoutes.get("/weather/city_name", wc.getWeatherByCityName);
weatherRoutes.get("/weather/city_id", wc.getWeatherByCityId);
weatherRoutes.get("/weather/zip_code", wc.getWeatherByZipCode);

export default weatherRoutes;
