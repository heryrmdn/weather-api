import { Router } from "express";
import { routesv1Loader } from "../routes/v1";
import { Controllers } from "../controllers";

export const routesLoader = (r: Router, c: Controllers) => {
  const load = () => {
    const rl = routesv1Loader(r, c);
    const routesv1 = rl.load();

    r.use(routesv1);

    return r;
  };

  return {
    load,
  };
};
