/// <reference types="Cypress" />

describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });
});