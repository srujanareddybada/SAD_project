var express = require("express");
var services = require("../services/betsService");

var router = express.Router();

const getAllBets = async (req, res, next) => {
  try {
    const filters = {};
    const { isLive } = req.query;

    if (isLive) {
      filters.isLive = isLive;
    }
    var result = await services.Allbets(filters);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error:
        "Could not fetch searched ongoing events data from matches collection",
    });
  }
};

const betController = {
  getAllBets,
};

module.exports = betController;
