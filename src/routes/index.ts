import express from "express";
import routesv1 from "../routes/v1";
const routes = express.Router();

routes.use(routesv1);

export default routes;
