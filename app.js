'use strict';

var express     = require('express');
var app         = express();
var jsonParser  = require('body-parser').json;
const port      = process.env.PORT || 3000;

app.use(jsonParser());

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
