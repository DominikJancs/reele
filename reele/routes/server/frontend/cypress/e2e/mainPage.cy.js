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
  })

  it('Betöltött a fő oldal', () => {
    cy.url().should('eq', 'http://localhost:8000/')
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

  it('Megjelenik az oldal neve és logo-ja', () => {
    cy.get('#logo')
    .invoke('attr', 'title')
    .should('be.oneOf', ['Home...']);

    cy.get('#title')
    .invoke('attr', 'title')
    .should('be.oneOf', ['About reele...']);
  })

  it('Megjelenik az oldal jobb és bal sidebar-ja és az oldal tartalma', () => {
    cy.get('#left-sidebar-bx')
    cy.get('#slider-content')
    cy.get('#right-sidebar-bx')
  })

  it('Át lehet lépni a profil oldalra', () => {
    cy.get('#list-profile').click({ force: true })
    cy.url().should('eq', 'http://localhost:8000/profile/')
  })

})