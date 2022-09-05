import { ApiResponse } from "../models/api-response.js";
import { ToastEvent, LoaderEvent } from "../models/custom-events.client.js";
import { Toaster } from "../models/toaster.model.js";

export class CommonService {
  private static loaderCount = 0;

  public static toggleLoader(status: boolean) {
    if (!process.env.IS_SERVER) {
      if (status) {
        this.loaderCount += 1;
      } else {
        this.loaderCount -= 1;
      }
      if (!status) {
        if (this.loaderCount === 0) {
          window.dispatchEvent(new LoaderEvent(false));
        }
        return;
      }
      window.dispatchEvent(new LoaderEvent(status));
    }
  }

  public static getDefaultApiResponseObj() {
    const response: ApiResponse<null> = {
      status: 200,
      data: null,
      message: [],
      errorCode: -1,
    };
    return response;
  }

  public static toast(toaster: Toaster) {
    if (!process.env.IS_SERVER) {
      window.dispatchEvent(new ToastEvent(toaster));
    }
  }

  public static isOnline() {
    return new Promise<boolean>((resolve, reject) => {
      const status = process.env.IS_SERVER ? true : navigator.onLine;
      if (status) {
        resolve(status);
      } else {
        reject(status);
      }
    });
  }
}
