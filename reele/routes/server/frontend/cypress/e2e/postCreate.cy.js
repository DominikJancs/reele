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
    cy.get('#list-reele').click({ force: true })

  })

  it('Betölt a poszt létrehozás oldal', () => {
    cy.url().should('eq', 'http://localhost:8000/post/neme')
  })

  it('Vissza lehet lépni', () => {
    cy.get('.navicon').click();
    cy.url().should('eq', 'http://localhost:8000/')
  })

  it('Nem töltöttük ki az adatokat', () => {
    cy.get('#publish_post').click();

    cy.get('input[id=documentumname]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Please fill out this field...']);

    cy.get('i[class=fa-alert]')
  })

  it('Tudunk a legördülő menüből választani', () => {
    cy.get('#genre_menu').select('action').should('have.value', 'action')
    cy.get('#genre_menu').select('comedy').should('have.value', 'comedy')
    cy.get('#genre_menu').select('western').should('have.value', 'western')
  })

  it('Tudunk az inputokba írni', () => {
    cy.get('input[id=documentumname]')
    .type(`Ez lesz a nev`)
    .should('have.value', 'Ez lesz a nev')

    cy.get('input[id=by]')
    .type(`Ez lesz a szerző`)
    .should('have.value', 'Ez lesz a szerző')
  })
})