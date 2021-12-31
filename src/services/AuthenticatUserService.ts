import "dotenv/config";
import axios from "axios";

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
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${accessTokenResponse.access_token}`
      }
    });

    return response.data;
  }
}

export { AuthenticateUserService };
