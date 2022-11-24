/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login');
  });

  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      cy.visit('http://localhost:3000');
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      };
      cy.request('POST', 'http://localhost:3000/api/users/', user);
    });

    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.get('.notificationMessage')
        .should('contain', 'Login successful');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.notificationMessage')
        .should('contain', 'Wrong credentials');
    });
  });
});
