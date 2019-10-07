describe('My First Test', function() {
    it('Gets, types and asserts', function() {
      cy.visit('localhost:3000')

      cy.get('[placeholder="Username"]')
      .type('power.user.0')
      .should('have.value', 'power.user.0')

      cy.get('[placeholder="Password"]')
      .type('X!16a99a40')
      .should('have.value', 'X!16a99a40')

      cy.get('[type="submit"]').click()
      cy.wait(1000)
      cy.url().should('include', '/ask-for-loan')

      cy.get('[type="range"]')
      .should('be.visible')
    })
  })
