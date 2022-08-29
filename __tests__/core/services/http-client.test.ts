import { HttpClient } from "src/core/services/http-client.js";
import { navigatorOnline } from "../../utils/spy-on/navigator.spy.js";
import { COOKIE_TOKEN } from "src/const.js";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);
const request = {
  success: {
    url: "/api/test-api",
    responseBody: null,
  },
  badRequest: {
    url: "/api/400-response",
    responseBody: null,
  },
  badRequestWithResponse: {
    url: "/api/400-response-with-body",
    responseBody: {
      message: "This is test error message",
    },
  },
  withAuth: {
    url: "/api/with-auth",
    responseBody: null,
  },
};
// jest.mock("rxjs/ajax", () => ({
//   __esModule: true,
//   ajax: (options: AjaxConfig) => {
//     if (options.url === request.success.url) {
//       return of(
//         getAjaxResponse(
//           options.url,
//           200,
//           request.success.responseBody,
//           undefined,
//           undefined,
//           options.headers,
//         ),
//       );
//     } else if (options.url === request.badRequest.url) {
//       return of(
//         getAjaxErrorResponse(
//           options.url,
//           400,
//           request.badRequest.responseBody,
//           undefined,
//           undefined,
//           options.headers,
//         ),
//       );
//     } else if (options.url === request.badRequestWithResponse.url) {
//       return of(
//         getAjaxErrorResponse(
//           options.url,
//           400,
//           request.badRequestWithResponse.responseBody,
//           undefined,
//           options.headers,
//         ),
//       );
//     }
//   },
// }));

describe("HttpClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    navigatorOnline(true);
  });

  it("Should return ApiResponse.status 200", async () => {
    mock.onGet(request.success.url).replyOnce(200, request.success.responseBody);
    const apiResponse = await HttpClient.get<Record<string, any>>(request.success.url);
    expect(apiResponse.status).toEqual(200);
  });

  it("Should return ApiResponse.status 0 when internet not available", async () => {
    navigatorOnline(false);
    mock.onGet(request.success.url).replyOnce(200, request.success.responseBody);
    const apiResponse = await HttpClient.get(request.success.url);
    expect(apiResponse.status).toEqual(0);
  });

  it("Should return ApiResponse.status 400 when api will return 400 status and data should be null", async () => {
    mock.onGet(request.badRequest.url).replyOnce(400, request.badRequest.responseBody);
    const apiResponse = await HttpClient.get(request.badRequest.url);
    expect(apiResponse.status).toEqual(400);
    expect(apiResponse.data).toStrictEqual(null);
  });

  it("Should return response body in ApiResponse.data when HttpClientOptions.sendResponseWhenError true", async () => {
    mock.onGet(request.badRequestWithResponse.url).replyOnce(400, request.badRequestWithResponse.responseBody);
    const apiResponse = await 
      HttpClient.get(request.badRequestWithResponse.url, { sendResponseWhenError: true });
    expect(apiResponse.status).toEqual(400);
    expect(apiResponse.data).toStrictEqual(request.badRequestWithResponse.responseBody);
  });

  it("Should set Authentication Header when HttpClientOptions.isAuth true", async () => {
    mock.onGet(request.badRequestWithResponse.url).replyOnce(400, request.badRequestWithResponse.responseBody);
    const token = "my-test-token";
    window.document.cookie = `${COOKIE_TOKEN}=${token}`;
    const apiResponse = await HttpClient.get(request.success.url, { isAuth: true });
    expect(apiResponse.response?.config.headers?.Authorization).toEqual(`Bearer ${token}`);
  });
});
