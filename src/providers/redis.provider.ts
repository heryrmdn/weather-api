import { createClient, RedisClientType } from "redis";

export const redis = () => {
  let client: RedisClientType | null = null;
  let retries: number = 0;

  const connect = async () => {
    if (!client) {
      client = createClient({
        socket: {
          reconnectStrategy: (retries) => {
            if (retries >= 5) {
              return new Error("Reconnect limit reached");
            }
            return Math.min(retries * 100, 3000);
          },
        },
      });

      client.on("error", (err) => {
        console.error("Redis Client Error", err);
      });

      await client.connect();
      console.log("Redis connected");
    }
  };

  const quit = async () => {
    if (client) {
      await client.quit();
      console.log("Redis disconnected");
      client = null;
    }
  };

  const getClient = (): RedisClientType | null => {
    return client;
  };

  return {
    connect,
    quit,
    getClient,
  };
};

export const redisProvider = redis();
