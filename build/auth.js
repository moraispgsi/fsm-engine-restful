'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('auth');

module.exports = function (app) {
  var Users = app.db.models.Users;
  var cfg = app.libs.config;
  var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeader()
  };

  var strategy = new _passportJwt.Strategy(params, function (payload, done) {
    debug('Test');
    Users.findAll({
      where: {
        id: payload.id
      }
    }).then(function (users) {
      if (users[0]) {
        return done(null, {
          id: users[0].id,
          email: users[0].email
        });
      }
      return done(null, false);
    }).catch(function (error) {
      return done(error, null);
    });
  });
  _passport2.default.use(strategy);
  return {
    initialize: function initialize() {
      return _passport2.default.initialize();
    },
    authenticate: function authenticate() {
      return _passport2.default.authenticate('jwt', cfg.jwtSession);
    }
  };
};