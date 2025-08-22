import dotenv from "dotenv";

export interface Config {
  port: number;
}

dotenv.config({ quiet: true });

const config: Config = {
  port: Number(process.env.PORT) || 3000,
};

export default config;
