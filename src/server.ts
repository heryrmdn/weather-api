import { Server } from "node:http";
import app from "./app";
import config from "./config/config";
import { redisProvider } from "./providers/redis.provider";
import Redis from "ioredis";
const PORT = config.port;

const startServer = async () => {
  let redisClient: Redis | null = null;
  let server: Server | null = null;

  try {
    redisClient = await redisProvider.connect();

    server = app.listen(PORT, () => console.log(`Server ready at: http://localhost:${PORT}`));
  } catch (err) {
    console.error(err);
  }

  if (server && redisClient) {
    process.on("SIGTERM", async () => serverClose(server, redisClient));
    process.on("SIGINT", async () => serverClose(server, redisClient));
  }
};

const serverClose = async (server: Server, redisClient: Redis) => {
  console.log("Received kill signal, shutting down gracefully");

  await redisProvider.quit(redisClient);
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
