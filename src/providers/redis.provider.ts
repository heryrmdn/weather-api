import { createClient, RedisClientType } from "redis";

export const redis = () => {
  let client: RedisClientType | null = null;

  const connect = async () => {
    if (!client) {
      client = createClient();
      client.on("error", (err) => console.error("Redis Client Error", err));
      try {
        await client.connect();
        console.log("Redis connected");
      } catch (err) {
        console.error("Redis connection error: ", err);
        throw err;
      }
    }
  };

  const quit = async () => {
    if (client) {
      try {
        await client.quit();
        console.log("Redis disconnected");
        client = null;
      } catch (err) {
        console.error("Redis quit failed: ", err);
        throw err;
      }
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
