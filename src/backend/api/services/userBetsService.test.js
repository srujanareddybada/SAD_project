const { createBetAsync, allUserBetsAsync } = require("./userBetsService");
const UserBets = require("../models/userBetsModel");

jest.mock("../models/userBetsModel", () => ({
  insertMany: jest.fn(),
  find: jest.fn(),
}));

describe("createBetAsync", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should insert multiple bets into the UserBets collection", async () => {
    const userId = "123";
    const betlist = [
      { betId: 1, amount: 10 },
      { betId: 2, amount: 20 },
      { betId: 3, amount: 30 },
    ];

    UserBets.insertMany.mockResolvedValueOnce(undefined);

    const result = await createBetAsync(userId, betlist);

    expect(UserBets.insertMany).toHaveBeenCalledTimes(1);
    expect(UserBets.insertMany).toHaveBeenCalledWith(betlist);

    expect(result).toEqual(undefined);
  });

  test("should throw an error if betlist is not an array", async () => {
    const userId = "123";
    const betlist = "not_an_array";

    await expect(createBetAsync(userId, betlist)).rejects.toThrow(
      "Incorrect type: Expected a number"
    );

    expect(UserBets.insertMany).not.toHaveBeenCalled();
  });

});
