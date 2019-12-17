// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (user, password) => {
    cy.visit('http://localhost:3000/login');
    cy.server();
    cy.route('/login', {accountID:'yes'});
    cy.clearCookies();
    cy.get('#username').type(user, {force: true});
    cy.get('#password').type(password, {force: true});
    cy.contains('Sign In').click();
});

Cypress.Commands.add("loadReport", () => {
    cy.login('a','a');
    cy.server();
    cy.route('GET', '/dashboard', '{}}');
    cy.route('GET', '/reports', 'fixture:reports_response');
    cy.route('GET', 'report/5dd831719f1397e47b93498e', 'fixture:report_page_response');
    cy.contains('Reports').click();
    cy.contains('2019-11-30T14:21:58.438713').click();
    cy.location('pathname').should('include', 'report/5dd831719f1397e47b93498e');
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
