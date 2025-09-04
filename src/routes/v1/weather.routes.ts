import express from "express";
const weatherRoutes = express.Router();

weatherRoutes.get("/weather/coordinate", () => {});
weatherRoutes.get("/weather/city_name", () => {});
weatherRoutes.get("/weather/city_id", () => {});
weatherRoutes.get("/weather/zip_code", () => {});

export default weatherRoutes;
