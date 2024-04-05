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

    cy.get('.clubicon').click({ force: true })
  })

  it('Betöltött a club létrehozás oldal', () => {
    cy.url().should('eq', 'http://localhost:8000/create-club')
  })

  it('Vissza lehet lépni', () => {
    cy.get('.navicon').click();
    cy.url().should('eq', 'http://localhost:8000/')
  })

  it('Nem töltöttük ki az adatokat', () => {
    cy.get('#creCl').click();

    cy.get('input[id=clubname]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Please fill out this field...']);

    cy.get('i[class=fa-alert]')
  })

  it('Lehet műfajt választani és visszavonni', () => {
    cy.get('#classic').click();
    cy.get('div[data-genre=classic]');

    cy.get('#comedy').click();
    cy.get('div[data-genre=comedy]');

    cy.get('#teaching').click();
    cy.get('div[data-genre=teaching]');

    cy.get('#classic').click();
    cy.get('#comedy').click();
    cy.get('#teaching').click();
  })

  it('Lehet az inputokba írni', () => {
    cy.get('input[id=clubname]')
    .type(`Ez lesz a nev`)
    .should('have.value', 'Ez lesz a nev')
  
    cy.get('textarea[id=description_tb]')
    .type(`Ez egy leírás szeretne lenni`)
    .should('have.value', 'Ez egy leírás szeretne lenni')
  })

  it('Lehet szabályokat megadni majd törölni azokat', () => {
    cy.get('input[id=libraInp]')
    .type(`szabály1{enter}`)
    cy.get('div[data-libra=szabály1]')
    cy.get('label').contains('1#: szabály1')

    cy.get('input[id=libraInp]')
    .type(`szabály2{enter}`)
    cy.get('div[data-libra=szabály2]')
    cy.get('label').contains('2#: szabály2')

    cy.get('button[id=remoLibBt]').click();
    cy.get('button[id=remoLibBt]').click();
    cy.get('.libra-item').should('not.exist');
  })

})