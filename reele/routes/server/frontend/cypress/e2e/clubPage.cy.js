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

    cy.get('div[class=clubItemLine]').first().click({ force: true })
  })

  it('A club oldal sikeresen betöltött', () => {
    cy.url().should('eq', 'http://localhost:8000/club/neme')
  })

  it('Ki lehet jelentkezni', () => {
    cy.get('#list-logout').click({ force: true })
    cy.get('#list-login').click({ force: true })
    cy.visit('http://localhost:8000/u/login')
  })

  it('Megjelenik a bejelentkezett felhasználó profilképe és neve', () => {
    cy.get('.usericon')
    .invoke('attr', 'title')
    .should('be.oneOf', ['Email']);
  })
  
  it('Vissza lehet lépni a fő oldalra', () => {
    cy.get('#logo').click();
    cy.url().should('eq', 'http://localhost:8000/')
  })

  it('Át lehet lépni a profil oldalra', () => {
    cy.get('#list-profile').click({ force: true })
    cy.url().should('eq', 'http://localhost:8000/profile/')
  })

  it('Át lehet lépni a poszt létrehozás oldalra', () => {
    cy.get('#list-reele').click({ force: true })
    cy.url().should('eq', 'http://localhost:8000/post/neme')
  })
  
})