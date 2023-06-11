const request = require('supertest');
const express = require('express');
const betsRouter = require('./bets');
const controller = require('../controllers/betsController');

jest.mock('../controllers/betsController', () => ({
  getAllBets: jest.fn((req, res) => {
    res.json({ message: 'Mocked response' });
  }),
}));

const app = express();
app.use('/api/bets', betsRouter);

describe('GET /api/bets', () => {
  it('should call the getAllBets controller function', async () => {
    await request(app).get('/api/bets');

    expect(controller.getAllBets).toHaveBeenCalled();
  });

  it('should return the mocked response', async () => {
    const response = await request(app).get('/api/bets');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Mocked response' });
  });

  // Add more test cases as needed...
});
