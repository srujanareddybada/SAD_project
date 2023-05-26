var express = require('express');
var services = require("../services/betsService")

var router = express.Router();

let mongodb;

const getAllBets = async (req, res, next) => {
    mongodb = req.app.get('mongodb');
    try{

    var result = await services.Allbets(mongodb);
    console.log(result);
    res.status(200).json(result);
    }
    catch {
        res.status(500).json({error:'Could not fetch searched ongoing events data from weather collection'})
    }
  }

  const betController = {
    getAllBets
  }

  module.exports = betController