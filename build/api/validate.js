"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateRule = void 0;

var validateRule = function validateRule(req, res) {
  var _req$body$rule = req.body.rule,
      field = _req$body$rule.field,
      condition = _req$body$rule.condition,
      condition_value = _req$body$rule.condition_value;
  var data = req.data;
  var result = false;

  try {
    switch (condition) {
      case 'eq':
        if (data === condition_value) {
          result = true;
        }

        break;

      case 'neq':
        if (data !== condition_value) {
          result = true;
        }

        break;

      case 'gt':
        if (Number(data) > Number(condition_value)) {
          result = true;
        }

        break;

      case 'gte':
        if (Number(data) >= Number(condition_value)) {
          result = true;
        }

        break;

      case 'contains':
        if (data.includes(condition_value)) {
          result = true;
        }

        break;

      default:
        break;
    }

    if (!result) {
      throw Error();
    }

    return res.status(200).send({
      message: "field ".concat(field, " successfully validated."),
      status: 'success',
      data: {
        validation: {
          error: false,
          field: "".concat(field),
          field_value: data,
          //   field_value: typeof data === "object" ? data : req.body.data,
          condition: condition,
          condition_value: condition_value
        }
      }
    });
  } catch (error) {
    return res.status(400).send({
      message: "field ".concat(field, " failed validation."),
      status: 'error',
      data: {
        validation: {
          error: true,
          field: "".concat(field),
          field_value: data,
          condition: condition,
          condition_value: condition_value
        }
      }
    });
  }
};

exports.validateRule = validateRule;