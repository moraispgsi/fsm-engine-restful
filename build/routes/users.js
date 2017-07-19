'use strict';

module.exports = function (app) {
  var Users = app.db.models.Users;

  app.route('/user').all(app.auth.authenticate())
  /**
   * @api {get} /user Return the authenticated user's data
   * @apiGroup User
   * @apiHeader {String} Authorization Token of authenticated user
   * @apiHeaderExample {json} Header
   *    {"Authorization": "JWT xyz.abc.123.hgf"}
   * @apiSuccess {Number} id User id
   * @apiSuccess {String} name User name
   * @apiSuccess {String} email User email
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *      "id": 1,
   *      "name": "John Connor",
   *      "email": "john@connor.net"
   *    }
   * @apiErrorExample {json} Find error
   *    HTTP/1.1 412 Precondition Failed
   */
  .get(function (req, res) {
    Users.findAll({
      where: {
        id: req.user.id
      },
      attributes: ['id', 'name', 'email']
    }).then(function (result) {
      return res.json(result[0]);
    }).catch(function (error) {
      res.status(412).json({ msg: error.message });
    });
  })
  /**
   * @api {delete} /user Deletes an authenticated user
   * @apiGroup User
   * @apiHeader {String} Authorization Token of authenticated user
   * @apiHeaderExample {json} Header
   *    {"Authorization": "JWT xyz.abc.123.hgf"}
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 204 No Content
   * @apiErrorExample {json} Delete error
   *    HTTP/1.1 412 Precondition Failed
   */
  .delete(function (req, res) {
    Users.destroy({ where: { id: req.user.id } }).then(function (result) {
      return res.sendStatus(204);
    }).catch(function (error) {
      res.status(412).json({ msg: error.message });
    });
  });

  /**
   * @api {post} /users Register a new user
   * @apiGroup User
   * @apiParam {String} name User name
   * @apiParam {String} email User email
   * @apiParam {String} password User password
   * @apiParamExample {json} Input
   *    {
   *      "name": "John Connor",
   *      "email": "john@connor.net",
   *      "password": "123456"
   *    }
   * @apiSuccess {Number} id User id
   * @apiSuccess {String} name User name
   * @apiSuccess {String} email User email
   * @apiSuccess {String} password User encrypted password
   * @apiSuccess {Date} updated_at Update's date
   * @apiSuccess {Date} created_at Register's date
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *      "id": 1,
   *      "name": "John Connor",
   *      "email": "john@connor.net",
   *      "password": "$2a$10$SK1B1",
   *      "updated_at": "2016-02-10T15:20:11.700Z",
   *      "created_at": "2016-02-10T15:29:11.700Z",
   *    }
   * @apiErrorExample {json} Register error
   *    HTTP/1.1 412 Precondition Failed
   */
  app.post('/users', function (req, res) {
    Users.create(req.body).then(function (result) {
      return res.json(result);
    }).catch(function (error) {
      res.status(412).json({ msg: error.message });
    });
  });
};