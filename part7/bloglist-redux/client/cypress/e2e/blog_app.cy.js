describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test name',
      username: 'test username',
      password: 'test password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('[data-cy=username]')
    cy.get('[data-cy=password]')
    cy.get('[data-cy=login]')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[data-cy=username]').type('test username')
      cy.get('[data-cy=password]').type('test password')
      cy.get('[data-cy=login]').click()
      cy.contains('test name logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('[data-cy=username]').type('test username')
      cy.get('[data-cy=password]').type('wrong test password')
      cy.get('[data-cy=login]').click()
      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'test username',
        password: 'test password',
      }).then((response) => {
        localStorage.setItem(
          'loggedBologAppUser',
          JSON.stringify(response.body)
        )
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'new blog title',
        author: 'new blog author',
        url: 'new blog url',
      })
      cy.contains('new blog title new blog author')
    })

    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'new blog title',
        author: 'new blog author',
        url: 'new blog url',
      })
      cy.contains('new blog title new blog author')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('User can delete their blog', function () {
      cy.createBlog({
        title: 'new blog title',
        author: 'new blog author',
        url: 'new blog url',
      })
      cy.contains('new blog title new blog author')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'new blog title new blog author')
    })

    it('Blogs are ordered by likes', function () {
      cy.createBlog({
        title: 'blog with least likes',
        author: 'new blog author',
        url: 'new blog url',
        likes: 10,
      })
      cy.createBlog({
        title: 'blog with most likes',
        author: 'new blog author',
        url: 'new blog url',
        likes: 42,
      })
      cy.createBlog({
        title: 'blog with second most likes',
        author: 'new blog author',
        url: 'new blog url',
        likes: 32,
      })
      cy.get('[data-cy=blog]').eq(0).should('contain', 'blog with most likes')
      cy.get('[data-cy=blog]')
        .eq(1)
        .should('contain', 'blog with second most likes')
      cy.get('[data-cy=blog]').eq(2).should('contain', 'blog with least likes')
    })
  })
})
