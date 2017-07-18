'use strict';

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.DEBUG = 'boot';


var debug = (0, _debug2.default)('boot');

module.exports = function (app) {
  if (process.env.NODE_ENV === 'production') {
    var credentials = {
      key: _fs2.default.readFileSync('ntask.key', 'utf8'),
      cert: _fs2.default.readFileSync('ntask.cert', 'utf8')
    };
    app.db.sequelize.sync().done(function () {
      _https2.default.createServer(credentials, app).listen(app.get('port'), function () {
        // The server needs to be operational in order to bind the port within 90 seconds
        // Therefore since the engine init is an expensive operation,
        // we initialize the server first.
        app.engine.init(process.env.CLONE_URL, process.env.PUBLIC_KEY, process.env.PRIVATE_KEY, process.env.PASSPHRASE).then(function () {
          debug('Engine was initialized');
        });
      });
    });
  } else if (process.env.NODE_ENV !== 'test') {
    var _credentials = {
      key: _fs2.default.readFileSync('ntask.key', 'utf8'),
      cert: _fs2.default.readFileSync('ntask.cert', 'utf8')
    };
    app.db.sequelize.sync().done(function () {
      _https2.default.createServer(_credentials, app).listen(app.get('port'), function () {
        // The server needs to be operational in order to bind the port within 90 seconds
        // Therefore since the engine init is an expensive operation,
        // we initialize the server first.
        app.engine.init(process.env.CLONE_URL, process.env.PUBLIC_KEY, process.env.PRIVATE_KEY, process.env.PASSPHRASE).then(function () {
          debug('Engine was initialized');
        });
      });
    });
  } else {
    var _credentials2 = {
      key: _fs2.default.readFileSync('ntask.key', 'utf8'),
      cert: _fs2.default.readFileSync('ntask.cert', 'utf8')
    };
    app.db.sequelize.sync().done(function () {
      _https2.default.createServer(_credentials2, app).listen(app.get('port'), '0.0.0.0', function () {
        // The server needs to be operational in order to bind the port within 90 seconds
        // Therefore since the engine init is an expensive operation,
        // we initialize the server first.
        app.engine.init(process.env.CLONE_URL, process.env.PUBLIC_KEY, process.env.PRIVATE_KEY, process.env.PASSPHRASE).then(function () {
          debug('Engine was initialized');
        });
      });
    });
  }
};