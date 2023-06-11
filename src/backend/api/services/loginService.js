const mongoose = require("mongoose");
const User = require("../models/userModel");

const loginAsync = async (user) => {
  console.log(user);
  try {
    var resultUser = await User.find({
      email: user.email,
      password: user.password,
    });
    console.log(resultUser[0]);
    if (resultUser[0]) {
      // console.log(resultUser[0].password);

      return resultUser[0];
      // bcrypt.compare(
      //   user.password,
      //   resultUser[0].password,
      //   function (err, isMatch) {
      //     console.log(isMatch);
      //     if (err) {
      //       return new Error(err);
      //     }

      //     if (isMatch) {
      //       // The hashes match
      //       return resultUser[0];
      //     } else {
      //       // The hashes do not match
      //       return new Error(err);
      //     }
      //   }
      // );
    }
    return undefined;
  } catch (err) {
    console.error(err);
    return new Throw(err);
  }
};

services = {
  loginAsync,
};

module.exports = services;
