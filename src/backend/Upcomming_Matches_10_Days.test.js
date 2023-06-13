// 1. The code imports necessary modules such as axios, MongoClient, and dotenv.

// 2. The code uses Jest's mocking functionality to mock the axios module.

// 3. The config() function from dotenv is called to load environment variables from the .env file.

// 4. The code defines test suites using describe for each of the functions: generateMoneylineOdds, generateDrawOdds, and 
// UpcomingMatches10Days.

// 5. The first test suite, generateMoneylineOdds, tests the function's ability to generate random numbers within a specified range. 
// It asserts that the generated odds are within the expected range.

// 6. The second test suite, generateDrawOdds, tests the function's ability to generate draw odds based on home team and away team odds. It asserts that the generated draw odds are greater than 100.

// 7. The third test suite, UpcomingMatches10Days, includes multiple tests related to the UpcomingMatches10Days function. It mocks 
// the axios.get function's resolved value with a sample response object containing matches. It also mocks the MongoClient.connect 
// function and sets up a mock MongoDB collection.

// 8. The first test in the UpcomingMatches10Days suite asserts that the function fetches upcoming matches, assigns odds, and stores 
// the data in MongoDB. It checks if the axios.get function is called with the expected parameters, if the insertMany function is 
// called on the collection, and if the inserted count is as expected.

// 9. The second test in the UpcomingMatches10Days suite tests error handling. It mocks a rejected promise for the axios.get 
// function, simulating an error. The test verifies that an error message is logged using console.error.

const axios = require("axios");
const { MongoClient } = require("mongodb");
const { config } = require("dotenv");
const {
  generateMoneylineOdds,
  generateDrawOdds,
  UpcomingMatches10Days,
} = require("../backend/Upcomming_Matches_10_Days");

jest.mock("axios");

// Load environment variables from .env file
config();

describe("generateMoneylineOdds", () => {
  it("should generate a random number within the specified range", () => {
    const [odds1, odds2] = generateMoneylineOdds();
    expect(odds1).toBeGreaterThanOrEqual(1);
    expect(odds1).toBeLessThanOrEqual(100);
    expect(odds2).toBeGreaterThanOrEqual(1);
    expect(odds2).toBeLessThanOrEqual(100);
  });
});

describe("generateDrawOdds", () => {
  it("should generate draw odds based on home team and away team odds", () => {
    const homeTeamWinningOdds = 150;
    const awayTeamWinningOdds = -100;
    const drawOdds = generateDrawOdds(homeTeamWinningOdds, awayTeamWinningOdds);
    expect(drawOdds).toBeGreaterThan(100);
  });
});

describe("UpcomingMatches10Days", () => {
  let mongodb;
  let collectionMock;
  let insertedCount;

  beforeAll(() => {
    axios.get.mockResolvedValue({
      data: {
        matches: [
          { id: 1, status: "TIMED" },
          { id: 2, status: "SOME_OTHER_STATUS" },
        ],
      },
    });

    collectionMock = {
      deleteMany: jest.fn().mockResolvedValue({}),
      insertMany: jest.fn().mockImplementation((data) => {
        insertedCount = data.length;
        return { insertedCount };
      }),
    };

    mongodb = {
      collection: jest.fn().mockReturnValue(collectionMock),
    };

    MongoClient.connect = jest.fn().mockResolvedValue({ db: () => mongodb });
  });

  it("should fetch upcoming matches, assign odds, and store in MongoDB", async () => {
    await UpcomingMatches10Days(mongodb);
  
    expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
      headers: { "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY },
    });
  
    expect(collectionMock.insertMany).toHaveBeenCalled();
  
    expect(insertedCount).toBe(1);
    expect(mongodb.collection).toHaveBeenCalledWith("upcomingmatches");
  });

  it("should handle errors and log an error message", async () => {
    const errorMessage = "Failed to fetch data";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    console.error = jest.fn();
    await UpcomingMatches10Days(mongodb);

    expect(console.error).toHaveBeenCalledWith(
      "Failed to fetch and store data:",
      expect.any(Error)
    );
  });
});
