'use strict';

var express     = require('express');
var app         = express();
var jsonParser  = require('body-parser').json;
var routes      = require('./routes');
const port      = process.env.PORT || 3000;

app.use(jsonParser());

app.use('/questions', routes);

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
