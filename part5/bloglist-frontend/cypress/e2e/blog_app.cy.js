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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'test username', password: 'test password'
      }).then(response => {
        localStorage.setItem('loggedBologAppUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('[data-cy=title]').type('new blog title')
      cy.get('[data-cy=author]').type('new blog author')
      cy.get('[data-cy=url]').type('new blog url')
      cy.get('[data-cy=create]').click()
      cy.contains('new blog title new blog author')
    })

    it('A blog can be liked', function() {
      cy.contains('create new blog').click()
      cy.get('[data-cy=title]').type('new blog title')
      cy.get('[data-cy=author]').type('new blog author')
      cy.get('[data-cy=url]').type('new blog url')
      cy.get('[data-cy=create]').click()
      cy.contains('new blog title new blog author')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })
  })
})