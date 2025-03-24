import { Services } from "src/services";
import { inject, injectable } from "tsyringe";

@injectable()
export class User {
  constructor(@inject(Services.User) private readonly service: Services.User) {}

  getAll() {}
}
