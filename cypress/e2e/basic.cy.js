describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('opens the index page', () => {
    cy.get('h1').contains('Coming soon')
  })
})

describe('validate blog', () => {
  it('should have only 3 blog posts by default', () => {
    cy.visit('/post')
    cy.get('.blog-roll ul li').should('have.length', 3);
  })
})