import * as os from "os";
import "reflect-metadata";
import app from "./app";
import { AppConfig } from "./config";
import { Models, sequelize } from "./db";
import { Utils } from "./utils";

const cleanup = async () => {
  console.log("Cleaning up...");

  await sequelize.close();
  console.log("Database has been disconnected");

  console.log("Cleanup done");
};

const main = async () => {
  await sequelize.authenticate();

  console.log("Database is connected");

  Models.init(sequelize);

  Utils.setupGracefulShutdown(cleanup);

  app.listen(AppConfig.PORT, () => {
    console.log(
      `🚀 Core server ready on dev mode at: ${os.hostname()}:${AppConfig.PORT}`
    );
  });
};

main();
