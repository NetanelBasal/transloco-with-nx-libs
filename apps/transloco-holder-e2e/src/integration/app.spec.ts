import { getGreeting } from '../support/app.po';

describe('transloco-holder', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to transloco-holder!');
  });
});
