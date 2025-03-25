import { QueryTypes } from "sequelize";
import { Modules } from "src/config";
import { SequelizeInstance } from "src/db";
import { Utils } from "src/utils";
import { inject, injectable } from "tsyringe";

@injectable()
export class User {
  constructor(
    @inject(Modules.Sequelize) private readonly sequelize: SequelizeInstance
  ) {
    console.log(`User service has been initialized`);
  }

  // async updateBalance(id: number, amount: number) {
  //   const transaction = await this.sequelize.client.transaction({
  //     isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE,
  //   });

  //   const user = await this.sequelize.client.models.User.findByPk(id, {
  //     transaction,
  //   });

  //   if (!user) {
  //     await transaction.rollback();
  //     throw new Utils.CustomError("User not found", 404);
  //   }

  //   await user.increment("balance", { by: amount, transaction });

  //   await user.reload({ transaction });

  //   if (user.balance < 0) {
  //     await transaction.rollback();
  //     throw new Utils.CustomError("User balance cannot to be negative", 400);
  //   }

  //   await transaction.commit();
  //   return user;
  // }

  async updateBalance(id: number, amount: number) {
    const user = await this.sequelize.client.models.User.findByPk(id);

    if (!user) {
      throw new Utils.CustomError("User not found", 404);
    }

    const [updatedUser] = await this.sequelize.client.query<{
      id: number;
      balance: number;
    }>(
      `
      UPDATE users
      SET balance = balance + :amount
      WHERE id = :id AND balance + :amount >= 0
      RETURNING *;
      `,
      {
        replacements: { id, amount },
        type: QueryTypes.SELECT,
      }
    );

    if (!updatedUser) {
      throw new Utils.CustomError("User balance cannot to be negative", 400);
    }

    return updatedUser;
  }
}
