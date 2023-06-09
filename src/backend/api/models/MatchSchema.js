const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  area: {
    id: { type: Number },
    name: { type: String },
    code: { type: String },
    flag: { type: String },
  },
  competition: {
    id: { type: Number },
    name: { type: String },
    code: { type: String },
    type: { type: String },
    emblem: { type: String },
  },
  season: {
    id: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    currentMatchday: { type: Number },
    winner: { type: String },
  },
  id: { type: Number },
  utcDate: { type: Date },
  status: { type: String },
  matchday: { type: Number },
  stage: { type: String },
  group: { type: String },
  lastUpdated: { type: Date },
  homeTeam: {
    id: { type: Number },
    name: { type: String },
    shortName: { type: String },
    tla: { type: String },
    crest: { type: String },
  },
  awayTeam: {
    id: { type: Number },
    name: { type: String },
    shortName: { type: String },
    tla: { type: String },
    crest: { type: String },
  },
  score: {
    winner: { type: String },
    duration: { type: String },
    fullTime: {
      home: { type: Number },
      away: { type: Number },
    },
    halfTime: {
      home: { type: Number },
      away: { type: Number },
    },
  },
  odds: {
    msg: { type: String },
  },
  referees: [
    {
      id: { type: Number },
      name: { type: String },
      type: { type: String },
      nationality: { type: String },
    },
  ],
  HomeTeam_WinningOdds: { type: String },
  AwayTeam_WinningOdds: { type: String },
  Draw_MatchOdds: { type: String },
  isLive: { type: Boolean },
});

const Match = mongoose.model("upcomingmatches", matchSchema);

module.exports = { Match, matchSchema };
