const request = require('supertest');
const { startDatabase, stopDatabase } = require('../../test/test-database');
const app = require('../../app');

beforeAll(async () => {
  await startDatabase();
});

afterAll(async () => {
  await stopDatabase();
});

describe('GET /singles', () => {
  it('gets all singles from database', async (done) => {
    await request(app).get('/api/singles').expect(200);
  });
});
