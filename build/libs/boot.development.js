'use strict';

var _vantageInit = require('./vantageInit');

var _vantageInit2 = _interopRequireDefault(_vantageInit);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('boot.development');

module.exports = function (app) {
  app.db.sequelize.sync().done(function () {
    var server = app.vantage.delimiter('fsm-engine-restful~$ ').listen(app, {
      port: app.get('port')
    });
    (0, _vantageInit2.default)(app, server);
    debug('Server listening on port: ' + app.get('port'));
    app.engine.init(process.env.CLONE_URL, process.env.PUBLIC_KEY, process.env.PRIVATE_KEY, process.env.PASSPHRASE).then(function () {
      debug('Engine was initialized');
    });
  });
};