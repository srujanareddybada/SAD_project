const mongoose = require("mongoose");
const UserBets = require("../models/userBetsModel");
const createBetAsync = async (userId, betlist) => {
  if (!Array.isArray(betlist)) {
    throw new Error("Incorrect type: Expected a number");
  }

  await UserBets.insertMany(betlist)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
};

const allUserBetsAsync = async (userId) => {
  console.log(userId);
  try {
    var result = await UserBets.find({ userId: userId });
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
  // .then((result) => {
  //   return result;
  // })
  // .catch((error) => {
  //   console.error(error);
  //   throw new Error(error);
  // });
};
services = {
  allUserBetsAsync,
  createBetAsync,
};
module.exports = services;
