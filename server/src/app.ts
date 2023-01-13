//IMPORTS

var debug = require('debug')('profile-blog:server');
var http = require('http');

//READ .ENV
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");

const compression = require("compression"); //Compression
import Helmet, { crossOriginResourcePolicy } from "helmet";
const initilizePassport = require("./passport_config");
const MongoStore = require("connect-mongo");

//Route imports
import recipeRouter from "./routes/recipe"
import generatorRouter from "./routes/generator"
import userRouter from "./routes/user"
import indexRouter from './routes/index'


var app = express();

//No view engine

// Set up mongoose connection to mongoDB
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;
if (mongoDB) {
  mongoose.connect(mongoDB);
}


const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Middleware
app.use(cors("*"));
app.use(Helmet());
app.use(
  Helmet({
    contentSecurityPolicy: {
      directives: {
        ...Helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "s3.amazonaws.com"],
      },
    },
  })
);

app.use(crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(flash());
if (process.env.SESSION_SECRET) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: { _expires: 86400000 }, //1 day
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: mongoDB, collection: "sessions" }),
    })
  );
}
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(compression()); //Compress all routes


// Local app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static(path.join(__dirname,"..", "..", "client", "dist"))); //heroku
app.use('/images', express.static(path.join(__dirname, "..","public", "images")))


//ROUTES
app.use("/api/recipe", recipeRouter);
app.use("/api/generator", generatorRouter);
app.use("/api/user", userRouter);
app.use("/api", indexRouter);
// catchall
app.get("/*", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
 
   // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key')
  res.sendFile(path.join(__dirname,"..", "..", "client", "build", "index.html"));
});



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
  res.json({ error: err });
});


//Port stuff

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


export default app
