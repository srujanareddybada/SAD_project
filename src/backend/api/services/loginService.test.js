const mongoose = require('mongoose');
const User = require('../models/userModel');
const services = require('./loginService');

jest.mock('../models/userModel');

describe('Login Service Tests', () => {
  it('should return the user if login is successful', async () => {
    const user = {
      email: 'test@example.com',
      password: 'password',
    };

    const mockUser = {
      _id: '123',
      email: 'test@example.com',
      password: 'password',
      // Add other user properties as needed
    };

    User.find.mockResolvedValue([mockUser]);

    const result = await services.loginAsync(user);

    expect(User.find).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(result).toEqual(mockUser);
  });

  it('should return undefined if login fails', async () => {
    const user = {
      email: 'test@example.com',
      password: 'password',
    };

    User.find.mockResolvedValue([]);

    const result = await services.loginAsync(user);

    expect(User.find).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(result).toBeUndefined();
  });

  it('should throw an error if there is an exception', async () => {
    const user = {
      email: 'test@example.com',
      password: 'password',
    };

    const mockError = new Error('Database connection error');
    User.find.mockRejectedValue(mockError);

    await expect(services.loginAsync(user)).rejects.toThrow('Database connection error');

    expect(User.find).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });
});
