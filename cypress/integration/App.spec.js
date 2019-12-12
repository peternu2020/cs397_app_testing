/// <reference types="Cypress" />

describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('opens with All Days', () => {
    cy.visit ('/');
    cy.get('[data-cy=day_filter]').should('contain', 'All Days');
  });
});