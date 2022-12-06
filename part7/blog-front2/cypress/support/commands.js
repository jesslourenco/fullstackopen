/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedPostappUser", JSON.stringify(body));
    cy.visit("http://localhost:3000");
  });
});

Cypress.Commands.add("createPost", ({ title, author, url }) => {
  cy.request({
    url: "http://localhost:3003/api/posts",
    method: "POST",
    body: {
      title,
      author,
      url,
    },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem("loggedPostappUser")).token
      }`,
    },
  });

  cy.visit("http://localhost:3000");
});
