"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Alerts = _interopRequireDefault(require("../dal/Alerts"));

var _Account = _interopRequireDefault(require("../dal/Account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

          if (account_doc) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(404).send('Account Not Found!'));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(_Alerts["default"].find({
            AccountID: _mongoose["default"].Types.ObjectId(account_doc._id)
          }));

        case 9:
          docs = _context.sent;
          return _context.abrupt("return", res.send(docs));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
});
var _default = router;
exports["default"] = _default;