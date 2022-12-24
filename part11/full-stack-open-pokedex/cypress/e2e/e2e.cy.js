/* eslint-disable */
require('dotenv').config()
const PORT = process.env.PORT || 8080

describe('Pokedex', function() {
  it('front page can be opened', function() {
    cy.visit(`http://localhost:${PORT}`)
    cy.contains('ivysaur')
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')
  })

  it('pokemon page has correct content', function() {
    cy.visit(`http://localhost:${PORT}`)
    cy.get('a').contains('ivysaur').click()
    cy.url().should('include', '/pokemon/ivysaur')
    cy.contains('chlorophyll')
  })
})