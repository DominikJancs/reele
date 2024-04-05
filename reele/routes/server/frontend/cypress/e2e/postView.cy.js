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

    cy.get('div[data-reele=name]').click();
    cy.on('uncaught:exception', (err, runnable) => {
      return false;
    })
  })

  it('Betöltött a poszt megtekintő oldal', () => {
    cy.url().should('eq', 'http://localhost:8000/reele/name')
  })

  it('Vissza lehet lépni', () => {
    cy.get('div[class=navicon]').click();
    cy.url().should('eq', 'http://localhost:8000/')
  })

  it('Lehet favoritezni és reportoli a posztot', () => {
    cy.get('div[id=reeleBTstatic]').click();
    cy.get('div[id=flagBTstatic]').click();
  })

  it('Rá lehet nyomni a lap indexére és könyvjelzőt elhelyezni rajta', () => {
    cy.get('div[id=bookmarki-1]').click();
    cy.get('div[id=pagei-1]').click();
    cy.get('div[class=page_index]').should('exist')
  })

  it('A kommentek megjelennek', () => {
    cy.get('button[id=openThoughts]').click();
    cy.get('div[class=thoughts_content]').should('exist')
    cy.get('label').contains('random')
  })

  it('Lehet kommentet up és down voteolni', () => {
    cy.get('button[id=openThoughts]').click();
    cy.get('button[class=upVoteBT]').first().click();
    cy.get('button[class=downVoteBT]').first().click();

  })

  it('Lehet a kommenten lévő indexre rányomni', () => {
    cy.get('button[id=openThoughts]').click();
    cy.get('div[class=page_index]').first().click();
  })
})