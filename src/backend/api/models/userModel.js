const mongoose = require("mongoose");
const { Counter } = require("./CounterModel");

var userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    dob: { type: Date, required: true },
    balance: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

// Auto-incremented ID
userSchema.pre("save", function (next) {
  const doc = this;
  Counter.findByIdAndUpdate(
    { id: "yourUserSchemaId" }, // Use a unique ID for each schema where auto-increment is needed
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true },
    function (error, counter) {
      if (error) return next(error);
      doc.id = counter.sequence_value;
      next();
    }
  );
});

module.exports = mongoose.model("User", userSchema);
