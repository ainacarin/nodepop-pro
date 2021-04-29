var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/** 
 * CONTROLLERS
 */
 const authController = require('./controllers/authController');

/**
 * ROUTERS
 */
var indexRouter = require("./routes/index");
var localeRouter = require("./routes/locale");

/**
 * VARIABLES
 */
var app = express();

/**
 * DATABASE CONNECTION
 */
require("./lib/connectMongoose");

/**
 * VIEWS CONFIGURATION
 */
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * API ROUTES
 */
app.use("/api/authenticate", authController.post);
app.use("/api/advertisements", require("./routes/api/advertisements"));
app.use("/api/tags", require("./routes/api/tags"));

/** Setup i18n LANG */
const i18n = require("./lib/i18nConfigure");
app.use(i18n.init);

/**
 * WEBSITE ROUTES
 */
app.use("/", indexRouter);
app.use("/locale", localeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  //validation error
  if (err.array) {
    const errorInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`;

    err.status = 422;
  }

  // status error to json or render
  res.status(err.status || 500);

  //API error return json error
  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.locals.title = "NODEPOP";
  // render the error page
  res.render("error");
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf("/api") === 0;
}

module.exports = app;
