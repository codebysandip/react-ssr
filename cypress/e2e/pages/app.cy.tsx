import { INTERNET_NOT_AVAILABLE, ROUTE_404, ROUTE_500, ROUTE_LOGIN } from "src/const.js";

let originalOnLine: boolean;

const goOffline = () => {
  cy.log("offline");
  return cy.window({ log: false }).then((win) => {
    if (!originalOnLine) {
      originalOnLine = win.navigator.onLine;
    }

    Object.defineProperty(win.navigator.constructor.prototype, "onLine", {
      get: () => {
        return originalOnLine;
      },
    });

    const isOnline = originalOnLine;
    originalOnLine = false;

    if (isOnline) {
      win.dispatchEvent(new win.Event("offline"));
    }
  });
};

const goOnline = () => {
  cy.log("online");
  return cy.window({ log: false }).then((win) => {
    if (!originalOnLine) {
      originalOnLine = win.navigator.onLine;
    }

    Object.defineProperty(win.navigator.constructor.prototype, "onLine", {
      get: () => {
        return originalOnLine;
      },
    });

    const isOnline = originalOnLine;
    originalOnLine = true;

    if (!isOnline) {
      win.dispatchEvent(new win.Event("online"));
    }
  });
};
describe("App shell", () => {
  const API_URL = /\/api\/product/;
  it("Should redirect to 500 page when api will return 500 response", () => {
    cy.intercept(API_URL, { statusCode: 500, body: {} });
    cy.visit("/?cypress=true");
    cy.dataCy("500-page").should("exist");
  });

  it("Should redirect to login page when Api will return 401", () => {
    cy.visit("/");
    cy.intercept(API_URL, { statusCode: 401, body: {} });
    cy.dataCy("login-link").click();
    cy.dataCy("navbar").click();
    cy.url().should("contain", ROUTE_LOGIN);
  });

  it("Should redirect to 404 page when Api will return 404", () => {
    cy.intercept(API_URL, { statusCode: 404, body: {} });
    cy.visit("/?cypress=true");
    cy.url().should("contain", ROUTE_404);
  });

  it("Should redirect to 500 page when HttpClient will return 600", () => {
    cy.intercept(API_URL, { statusCode: 600, body: {} });
    cy.visit("/?cypress=true");
    cy.url().should("contain", ROUTE_500);
  });

  it("Should show error notification when api will return error message", () => {
    cy.intercept(API_URL, { statusCode: 500, body: { message: ["Test Error Message"] } });
    cy.visit("/?cypress=true");
    cy.get(".Toastify__toast-body").within(() => {
      cy.contains("Test Error Message").should("exist");
    });
  });

  it("Show toast notification of internet not available when offline", () => {
    cy.visit(ROUTE_500);
    goOffline();
    cy.dataCy("back-to-home").click();
    cy.get(".Toastify__toast-body").within(() => {
      cy.contains(INTERNET_NOT_AVAILABLE).should("exist");
      goOnline();
    });
  });

  it("Should redirect to 403 page when api will return 403", () => {
    cy.intercept(API_URL, { statusCode: 403, body: {} });
    cy.visit("/?cypress=true");
    cy.url().should("contain", 403);
  });
});
