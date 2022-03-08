import { Router } from "express";
import { CreateUserController } from "./controller/CreateUserController";
import { CreateTagController } from "./controller/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureadmin";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();

router.post("/users", ensureAdmin, createUserController.handle);
router.post("/tags", createTagController.handle);
router.post("/login", authenticateUserController.handle);

export { router };
