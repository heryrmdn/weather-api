import Redis from "ioredis";
import { Config } from "../config/config";

export interface RedisProvider {
  connect: () => Promise<Redis>;
  quit: (client: Redis) => Promise<void>;
}

export const redisProvider = (config: Config): RedisProvider => {
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
