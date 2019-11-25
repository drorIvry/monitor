"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _mongoose["default"].model('account', _mongoose["default"].Schema({
  UserName: String,
  Password: String,
  FirstName: String,
  LastName: String,
  Monitors: [_mongoose["default"].Schema.Types.ObjectId],
  Active: Boolean,
  APIKeys: [String]
}));

exports["default"] = _default;