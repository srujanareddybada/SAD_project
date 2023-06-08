const userBetsController = require('./userBetsController');
const services = require('../services/userBetsService');

describe('getAllUserBetsAsync', () => {
  it('should return all user bets and respond with status 200', async () => {
    // Mock the required dependencies
    const userId = 'mocked-user-id';
    const mockedResult = ['bet1', 'bet2'];
    services.allUserBetsAsync = jest.fn().mockResolvedValue(mockedResult);

    // Mock the Express request and response objects
    const req = {
      params: { id: userId },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the getAllUserBetsAsync function
    await userBetsController.getAllUserBetsAsync(req, res, next);

    // Check if the services.allUserBetsAsync function was called with the correct argument
    expect(services.allUserBetsAsync).toHaveBeenCalledWith(userId);

    // Check if the response status and JSON methods were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockedResult);
  });

  it('should handle error and respond with status 500', async () => {
    // Mock the required dependencies
    const userId = 'mocked-user-id';
    const mockedError = new Error('Mocked error');
    services.allUserBetsAsync = jest.fn().mockRejectedValue(mockedError);

    // Mock the Express request and response objects
    const req = {
      params: { id: userId },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the getAllUserBetsAsync function
    await userBetsController.getAllUserBetsAsync(req, res, next);

    // Check if the services.allUserBetsAsync function was called with the correct argument
    expect(services.allUserBetsAsync).toHaveBeenCalledWith(userId);

    // Check if the response status and JSON methods were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Could not get the user bets' });
  });
});

describe('createBetAsync', () => {
  it('should create a new user bet(s) and respond with status 201', async () => {
    // Mock the required dependencies
    const userId = 'mocked-user-id';
    const betList = ['bet1', 'bet2'];
    services.createBetAsync = jest.fn().mockResolvedValue(betList);

    // Mock the Express request and response objects
    const req = {
      params: { id: userId },
      body: betList,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the createBetAsync function
    await userBetsController.createBetAsync(req, res, next);

    // Check if the services.createBetAsync function was called with the correct arguments
    expect(services.createBetAsync).toHaveBeenCalledWith(userId, betList);

    // Check if the response status and JSON methods were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(betList);
  });

  it('should handle error and respond with status 500', async () => {
    // Mock the required dependencies
    const userId = 'mocked-user-id';
    const betList = ['bet1', 'bet2'];
    const mockedError = new Error('Mocked error');
    services.createBetAsync = jest.fn().mockRejectedValue(mockedError);

    // Mock the Express request and response objects
    const req = {
      params: { id: userId },
      body: betList,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the createBetAsync function
    await userBetsController.createBetAsync(req, res, next);

    // Check if the services.createBetAsync function was called with the correct arguments
    expect(services.createBetAsync).toHaveBeenCalledWith(userId, betList);

    // Check if the response status and JSON methods were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Could not create a new user bet(s)' });
  });

  it('should respond with status 400 if provided list of bets is not an array', async () => {
    // Mock the Express request and response objects
    const req = {
      params: { id: 'mocked-user-id' },
      body: 'not-an-array',
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the createBetAsync function
    await userBetsController.createBetAsync(req, res, next);

    // Check if the response status and JSON methods were called with the correct arguments
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'provided list of bets is not an array' });
  });
});
