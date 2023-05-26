// Synopsis:
// 1. The code establishes a connection to a MongoDB database using the connectToMongoDB function and retrieves the database object using the 
//    getDB function.
// 2. The UpcomingMatches10Days function is defined as an async function that takes the MongoDB database object (mongodb) as a parameter.
// 3. Inside the UpcomingMatches10Days function:
//     - The current date and the date for 10 days from now are calculated.
//     - The dates are formatted as required by the API.
//     - An HTTP GET request is made to the sports API to fetch upcoming matches within the specified date range.
//     - The fetched matches are filtered based on the status "TIMED".
//     - Random winning odds are generated and assigned to each match.
//     - Existing documents in the "Upcoming_Matches_10_Days" collection are deleted.
//     - The filtered matches with odds are inserted into the "Upcoming_Matches_10_Days" collection.
//     - The number of inserted documents is logged to the console.
//     - A callback function is provided to the connectToMongoDB function, which is executed once the MongoDB connection is established or an error 
// 	  occurs. If the connection is successful, the UpcomingMatches10Days function is called with the MongoDB database object as an argument. If 
// 	  there is an error, an unsuccessful connection message is logged to the console.

// Overview:
// The provided code connects to a MongoDB database, fetches upcoming matches from a sports API, assigns random winning odds to each match, and stores 
// the filtered matches with odds in the MongoDB collection. It makes use of the axios library to fetch data from the API and the dotenv library to 
// load environment variables from a .env file. The MongoDB connection is established using a separate module (./config/db_connections/MongoDBConfig) 
// that exports the connectToMongoDB and getDB functions.
// ************************************************************** Logic Start******************************************************************

const { connectToMongoDB, getDB } = require('./config/db_connections/MongoDBConfig');
const axios = require('axios');
require("dotenv").config();

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to fetch and store upcoming matches with status as "timed" within date range
async function UpcomingMatches10Days(mongodb) {
  try {
    // Get the current date
    const currentDate = new Date();

    // Calculate the date for 10 days from now
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 10);

    // Format the dates as required by the API
    const fromDate = currentDate.toISOString().split('T')[0];
    const toDate = futureDate.toISOString().split('T')[0];

    // Fetch upcoming matches from the API
    const apiKey = process.env.FOOTBALL_DATA_API_KEY;
    const url = `https://api.football-data.org/v4/matches?dateFrom=${fromDate}&dateTo=${toDate}`;
    const response = await axios.get(url, {
      headers: {
        'X-Auth-Token': apiKey,
      },
    });

    // Filter the fetched matches based on status as "timed"
    const matches = response.data.matches.filter(match => match.status === 'TIMED');

    // Generate and assign random winning odds for each match
    const matchesWithOdds = matches.map(match => {
      const homeTeamWinningOdds = getRandomNumber(1, 100);
      const awayTeamWinningOdds = 100 - homeTeamWinningOdds;
      match.HomeTeam_WinningOdds = homeTeamWinningOdds;
      match.AwayTeam_WinningOdds = awayTeamWinningOdds;
      return match;
    });

    // Delete existing documents in the collection
    await mongodb.collection('Upcoming_Matches_10_Days').deleteMany({});

    // Store the filtered matches with odds in MongoDB
    const result = await mongodb.collection('Upcoming_Matches_10_Days').insertMany(matchesWithOdds);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (error) {
    console.error('Failed to fetch and store data:', error);
  }
}

let db;
connectToMongoDB((err) => {
  if (!err) {
    console.log("MongoDB connection to Sports data DB is successful");
    db = getDB();
    UpcomingMatches10Days(db);
  } else {
    console.log("MongoDB connection to Sports data DB is unsuccessful");
  }
});
