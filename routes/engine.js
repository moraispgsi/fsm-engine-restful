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
};
