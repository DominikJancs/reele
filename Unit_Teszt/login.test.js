const request = require('supertest');
const server = require('../routes/server/server'); // Az alkalmazás fájlja

describe('Bejelentkezés', () => {

  it('Helyes bejelentkezésnek kell végbemennie', async () => {
      try {
        const response = await request(server)
          .post('/api/login')
          .send({
            email: 'teszt@example.com',
            password: 'd8~R^z]vw2:aEgh143dy',
            form: 'login'
          });
  
        expect(response.status).toBe(201);
        expect(response.body.msg).toBe("Successfully logged!");
      } catch (error) {
        console.error(error);
        throw error; 
      }
    });

    it('Helytelen bejelentkezésnek kell végbemennie, mivel a jelszó helytelen', async () => {
      try {
        const response = await request(server)
          .post('/api/login')
          .send({
            email: 'teszt@example.com',
            password: 'd8~R^z]vw2:aEgh143dx',
            form: 'login'
          });
  
        expect(response.status).toBe(401);
        expect(response.body.msg).toBe("Password not matched!");
      } catch (error) {
        console.error(error);
        throw error; 
      }
    });
});
