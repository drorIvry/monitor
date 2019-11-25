"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Monitors = _interopRequireDefault(require("../dal/Monitors"));

var _Account = _interopRequireDefault(require("../dal/Account"));

var _v = _interopRequireDefault(require("uuid/v4"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = _express["default"].Router();

router.get('/', function _callee(req, res, next) {
  var b64auth, _toString$split, _toString$split2, username, accoumt_doc, monitors;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          b64auth = (req.header('authorization') || '').split(' ')[1] || '';
          _toString$split = new Buffer.from(b64auth, 'base64').toString().split(':'), _toString$split2 = _slicedToArray(_toString$split, 1), username = _toString$split2[0];

          if (username) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.send(400, 'Bad Request'));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_Account["default"].findOne({
            UserName: username
          }));

        case 6:
          accoumt_doc = _context.sent;

          if (accoumt_doc) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.send(400, 'Bad Request!!!!'));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(_Monitors["default"].find({
            _id: {
              $in: accoumt_doc.Monitors
            }
          }));

        case 11:
          monitors = _context.sent;
          return _context.abrupt("return", res.send(monitors));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
});
router["delete"]('/', function _callee2(req, res, next) {
  var apiKey;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          apiKey = req.query['apiKey'];
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Monitors["default"].remove({
            APIKey: apiKey
          }));

        case 3:
          return _context2.abrupt("return", res.send({
            'success': true
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/', function _callee3(req, res, next) {
  var b64auth, _toString$split3, _toString$split4, username, monitorName, pcName, generatedKey, accoumt_doc, monitor, response, monitorDoc;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          b64auth = (req.header('authorization') || '').split(' ')[1] || '';
          _toString$split3 = new Buffer.from(b64auth, 'base64').toString().split(':'), _toString$split4 = _slicedToArray(_toString$split3, 1), username = _toString$split4[0];
          monitorName = req.body.monitorName;
          pcName = req.body.pcName;

          if (username) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.send(400, 'Bad Request'));

        case 6:
          generatedKey = (0, _v["default"])();
          _context3.next = 9;
          return regeneratorRuntime.awrap(_Account["default"].findOne({
            UserName: username
          }));

        case 9:
          accoumt_doc = _context3.sent;

          if (accoumt_doc) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", res.send(400, 'Bad Request!!!!'));

        case 12:
          monitor = new _Monitors["default"]({
            MonitorName: monitorName,
            APIKey: generatedKey,
            PCName: pcName,
            Active: true
          });
          _context3.next = 15;
          return regeneratorRuntime.awrap(monitor.save());

        case 15:
          response = _context3.sent;
          _context3.next = 18;
          return regeneratorRuntime.awrap(_Account["default"].updateOne({
            UserName: username
          }, {
            $set: {
              Monitors: [].concat(_toConsumableArray(accoumt_doc.Monitors), [_mongoose["default"].Types.ObjectId(response._id)]),
              APIKeys: [].concat(_toConsumableArray(accoumt_doc.APIKeys), [generatedKey]),
              Active: true
            }
          }, function (err) {
            if (err) res.send(500, {
              error: error
            });
          }));

        case 18:
          monitorDoc = _context3.sent;
          return _context3.abrupt("return", res.send(monitorDoc));

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var _default = router;
exports["default"] = _default;