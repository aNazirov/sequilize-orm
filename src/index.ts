import * as os from "os";
import app from "./app";
import { AppConfig } from "./config";
import { Utils } from "./utils";

const cleanup = async () => {};

const main = async () => {
  Utils.setupGracefulShutdown(cleanup);

  app.listen(AppConfig.PORT, () => {
    console.log(
      `🚀 Core server ready on dev mode at: ${os.hostname()}:${AppConfig.PORT}`
    );
  });
};

main();
