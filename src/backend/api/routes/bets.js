const {getDB} = require("../../config/db_connections/MongoDBConfig");
var controller = require("../controllers/betsController")
var express = require('express');
var router = express.Router();

router.get('/', controller.getAllBets);
  
  module.exports = router;