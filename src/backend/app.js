var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const specs = require("./config/api_documentation/swagger");
const swaggerUi = require("swagger-ui-express");
const setupSocket = require("./config/pub-sub/socketIO");
const cors = require("cors");
const {
  connectToMongoDB,
  getDB,
} = require("./config/db_connections/MongoDBConfig");

const { connectDB } = require("./config/db_connections/mongooseDBConfig");

var authRouter = require("./api/routes/auth");
var indexRouter = require("./api/routes/index");
var usersRouter = require("./api/routes/users");
var userRouter = require("./api/routes/user");
var betsRouter = require("./api/routes/bets");
var liveRouter = require("./api/routes/liveMatchSimulation");
var loginRouter = require("./api/routes/login");

var app = express();

//use CORS to enable cross refernce access
app.use(cors());
// MongoDB Database connection middleware
connectDB();

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

// Setup Socket.io
setupSocket(io);

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
app.use("/api/auth", authRouter);
app.use("/api/bets", betsRouter);
app.use("/api/user", userRouter);
app.use("/api/users", usersRouter);
app.use("/api/live", liveRouter);
app.use("/api/login", loginRouter);

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

//Mongo connection -- To connect sports data database
var mongodb;
connectToMongoDB((err) => {
  if (!err) {
    console.log("MongoDB connection to Sports data DB is success");
    mongodb = getDB();
    app.set("mongodb", mongodb);
  } else {
    console.log("MongoDB connection to Sports data DB is unsucessful");
  }
});

module.exports = app;
