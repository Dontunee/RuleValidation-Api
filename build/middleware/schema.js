"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestBodySchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var requestBodySchema = _joi["default"].object({
  rule: _joi["default"].object().keys({
    field: _joi["default"].string().required().messages({
      'string.base': "field should be a string",
      'any.required': "field is required."
    }),
    condition: _joi["default"].string().valid('eq', 'neq', 'gte', 'gt', 'contains').required().messages({
      'string.base': "condition should be a string",
      'any.required': "condition is required."
    }),
    condition_value: _joi["default"].any().required().messages({
      'any.required': "condition_value is required"
    })
  }).required().messages({
    'string.base': "rule should be an object",
    'any.required': "rule is required."
  }),
  data: _joi["default"].alternatives()["try"](_joi["default"].string().required(), _joi["default"].array().required(), _joi["default"].object().required() // .when('rule')
  )
});

exports.requestBodySchema = requestBodySchema;