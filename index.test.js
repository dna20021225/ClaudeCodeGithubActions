const request = require('supertest');
const { app, add, multiply } = require('./index');

describe('Mathematical Functions', () => {
  test('add function should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  test('multiply function should multiply two numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(0, 5)).toBe(0);
  });
});

describe('API Endpoints', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello from Claude Code GitHub Actions Demo!');
    expect(response.body.timestamp).toBeDefined();
  });

  test('GET /health should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.uptime).toBeDefined();
  });

  test('POST /echo should echo back the request body', async () => {
    const testData = { test: 'data', number: 42 };
    const response = await request(app)
      .post('/echo')
      .send(testData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Echo endpoint');
    expect(response.body.received).toEqual(testData);
    expect(response.body.timestamp).toBeDefined();
  });
});