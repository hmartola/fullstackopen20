describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test Cypress',
      username: 'cypress',
      password: 'password'
    }
    const user2 = {
      name: 'User Two',
      username: 'user',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to use application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('password')
      cy.get('#loginButton').click()

      cy.contains('Test Cypress logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('WRONG')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Test Cypress logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'cypress', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('cypress.io')
      cy.contains('create blog').click()
      cy.get('#blogStyle').contains('a blog created by cypress cypress')
    })
  })

  describe.only('Blog functionality', function() {
    beforeEach(function() {
      cy.login({ username: 'cypress', password: 'password' })
      cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'cypress.io' })
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.get('#blogLikes').contains('0')  // Zero likes
      cy.contains('like').click()
      cy.reload()    // Refresh page to update amount of likes
      cy.contains('view').click()
      cy.get('#blogLikes').contains('1')
    })

    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('#blogStyle').get('a blog created by cypress cypress').should('not.exist')
      cy.reload()       // Refresh page to confirm blog has been removed
      cy.get('html').should('not.contain', 'a blog created by cypress cypress')
    })

    it('A blog cannot be deleted by another user', function(){
      cy.contains('logout').click()
      cy.login({ username: 'user', password: 'root' })
      cy.contains('view').click()
      cy.get('#blogStyle').should('not.contain', 'remove')
    })

    it('Blogs are in a descending order by amount of likes', function() {
      cy.createBlog({ title: 'second place', author: 'dos', url: 'www', likes: 101 })
      cy.createBlog({ title: 'first place', author: 'uno', url: 'www', likes: 2020 })
      cy.createBlog({ title: 'third place', author: 'tres', url: 'www', likes: 50 })

      let arr = []
      cy.get('span#blogLikes').then(($like) => {
        arr.push($like.text())
        cy.expect(arr).to.eql([' 2020 101 50 0'])   // the likes are in the correct order
      })
      cy.get('#blogStyle').should('contain', 'first place uno')   // blog with most likes is first
    })
  })
})