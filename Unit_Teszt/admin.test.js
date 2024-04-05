const request = require('supertest');
const server = require('../routes/server/server');

describe('Admin bejelentkezés', () => {

  it('Helyes adminként való bejelentkezésnek kell végbemennie', async () => {
      try {
        const response = await request(server)
          .post('/api/login')
          .send({
            email: 'admin1@reele.com',
            password: 'c!zmPey4XB-nTBS',
            form: 'login'
          });
  
        expect(response.status).toBe(201);
        expect(response.body.msg).toBe("Successfully logged as admin1!");
      } catch (error) {
        console.error(error);
        throw error; 
      }
    });
});
