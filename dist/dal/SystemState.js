"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _mongoose["default"].model('system_state', _mongoose["default"].Schema({
  AccountID: _mongoose["default"].Schema.Types.ObjectId,
  MonitorID: _mongoose["default"].Schema.Types.ObjectId,
  CPU: [_mongoose["default"].Schema.Types.Mixed],
  OS: _mongoose["default"].Schema.Types.Mixed,
  Memory: _mongoose["default"].Schema.Types.Mixed,
  Disk: _mongoose["default"].Schema.Types.Mixed,
  Network: [_mongoose["default"].Schema.Types.Mixed],
  Temperatures: _mongoose["default"].Schema.Types.Mixed,
  Fans: _mongoose["default"].Schema.Types.Mixed,
  Battery: _mongoose["default"].Schema.Types.Mixed,
  Users: [_mongoose["default"].Schema.Types.Mixed],
  TimeStamp: String
}));

exports["default"] = _default;