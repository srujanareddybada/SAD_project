const mongoose = require("mongoose");
const { Counter } = require("./CounterModel");

var betEventSchema = new mongoose.Schema({
  odds: { type: Number, required: false },
  eventName: { type: String, required: false },
});

var userBetsSchema = new mongoose.Schema(
  {
    id: { type: Number, required: false, unique: true },
    userId: { type: Number, required: true },
    betAmount: { type: String, required: true },
    successBetReturnAmount: { type: String, required: true },
    betEvent: { type: [betEventSchema] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserBets", userBetsSchema);
