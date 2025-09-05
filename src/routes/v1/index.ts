import { Router } from "express";
import { Controllers } from "../../controllers";
import { weatherRoutesLoader } from "./weather.routes";

export const routesv1Loader = (r: Router, c: Controllers) => {
  const load = () => {
    const wrl = weatherRoutesLoader(r, c);
    const weatherRoutes = wrl.load();

    r.use("/api/v1", weatherRoutes);

    return r;
  };

  return {
    load,
  };
};
