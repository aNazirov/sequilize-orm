import { DataTypes, Model, Sequelize } from "sequelize";
import { singleton } from "tsyringe";

@singleton()
export class User extends Model {
  balance!: number;
}

export function initUser(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      balance: {
        type: DataTypes.DECIMAL,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
    }
  );

  return User;
}
