'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!_fs2.default.existsSync('logs')) {
  _fs2.default.mkdirSync('logs');
}

module.exports = new _winston2.default.Logger({
  transports: [new _winston2.default.transports.File({
    level: 'info',
    filename: 'logs/app.log',
    maxsize: 1048576,
    maxFiles: 10,
    colorize: false
  })]
});