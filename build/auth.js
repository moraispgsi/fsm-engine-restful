'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  var Users = app.db.models.Users;
  var cfg = app.libs.config;
  var params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeader()
  };
  var strategy = new _passportJwt.Strategy(params, function (payload, done) {
    Users.findById(payload.id).then(function (user) {
      if (user) {
        return done(null, {
          id: user.id,
          email: user.email
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