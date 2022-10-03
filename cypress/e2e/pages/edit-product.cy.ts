import ProductsData from "mocks/api/product.json";
import UsersData from "mocks/api/user.json";

describe("Edit Product Page", () => {
  const url = "/product/edit/2";
  it("Should not render page on server (Route.isSSR false)", () => {
    cy.visitAsHtml(url);
    cy.dataCy("edit-product-page").should("not.exist");
  });

  it("Should render edit product page after login", () => {
    cy.visit(url);
    cy.login(UsersData.users[0].email, UsersData.users[0].password);

    cy.visit(url);
    cy.dataCy("edit-product-page").should("exist");
    const product = ProductsData.products.find((p) => p.id === 2);
    cy.dataCy("edit-product-title").should("have.value", product?.title);
  });
});
