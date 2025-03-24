import { config } from "dotenv";
import { Types } from "src/types";

config();

export const AppConfig: Types.AppConfig = {
  PORT: Number(process.env.PORT ?? 4000),
};
