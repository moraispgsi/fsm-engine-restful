'use strict';

var _jwtSimple = require('jwt-simple');

var _jwtSimple2 = _interopRequireDefault(_jwtSimple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  var cfg = app.libs.config;
  var Users = app.db.models.Users;

  /**
   * @api {post} /token Authentication Token
   * @apiGroup Credentials
   * @apiParam {String} email User email
   * @apiParam {String} password User password
   * @apiParamExample {json} Input
   *    {
   *      "email": "john@connor.net",
   *      "password": "123456"
   *    }
   * @apiSuccess {String} token Token of authenticated user
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {"token": "xyz.abc.123.hgf"}
   * @apiErrorExample {json} Authentication error
   *    HTTP/1.1 401 Unauthorized
   */
  app.post('/token', function (req, res) {
    if (req.body.email && req.body.password) {
      var email = req.body.email;
      var password = req.body.password;
      Users.findAll({ where: { email: email } }).then(function (users) {
        if (Users.isPassword(users[0].password, password)) {
          var payload = { id: users[0].id };
          res.json({
            token: _jwtSimple2.default.encode(payload, cfg.jwtSecret)
          });
        } else {
          res.sendStatus(401);
        }
      }).catch(function (error) {
        return res.sendStatus(401);
      });
    } else {
      res.sendStatus(401);
    }
  });
};