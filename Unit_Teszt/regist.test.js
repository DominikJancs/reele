const request = require('supertest');
const server = require('../routes/server/server'); // Az alkalmazás fájlja

describe('Regisztrálás', () => {

  it('Helytelen regisztrációnak kell végbemennie, ha a megadott jelszavak nem egyeznek meg', async () => {
      try {
        const response = await request(server)
          .post('/api/signup')
          .send({
            username: 'tesztuserrossz',
            email: 'tesztrossz@example.com',
            password: 'd8~R^z]vw2:aEgh143dy',
            confirmPassword: 'd8~R^z]vw2:aEgh143dx', // Itt eltérő jelszót adunk meg
            form: 'signup'
          });
  
        expect(response.status).toBe(400); // Várjuk, hogy a státus 400 legyen, mert nem egyeznek a jelszavak
        expect(response.body.msg).toBe("Password don't match"); // Várjuk, hogy a válasz tartalmazza ezt az üzenetet
      } catch (error) {
        console.error(error);
        throw error; 
      }
    });

  it('Helyes regisztrációnak kell végbemennie', async () => {
    try {
      const response = await request(server)
        .post('/api/signup')
        .send({
          username: 'tesztuser',
          email: 'teszt@example.com',
          password: 'd8~R^z]vw2:aEgh143dy',
          confirmPassword: 'd8~R^z]vw2:aEgh143dy',
          form: 'signup'
        });

      expect(response.status).toBe(201);
      expect(response.body.msg).toBe('Successfully registered!');
    } catch (error) {
      console.error(error);
      throw error; 
    }
  });

  it('Helytelen regisztrációnak kell végbemennie, mivel a felhasználónév már foglalt', async () => {
    try {
      const response = await request(server)
        .post('/api/signup')
        .send({
          username: 'tesztuser',
          email: 'tesztujra@example.com',
          password: 'd8~R^z]vw2:aEgh143dy',
          confirmPassword: 'd8~R^z]vw2:aEgh143dy',
          form: 'signup'
        });

      expect(response.status).toBe(404);
      expect(response.body.msg).toBe('Az adott felhasználónév már foglalt!');
    } catch (error) {
      console.error(error);
      throw error; 
    }
  });
});
