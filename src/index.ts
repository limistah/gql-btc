import express from "express";
import dotenv from "dotenv";
import applyGraphQLMiddleware from "./graphql";
dotenv.config();

//express server
const app = express();

applyGraphQLMiddleware(app);

app.get("/", (req, res) => {
  return res.json({
    online: true,
    message: "Bitcoin Margin Calculator API",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
});
