import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import "dotenv/config";

interface IPayload {
  sub: string
}

export function AuthenticationMiddleware(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid"
    });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string) as IPayload;
    request.user_id = sub;

    return next();
  } catch (e) {
    return response.status(401).json({
      errorCode: "token.expired"
    });
  }
}
