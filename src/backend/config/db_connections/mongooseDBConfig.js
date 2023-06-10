const mongoose = require("mongoose");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// MongoDB Atlas
const atlasURL = `mongodb+srv://${process.env.MONGOCLOUD_USERNAME}:${process.env.MONGOCLOUD_PASSWORD}@${process.env.MONGOCLOUD_CLUSTERNAME}/${process.env.MONGOCLOUD_SPORTS_DATA_DATABASE}?retryWrites=true&w=majority`;
var mongoConnection;
//connect to db with mongoose
const connectDB = async () => {
  try {
    mongoConnection = await mongoose.connect(atlasURL);
    console.log("Connected to MongoDB Atlas via mongoose");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { mongoConnection, connectDB };
