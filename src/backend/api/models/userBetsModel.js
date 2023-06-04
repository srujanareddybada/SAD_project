const mongoose = require("mongoose");

var betEventSchema = new mongoose.Schema({
  odds: { type: Number, required: true },
  eventName: { type: String, required: true },
});

var userBetsSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    betAmount: { type: String, required: true },
    successBetReturnAmount: { type: String, required: true },
    betEvent: { type: [betEventSchema] },
  },
  { timestamps: true }
);
