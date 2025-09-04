import compression from "compression";
import { Router } from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import { Config, configLoader } from "./config/config";
import { Middlewares, middlewaresLoader } from "./middlewares";
import { Providers, providersLoader } from "./providers";
import { Repositories, repositoriesLoader } from "./repositories";
import { Services, servicesLoader } from "./services";
import { Controllers, controllersLoader } from "./controllers";
import { routesLoader } from "./routes";
import Redis from "ioredis";
import express from "express";

export interface App {
  app: any;
  config: Config;
  middlewares: Middlewares;
  providers: Providers;
  redis: Redis;
  repositories: Repositories;
  services: Services;
  controllers: Controllers;
  router: Router;
  routes: Router;
}

export interface AppLoader {
  load: () => Promise<App>;
}

export const appLoader = (): AppLoader => {
  const load = async (): Promise<App> => {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    dotenv.config({ quiet: true });

    const cl = configLoader();
    const config = cl.load();

    const ml = middlewaresLoader();
    const middlewares = ml.load();

    const pl = providersLoader(config);
    const providers = pl.load();

    let redis: Redis;

    try {
      redis = await providers.redisProvider.connect();
    } catch (err) {
      throw err;
    }

    const rl = repositoriesLoader(providers, redis);
    const repositories = rl.load();

    const sl = servicesLoader(repositories);
    const services = sl.load();

    const ctl = controllersLoader(services);
    const controllers = ctl.load();

    const router = express.Router();

    const rtl = routesLoader(router, controllers);
    const routes = rtl.load();

    app.use(routes);
    app.use(middlewares.errorMiddleware.errorHandler);
    app.use(middlewares.notFoundMiddleware.notFoundHandler);

    return {
      app,
      config,
      middlewares,
      providers,
      redis,
      repositories,
      services,
      controllers,
      router,
      routes,
    };
  };

  return {
    load,
  };
};
