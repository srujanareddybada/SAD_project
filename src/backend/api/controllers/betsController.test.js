const betController = require('./betsController');
const services = require('../services/betsService');

describe('getAllBets', () => {
  it('should return all bets and respond with status 200', async () => {
    // Mock the required dependencies
    const mongodb = 'mocked-mongodb';
    const mockedResult = ['bet1', 'bet2'];
    services.Allbets = jest.fn().mockResolvedValue(mockedResult);

    // Mock the Express request and response objects
    const req = {
      app: {
        get: jest.fn().mockReturnValue(mongodb),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the getAllBets function
    await betController.getAllBets(req, res, next);

    // Check if the services.Allbets function was called with the correct argument
    expect(services.Allbets).toHaveBeenCalledWith(mongodb);

    // Check if the response status and JSON methods were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedResult);
  });

  it('should handle error and respond with status 500', async () => {
    // Mock the required dependencies
    const mongodb = 'mocked-mongodb';
    const mockedError = new Error('Mocked error');
    services.Allbets = jest.fn().mockRejectedValue(mockedError);

    // Mock the Express request and response objects
    const req = {
      app: {
        get: jest.fn().mockReturnValue(mongodb),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the getAllBets function
    await betController.getAllBets(req, res, next);

    // Check if the services.Allbets function was called with the correct argument
    expect(services.Allbets).toHaveBeenCalledWith(mongodb);

    // Check if the response status and JSON methods were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Could not fetch searched ongoing events data from matches collection',
    });
  });
});
