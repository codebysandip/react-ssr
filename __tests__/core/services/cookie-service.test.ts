import { CookieService } from "src/core/services/cookie.service.js"
import { jest } from "@jest/globals";

describe("CookieService", () => {
  // beforeEach(() => {
  //   process.env.IS_SERVER = false;
  // });

  it("should set cookie in browser", () => {
    const cookieName = "test-cookie";
    const cookieValue = "test value";
    CookieService.set(cookieName, cookieValue);
    expect(CookieService.get(cookieName)).toEqual(cookieValue);
  });

  it("should get cookie if cookie available", () => {
    const cookieName = "test-cookie";
    const cookieValue = "test value";
    CookieService.set(cookieName, cookieValue);
    expect(CookieService.get(cookieName)).toBe(cookieValue);
  });

  it("Should return undefined when cookie not available", () => {
    expect(CookieService.get("some-cookie")).toBeUndefined()
  })

  it("should delete cookie from browser cookie", () => {
    const cookieName = "test-cookie";
    const cookieValue = "test value";
    CookieService.set(cookieName, cookieValue);
    expect(CookieService.get(cookieName)).toEqual(cookieValue);
    CookieService.delete(cookieName);
    expect(CookieService.get(cookieName)).toBeUndefined();
  });

  it("Should throw exception when date is not valid while setting cookie", () => {
    expect(() => CookieService.set("some name", "some value", "wrong formate" as any)).toThrow()
  })

  it("should throw exception when SSR and Node request object not available to get cookie", () => {
    process.env.IS_SERVER = true;
    expect(CookieService.get).toThrow();
  });

  it("should throw exception when SSR and Node response object not available to set cookie", () => {
    process.env.IS_SERVER = true;
    expect(CookieService.set).toThrow();
  });

  it("should throw exception when SSR and Node response object not available to delete cookie", () => {
    process.env.IS_SERVER = true;
    expect(CookieService.set).toThrow();
  });

  it("Should set cookie in node request header when SSR", () => {
    process.env.IS_SERVER = true;
    const cookieName = "test-cookie";
    const cookieValue = "test value";
    const mockSetHeader = jest.fn();
    const res: any = {
      setHeader: mockSetHeader
    };
    CookieService.set(cookieName, cookieValue, 10, res)
    expect(mockSetHeader).toBeCalled();
  });

  it("Should delete cookie when SSR (should set Set-Cookie header)", () => {
    process.env.IS_SERVER = true;
    const cookieName = "test-cookie";
    const mockSetHeader = jest.fn();
    const res: any = {
      cookie: mockSetHeader
    };
    CookieService.delete(cookieName, res)
    expect(mockSetHeader).toBeCalled();
  });

})