import { Server } from "node:http";
import app from "./app";
import Redis from "ioredis";
import dotenv from "dotenv";
import { Config, ConfigLoader, configLoader } from "./config/config";
import { Providers, ProvidersLoader, providersLoader } from "./providers";
import { Repositories, RepositoriesLoader, repositoriesLoader } from "./repositories";
import { Services, ServicesLoader, servicesLoader } from "./services";
import { Controllers, ControllersLoader, controllersLoader } from "./controllers";
import { Middlewares, middlewaresLoader, MiddlewaresLoader } from "./middlewares";

let cl: ConfigLoader;
let config: Config;

let ml: MiddlewaresLoader;
let middlewares: Middlewares;

let pl: ProvidersLoader;
let providers: Providers;

let rl: RepositoriesLoader;
let repositories: Repositories;

let sl: ServicesLoader;
let services: Services;

let ctl: ControllersLoader;
let controllers: Controllers;

let redis: Redis;
let server: Server;

const startServer = async () => {
  try {
    dotenv.config({ quiet: true });

    cl = configLoader();
    config = cl.load();

    ml = middlewaresLoader();
    middlewares = ml.load();

    pl = providersLoader(config);
    providers = pl.load();

    rl = repositoriesLoader(providers);
    repositories = rl.load();

    sl = servicesLoader(repositories);
    services = sl.load();

    ctl = controllersLoader(services);
    controllers = ctl.load();

    app.use(middlewares.errorMiddleware.errorHandler);
    app.use(middlewares.notFoundMiddleware.notFoundHandler);

    redis = await providers.redisProvider.connect();

    server = app.listen(config.port, () => {
      console.log(`Server ready at: ${config.host}:${config.port}`);
    });
  } catch (err) {
    throw err;
  }

  process.on("SIGTERM", async () => serverClose(server, redis));
  process.on("SIGINT", async () => serverClose(server, redis));
};

const serverClose = async (server: Server, redis: Redis) => {
  console.log("Received kill signal, shutting down gracefully");

  await providers.redisProvider.quit(redis);
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 10000);
};

startServer();
