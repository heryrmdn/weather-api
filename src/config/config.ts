import dotenv from "dotenv";
import { Config } from "../interfaces/config";

dotenv.config({ quiet: true });

const config: Config = {
  port: Number(process.env.PORT) || 3000,
};

export default config;
