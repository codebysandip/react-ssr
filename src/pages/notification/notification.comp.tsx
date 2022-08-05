import React from "react";
import { ApiResponse } from "src/core/models/api-response";
import { HttpClient } from "src/core/services/http-client";

export default class NotificationDemo extends React.Component {
  public static getInitialProps() {
    // this api will return error
    return HttpClient.get("/api/notification-demo");
  }

  public render(): React.ReactNode {
    return <h1>Notification Demo</h1>;
  }
}

export interface NotificationDemoProps extends ApiResponse<any> {}
