import { Server } from "http";
import app from "./app";
import config from "./config/config";
import { redisProvider } from "./providers/redis.provider";
const PORT = config.port;

const closeServer = async (server: Server) => {
  await redisProvider.quit();
  await new Promise<void>((resolve, reject) => {
    server.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
  process.exit(1);
};

const startServer = async () => {
  try {
    await redisProvider.connect();
  } catch (err) {
    console.error(`Error : ${err}`);
    process.exit(1);
  }

  const server = app.listen(PORT, () => {
    console.log(`Server ready at: http://localhost:${PORT}`);
  });

  process.on("SIGINT", async () => closeServer(server));
  process.on("SIGTERM", async () => closeServer(server));
  process.on("uncaughtException", async () => closeServer(server));
  process.on("unhandledRejection", async () => closeServer(server));
};

startServer();
