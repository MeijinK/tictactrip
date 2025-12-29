import request from 'supertest';
import app from '../app';

describe('API Endpoints', () => {
  describe('POST /api/token', () => {
    test('génère un token pour un email valide', async () => {
      const response = await request(app)
        .post('/api/token')
        .send({ email: 'test@example.com' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token.length).toBeGreaterThan(0);
    });

    test('retourne 400 si email manquant', async () => {
      await request(app)
        .post('/api/token')
        .send({})
        .expect(400);
    });
  });

  describe('POST /api/justify', () => {
    let token: string;

    beforeAll(async () => {
      const response = await request(app)
        .post('/api/token')
        .send({ email: 'justify@test.com' });
      token = response.body.token;
    });

    test('justifie un texte avec un token valide', async () => {
      const text = 'Bonjour tout le monde';
      const response = await request(app)
        .post('/api/justify')
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'text/plain')
        .send(text)
        .expect(200);

      expect(typeof response.text).toBe('string');
      expect(response.text.length).toBeGreaterThan(0);
    });

    test('retourne 401 sans token', async () => {
      await request(app)
        .post('/api/justify')
        .set('Content-Type', 'text/plain')
        .send('Test text')
        .expect(401);
    });

    test('retourne 401 avec un token invalide', async () => {
      await request(app)
        .post('/api/justify')
        .set('Authorization', 'Bearer invalid-token')
        .set('Content-Type', 'text/plain')
        .send('Test text')
        .expect(401);
    });

    test('retourne 402 après dépassement de la limite', async () => {
      const tokenResponse = await request(app)
        .post('/api/token')
        .send({ email: 'limit@test.com' });
      const limitToken = tokenResponse.body.token;

      const largeText = 'mot '.repeat(80001);

      await request(app)
        .post('/api/justify')
        .set('Authorization', `Bearer ${limitToken}`)
        .set('Content-Type', 'text/plain')
        .send(largeText)
        .expect(402);
    });
  });
});
