import express from "express";
import routesv1 from "../routes/v1";
const routes = express.Router();

routes.use("/api/v1", routesv1);

export default routes;
