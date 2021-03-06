'use strict';

var express     = require('express');
var app         = express();
var jsonParser  = require('body-parser').json;
var logger      = require('morgan');
var routes      = require('./routes');
const port      = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(jsonParser());

var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/qa");

var db = mongoose.connection;

db.on("error", (err) => {
  console.log("connection error:", err);
});

db.once("open", () => {
  console.log("db connection successful");
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use('/questions', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
