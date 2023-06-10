const mongoose = require("mongoose");
const User = require("../models/userModel");

const loginAsync = async (user) => {
  console.log(user);
  try {
    var user = await User.find({
      password: user.password,
      email: user.email,
    });
    return user[0];
  } catch (err) {
    console.error(err);
    return new Throw(err);
  }
};

services = {
  loginAsync,
};

module.exports = services;
