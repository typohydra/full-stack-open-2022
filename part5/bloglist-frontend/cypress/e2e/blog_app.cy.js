describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test name',
      username: 'test username',
      password: 'test password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('[data-cy=username]')
    cy.get('[data-cy=password]')
    cy.get('[data-cy=login]')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('[data-cy=username]').type('test username')
      cy.get('[data-cy=password]').type('test password')
      cy.get('[data-cy=login]').click()
      cy.contains('test name logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('[data-cy=username]').type('test username')
      cy.get('[data-cy=password]').type('wrong test password')
      cy.get('[data-cy=login]').click()
      cy.contains('invalid username or password')
    })
  })
})