const request = require('supertest');
const { app, add, multiply, subtract, divide } = require('./index');

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

  test('subtract function should subtract two numbers correctly', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(-1, 1)).toBe(-2);
    expect(subtract(0, 0)).toBe(0);
  });

  test('divide function should divide two numbers correctly', () => {
    expect(divide(6, 3)).toBe(2);
    expect(divide(-6, 3)).toBe(-2);
    expect(divide(0, 5)).toBe(0);
  });

  test('divide function should throw error for division by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero');
  });
});

describe('API Endpoints', () => {
  test('GET / should return welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Hello from Claude Code GitHub Actions Demo!'
    );
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
    const response = await request(app).post('/echo').send(testData);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Echo endpoint');
    expect(response.body.received).toEqual(testData);
    expect(response.body.timestamp).toBeDefined();
  });
});

describe('Calculator API', () => {
  test('GET /api/calculate/add/5/3 should return addition result', async () => {
    const response = await request(app).get('/api/calculate/add/5/3');
    expect(response.status).toBe(200);
    expect(response.body.operation).toBe('add');
    expect(response.body.operands).toEqual([5, 3]);
    expect(response.body.result).toBe(8);
    expect(response.body.timestamp).toBeDefined();
  });

  test('GET /api/calculate/multiply/4/6 should return multiplication result', async () => {
    const response = await request(app).get('/api/calculate/multiply/4/6');
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(24);
  });

  test('GET /api/calculate/subtract/10/3 should return subtraction result', async () => {
    const response = await request(app).get('/api/calculate/subtract/10/3');
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(7);
  });

  test('GET /api/calculate/divide/12/4 should return division result', async () => {
    const response = await request(app).get('/api/calculate/divide/12/4');
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(3);
  });

  test('GET /api/calculate/divide/5/0 should return error for division by zero', async () => {
    const response = await request(app).get('/api/calculate/divide/5/0');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Division by zero');
  });

  test('GET /api/calculate/invalid/5/3 should return error for invalid operation', async () => {
    const response = await request(app).get('/api/calculate/invalid/5/3');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid operation');
    expect(response.body.supportedOperations).toEqual([
      'add',
      'multiply',
      'subtract',
      'divide',
    ]);
  });

  test('GET /api/calculate/add/abc/3 should return error for invalid numbers', async () => {
    const response = await request(app).get('/api/calculate/add/abc/3');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid numbers provided');
  });
});
