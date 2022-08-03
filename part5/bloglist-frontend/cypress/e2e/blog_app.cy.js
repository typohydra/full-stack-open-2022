describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('input:first')
      .should('have.attr', 'name', 'Username')
    cy.get('input:last')
      .should('have.attr', 'name', 'Password')
    cy.get('button')
      .should('have.attr', 'type', 'submit')
  })
})