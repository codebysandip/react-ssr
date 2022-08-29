import React from "react";
import { HttpClient } from "src/core/services/http-client.js";
import { ContextData } from "src/core/models/context.model.js";
import { HomeData } from "./home.model.js";

export default class Home extends React.Component<HomeProps> {
  public static getInitialProps(ctx: ContextData) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return HttpClient.get<HomeData>("/api/home", {
      nodeRespObj: ctx.res,
      isAuth: true,
      nodeReqObj: ctx.req,
    });
  }

  public render() {
    return <h1>Home Page Count:{this.props.count}</h1>;
  }
}

export interface HomeProps extends HomeData {}
