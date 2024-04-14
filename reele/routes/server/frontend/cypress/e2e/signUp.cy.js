describe('template spec', () => {

  const emailJo = "User@gmail.com";
  const emailJoVolt = "email@email.com";
  const jelszoJo = "Email123@";
  const userName = "UserName";
  const userNameVolt = "Email";
  const emailRossz = "Imael";
  const jelszoRossz = "Imael";

  beforeEach(() => {
    cy.visit('http://localhost:8000/u/signup')
  })

  it('Sikeresen betöltött a regisztrációs oldal', () => {
    cy.url().should('eq', 'http://localhost:8000/u/signup')
  })

  it('Az oldal szövegei helyesen jelennek meg', () => {
    cy.get('p')
      .contains('Sign Up');
    cy.get('label')
      .contains('E-mail:');
    cy.get('label')
      .contains('Username:');
    cy.get('label')
      .contains('Password');
    cy.get('label')
      .contains('Confirm password');
    cy.get('label')
      .contains('Profile picture (Optional)');
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
    cy.get('i[class="fa-book"]');
    cy.get('i[class="fa-key"]');
    
  })

  it('Betölt az alap profilkép', () => {

    cy.get('[id="ucico_img"]')
    .should('be.visible')
    .and(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0)
    })
  })

  it('Az adatok nincsenek kitöltve', () => {

    cy.get('button')
      .contains('Sign Up').click()

    cy.get('input[id=email]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Please fill out this field...']);

    cy.get('input[id=username]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Please fill out this field...']);

    cy.get('input[id=password]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Please fill out this field...']);

    cy.get('input[id=confirmPassword]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Please fill out this field...']);

    cy.get('i[class="fa-alert"]');
  })

  it('Rossz email', () => {

    cy.get('input[type=email]')
      .type(`${emailRossz}`)

    cy.get('button')
      .contains('Sign Up').click()

    cy.get('input[type=email]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Enter a valid email...']);
  })

  it('Email és felhasználónév már foglalt', () => {

    cy.get('input[type=email]')
      .type(`${emailJoVolt}`)
    cy.get('input[type=text]')
      .type(`${userNameVolt}`)
    cy.get('input[id=password]')
      .type(`${jelszoJo}`)
    cy.get('input[id=confirmPassword]')
      .type(`${jelszoJo}`)

    cy.get('button')
      .contains('Sign Up').click()

    cy.get('input[type=email]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Email was already taken!']);
    cy.get('input[type=text]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Username was already taken!']);
  })

  it('A jelszavak nem egyeznek meg', () => {

    cy.get('input[id=password]')
      .type(`${jelszoJo}`)
    cy.get('input[id=confirmPassword]')
      .type(`${jelszoRossz}`)

    cy.get('button')
      .contains('Sign Up').click()

    cy.get('input[id=password]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Passwords do not match..']);
    cy.get('input[id=confirmPassword]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['Passwords do not match..']);
  })

  it('A jelszó nem megfelelő formátumú', () => {

    cy.get('input[id=password]')
      .type(`${jelszoRossz}`)
    cy.get('input[id=confirmPassword]')
      .type(`${jelszoRossz}`)

    cy.get('button')
      .contains('Sign Up').click()

    cy.get('input[id=password]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['6 to 30 character are required...', 'Symbol, Upper-Lower case, Number']);
    cy.get('input[id=password]')
      .invoke('attr', 'placeholder')
      .should('be.oneOf', ['6 to 30 character are required...', 'Symbol, Upper-Lower case, Number']);
  })
})