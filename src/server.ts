import { Server } from "node:http";
import app from "./app";
import Redis from "ioredis";
import dotenv from "dotenv";
import { configLoader } from "./config/config";
import { Providers, providersLoader } from "./providers";
import { repositoriesLoader } from "./repositories";
import { servicesLoader } from "./services";
import { controllersLoader } from "./controllers";
import { middlewaresLoader } from "./middlewares";

let providers: Providers;
let redis: Redis;
let server: Server;

const startServer = async () => {
  try {
    dotenv.config({ quiet: true });

    const cl = configLoader();
    const config = cl.load();

    const ml = middlewaresLoader();
    const middlewares = ml.load();

    const pl = providersLoader(config);
    providers = pl.load();

    redis = await providers.redisProvider.connect();

    const rl = repositoriesLoader(providers, redis);
    const repositories = rl.load();

    const sl = servicesLoader(repositories);
    const services = sl.load();

    const ctl = controllersLoader(services);
    const controllers = ctl.load();

    app.use(middlewares.errorMiddleware.errorHandler);
    app.use(middlewares.notFoundMiddleware.notFoundHandler);

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
