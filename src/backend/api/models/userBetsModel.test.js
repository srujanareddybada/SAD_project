const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const UserBetsModel = require('./userBetsModel');
const { connectDB } = require("../../config/db_connections/mongooseDBConfig");

describe('UserBets Model Tests', () => {
    beforeAll(async () => {
        await connectDB();
      });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await UserBetsModel.deleteMany({});
  });

  it('should create a new user bet', async () => {
    const userBetData = {
      userId: 123,
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

    const userBet = await UserBetsModel.create(userBetData);

    expect(userBet.userId).toBe(userBetData.userId);
    expect(userBet.betAmount).toBe(userBetData.betAmount);
    expect(userBet.successBetReturnAmount).toBe(userBetData.successBetReturnAmount);
    expect(userBet.betEvent).toHaveLength(userBetData.betEvent.length);
    expect(userBet.betEvent[0].odds).toBe(userBetData.betEvent[0].odds);
    expect(userBet.betEvent[0].eventName).toBe(userBetData.betEvent[0].eventName);
    expect(userBet.betEvent[1].odds).toBe(userBetData.betEvent[1].odds);
    expect(userBet.betEvent[1].eventName).toBe(userBetData.betEvent[1].eventName);
  });

  it('should require all required fields', async () => {
    try {
      await UserBetsModel.create({});
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(error.errors).toHaveProperty('userId');
      expect(error.errors).toHaveProperty('betAmount');
      expect(error.errors).toHaveProperty('successBetReturnAmount');
    }
  });
});
