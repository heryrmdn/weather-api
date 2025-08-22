import { Server } from "node:http";
import app from "./app";
import config from "./config/config";
import { redisProvider } from "./providers/redis.provider";
const PORT = config.port;

const serverClose = async (server: Server | null = null) => {
  await redisProvider.quit();
  if (server) {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
};

const serverStart = async () => {
  let server = null;
  try {
    await redisProvider.connect();

    server = app.listen(PORT, () => {
      console.log(`Server ready at: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(`Error : ${err}`);
  }

  process.on("SIGINT", async () => serverClose(server));
  process.on("SIGTERM", async () => serverClose(server));
  process.on("uncaughtException", async () => serverClose(server));
  process.on("unhandledRejection", async () => serverClose(server));
};

serverStart();
