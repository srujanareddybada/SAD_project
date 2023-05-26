const {getDB} = require("../../config/db_connections/MongoDBConfig");
var express = require('express');
var router = express.Router();

let mongodb;
router.get('/', function(req, res, next) {
    mongodb = req.app.get('mongodb');
    mongodb.collection('Upcoming_Matches_10_Days')
        .find({}).toArray()
        .then((wholeUpcomingMatchList) =>{
            res.status(200).json(wholeUpcomingMatchList)
        })
        .catch(()=>{
            res.status(500).json({error:'Could not fetch searched city weather data from weather collection'})
        })
  });
  
  module.exports = router;