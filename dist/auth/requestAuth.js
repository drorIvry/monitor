"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateBasicAuth = validateBasicAuth;
exports.validateAPI = validateAPI;

var _Account = _interopRequireDefault(require("../dal/Account"));

var _Monitors = _interopRequireDefault(require("../dal/Monitors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function validateBasicAuth(cryptr, req, res, next) {
  var b64auth = (req.header('authorization') || '').split(' ')[1] || '';

  var _toString$split = new Buffer.from(b64auth, 'base64').toString().split(':'),
      _toString$split2 = _slicedToArray(_toString$split, 2),
      username = _toString$split2[0],
      password = _toString$split2[1];

  _Account["default"].findOne({
    UserName: username
  }, function (error, doc) {
    if (error) return res.send(500, {
      error: error
    });

    if (!doc) {
      return res.status(401).end('Authentication required.');
    }

    var decryptedPass = cryptr.decrypt(doc.Password);

    if (!username || !password) {
      return res.status(401).send('Authentication required.');
    }

    if (username === doc.UserName && password === decryptedPass) next();else {
      return res.status(401).send('Authentication required.');
    }
  });
}

function validateAPI(req, res, next) {
  var apiKey = req.header('monitor-api-key');

  if (!apiKey) {
    res.set('WWW-Authenticate', 'Basic realm="401"');
    return res.status(401).send('Authentication required.');
  }

  _Monitors["default"].findOne({
    APIKey: apiKey
  }, function (error, doc) {
    if (error) return res.send(500, {
      error: error
    });
    if (doc) next();else {
      res.set('WWW-Authenticate', 'Basic realm="401"');
      return res.status(401).send('Authentication required.');
    }
  });
}