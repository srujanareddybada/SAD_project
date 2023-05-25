const { MongoClient } = require("mongodb");
require('dotenv').config();

// MongoDB Atlas
const atlasURL = `mongodb+srv://${process.env.MONGOCLOUD_USERNAME}:${process.env.MONGOCLOUD_PASSWORD}@${process.env.MONGOCLOUD_CLUSTERNAME}/${process.env.MONGOCLOUD_SPORTS_DATA_DATABASE}?retryWrites=true&w=majority`;

let dbConnection;
module.exports = {
    //To connect to a database
    connectToMongoDB: (cb) => {
        MongoClient.connect(atlasURL)
            .then((client) => {
                dbConnection = client.db()
                //console.log("Connected to Mongo Current climate record DB!")
                return cb()
            })
            .catch((err) => {
                console.log(err)
                return cb(err)
            })
    },
    //Return the DB connection for further communication with the DB
    getDB: () => dbConnection
}