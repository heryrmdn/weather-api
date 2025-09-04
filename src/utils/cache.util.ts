export interface CacheUtil {
  getCache: (key: string) => Promise<any>;
  setCache: (key: string, value: any) => Promise<void>;
}

export const cacheUtil = (client: any): CacheUtil => {
  const getCache = async (key: string): Promise<any> => {
    const data = client.get(key);
    return data;
  };

  const setCache = async (key: string, value: any): Promise<void> => {
    client.set(key, value);
  };

  return {
    getCache,
    setCache,
  };
};
