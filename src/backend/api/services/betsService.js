const mongoose = require("mongoose");
const { Match } = require("../models/MatchSchema");

const Allbets = async (filters, page, limit) => {
  try {
    // Pagination options
    const pageNumber = parseInt(page) || 1;
    const perPage = parseInt(limit) || 30;
    const skip = (pageNumber - 1) * perPage;
    console.log(filters);
    var result = await Match.find(filters).skip(skip).limit(perPage);
    var count = await Match.countDocuments(filters);
    return (response = {
      count: count,
      page: pageNumber,
      limit: perPage,
      matches: result,
    });
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

services = {
  Allbets,
};
module.exports = services;
