'use strict';

var express = require('express');
var app     = express();
const port  = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
