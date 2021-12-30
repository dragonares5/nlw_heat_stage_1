import "dotenv/config";
import express from "express";

const app = express();

app.get('/github', (request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
})

app.get('/signin/callback', (request, response) => {
  const { code } = request.query;

  // Apenas para verificar como o request.query funciona
  console.log("Query: " + JSON.stringify(request.query));
});

app.listen(4000, () => console.log("Server running!"));
