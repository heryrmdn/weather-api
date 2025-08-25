import dotenv from "dotenv";

export interface Config {
  port: number;
  node_env: string;
  weather_api_key: string | null;
  weather_api_url: string | null;
}

dotenv.config({ quiet: true });

const config: Config = {
  port: Number(process.env.PORT) ?? 3000,
  node_env: process.env.NODE_ENV ?? "DEVELOPMENT",
  weather_api_key: process.env.WEATHER_API_KEY ?? null,
  weather_api_url: process.env.WEATHER_API_URL ?? null,
};

export default config;
