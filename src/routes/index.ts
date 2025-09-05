import { Router } from "express";
import { routesv1Loader } from "../routes/v1";
import { Controllers } from "../controllers";
import { Middlewares } from "../middlewares";

export const routesLoader = (r: Router, m: Middlewares, c: Controllers) => {
  const load = () => {
    const rl = routesv1Loader(r, m, c);
    const routesv1 = rl.load();

    r.use(routesv1);

    return r;
  };

  return {
    load,
  };
};
