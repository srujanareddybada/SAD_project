const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    dob: { type: Date, required: true },
    balance: { type: Number, required: true, default: 0 },
    admin: { type: Boolean, required: true, default: 0 },
    blocked: { type: Boolean, required: true, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
