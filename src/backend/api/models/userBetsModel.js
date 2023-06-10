const mongoose = require("mongoose");
const { matchSchema } = require("./MatchSchema");

var betEventSchema = new mongoose.Schema({
  odds: { type: Number, required: true },
  eventName: { type: String, required: false },
});

var userBetsSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    betAmount: { type: String, required: true },
    successBetReturnAmount: { type: String, required: false },
    outcome: { type: String, required: false },
    betEvent: { type: [betEventSchema], required: false },
    match: { type: [matchSchema], required: false },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("UserBets", userBetsSchema);
