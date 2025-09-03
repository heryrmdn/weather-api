import Redis from "ioredis";
import config from "../config/config";

interface RedisProvider {
  connect: () => Promise<Redis>;
  quit: (client: Redis) => Promise<void>;
}

const redis = (): RedisProvider => {
  const connect = async (): Promise<Redis> => {
    const redisClient = new Redis({
      host: config.redis_host,
      port: config.redis_port,
    });
    console.log("Redis connected");
    return redisClient;
  };

  const quit = async (client: Redis) => {
    await client.quit();
    console.log("Redis disconnected");
  };

  return {
    connect,
    quit,
  };
};

export const redisProvider = redis();
