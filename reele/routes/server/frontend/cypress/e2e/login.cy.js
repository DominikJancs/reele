describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/u/login')
  })

  const emailJo = "email@email.com";
  const jelszoJo = "Email123@";
  const emailRossz = "Imael";
  const jelszoRossz = "Imael";


  it('Login oldal betöltött', () => {
    cy.url().should('eq', 'http://localhost:8000/u/login')
  })

  it('Az oldal szövegei helyesen jelennek meg', () => {
    cy.get('p')
      .contains('Log in');
    cy.get('label')
      .contains('E-mail:');
    cy.get('label')
      .contains('Password');
    cy.get('label')
      .contains('Forgot your password?');
    cy.get('p')
      .contains('Open library on the internet');
  })

  it('Az oldal logo-ja és neve megjelenik', () => {

    cy.get('[id="reele_l"]')
    .should('be.visible')
    .and(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0)
    })

    cy.get('[id="reele_t"]')
    .should('be.visible')
    .and(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0)
    })
  })

  it('A kis icon-ok megjelennek', () => {

    cy.get('i[class="fa-mail"]');
    cy.get('i[class="fa-key"]');
    
  })

  it('Sikeres bejelentkezés', () => {

    cy.get('input[type=email]')
      .type(`${emailJo}`)
    cy.get('input[id=password]')
      .type(`${jelszoJo}`)

    cy.get('button')
      .contains('Login').click()
    
    cy.url().should('eq', 'http://localhost:8000/u/login')
  })

  it('Hiba a bejelentkezéskor rossz jelszó', () => {

    cy.get('input[type=email]')
      .type(`${emailJo}`)
    cy.get('input[id=password]')
      .type(`${jelszoRossz}`)

    cy.get('button')
      .contains('Login').click()
    cy.get('input[id=password]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['6 to 30 character are required...', 'Symbol, Upper-Lower case, Number']);
  })


  it('Az adatok nincsenek kitöltve', () => {

    cy.get('button')
      .contains('Login').click()

    cy.get('input[id=email]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Please fill out this field...']);

    cy.get('input[id=password]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Please fill out this field...']);

      cy.get('i[class="fa-alert"]');

  })

  it('Hiba a bejelentkezéskor rossz email', () => {

    cy.get('input[type=email]')
      .type(`${emailRossz}`)
    cy.get('input[id=password]')
      .type(`${jelszoJo}`)

    cy.get('button')
      .contains('Login').click()
    cy.get('input[id=email]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Enter a valid email...']);
  })

  it('Form váltása bejelentkezés- és regisztrációs felület között', () => {

    cy.get('button')
      .contains('Sign Up').click()

    cy.get('p[id=interact_tit]')
      .contains('Sign Up');

    cy.get('button')
      .contains('Login').click()

    cy.get('p[id=interact_tit]')
      .contains('Log in');

  })

})