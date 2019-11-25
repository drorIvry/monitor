"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Monitors = _interopRequireDefault(require("../dal/Monitors"));

var _SystemState = _interopRequireDefault(require("../dal/SystemState"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', function _callee(req, res, next) {
  var apiKeys, docs, monitorIds;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          apiKeys = req.body.apiKeys;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Monitors["default"].find({
            APIKey: {
              $in: apiKeys
            }
          }));

        case 3:
          docs = _context.sent;
          monitorIds = docs.map(function (doc) {
            return doc._id;
          });
          _context.next = 7;
          return regeneratorRuntime.awrap(_Monitors["default"].remove({
            APIKey: {
              $in: apiKeys
            }
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_SystemState["default"].remove({
            MonitorID: {
              $in: monitorIds
            }
          }));

        case 9:
          return _context.abrupt("return", res.send({
            'success': true
          }));

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
var _default = router;
exports["default"] = _default;