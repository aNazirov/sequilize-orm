import { Sequelize } from "sequelize";
import { initUser } from "./User";

export { User } from "./User";

export const init = (sequelize: Sequelize) => {
  initUser(sequelize);
};
