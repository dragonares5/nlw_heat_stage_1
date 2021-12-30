import "dotenv/config";
import axios from "axios";

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";
    const response = await axios.post(url, null, {
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
    console.log(JSON.stringify(response.config));

    return response.data;
  }
}

export { AuthenticateUserService };
