"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReport = getReport;

var _SystemState = _interopRequireDefault(require("../dal/SystemState"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getReport(req, res, next) {
  var reportID, report;
  return regeneratorRuntime.async(function getReport$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          reportID = req.params.reportID;
          _context.next = 3;
          return regeneratorRuntime.awrap(_SystemState["default"].findById(reportID));

        case 3:
          report = _context.sent;

          if (report) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(404).send('not found!'));

        case 6:
          return _context.abrupt("return", res.send(report));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}