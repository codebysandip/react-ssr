/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Request, Response } from "express";
import Products from "./mocks/products.json";
import Users from "./mocks/users.json";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import { NextFunction } from "webpack-dev-middleware";
import { URL_REFRESH_TOKEN } from "src/const.js";
import { TokenData } from "src/pages/auth/auth.model.js";
import etag from "etag";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const secretKey = "react-ssr";
const accessTokenExpTime = "5m";
const refreshTokenExpTime = "7m";
// mimic api to sent data after 50 sec
app.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 50);
});

// overide json and send methods of Response
// add etag header and modify response body if etag matched
app.use((req, res, next) => {
  const send = res.send;
  const json = res.json;
  res.send = function (body) {
    return send.call(this, body);
  };
  res.json = function (body) {
    const etagVal = etag(JSON.stringify(body), { weak: true });
    this.setHeader("etag", etagVal);
    if (req.headers.etag && req.headers.etag === etagVal) {
      console.log("etag!!", req.headers.etag, etagVal);
      return json.call(this, {});
    } else {
      return json.call(this, body);
    }
  };

  next();
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = Users.find((u) => u.email === email);
  if (!user) {
    res.status(400).json({
      message: "User not found!!",
    });
  } else if (user.password !== password) {
    res.status(400).json({
      message: "Password is not valid",
    });
  } else {
    const token = jwt.sign(user, secretKey, {
      expiresIn: accessTokenExpTime,
    });
    const refreshToken = jwt.sign(user, secretKey, {
      expiresIn: refreshTokenExpTime,
    });
    res.json({
      accessToken: token,
      refreshToken,
    });
  }
});

app.get("/api/header", (req, res) => {
  res.json({
    links: [
      {
        text: "Home",
        url: "/"
      },
      {
        text: "404 Page",
        url: "/404"
      },
      {
        text: "500 Page",
        url: "/500"
      },
    ]
  })
})

app.post(URL_REFRESH_TOKEN, (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refreshToken, secretKey) as TokenData;
    delete decoded.iat;
    delete decoded.exp;
    const token = jwt.sign(decoded, secretKey, {
      expiresIn: accessTokenExpTime,
    });
    const refreshToken = jwt.sign(decoded, secretKey, {
      expiresIn: refreshTokenExpTime,
    });
    res.json({
      accessToken: token,
      refreshToken,
    });
  } catch (err: any) {
    console.log("Error in jwt verify!!!", err);
    res.status(500).json({
      message: err.message,
    });
  }
});

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      message: "Token is not available in request header",
    });
    return false;
  } else if (!token.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Token should be a Bearer token",
    });
    return false;
  }
  token = token.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    res.locals.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: (error as Error).message,
    });
  }
};

app.get("/api/product", (req, res) => {
  res.json({ products: Products, seo: { title: "Products Listing" } });
});


app.get("/api/product/top-products", (req, res) => {
  res.json(Products.slice(0, 3))
});

app.get("/api/product/:id", validateTokenMiddleware, (req, res) => {
  const product = Products.find((p) => p.id === parseInt(req.params.id));
  console.log("product!!", product, req.params.id);
  res.status(product ? 200 : 204).json(product || {});
});


app.get("/api/user", (req, res) => {
  res.json({ users: Users });
});

app.get("/api/user/:id", (req, res) => {
  const user = Users.find((u) => u.id === parseInt(req.params.id));
  res.status(user ? 200 : 204).json(user || {});
});

app.listen(3002, () => console.log("App listening on port 3002"));
