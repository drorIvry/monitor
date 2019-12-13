"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _SystemState = _interopRequireDefault(require("../dal/SystemState"));

var _Account = _interopRequireDefault(require("../dal/Account"));

var _Monitors = _interopRequireDefault(require("../dal/Monitors"));

var _Alerts = _interopRequireDefault(require("../dal/Alerts"));

var _GetAlerts = _interopRequireDefault(require("./GetAlerts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = _express["default"].Router();

router.get('/', function _callee(req, res, next) {
  var b64auth, _toString$split, _toString$split2, username, account_doc, docs;

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
          account_doc = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(_SystemState["default"].find({
            AccountID: _mongoose["default"].Types.ObjectId(account_doc._id)
          }));

        case 7:
          docs = _context.sent;

          if (docs) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(404).send('Account Not Found!'));

        case 12:
          return _context.abrupt("return", res.send(docs));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/', function _callee2(req, res, next) {
  var apiKey, account, accountID, previous, monitor, data, alerts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, alert;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          apiKey = req.header('monitor-api-key');
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Account["default"].findOne({
            APIKeys: apiKey
          }));

        case 3:
          account = _context2.sent;

          if (account) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.send(404, {
            error: 'account not found'
          }));

        case 6:
          accountID = account._id.toString();
          _context2.next = 9;
          return regeneratorRuntime.awrap(_SystemState["default"].findOne({
            AccountID: _mongoose["default"].Types.ObjectId(accountID)
          }));

        case 9:
          previous = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(_Monitors["default"].findOne({
            APIKey: apiKey
          }));

        case 12:
          monitor = _context2.sent;
          data = parseData(req.body, accountID, previous, monitor);
          _context2.next = 16;
          return regeneratorRuntime.awrap(_SystemState["default"].updateOne({
            AccountID: _mongoose["default"].Types.ObjectId(accountID),
            MonitorID: monitor._id
          }, _objectSpread({}, data), {
            upsert: true
          }, function (err) {
            if (err) res.send(500, {
              err: err
            });
          }));

        case 16:
          alerts = (0, _GetAlerts["default"])(req.body, monitor, account._id);
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context2.prev = 20;
          _iterator = alerts[Symbol.iterator]();

        case 22:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context2.next = 29;
            break;
          }

          alert = _step.value;
          _context2.next = 26;
          return regeneratorRuntime.awrap(_Alerts["default"].updateOne({
            MonitorID: alert.MonitorID,
            PCName: alert.PCName,
            Alert: alert.Alert,
            AccountID: alert.AccountID
          }, _objectSpread({}, alert), {
            upsert: true
          }, function (err) {
            if (err) res.send(500, {
              err: err
            });else return res.send({
              'success': true
            });
          }));

        case 26:
          _iteratorNormalCompletion = true;
          _context2.next = 22;
          break;

        case 29:
          _context2.next = 35;
          break;

        case 31:
          _context2.prev = 31;
          _context2.t0 = _context2["catch"](20);
          _didIteratorError = true;
          _iteratorError = _context2.t0;

        case 35:
          _context2.prev = 35;
          _context2.prev = 36;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 38:
          _context2.prev = 38;

          if (!_didIteratorError) {
            _context2.next = 41;
            break;
          }

          throw _iteratorError;

        case 41:
          return _context2.finish(38);

        case 42:
          return _context2.finish(35);

        case 43:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[20, 31, 35, 43], [36,, 38, 42]]);
});

function parseData(data, accountID, previous, monitor) {
  return {
    AccountID: _mongoose["default"].Types.ObjectId(accountID),
    MonitorID: monitor._id,
    CPU: previous ? [].concat(_toConsumableArray(previous.CPU), [_objectSpread({}, data.cpu, {
      time: new Date()
    })]).slice(-10) : [_objectSpread({}, data.cpu, {
      time: new Date()
    })],
    OS: data.os,
    Memory: data.memory,
    Disk: data.disk,
    Network: data.network,
    Temperatures: data.temps,
    Fans: data.fans,
    Battery: data.battery,
    Users: data.users,
    TimeStamp: data.timestamp
  };
}

var _default = router;
exports["default"] = _default;