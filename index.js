const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Claude Code GitHub Actions Demo!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.post('/echo', (req, res) => {
  res.json({
    message: 'Echo endpoint',
    received: req.body,
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/calculate/:operation/:a/:b', (req, res) => {
  const { operation, a, b } = req.params;
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({
      error: 'Invalid numbers provided',
      received: { a, b },
    });
  }

  let result;
  switch (operation) {
  case 'add':
    result = add(numA, numB);
    break;
  case 'multiply':
    result = multiply(numA, numB);
    break;
  case 'subtract':
    result = subtract(numA, numB);
    break;
  case 'divide':
    try {
      result = divide(numA, numB);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
        operands: [numA, numB],
      });
    }
    break;
  default:
    return res.status(400).json({
      error: 'Invalid operation',
      supportedOperations: ['add', 'multiply', 'subtract', 'divide'],
    });
  }

  res.json({
    operation,
    operands: [numA, numB],
    result,
    timestamp: new Date().toISOString(),
  });
});

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = { app, add, multiply, subtract, divide };
