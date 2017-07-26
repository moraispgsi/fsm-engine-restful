'use strict';

/* eslint-disable max-len */
module.exports = function (app) {
  var engine = app.engine;
  var debug = require('debug')('machine-api');
  var co = require('co');

  /**
   * @api {put} /api/engine/stop Stops the engine
   * @apiGroup Engine
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.put('/engine/stop', app.auth.authenticate(), function (req, res) {
    debug("PUT: '/engine/stop");
    co(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return engine.stop();

            case 2:
              res.sendStatus(200);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })).catch(function (err) {
      debug('Error: ' + err);
      var message = err.message;
      res.status(500).send({ message: message });
    });
  });

  /**
   * @api {put} /engine/resume Resumes the engine's execution
   * @apiGroup Engine
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.put('/engine/resume', app.auth.authenticate(), function (req, res) {
    debug("PUT: '/engine/resume");
    co(regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return engine.resume();

            case 2:
              res.sendStatus(200);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })).catch(function (err) {
      debug('Error: ' + err);
      var message = err.message;
      res.status(500).send({ message: message });
    });
  });

  /**
   * @api {post} /engine/event Send global event
   * @apiGroup Engine
   * @apiSuccess {Object} data
   * @apiSuccess {String} data.event The name of the event
   * @apiSuccess {Object} data.data The data that goes along with the event
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *         "event": "foo",
   *         "data": {
   *              "bar": 5
   *         }
   *    }
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.post('/engine/event', app.auth.authenticate(), function (req, res) {
    debug("POST: '/engine/event");
    co(regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return engine.resume();

            case 2:
              res.sendStatus(200);

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })).catch(function (err) {
      debug('Error: ' + err);
      var message = err.message;
      res.status(500).send({ message: message });
    });
  });

  /**
   * @api {get} /engine/manifest
   * @apiGroup Engine
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *     "machines": {
   *       "machine1": {
   *         "route": "machines/machine1",
   *         "versions": {
   *           "version1": {
   *             "route": "machines/machine1/versions/version1",
   *             "instances": {
   *               "instance1": {
   *                 "route": "machines/machine1/versions/version1/instances/instance1",
   *                 "snapshots": {
   *                   "snapshot1": {
   *                     "route": "machines/machine1/versions/version1/instances/instance1/snapshots/snapshot1"
   *                   }
   *                 }
   *               },
   *               "instance2": {
   *                 "route": "machines/machine1/versions/version1/instances/instance2",
   *                 "snapshots": {}
   *               }
   *             }
   *           }
   *         }
   *       },
   *       "machine2": {
   *         "route": "machines/machine2",
   *         "versions": {
   *           "version1": {
   *             "route": "machines/machine2/versions/version1",
   *             "instances": {}
   *           }
   *         }
   *       }
   *     }
   * }
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.get('/engine/manifest', app.auth.authenticate(), function (req, res) {
    debug("GET: '/engine/manifest");
    co(regeneratorRuntime.mark(function _callee4() {
      var manifest;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return engine.getManifest();

            case 2:
              manifest = _context4.sent;

              res.status(200).send(manifest);

            case 4:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })).catch(function (err) {
      debug('Error: ' + err);
      var message = err.message;
      res.status(500).send({ message: message });
    });
  });

  /**
   *
   */

  /**
   * @api {get} /engine/commits
   * @apiGroup Engine
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    [
   *        {
   *            "sha": "acaf60d25a80c241d6bf7edd89b60709f701eb39",
   *            "author": "default",
   *            "email": "None",
   *            "date": "2017-07-25T20:07:49.000Z",
   *            "message": "Changed the info for the instance3 of the version1 of the \"machine1\" machine"
   *        }
   *    ]
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.get('/engine/commits', app.auth.authenticate(), function (req, res) {
    debug("GET: '/engine/commits");
    co(regeneratorRuntime.mark(function _callee5() {
      var commits;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return engine.getCommitHistory();

            case 2:
              commits = _context5.sent;

              res.status(200).send(commits);

            case 4:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    })).catch(function (err) {
      debug('Error: ' + err);
      var message = err.message;
      res.status(500).send({ message: message });
    });
  });
};