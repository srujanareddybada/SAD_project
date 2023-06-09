const mongoose = require("mongoose");
const { Counter } = require("./CounterModel");

var userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    dob: { type: Date, required: true },
    balance: { type: Number, required: false, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
