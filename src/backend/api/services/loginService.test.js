const mongoose = require('mongoose');
const User = require('../models/userModel');
const services = require('./loginService');

// Mock the userModel module
jest.mock('../models/userModel');

describe('Login Service Tests', () => {
  // Test case: should return the user if login is successful
  it('should return the user if login is successful', async () => {
    // Define the user data for login
    const user = {
      email: 'test@example.com',
      password: 'password',
    };

    // Define a mock user object
    const mockUser = {
      _id: '123',
      email: 'test@example.com',
      password: 'password',
      // Add other user properties as needed
    };

    // Mock the User.find function to resolve with the mockUser
    User.find.mockResolvedValue([mockUser]);

    // Call the loginAsync function in the services module with the user data
    const result = await services.loginAsync(user);

    // Expect the User.find function to have been called with the user data
    expect(User.find).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });

    // Expect the result to be equal to the mockUser
    expect(result).toEqual(mockUser);
  });

  // Test case: should return undefined if login fails
  it('should return undefined if login fails', async () => {
    // Define the user data for login
    const user = {
      email: 'test@example.com',
      password: 'password',
    };

    // Mock the User.find function to resolve with an empty array (no matching user found)
    User.find.mockResolvedValue([]);

    // Call the loginAsync function in the services module with the user data
    const result = await services.loginAsync(user);

    // Expect the User.find function to have been called with the user data
    expect(User.find).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });

    // Expect the result to be undefined
    expect(result).toBeUndefined();
  });

  // Test case: should throw an error if there is an exception
  it('should throw an error if there is an exception', async () => {
    // Define the user data for login
    const user = {
      email: 'test@example.com',
      password: 'password',
    };

    // Create a mock error object
    const mockError = new Error('Database connection error');

    // Mock the User.find function to reject with the mockError
    User.find.mockRejectedValue(mockError);

    // Expect the loginAsync function to throw an error matching the mockError message
    await expect(services.loginAsync(user)).rejects.toThrow('Database connection error');

    // Expect the User.find function to have been called with the user data
    expect(User.find).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });
});
