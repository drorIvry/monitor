"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _mongoose["default"].model('alerts', _mongoose["default"].Schema({
  MonitorName: String,
  Alert: String,
  PCName: String,
  AlertDate: Date,
  AccountID: _mongoose["default"].Schema.Types.ObjectId,
  MonitorID: _mongoose["default"].Schema.Types.ObjectId
}));

exports["default"] = _default;