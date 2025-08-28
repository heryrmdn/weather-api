import Redis from "ioredis";

const redis = () => {
  let redisClient: Redis | null = null;

  const connect = async () => {
    const activeClient = redisProvider.getClient();
    if (activeClient) {
      return activeClient;
    }
    const client = new Redis({
      host: "127.0.0.1",
      port: 6379,
    });
    redisProvider.setClient(client);
  };

  const quit = async () => {
    const activeClient = redisProvider.getClient();
    if (!activeClient) {
      return;
    }
    activeClient.quit();
    redisProvider.setClient(null);
  };

  const getClient = (): Redis | null => {
    return redisClient;
  };

  const setClient = (client: Redis | null) => {
    return (redisClient = client);
  };

  return {
    connect,
    quit,
    getClient,
    setClient,
  };
};

export const redisProvider = redis();
