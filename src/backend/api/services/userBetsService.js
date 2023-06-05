const mongoose = require("mongoose");
const UserBets = require("../models/userBetsModel");
const allUserBetsAsync = async (userId, betlist) => {
  const newBets = [];

  betlist.foreach((element, index, array) => {
    myList.push({
      userId: 1,
      betAmount: element.betAmount,
      successBetReturnAmount: element.successBetReturnAmount,
      betEvent: element.betEvent,
    });
  });

  UserBets.insertMany(newBets)
    .then((result) => {
      return "Bets added successfully!";
    })
    .catch((error) => {
      console.error("Bets could not be added! Something unexpected happened!");
    });
};

const createBetAsync = async (db) => {
  return "To be implemented!";
};
services = {
  allUserBetsAsync,
  createBetAsync,
};
module.exports = services;
