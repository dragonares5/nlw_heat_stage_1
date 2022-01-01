import "dotenv/config";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET_KEY,
        // O JS automaticamente entende que o nome da variável é 
        // o nome da propriedade, então seria code: code.
        code
      },
      headers: {
        Accept: "application/json"
      }
    });
    //console.log(JSON.stringify(response.config));

    // Pegar o user data com access_token
    const { data: response } = await axios.get<IUserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: response.id
      }
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: response.id,
          login: response.login,
          name: response.name,
          avatar_url: response.avatar_url,
        }
      })
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id
        }
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "1d"
      }
    )

    return { token, user };
  }
}

export { AuthenticateUserService };
