'use strict';

var express     = require('express');
var app         = express();
var jsonParser  = require('body-parser').json;
var logger      = require('morgan');
var routes      = require('./routes');
const port      = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(jsonParser());

app.use('/questions', routes);

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
