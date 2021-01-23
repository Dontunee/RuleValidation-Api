"use strict";

var express = require('express');

var _require = require('./api/home'),
    home = _require.home;

var _require2 = require('./api/validate'),
    validateRule = _require2.validateRule;

var _require3 = require('./middleware/utils'),
    validator = _require3.validator,
    validateDataField = _require3.validateDataField;

var _require4 = require('./middleware/schema'),
    requestBodySchema = _require4.requestBodySchema;

require('dotenv').config();

var app = express();
app.use(express.json());
app.get('/', home);
app.post('/validate-rule', validator(requestBodySchema), validateDataField, validateRule); //configure PORT

var port = process.env.PORT || 3000;
app.listen(port, function () {
  return console.log("listening on port ".concat(port, "........"));
});