const mongoose = require("mongoose");
const { matchSchema } = require("../api/models/MatchSchema");
const UserBets = require("../api/models/userBetsModel");

const atlasURL = `mongodb+srv://${process.env.MONGOCLOUD_USERNAME}:${process.env.MONGOCLOUD_PASSWORD}@${process.env.MONGOCLOUD_CLUSTERNAME}/${process.env.MONGOCLOUD_SPORTS_DATA_DATABASE}?retryWrites=true&w=majority`;
//connect to db with mongoose

const UpcomingMatch = mongoose.model("upcomingmatches", matchSchema);

async function runSimulatorService() {
  console.log("Live simulator service is running...");

  setInterval(async () => {
    console.log("Live simulator service is still running...");
    updateMatch();
  }, 5000);
}

async function updateMatch() {
  if (mongoose.connection.readyState === 1) {
    console.log("Mongoose is connected");
  } else {
    console.log("Mongoose is not connected");
    await mongoose.connect(atlasURL);
  }
  await UpcomingMatch.find({ isLive: true })
    .then((matches) => {
      matches.forEach(async (match) => {
        // match.score.current = {
        //   home: 0,
        //   away: 0,
        // };
        if (!match.score.time) {
          match.score.time = 0;
        }
        match.utcDate = new Date();
        var updatedmatch = simulateFootballMatch(match);
        await UpcomingMatch.updateOne(
          { _id: match._id },
          { $set: { score: updatedmatch.score } }
        );
      });
      //console.log("Upcoming live matches:", matches);
    })
    .catch((error) => {
      console.error("Failed to retrieve live matches:", error);
    });
}

function simulateFootballMatch(match) {
  match.score.duration = "REGULAR";
  match.score.time = match.score.time + 5;
  console.log(match.score);
  const homeTeam = "Home";
  const awayTeam = "Away";

  if (match.score.time >= 90) {
    match.score.time = 0;
    match.score.current.home = 0;
    match.score.halfTime.home = 0;
    match.score.current.away = 0;
    match.score.halfTime.away = 0;
  }
  // Check if it's halftime
  if (match.score.time === 45) {
    match.score.halfTime.home = match.score.current.home;
    match.score.halfTime.away = match.score.current.away;
  }

  // Randomly determine if a goal is scored
  const isGoalScored = Math.random() < 0.3;

  if (isGoalScored) {
    // Randomly determine which team scored
    const scoringTeam = Math.random() < 0.5 ? homeTeam : awayTeam;

    // Increment the score of the corresponding team
    if (scoringTeam === homeTeam) {
      match.score.current.home++;
      console.log(`Goal! Home scores at ${match.score.time}'`);
    } else {
      match.score.current.away++;
      console.log(`Goal! Away scores at ${match.score.time}'`);
    }
  }
  return match;
}

runSimulatorService();
