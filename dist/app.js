"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _helmet = _interopRequireDefault(require("helmet"));

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _cryptr = _interopRequireDefault(require("cryptr"));

var _state = _interopRequireDefault(require("./routes/state"));

var _monitors = _interopRequireDefault(require("./routes/monitors"));

var _report_summery = _interopRequireDefault(require("./routes/report_summery"));

var _dashboard = _interopRequireDefault(require("./routes/dashboard"));

var _delete_monitors = _interopRequireDefault(require("./routes/delete_monitors"));

var _delete_alerts = _interopRequireDefault(require("./routes/delete_alerts"));

var _alerts = _interopRequireDefault(require("./routes/alerts"));

var _report = require("./routes/report");

var _account = require("./routes/account");

var _requestAuth = require("./auth/requestAuth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var cryptr = new _cryptr["default"]('myTotalySecretKey');

_mongoose["default"].connect('mongodb://localhost/monitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;
db.on('error', console.error.bind(console, 'connection error:'));
app.use(function (req, res, next) {
  if (req.path === '/accounts' && req.method === 'POST') next();else if (req.header('authorization')) (0, _requestAuth.validateBasicAuth)(cryptr, req, res, next);else (0, _requestAuth.validateAPI)(req, res, next);
});
app.use(_express["default"]["static"](_path["default"].join(__dirname, '/build')));
app.disable('x-powered-by');
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use((0, _helmet["default"])());
app.use((0, _errorhandler["default"])());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use('/monitors', _monitors["default"]);
app.use('/state', _state["default"]);
app.use('/dashboard', _dashboard["default"]);
app.use('/delete-monitor', _delete_monitors["default"]);
app.use('/delete-alerts', _delete_alerts["default"]);
app.use('/alerts', _alerts["default"]);
app.get('/report/:reportID', _report.getReport);
app.use('/reports', _report_summery["default"]);
app.get('/login', _account.login);
app.post('/accounts', function (req, res, next) {
  (0, _account.register)(cryptr, req, res, next);
});
app.get('*', function (req, res, next) {
  res.sendFile(_path["default"].join(__dirname, '/build/index.html'));
});
module.exports = app;