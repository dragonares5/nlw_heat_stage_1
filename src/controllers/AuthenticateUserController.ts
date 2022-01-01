import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticatUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    // Desestructuring
    const { code } = request.body;

    const service = new AuthenticateUserService();
    try {
      const result = await service.execute(code);
      return response.json(result);
    } catch (err) {
      return response.json({ error: err.message });
    }

  }
}

export default AuthenticateUserController;
