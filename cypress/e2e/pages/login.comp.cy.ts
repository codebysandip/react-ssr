import UsersData from "mocks/api/user.json";

describe("login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Should render login page", () => {
    cy.dataCy("login-page").should("exist");
  });

  it("Should login after entering email and password", () => {
    cy.login(UsersData.users[0].email, UsersData.users[0].password);
    cy.dataCy("logout-btn").should("exist");
  });
});
