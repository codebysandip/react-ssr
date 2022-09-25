/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add("dataCy", (dataCy: string, ...args) => {
  return cy.get(`[data-test-id="${dataCy}"]`, ...args);
});
//
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.dataCy("login-link").click();
  cy.dataCy("login-email").type(email);
  cy.dataCy("login-password").type(password);
  cy.dataCy("login-btn").click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add("visitAsHtml", (route: string) => {
  cy.request(route)
    .its("body")
    .then((html) => {
      // remove the application code JS bundle
      html = html.replace(
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        ""
      );
      cy.document().invoke({ log: false }, "write", html);
    });
  // now we can use "normal" Cypress api on the page
});

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>
    // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
    // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    dataCy: (testId: string) => Chainable<JQuery<HTMLElement>>;
    /**
     * visitAsHtml command will remove all scripts from response
     * to mimic Javascript disabled scenario
     * this way can check page fully rendered on server or not
     */
    visitAsHtml: (route: string) => void;
  }
}