import { Server } from "node:http";
import app from "./app";
import config from "./config/config";
import { redisProvider } from "./providers/redis.provider";
const PORT = config.port;

const startServer = async () => {
  let server: Server | null = null;

  try {
    await redisProvider.connect();

    server = app.listen(PORT, () => console.log(`Server ready at: http://localhost:${PORT}`));
  } catch (err) {
    console.error(err);
  }

  if (server) {
    process.on("SIGTERM", async () => serverClose(server));
    process.on("SIGINT", async () => serverClose(server));
  }
};

const serverClose = async (server: Server) => {
  console.log("Received kill signal, shutting down gracefully");

  await redisProvider.quit();
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
