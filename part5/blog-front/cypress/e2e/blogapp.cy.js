/* eslint-disable object-curly-newline */
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
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);
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

  describe('When logged in', function () {
    beforeEach(function () {
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      };
      cy.request('POST', 'http://localhost:3003/api/users/', user);
      cy.login({ username: 'mluukkai', password: 'salainen' });
    });

    it('A post can be created', function () {
      cy.contains('new post').click();
      cy.get('#title').type('title');
      cy.get('#author').type('author');
      cy.get('#url').type('url');
      cy.get('#newpost-button').click();

      cy.get('.notificationMessage')
        .should('contain', 'title has been added!');
    });

    it('A post can be liked', function () {
      cy.createPost({ title: 'title', author: 'author', url: 'url' });
      cy.contains('title')
        .contains('view')
        .click()
        .get('#like-btn')
        .click();
      cy.contains('1 likes');
    });

    it('A post can be deleted by its creator', function () {
      cy.createPost({ title: 'title', author: 'author', url: 'url' });
      cy.contains('title')
        .contains('view')
        .click()
        .get('#del-btn')
        .click();
      cy.get('.notificationMessage')
        .should('contain', 'title has been removed!');
    });

    it.only('Posts are ordered by likes', function () {
      cy.createPost({ title: 'title', author: 'author', url: 'url' });
      // eslint-disable-next-line object-curly-newline
      cy.createPost({ title: 'another', author: 'another', url: 'url' });

      cy.contains('another')
        .contains('view')
        .click();

      cy.contains('another')
        .contains('+like')
        .click()
        .click();

      cy.visit('http://localhost:3000');

      cy.contains('another') // 5c step 3 test assertion
        .contains('2 likes');

      cy.get('.blog').eq(0).should('contain', 'another');
      cy.get('.blog').eq(1).should('contain', 'title');
    });
  });
});
