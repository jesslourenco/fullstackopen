require('dotenv').config()
const PORT = process.env.PORT || 3001

describe('Phonebook', function() {
  it('front page can be opened', function() {
    cy.visit(`http://localhost:${PORT}`)
    cy.contains('Harry Potter')
    cy.contains('Dumbledore')
    cy.contains('name')
    cy.contains('Find')
  })
})