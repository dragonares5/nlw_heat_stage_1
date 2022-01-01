import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { AuthenticationMiddleware } from "./middleware/AuthenticationMiddleware";

const router = Router();
router.post("/authenticate", new AuthenticateUserController().handle);
router.post("/messages", AuthenticationMiddleware, new CreateMessageController().handle);

export default router;
