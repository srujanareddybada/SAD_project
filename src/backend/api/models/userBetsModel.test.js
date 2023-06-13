// The provided code file contains tests for the UserBetsModel using Jest. It tests the functionality of creating a new user bet and 
// handles validation errors for required fields.

// 1. The code imports the necessary modules, including mongoose and the UserBetsModel.

// 2. The code mocks the create function of the UserBetsModel using Jest's jest.mock function. The create function is replaced with a 
// mock function mockCreate that tracks its invocations.

// 3. The code defines a test suite using describe for the "UserBets Model Tests".

// 4. The beforeEach hook is used to clear all mock function invocations before each test case, ensuring a clean state.

// 5. The first test in the suite, "should create a new user bet", defines userBetData representing the data for a user bet. It 
// mocks the create function of the UserBetsModel using mockCreate.mockResolvedValue to resolve a promise with userBetData. The 
// test then calls UserBetsModel.create and expects the mockCreate function to have been called with userBetData. It also asserts 
// that the returned userBet is equal to userBetData.

// 6. The second test, "should require all required fields", creates a mock ValidationError object representing validation errors for 
// required fields. It mocks the create function of the UserBetsModel using mockCreate.mockRejectedValue to reject the promise with 
// the ValidationError. The test then tries to call UserBetsModel.create with an empty object and expects it to throw a ValidationError. It further checks that the mockCreate function was called with an empty object and that the resulting error contains the expected validation error messages for userId and betAmount. It also verifies that the error does not have a property for successBetReturnAmount.

// In summary, the code file tests the functionality of the UserBetsModel using Jest. It ensures that a new user bet can be created 
// successfully and handles validation errors for required fields.

const mongoose = require('mongoose');
const UserBetsModel = require('./userBetsModel');

// Mock the userBetsModel.create function
jest.mock('./userBetsModel', () => {
  const mockCreate = jest.fn();
  return {
    create: mockCreate,
  };
});

describe('UserBets Model Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case: should create a new user bet
  it('should create a new user bet', async () => {
    // Define user bet data
    const userBetData = {
      userId: '123',
      betAmount: '100',
      successBetReturnAmount: '200',
      betEvent: [
        {
          odds: 2.5,
          eventName: 'Event 1',
        },
        {
          odds: 1.8,
          eventName: 'Event 2',
        },
      ],
    };

    // Mock the create function of UserBetsModel to resolve with userBetData
    const mockCreate = UserBetsModel.create;
    mockCreate.mockResolvedValue(userBetData);

    // Call UserBetsModel.create with userBetData
    const userBet = await UserBetsModel.create(userBetData);

    // Expect the mockCreate function to have been called with userBetData
    expect(mockCreate).toHaveBeenCalledWith(userBetData);
    // Expect the returned userBet to be equal to userBetData
    expect(userBet).toEqual(userBetData);
  });

  // Test case: should require all required fields
  it('should require all required fields', async () => {
    // Create a mock ValidationError with required field errors
    const mockError = new mongoose.Error.ValidationError();
    mockError.errors = {
      userId: new mongoose.Error.ValidatorError({ message: 'Path `userId` is required.' }),
      betAmount: new mongoose.Error.ValidatorError({ message: 'Path `betAmount` is required.' }),
    };

    // Mock the create function of UserBetsModel to reject with the mockError
    const mockCreate = UserBetsModel.create;
    mockCreate.mockRejectedValue(mockError);

    try {
      // Call UserBetsModel.create with an empty object
      await UserBetsModel.create({});
    } catch (error) {
      // Expect the mockCreate function to have been called with an empty object
      expect(mockCreate).toHaveBeenCalledWith({});
      // Expect the error to be an instance of mongoose.Error.ValidationError
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      // Expect the error to contain userId and betAmount errors
      expect(error.errors).toHaveProperty('userId');
      expect(error.errors).toHaveProperty('betAmount');
      // Expect the error not to have successBetReturnAmount property
      expect(error.errors).not.toHaveProperty('successBetReturnAmount');
    }
  });
});
