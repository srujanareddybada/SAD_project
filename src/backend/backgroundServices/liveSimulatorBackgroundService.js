const mongoose = require("mongoose");
const { matchSchema } = require("../api/models/MatchSchema");
const UserBets = require("../api/models/userBetsModel");

const atlasURL = `mongodb+srv://${process.env.MONGOCLOUD_USERNAME}:${process.env.MONGOCLOUD_PASSWORD}@${process.env.MONGOCLOUD_CLUSTERNAME}/${process.env.MONGOCLOUD_SPORTS_DATA_DATABASE}?retryWrites=true&w=majority`;
//connect to db with mongoose

const UpcomingMatch = mongoose.model("upcomingmatches", matchSchema);

async function runSimulatorService() {
  console.log("Live simulator service is running...");
  await mongoose.connect(atlasURL);

  if (mongoose.connection.readyState === 1) {
    console.log("Mongoose is connected");
  } else {
    console.log("Mongoose is not connected");
  }

  await UpcomingMatch.find()
    .then((matches) => {
      // console.log("Upcoming live matches:", matches);
    })
    .catch((error) => {
      console.error("Failed to retrieve live matches:", error);
    });

  setInterval(async () => {
    console.log("Live simulator service is still running...");
  }, 5000);
}

function simulateFootballMatch(homeScore, awayScore, timePassed) {
  const homeTeam = "Home";
  const awayTeam = "Away";

  for (let minute = timePassed; minute <= 90; minute++) {
    // Randomly determine if a goal is scored
    const isGoalScored = Math.random() < 0.1;

    if (isGoalScored) {
      // Randomly determine which team scored
      const scoringTeam = Math.random() < 0.5 ? homeTeam : awayTeam;

      // Increment the score of the corresponding team
      if (scoringTeam === homeTeam) {
        homeScore++;
        console.log(`Goal! ${homeTeam} scores at ${minute}'`);
      } else {
        awayScore++;
        console.log(`Goal! ${awayTeam} scores at ${minute}'`);
      }
    }
  }

  console.log("Full Time");
  console.log(`${homeTeam} ${homeScore} - ${awayScore} ${awayTeam}`);
}

runSimulatorService();
