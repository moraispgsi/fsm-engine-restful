module.exports = function (app, engine) {

  let debug = require('debug')('machine-api');
  let co = require('co');

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
  app.put('/api/engine/stop', app.oauth.authorise(), function (req, res) {
      debug("PUT: '/api/engine/stop");
      co(function*() {
          yield engine.stop();
          res.sendStatus(200);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {put} /api/engine/resume Resumes the engine's execution
     * @apiGroup Engine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json}
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "message": "error message"
     *    }
     */
  app.put('/api/engine/resume', app.oauth.authorise(), function (req, res) {
      debug("PUT: '/api/engine/resume");
      co(function*() {
          yield engine.resume();
          res.sendStatus(200);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {post} /api/engine/event Send global event
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
  app.post('/api/engine/event', app.oauth.authorise(), function (req, res) {
      debug("POST: '/api/engine/event");
      co(function*() {
          yield engine.resume();
          res.sendStatus(200);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {get} /api/machine/ Get all the machines names
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
  app.get('/api/machine', app.oauth.authorise(), function (req, res) {

      debug('GET: /api/machine');
      co(function*() {
          let machinesNames = yield engine.getMachinesNames();
          res.json({
              machinesNames: machinesNames
            });
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {post} /api/machine/ Add a new machine
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
  app.post('/api/machine', app.oauth.authorise(), function (req, res) {
      debug('POST: /api/machine');
      co(function*() {
          if (!req.body.name) {
              let message = 'Name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          yield engine.addMachine(req.body.name);
          res.sendStatus(200);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {delete} /api/machine/:name Remove a machine
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
  app.delete('/api/machine/:name', app.oauth.authorise(), function (req, res) {
      debug('DELETE: /api/machine/:name');
      co(function*() {
          if (!req.params.name) {

              let message = 'Name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          yield engine.removeMachine(req.params.name);
          res.sendStatus(200);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {get} /api/machine/:name/version/keys Get all the versions keys of a machine
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
  app.get('/api/machine/:name/version/keys', app.oauth.authorise(), function (req, res) {
      debug("POST: '/api/machine/:name/version/keys");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          let versionsKeys = yield engine.getVersionsKeys(req.params.name);
          res.json({
              versionsKeys: versionsKeys
            });
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {post} /api/machine/:name/version Add a new version to a machine
     * @apiDescription Add a new version to a machine (the last version of the machine must already be sealed)
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
  app.post('/api/machine/:name/version', app.oauth.authorise(), function (req, res) {
      debug("POST: '/api/machine/:name/version");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          let versionKey = yield engine.addVersion(req.params.name);
          res.json({
              versionKey: versionKey
            });
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {get} /api/machine/:name/version/:version/info Get the version information
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
  app.get('/api/machine/:name/version/:version/info', app.oauth.authorise(), function (req, res) {
      debug("GET: '/api/machine/:name/version/info");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          let info = yield engine.getVersionInfo(req.params.name, req.params.version);
          res.json(info);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {get} /api/machine/:name/version/:version/model Get the version SCXML model
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
  app.get('/api/machine/:name/version/:version/model', app.oauth.authorise(), function (req, res) {
      debug("GET: '/api/machine/:name/version/model");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          let model = engine.getVersionSCXML(req.params.name, req.params.version);
          res.json({ model: model });
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {put} /api/machine/:name/version/:version/model Set the version's SCXML model
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
  app.put('/api/machine/:name/version/:version/model', app.oauth.authorise(), function (req, res) {
      debug("PUT: '/api/machine/:name/version/model");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          yield engine.setVersionSCXML(req.params.name, req.params.version, req.body.model);
          res.sendStatus(200);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {get} /api/machine/:name/version/:version/instance/keys Get all the instance keys
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
  app.get('/api/machine/:name/version/:version/instance/keys', app.oauth.authorise(), function (req, res) {
      debug("GET: '/api/machine/:name/version/instance/keys");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          let instancesKeys = engine.getInstancesKeys(req.params.name, req.params.version);
          res.json({
              instancesKeys: instancesKeys
            });
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {post} /api/machine/:name/version/:version/instance Add a new instance to a version
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
  app.post('/api/machine/:name/version/:version/instance', app.oauth.authorise(), function (req, res) {
      debug("POST: '/api/machine/:name/version/instance");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          let instance = yield engine.addInstance(req.params.name, req.params.version);
          res.json({
              instanceKey: instance.instanceKey
            });
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {put} /api/machine/:name/version/:version/seal Seals a version
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
  app.put('/api/machine/:name/version/:version/seal', app.oauth.authorise(), function (req, res) {
      debug("PUT: '/api/machine/:name/version/seal");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          if (!req.params.version) {
              let message = 'version property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          yield engine.sealVersion(req.params.name, req.params.version);
          res.sendStatus(200);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {put} /api/machine/:name/version/:version/instance/:instance/start Starts the instance
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
  app.put('/api/machine/:name/version/:version/instance/:instance/start', app.oauth.authorise(), function (req, res) {
      debug("PUT: '/api/machine/:name/version/instance/:instance/start");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          let instance = engine.getInstance(req.params.name, req.params.version, req.params.instance);
          yield instance.start();
          res.sendStatus(200);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {put} /api/machine/:name/version/:version/instance/:instance/stop Stops the instance
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
  app.put('/api/machine/:name/version/:version/instance/:instance/stop', app.oauth.authorise(), function (req, res) {
      debug("PUT: '/api/machine/:name/version/instance/:instance/stop");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          if (!req.params.version) {
              let message = 'version property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          if (!req.params.instance) {
              let message = 'instance property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          let instance = engine.getInstance(req.params.name, req.params.version, req.params.instance);
          instance.stop();
          res.sendStatus(200);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {post} /api/machine/:name/version/:version/instance/:instance/event Send an event to an instance
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
  app.post('/api/machine/:name/version/:version/instance/:instance/event', app.oauth.authorise(), function (req, res) {
      debug("POST: '/api/machine/:name/version/instance/:instance/event");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          if (!req.params.version) {
              let message = 'version property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          if (!req.params.instance) {
              let message = 'instance property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          if (!req.body.event) {
              let message = 'event is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          let instance = engine.getInstance(req.params.name, req.params.version, req.params.instance);
          yield instance.sendEvent(req.body.event, req.body.data);
          res.sendStatus(200);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {put} /api/machine/:name/version/:version/instance/:instance/revert Revert an instance to a previous snapshot
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
  app.put('/api/machine/:name/version/:version/instance/:instance/revert', app.oauth.authorise(), function (req, res) {
      debug("PUT: '/api/machine/:name/version/instance/:instance/revert");
      co(function*() {
          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          if (!req.params.version) {
              let message = 'version property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          if (!req.params.instance) {
              let message = 'instance property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }
          if (!req.body.snapshotKey) {
              let message = 'snapshotKey is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          let instance = engine.getInstance(req.params.name, req.params.version, req.params.instance);
          let snapshot = engine.getSnapshotInfo(req.params.name, req.params.version, req.params.instance, req.body.snapshotKey);
          yield engine.revert(snapshot);
          res.sendStatus(200);
        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {get} /api/machine/:name/version/:version/instance/:instance/snapshot/keys Get the snapshots keys
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
  app.get('/api/machine/:name/version/:version/instance/:instance/snapshot/keys', app.oauth.authorise(), function (req, res) {
      debug("GET: '/api/machine/:name/version/instance/:instance/snapshot/keys");
      co(function*() {

          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          if (!req.params.version) {
              let message = 'version property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          if (!req.params.instance) {
              let message = 'instance property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          let snapshotsKeys = engine.getSnapshotsKeys(req.params.name, req.params.version, req.params.instance);
          res.json({
              snapshotsKeys: snapshotsKeys
            });

        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {get} /api/machine/:name/version/:version/instance/:instance/snapshot/:snapshot Get a snapshot by it's key
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
  app.get('/api/machine/:name/version/:version/instance/:instance/snapshot/:snapshot', app.oauth.authorise(), function (req, res) {
      debug("GET: '/api/machine/:name/version/instance/:instance/snapshot/:snapshot");
      co(function*() {

          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          if (!req.params.version) {
              let message = 'version property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          if (!req.params.instance) {
              let message = 'instance property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          if (!req.params.snapshot) {
              let message = 'snapshot is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          let snapshot = engine.getSnapshotInfo(req.params.name, req.params.version, req.params.instance, req.params.snapshot);
          res.json(snapshot);

        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });

    /**
     * @api {get} /api/machine/:name/version/:version/instance/:instance/snapshot Take a snapshot
     * @apiGroup Snapshot
     * @apiParam {String} name The name of the machine
     * @apiParam {String} version The version key
     * @apiParam {String} instance The instance key
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
  app.get('/api/machine/:name/version/:version/instance/:instance/snapshot', app.oauth.authorise(), function (req, res) {
      debug("GET: '/api/machine/:name/version/instance/:instance/snapshot");
      co(function*() {

          if (!req.params.name) {
              let message = 'name property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          if (!req.params.version) {
              let message = 'version property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          if (!req.params.instance) {
              let message = 'instance property is missing.';
              debug('Error: ' + message);
              res.status(500).send({ message });
              return;
            }

          let instance = engine.getInstance(req.params.name, req.params.version, req.params.instance);
          let snapshot = yield instance.getSnapshot();
          res.json({
              snapshot: snapshot
            });

        }).catch((err) => {
          debug('Error: ' + err);
          let message = err.message;
          res.status(500).send({ message });
        });
    });
};
