var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const specs = require("./config/api_documentation/swagger");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");

const {
  connectToMongoDB,
  getDB,
  connectToMongoose,
} = require("./config/db_connections/MongoDBConfig");

const { connectDB } = require("./config/db_connections/mongooseDBConfig");

var indexRouter = require("./api/routes/index");
var usersRouter = require("./api/routes/user");
var betsRouter = require("./api/routes/bets");

var app = express();

// MongoDB Database connection middleware
connectDB();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Swagger documentation middleware
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routers
app.use("/", indexRouter);
app.use("/api/bets", betsRouter);
app.use("/api/user", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Mongo connection -- To connect sports data database
var mongodb;
connectToMongoDB((err) => {
  if (!err) {
    console.log("MongoDB connection to Sports data DB is success");
    mongodb = getDB();
    app.set("mongodb", mongodb);
  } else {
    console.log("MongoDB connection to Sports data DB is unsucessfull");
  }
});

module.exports = app;
