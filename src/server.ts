import { Server } from "node:http";
import { App, AppLoader, appLoader } from "./app";

export interface ServerLoader {
  start: () => void;
  stop: () => void;
}

const serverLoader = (): ServerLoader => {
  let al: AppLoader;
  let main: App;
  let server: Server;

  const start = async () => {
    try {
      al = appLoader();
      main = await al.load();

      server = main.app.listen(main.config.port, () => {
        console.log(`Server ready at: ${main.config.host}:${main.config.port}`);
      });
    } catch (err) {
      throw err;
    }
  };

  const stop = async () => {
    console.log("Received kill signal, shutting down gracefully");

    await main.providers.redisProvider.quit(main.redis);

    server.close(() => {
      console.log("Closed out remaining connections");
      process.exit(0);
    });

    setTimeout(() => {
      console.error("Could not close connections in time, forcefully shutting down");
      process.exit(1);
    }, 10000);
  };

  return {
    start,
    stop,
  };
};

const sl = serverLoader();
sl.start();

process.on("SIGTERM", async () => sl.stop());
process.on("SIGINT", async () => sl.stop());
