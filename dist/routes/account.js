"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.register = register;

var _express = _interopRequireDefault(require("express"));

var _Account = _interopRequireDefault(require("../dal/Account"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var router = _express["default"].Router();

function login(req, res, next) {
  var b64auth, _toString$split, _toString$split2, username, password, accoun_doc;

  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          b64auth = (req.header('authorization') || '').split(' ')[1] || '';
          _toString$split = new Buffer.from(b64auth, 'base64').toString().split(':'), _toString$split2 = _slicedToArray(_toString$split, 2), username = _toString$split2[0], password = _toString$split2[1];
          _context.next = 4;
          return regeneratorRuntime.awrap(_Account["default"].findOne({
            UserName: username
          }));

        case 4:
          accoun_doc = _context.sent;
          return _context.abrupt("return", res.send({
            accountID: accoun_doc._id,
            firstName: accoun_doc.firstName
          }));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function register(cryptr, req, res, next) {
  var username, password, firstName, lastName, doc, encryptedPassword, account, newDoc;
  return regeneratorRuntime.async(function register$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          username = req.body.username;
          password = req.body.password;
          firstName = req.body.firstName;
          lastName = req.body.lastName;

          if (!(!username || !password)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.send(400, 'Bad Request'));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(_Account["default"].findOne({
            UserName: username
          }));

        case 8:
          doc = _context2.sent;

          if (!doc) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.send(400, 'User Exists'));

        case 11:
          encryptedPassword = cryptr.encrypt(password);
          account = new _Account["default"]({
            UserName: username,
            Password: encryptedPassword,
            FirstName: firstName,
            LastName: lastName,
            APIKeys: [],
            Active: true
          });
          _context2.next = 15;
          return regeneratorRuntime.awrap(account.save());

        case 15:
          _context2.next = 17;
          return regeneratorRuntime.awrap(_Account["default"].findOne({
            UserName: username
          }));

        case 17:
          newDoc = _context2.sent;
          return _context2.abrupt("return", res.send({
            accountID: newDoc._id
          }));

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  });
}