module.exports = app => {
  const engine = app.engine;
  const debug = require('debug')('machine-api');
  const co = require('co');

  /**
   * @api {get} /machine/ Get all the machines names
   * @apiGroup Machine
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *          "machinesNames": [
   *              "machineName1",
   *              "machineName2",
   *              "machineName3"
   *          ]
   *    }
   *
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.get('/machine', app.auth.authenticate(), (req, res) => {
    debug('GET: /machine');
    co(function*() {
      const machines = yield engine.getMachinesNames();
      res.json({
        machines,
      });
    }).catch((err) => {
      debug('Error: ' + err);
      const message = err.message;
      res.status(500).send({ message });
    });
  });

  /**
   * @api {post} /machine/ Add a new machine
   * @apiGroup Machine
   * @apiSuccess {Object} data
   * @apiSuccess {Number} data.name The name of the new machine
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.post('/machine', app.auth.authenticate(), (req, res) => {
    debug('POST: /machine');
    co(function*() {
      if (!req.body.name) {
        const message = 'Name property is missing.';
        debug(`Error: ${message}`);
        res.status(500).send({ message });
        return;
      }
      yield engine.addMachine(req.body.name);
      res.sendStatus(200);
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
    });
  });

  /**
   * @api {delete} /machine/:name Remove a machine
   * @apiGroup Machine
   * @apiParam {String} name The name of the machine
   * @apiSuccess {Object} data
   * @apiSuccess {Number} data.name The name of the machine
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.delete('/machine/:name', app.auth.authenticate(), (req, res) => {
    debug('DELETE: /machine/:name');
    co(function*() {
      if (!req.params.name) {
        const message = 'Name property is missing.';
        debug(`Error: ${message}`);
        res.status(500).send({ message });
        return;
      }
      yield engine.removeMachine(req.params.name);
      res.sendStatus(200);
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
    });
  });

  /**
   * @api {get} /machine/:name/version/keys Get all the versions keys of a machine
   * @apiGroup Version
   * @apiParam {String} name The name of the machine
   * @apiSuccess {Object} data
   * @apiSuccess {Number} data.name The name of the machine
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *   {
   *       "versionsKeys": [
   *          "version1",
   *          "version2",
   *          "version3"
   *      ]
   *  }
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.get('/machine/:name/version/keys', app.auth.authenticate(), (req, res) => {
    debug("POST: '/machine/:name/version/keys");
    co(function*() {
      if (!req.params.name) {
        const message = 'name property is missing.';
        debug(`Error: ${message}`);
        res.status(500).send({ message });
        return;
      }
      const versionsKeys = yield engine.getVersionsKeys(req.params.name);
      res.json({
        versionsKeys,
      });
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
    });
  });

  /**
   * @api {post} /machine/:name/version Add a new version to a machine
   * @apiDescription Add a new version to a machine
   * (the last version of the machine must already be sealed)
   * @apiGroup Version
   * @apiParam {String} name The name of the machine
   * @apiSuccess {Object} data
   * @apiSuccess {Number} data.name The name of the machine
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *   {
   *       "versionsKeys": [
   *          "version1",
   *          "version2",
   *          "version3"
   *      ]
   *  }
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.post('/machine/:name/version', app.auth.authenticate(), (req, res) => {
    debug("POST: '/machine/:name/version");
    co(function*() {
      if (!req.params.name) {
        const message = 'name property is missing.';
        debug(`Error: ${message}`);
        res.status(500).send({ message });
        return;
      }
      const versionKey = yield engine.addVersion(req.params.name);
      res.json({
        versionKey,
      });
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
    });
  });

  /**
   * @api {get} /machine/:name/version/:version/info Get the version information
   * @apiGroup Version
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *   {
   *      "isSealed": true
   *  }
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.get('/machine/:name/version/:version/info', app.auth.authenticate(), (req, res) => {
    debug("GET: '/machine/:name/version/info");
    co(function*() {
      if (!req.params.name) {
        const message = 'name property is missing.';
        debug(`Error: ${message}`);
        res.status(500).send({ message });
        return;
      }
      const info = yield engine.getVersionInfo(req.params.name, req.params.version);
      res.json(info);
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
    });
  });

  /**
   * @api {get} /machine/:name/version/:version/model Get the version SCXML model
   * @apiGroup Version
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiSuccessExample {json} Success
   *  HTTP/1.1 200 OK
   *  {
   *      "model": "<scxml></scxml>"
   *  }
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.get('/machine/:name/version/:version/model', app.auth.authenticate(), (req, res) => {
    debug("GET: '/machine/:name/version/model");
    co(function*() {
      if (!req.params.name) {
        const message = 'name property is missing.';
        debug(`Error: ${message}`);
        res.status(500).send({ message });
        return;
      }
      const model = engine.getVersionSCXML(req.params.name, req.params.version);
      res.json({ model });
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
    });
  });

  /**
   * @api {put} /machine/:name/version/:version/model Set the version's SCXML model
   * @apiGroup Version
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiSuccess {Object} data
   * @apiSuccess {Number} data.model The SCXML model
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.put('/machine/:name/version/:version/model', app.auth.authenticate(), (req, res) => {
    debug("PUT: '/machine/:name/version/model");
    co(function*() {
      if (!req.params.name) {
        const message = 'name property is missing.';
        debug(`Error: ${message}`);
        res.status(500).send({ message });
        return;
      }
      yield engine.setVersionSCXML(req.params.name, req.params.version, req.body.model);
      res.sendStatus(200);
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
    });
  });

  /**
   * @api {get} /machine/:name/version/:version/instance/keys Get all the instance keys
   * @apiGroup Instance
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *        "instancesKeys": [
   *              "instance1",
   *              "instance2",
   *              "instance3",
   *        ]
   *    }
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.get('/machine/:name/version/:version/instance/keys', app.auth.authenticate(), (req, res) => {
    debug("GET: '/machine/:name/version/instance/keys");
    co(function*() {
      if (!req.params.name) {
        const message = 'name property is missing.';
        debug(`Error: ${message}`);
        res.status(500).send({ message });
        return;
      }
      const instancesKeys = engine.getInstancesKeys(req.params.name, req.params.version);
      res.json({
        instancesKeys,
      });
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
    });
  });

  /**
   * @api {post} /machine/:name/version/:version/instance Add a new instance to a version
   * @apiGroup Instance
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.post('/machine/:name/version/:version/instance', app.auth.authenticate(), (req, res) => {
    debug("POST: '/machine/:name/version/instance");
    co(function*() {
      if (!req.params.name) {
        const message = 'name property is missing.';
        debug(`Error: ${message}`);
        res.status(500).send({ message });
        return;
      }
      const instance = yield engine.addInstance(req.params.name, req.params.version);
      res.json({
        instanceKey: instance.instanceKey,
      });
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
    });
  });

  /**
   * @api {put} /machine/:name/version/:version/seal Seals a version
   * @apiGroup Version
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.put('/machine/:name/version/:version/seal', app.auth.authenticate(), (req, res) => {
    debug("PUT: '/machine/:name/version/seal");
    co(function*() {
      if (!req.params.name) {
        const message = 'name property is missing.';
        debug(`Error: ${message}`);
        res.status(500).send({ message });
        return;
      }
      if (!req.params.version) {
        const message = 'version property is missing.';
        debug(`Error: ${message}`);
        res.status(500).send({ message });
        return;
      }
      yield engine.sealVersion(req.params.name, req.params.version);
      res.sendStatus(200);
    }).catch((err) => {
      debug(`Error: ${err}`);
      const message = err.message;
      res.status(500).send({ message });
    });
  });

  /**
   * @api {put} /machine/:name/version/:version/instance/:instance/start Starts the instance
   * @apiGroup Instance
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiParam {String} instance The instance key
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.put('/machine/:name/version/:version/instance/:instance/start',
    app.auth.authenticate(), (req, res) => {
      debug("PUT: '/machine/:name/version/instance/:instance/start");
      co(function*() {
        if (!req.params.name) {
          const message = 'name property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        const instance =
          engine.getInstance(req.params.name, req.params.version, req.params.instance);
        yield instance.start();
        res.sendStatus(200);
      }).catch((err) => {
        debug(`Error: ${err}`);
        const message = err.message;
        res.status(500).send({ message });
      });
    });

  /**
   * @api {put} /machine/:name/version/:version/instance/:instance/stop Stops the instance
   * @apiGroup Instance
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiParam {String} instance The instance key
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.put('/machine/:name/version/:version/instance/:instance/stop',
    app.auth.authenticate(), (req, res) => {
      debug("PUT: '/machine/:name/version/instance/:instance/stop");
      co(function*() {
        if (!req.params.name) {
          const message = 'name property is missing.';
          debug('Error: ' + message);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.version) {
          const message = 'version property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.instance) {
          const message = 'instance property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        const instance =
          engine.getInstance(req.params.name, req.params.version, req.params.instance);
        instance.stop();
        res.sendStatus(200);
      }).catch((err) => {
        debug(`Error: ${err}`);
        const message = err.message;
        res.status(500).send({ message });
      });
    });

  /**
   * @api {post} /machine/:name/version/:version/instance/:instance/event
   * Send an event to an instance
   * @apiGroup Instance
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiParam {String} instance The instance key
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
  app.post('/machine/:name/version/:version/instance/:instance/event',
    app.auth.authenticate(), (req, res) => {
      debug("POST: '/machine/:name/version/instance/:instance/event");
      co(function*() {
        if (!req.params.name) {
          const message = 'name property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.version) {
          const message = 'version property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.instance) {
          const message = 'instance property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.body.event) {
          const message = 'event is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        const instance =
          engine.getInstance(req.params.name, req.params.version, req.params.instance);
        yield instance.sendEvent(req.body.event, req.body.data);
        res.sendStatus(200);
      }).catch((err) => {
        debug(`Error: ${err}`);
        const message = err.message;
        res.status(500).send({ message });
      });
    });

  /**
   * @api {put} /machine/:name/version/:version/instance/:instance/revert
   * Revert an instance to a previous snapshot
   * @apiGroup Instance
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiParam {String} instance The instance key
   * @apiSuccess {Object} data
   * @apiSuccess {String} data.snapshotKey The key of the snapshot
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.put('/machine/:name/version/:version/instance/:instance/revert',
    app.auth.authenticate(), (req, res) => {
      debug("PUT: '/machine/:name/version/instance/:instance/revert");
      co(function*() {
        if (!req.params.name) {
          const message = 'name property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.version) {
          const message = 'version property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.instance) {
          const message = 'instance property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.body.snapshotKey) {
          const message = 'snapshotKey is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        const instance =
          engine.getInstance(req.params.name, req.params.version, req.params.instance);
        const snapshot =
          engine.getSnapshotInfo(req.params.name, req.params.version, req.params.instance,
            req.body.snapshotKey);
        yield instance.revert(snapshot);
        res.sendStatus(200);
      }).catch((err) => {
        debug(`Error: ${err}`);
        const message = err.message;
        res.status(500).send({ message });
      });
    });

  /**
   * @api {get} /machine/:name/version/:version/instance/:instance/snapshot/keys
   * Get the snapshots keys
   * @apiGroup Snapshot
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiParam {String} instance The instance key
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *       "snapshotKeys": [
   *          "snapshot1",
   *          "snapshot2"
   *       ]
   *
   *    }
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.get('/machine/:name/version/:version/instance/:instance/snapshot/keys',
    app.auth.authenticate(), (req, res) => {
      debug("GET: '/machine/:name/version/instance/:instance/snapshot/keys");
      co(function*() {
        if (!req.params.name) {
          const message = 'name property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.version) {
          const message = 'version property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.instance) {
          const message = 'instance property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        const snapshotsKeys =
          engine.getSnapshotsKeys(req.params.name, req.params.version, req.params.instance);
        res.json({
          snapshotsKeys,
        });
      }).catch((err) => {
        debug(`Error: ${err}`);
        const message = err.message;
        res.status(500).send({ message });
      });
    });

  /**
   * @api {get} /machine/:name/version/:version/instance/:instance/snapshot/:snapshot
   * Get a snapshot by it's key
   * @apiGroup Snapshot
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiParam {String} instance The instance key
   * @apiParam {String} snapshot The snapshot key
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *    }
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.get('/machine/:name/version/:version/instance/:instance/snapshot/:snapshot',
    app.auth.authenticate(), (req, res) => {
      debug("GET: '/machine/:name/version/instance/:instance/snapshot/:snapshot");
      co(function*() {
        if (!req.params.name) {
          const message = 'name property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.version) {
          const message = 'version property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.instance) {
          const message = 'instance property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.snapshot) {
          const message = 'snapshot is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        const snapshot = engine.getSnapshotInfo(req.params.name, req.params.version,
          req.params.instance, req.params.snapshot);
        res.json(snapshot);
      }).catch((err) => {
        debug(`Error: ${err}`);
        const message = err.message;
        res.status(500).send({ message });
      });
    });

  /**
   * @api {get} /machine/:name/version/:version/instance/:instance/snapshot Take a snapshot
   * @apiGroup Snapshot
   * @apiParam {String} name The name of the machine
   * @apiParam {String} version The version key
   * @apiParam {String} instance The instance key
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    {
   *      snapshot: [["initial"],{},false,{
   *        "machine":"machine1",
   *        "versionKey":"version1",
   *        "instanceKey":"instance1"
   *      }]
   *    }
   * @apiErrorExample {json}
   *    HTTP/1.1 500 Internal Server Error
   *    {
   *      "message": "error message"
   *    }
   */
  app.get('/machine/:name/version/:version/instance/:instance/snapshot',
    app.auth.authenticate(), (req, res) => {
      debug("GET: '/machine/:name/version/instance/:instance/snapshot");
      co(function*() {
        if (!req.params.name) {
          const message = 'name property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.version) {
          const message = 'version property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        if (!req.params.instance) {
          const message = 'instance property is missing.';
          debug(`Error: ${message}`);
          res.status(500).send({ message });
          return;
        }
        const instance =
          engine.getInstance(req.params.name, req.params.version, req.params.instance);
        const snapshot = yield instance.getSnapshot();
        res.json({
          snapshot,
        });
      }).catch((err) => {
        debug(`Error: ${err}`);
        const message = err.message;
        res.status(500).send({ message });
      });
    });
};
