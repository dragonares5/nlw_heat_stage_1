import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { text } = request.body;
    const { user_id } = request;

    if (text == undefined)
      return response.json({ error: "No text provided" });
    if (user_id == undefined)
      return response.json({ error: "No user_id provided" });

    const service = new CreateMessageService();
    const result = service.execute(text, user_id);



    return response.json(result);
  }
}

export default CreateMessageController;
