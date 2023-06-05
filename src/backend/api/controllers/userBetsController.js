var express = require("express");
var services = require("../services/userBetsService");

var router = express.Router();

let db;

const getAllUserBetsAsync = async (req, res, next) => {
  db = req.app.get("db");
  const userId = req.params.id;
  try {
    var result = await services.allUserBetsAsync(db, userId);
    res.status(200).json(result);
  } catch {
    res.status(500).json({
      error: "Could not get the user bets",
    });
  }
};

const createBetAsync = async (req, res, next) => {
  db = req.app.get("db");
  const userId = req.params.id;
  try {
    var result = await services.createBetAsync(req.params.id, req.body);
    res.status(201).json(result);
  } catch {
    res.status(500).json({
      error: "Could not get the user bets",
    });
  }
};

const userBetsController = {
  getAllUserBetsAsync,
  createBetAsync,
};

module.exports = userBetsController;
