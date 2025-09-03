import dotenv from "dotenv";

export interface Config {
  port: number;
  node_env: string;
  redis_host: string;
  redis_port: number;
  weather_api_key: string;
  weather_api_url: string;
}

dotenv.config({ quiet: true });

const config: Config = {
  port: Number(process.env.PORT),
  node_env: process.env.NODE_ENV ?? "",
  redis_host: process.env.REDIS_HOST ?? "",
  redis_port: Number(process.env.REDIS_PORT),
  weather_api_key: process.env.WEATHER_API_KEY ?? "",
  weather_api_url: process.env.WEATHER_API_URL ?? "",
};

export default config;
