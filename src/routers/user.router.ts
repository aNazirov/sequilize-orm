import { Router } from "express";
import { Controllers } from "src/controllers";
import { container } from "tsyringe";

const router = Router();
const controller = container.resolve(Controllers.User);

router.get("/", controller.getAll);

export { router };
