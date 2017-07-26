/* eslint-disable max-len */
module.exports = app => {
  const engine = app.engine;
  const debug = require('debug')('machine-api');
  const co = require('co');

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
  app.put('/engine/stop', app.auth.authenticate(), (req, res) => {
    debug("PUT: '/engine/stop");
    co(function*() {
      yield engine.stop();
      res.sendStatus(200);
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
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
  app.put('/engine/resume', app.auth.authenticate(), (req, res) => {
    debug("PUT: '/engine/resume");
    co(function*() {
      yield engine.resume();
      res.sendStatus(200);
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
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
  app.post('/engine/event', app.auth.authenticate(), (req, res) => {
    debug("POST: '/engine/event");
    co(function*() {
      yield engine.resume();
      res.sendStatus(200);
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
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
  app.get('/engine/manifest', app.auth.authenticate(), (req, res) => {
    debug("GET: '/engine/manifest");
    co(function*() {
      const manifest = yield engine.getManifest();
      res.status(200).send(manifest);
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
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
  app.get('/engine/commits', app.auth.authenticate(), (req, res) => {
    debug("GET: '/engine/commits");
    co(function*() {
      const commits = yield engine.getCommitHistory();
      res.status(200).send(commits);
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
    });
  });
};
