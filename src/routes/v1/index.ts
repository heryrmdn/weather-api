import { Router } from "express";
import { Controllers } from "../../controllers";
import { weatherRoutesLoader } from "./weather.routes";
import { Middlewares } from "../../middlewares";

export const routesv1Loader = (r: Router, m: Middlewares, c: Controllers) => {
  const load = () => {
    const wrl = weatherRoutesLoader(r, m, c);
    const weatherRoutes = wrl.load();

    r.use("/api/v1", weatherRoutes);

    return r;
  };

  return {
    load,
  };
};
