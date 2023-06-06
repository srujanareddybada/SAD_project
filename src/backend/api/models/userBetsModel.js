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

// Auto-incremented ID
userBetsSchema.pre("save", function (next) {
  const doc = this;
  Counter.findByIdAndUpdate(
    { id: "yourUserBetsId" }, // Use a unique ID for each schema where auto-increment is needed
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true },
    function (error, counter) {
      if (error) return next(error);
      doc.id = counter.sequence_value;
      next();
    }
  );
});

module.exports = mongoose.model("UserBets", userBetsSchema);
