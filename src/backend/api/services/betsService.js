const mongoose = require("mongoose");
const { Match } = require("../models/MatchSchema");

const Allbets = async (filters) => {
  try {
    console.log(filters);
    var result = await Match.find(filters);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

services = {
  Allbets,
};
module.exports = services;
