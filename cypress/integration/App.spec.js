/// <reference types="Cypress" />

describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('opens with All Days', () => {
    cy.visit ('/');
    cy.get('[data-cy=day_filter]').should('contain', 'All Days');
  });

  it('shows dropdown to filter by day when event filter button is clicked', () => {
    cy.visit ('/');
    cy.get('[data-cy=Monday]').click();
    cy.get('[data-cy=day_filter]').should('contain' ,'Monday');
  });
});