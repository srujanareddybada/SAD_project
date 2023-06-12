const mongoose = require('mongoose');
const UserBetsModel = require('./userBetsModel');

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

  it('should create a new user bet', async () => {
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

    const mockCreate = UserBetsModel.create;
    mockCreate.mockResolvedValue(userBetData);

    const userBet = await UserBetsModel.create(userBetData);

    expect(mockCreate).toHaveBeenCalledWith(userBetData);
    expect(userBet).toEqual(userBetData);
  });

  it('should require all required fields', async () => {
    const mockError = new mongoose.Error.ValidationError();
    mockError.errors = {
      userId: new mongoose.Error.ValidatorError({ message: 'Path `userId` is required.' }),
      betAmount: new mongoose.Error.ValidatorError({ message: 'Path `betAmount` is required.' }),
    };

    const mockCreate = UserBetsModel.create;
    mockCreate.mockRejectedValue(mockError);

    try {
      await UserBetsModel.create({});
    } catch (error) {
      expect(mockCreate).toHaveBeenCalledWith({});
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors).toHaveProperty('userId');
      expect(error.errors).toHaveProperty('betAmount');
      expect(error.errors).not.toHaveProperty('successBetReturnAmount');
    }
  });
});
