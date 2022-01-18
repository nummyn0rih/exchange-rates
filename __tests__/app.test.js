import request from 'supertest';
import app from '../index.js';

test('request', () => {
  const res = request(app).get('/');
  if (res.error) {
    throw res.error;
  }
  expect(res.status).toBe(200);
});
