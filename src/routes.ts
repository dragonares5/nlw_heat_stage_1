import { Router } from "express";
import AuthenticateUserController from "./controllers/AuthenticateUserController";
import CreateMessageController from "./controllers/CreateMessageController";
import GetLastMessageController from "./controllers/GetLastMessageController";
import { AuthenticationMiddleware } from "./middleware/AuthenticationMiddleware";

const router = Router();
router.post("/authenticate", new AuthenticateUserController().handle);

// O segundo parâmetro serve como Middleware.
router.post("/messages", AuthenticationMiddleware, new CreateMessageController().handle);

router.post("/messages/recent", new GetLastMessageController().handle);
export default router;
