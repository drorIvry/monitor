"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Alerts = _interopRequireDefault(require("../dal/Alerts"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', function _callee(req, res, next) {
  var alertIds, docs;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          alertIds = req.body.alertIds;
          _context.next = 3;
          return regeneratorRuntime.awrap(_Alerts["default"].find({
            alertIds: {
              $in: alertIds
            }
          }));

        case 3:
          docs = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_Alerts["default"].remove({
            _id: {
              $in: alertIds
            }
          }));

        case 6:
          return _context.abrupt("return", res.send({
            'success': true
          }));

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
var _default = router;
exports["default"] = _default;