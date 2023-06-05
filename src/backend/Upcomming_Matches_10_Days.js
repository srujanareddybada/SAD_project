const { connectToMongoDB, getDB } = require('./config/db_connections/MongoDBConfig');
const axios = require('axios');
require("dotenv").config();

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate moneyline odds
function generateMoneylineOdds() {
  const odds = getRandomNumber(-200, 200); // Generate a random number between -200 and 200
  return odds;
}

// Function to generate moneyline odds for draw
function generateDrawOdds(homeTeamWinningOdds, awayTeamWinningOdds) {
  const oddsDifference = Math.abs(homeTeamWinningOdds - awayTeamWinningOdds);
  let drawMatchOdds = generateMoneylineOdds();

  if (oddsDifference < 0.1) {
    // If the odds difference is less than 0.1, set draw odds to a high value
    drawMatchOdds = Math.abs(drawMatchOdds) + 1000;
  } else {
    // Otherwise, set draw odds to a low value
    drawMatchOdds = Math.abs(drawMatchOdds) + 100;
  }

  return drawMatchOdds;
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

    // Generate and assign moneyline odds for each match
    const matchesWithOdds = matches.map(match => {
      const homeTeamWinningOdds = generateMoneylineOdds();
      const awayTeamWinningOdds = generateMoneylineOdds();
      const drawMatchOdds = generateDrawOdds(homeTeamWinningOdds, awayTeamWinningOdds);
      match.HomeTeam_WinningOdds = homeTeamWinningOdds;
      match.AwayTeam_WinningOdds = awayTeamWinningOdds;
      match.Draw_MatchOdds = drawMatchOdds;
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

module.exports = {
  generateMoneylineOdds,
  generateDrawOdds,
  UpcomingMatches10Days,
};
