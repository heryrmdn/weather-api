import { createClient, RedisClientType } from "redis";

export const redis = () => {
  let client: RedisClientType | null = null;

  const connect = async () => {
    if (!client) {
      client = createClient();
      client.on("error", (err) => console.error("Redis Client Error", err));
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
