import * as os from "os";
import "reflect-metadata";
import { Sequelize } from "sequelize";
import { container } from "tsyringe";
import app from "./app";
import { AppConfig, Modules } from "./config";
import { SequelizeInstance } from "./db";
import { Utils } from "./utils";

const cleanup = async (sequelize: Sequelize) => {
  console.log("Cleaning up...");

  await sequelize.close();
  console.log("Database has been disconnected");

  console.log("Cleanup done");
};

const main = async () => {
  const sequelize = container.resolve<SequelizeInstance>(Modules.Sequelize);

  console.log(`Checking database connection...`);

  await sequelize.client.authenticate();

  console.log("Database is connected");

  Utils.setupGracefulShutdown(() => cleanup(sequelize.client));

  await sequelize.client.sync();

  app.listen(AppConfig.PORT, () => {
    console.log(
      `🚀 Core server ready on dev mode at: ${os.hostname()}:${AppConfig.PORT}`
    );
  });
};

main();
