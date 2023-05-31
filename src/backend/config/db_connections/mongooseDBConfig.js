
require('dotenv').config();

//Mongoose
const mongoose = require('mongoose');

var express = require("express");
const app = express();
PORT = 3000;
const port = process.env.PORT;

// MongoDB Atlas
const MONGO_URI = `mongodb+srv://Bittukun:Undertaker%4019952402@cluster0.xlhhapk.mongodb.net/?retryWrites=true&w=majority`;

//connect to db with mongoose
mongoose.connect(MONGO_URI)
.then(() => {
    //Listen for requests
    //app.listen(port, () => console.log(`Conntected to DB & Server running on port ${port}`));
    console.log('Connected to MongoDB Atlas');
    })
.catch((error) => {
    console.log(error)
});