"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDataField = exports.validator = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var validator = function validator(schema, reqObj) {
  return /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _len,
        arg,
        _key,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            for (_len = _args.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
              arg[_key] = _args[_key];
            }

            _context.next = 3;
            return joiHandler.apply(void 0, [schema].concat(arg, [reqObj]));

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
};

exports.validator = validator;

var joiHandler = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(schema, req, res, next) {
    var reqObj,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            reqObj = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : {};
            _context2.prev = 1;
            _context2.next = 4;
            return schema.validateAsync(_objectSpread({}, req.body));

          case 4:
            return _context2.abrupt("return", next());

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", res.status(400).send({
              message: _context2.t0.message,
              status: 'error',
              data: null
            }));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 7]]);
  }));

  return function joiHandler(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var validateDataField = function validateDataField(req, res, next) {
  try {
    var _req$body = req.body,
        field = _req$body.rule.field,
        data = _req$body.data;
    var array = field.split('.');

    if (array.length > 2) {
      throw new Error('Field nesting can not be more than two levels.');
    }

    var filteredArray = array.filter(function (obj) {
      return obj;
    });

    if (filteredArray.length < 1) {
      throw new Error('No field supplied.');
    }

    var doesDataHaveFirstField = data.hasOwnProperty(filteredArray[0]);

    if (!doesDataHaveFirstField) {
      throw new Error("Field ".concat(filteredArray[0], " is missing from data."));
    }

    if (filteredArray.length === 1) {
      req.data = data[filteredArray[0]];
      return next();
    }

    var doesDataHaveInnerField = data[filteredArray[0]].hasOwnProperty(filteredArray[1]);

    if (!doesDataHaveInnerField) {
      throw new Error("Field ".concat(filteredArray[1], " is missing from data."));
    }

    req.data = data[filteredArray[0]][filteredArray[1]];
    return next();
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      status: 'error',
      data: null
    });
  }
};

exports.validateDataField = validateDataField;