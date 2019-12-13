"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Account = _interopRequireDefault(require("../dal/Account"));

var _Monitors = _interopRequireDefault(require("../dal/Monitors"));

var _SystemState = _interopRequireDefault(require("../dal/SystemState"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = _express["default"].Router();

router.get('/', function _callee(req, res, next) {
  var b64auth, _toString$split, _toString$split2, username, accoun_doc, monitor_ids, reports, reportSummaries, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, report, monitor;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          b64auth = (req.header('authorization') || '').split(' ')[1] || '';
          _toString$split = new Buffer.from(b64auth, 'base64').toString().split(':'), _toString$split2 = _slicedToArray(_toString$split, 1), username = _toString$split2[0];
          _context.next = 4;
          return regeneratorRuntime.awrap(_Account["default"].findOne({
            UserName: username
          }));

        case 4:
          accoun_doc = _context.sent;
          monitor_ids = accoun_doc.Monitors;
          _context.next = 8;
          return regeneratorRuntime.awrap(_SystemState["default"].find({
            MonitorID: {
              $in: monitor_ids
            }
          }));

        case 8:
          reports = _context.sent;
          reportSummaries = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 13;
          _iterator = reports[Symbol.iterator]();

        case 15:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 24;
            break;
          }

          report = _step.value;
          _context.next = 19;
          return regeneratorRuntime.awrap(_Monitors["default"].findOne({
            _id: report.MonitorID
          }));

        case 19:
          monitor = _context.sent;
          reportSummaries.push({
            PCName: monitor.PCName,
            MonitorName: monitor.MonitorName,
            TimeStamp: report.TimeStamp,
            ReportID: report._id
          });

        case 21:
          _iteratorNormalCompletion = true;
          _context.next = 15;
          break;

        case 24:
          _context.next = 30;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](13);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 30:
          _context.prev = 30;
          _context.prev = 31;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 33:
          _context.prev = 33;

          if (!_didIteratorError) {
            _context.next = 36;
            break;
          }

          throw _iteratorError;

        case 36:
          return _context.finish(33);

        case 37:
          return _context.finish(30);

        case 38:
          return _context.abrupt("return", res.send(reportSummaries));

        case 39:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[13, 26, 30, 38], [31,, 33, 37]]);
});
var _default = router;
exports["default"] = _default;