'use strict';

var _boot = require('./boot.production');

var _boot2 = _interopRequireDefault(_boot);

var _boot3 = require('./boot.test');

var _boot4 = _interopRequireDefault(_boot3);

var _boot5 = require('./boot.development');

var _boot6 = _interopRequireDefault(_boot5);

var _boot7 = require('./boot.heroku');

var _boot8 = _interopRequireDefault(_boot7);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('boot');

module.exports = function (app) {
  debug('Booting in %s mode.', process.env.NODE_ENV);
  process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
  });
  switch (process.env.NODE_ENV) {
    case 'production':
      if (process.env.PLATFORM === 'heroku') {
        (0, _boot8.default)(app);
      } else {
        (0, _boot2.default)(app);
      }
      break;
    case 'development':
      (0, _boot6.default)(app);
      break;
    case 'test':
      (0, _boot4.default)(app);
      break;
    default:
      (0, _boot6.default)(app);
      break;
  }
};