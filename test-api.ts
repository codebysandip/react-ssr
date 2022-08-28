/* eslint-disable @typescript-eslint/no-var-requires */
import { CookieService } from "./src/core/services/cookie.service.js";
import express from "express";

const app = express();
app.get("/api/home", (req, res) => {
  // test cookie
  CookieService.set("test", "cookie", 10, res);

  // test 500 response
  // res = res.status(500);

  // test for token and invalidate token
  // if (req.headers.authorization) {
  //   res.status(401).json({});
  //   return;
  // }
  setTimeout(() => {
    res.status(200).json({
      seo: {
        title: "Home Page",
      },
      data: { count: 5 },
    });  
  }, 2000);
});

app.post("/api/auth/refresh-token", (req, res) => {
  console.log("refresh token request!!");
  res.json({
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzUxNTQzNjI4LCJpYXQiOjE2NTY4NDkyMjh9.d8EvMtuoaTVNtUgyIvtCuIsGqh4HOy_FGE2hXbWEeZc",
    refreshToken:
      "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzUxNTQzNjI4LCJpYXQiOjE2NTY4NDkyMjh9.d8EvMtuoaTVNtUgyIvtCuIsGqh4HOy_FGE2hXbWEeZc",
  });
});

app.listen(3002, () => console.log("App listening on port 3002"));
