export * from "./models";

import { Sequelize } from "sequelize";
import { AppConfig } from "src/config";

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: AppConfig.DATABASE.USER,
  password: AppConfig.DATABASE.PASSWORD,
  database: AppConfig.DATABASE.DB,
  host: AppConfig.DATABASE.HOST,
  port: AppConfig.DATABASE.PORT,
});
