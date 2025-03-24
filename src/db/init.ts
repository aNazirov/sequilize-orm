import { SequelizeStorage, Umzug } from "umzug";
import { sequelize } from ".";

const umzug = new Umzug({
  migrations: { glob: "dist/db/migrations/*.js" },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

const init = async () => {
  await sequelize.authenticate();
  console.log("Database is connected");

  await umzug.up();

  await sequelize.close();
  console.log("Database has been disconnected");
};

init();
