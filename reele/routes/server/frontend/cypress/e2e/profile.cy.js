describe('template spec', () => {
  const emailJo = "email@email.com";
  const jelszoJo = "Email123@";
  
  beforeEach(() => {
    cy.visit('http://localhost:8000/u/login')

    cy.get('input[type=email]')
    .type(`${emailJo}`)
    cy.get('input[id=password]')
    .type(`${jelszoJo}`)

    cy.get('button')
    .contains('Login').click()
    
    cy.url().should('eq', 'http://localhost:8000/')
    cy.get('#list-profile').click({ force: true })

  })

  it('Betöltött a profil szerkesztő oldal', () => {
    cy.url().should('eq', 'http://localhost:8000/profile/')

  })

  it('Betöltött az oldal szövege', () => {
    cy.get('button')
    .contains('Personal').click();

    cy.get('p').contains('Profile settings')
    cy.get('p').contains('Email')
    cy.get('label').contains('Add a small introduction about yourself, so others are able to see it: (when hover to your profile picture):')
    cy.get('label').contains('E-mail:')
    cy.get('label').contains('Change password to:')

  })

  it('Vissza lehet lépni a profil oldalról', () => {
    cy.get('.navicon').click();
    cy.url().should('eq', 'http://localhost:8000/')
  })

  it('Fel lehet tölteni egy leírást önmagadról', () => {
    cy.get('button')
    .contains('Personal').click();
    
    cy.get('textarea').type('Ez lesz az új leírás!');

    cy.get('button')
    .contains('Save').click();

  })

  it('Betöltött a felhasználó profilképe', () => {

    cy.get('[id="user-profile"]')
    .should('be.visible')
    .and(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0)
    })
  })

})