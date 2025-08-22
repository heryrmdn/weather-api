import express from "express";
import weatherRoutes from "./weather.routes";
const routesv1 = express.Router();

routesv1.use("/api/v1", weatherRoutes);

export default routesv1;
