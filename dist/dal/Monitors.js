"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _mongoose["default"].model('monitor', _mongoose["default"].Schema({
  MonitorName: String,
  APIKey: String,
  PCName: String,
  Active: Boolean
}));

exports["default"] = _default;