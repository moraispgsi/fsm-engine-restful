/**
 * Created by Ricardo Morais on 16/05/2017.
 */
module.exports = function (app, engine) {
    let debug = require("debug")("instance-api");
    let co = require("co");

    /**
     * @api {post} /API/instance/getById Get an instance
     * @apiGroup Instance
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The instance id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "versionId": 1,
     *      "hasStarted": false,
     *      "hasEnded": false,
     *      "updated_at": "2016-02-10T15:46:51.778Z",
     *      "created_at": "2016-02-10T15:46:51.778Z"
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/instance/getById', function (req, res) {
        co(function*() {
            if (!req.body.id) {
                debug("Error: " + "Missing the property id");
                res.json({error: "Missing the property id"});
                return;
            }
            let instance = yield engine.getInstanceById(req.body.id);
            res.json(instance);
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not find the instance with the ID.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /API/instance/create Creates an instance using the version id
     * @apiGroup Instance
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The version id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "instanceId": 1
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/instance/create', function (req, res) {
        co(function*() {
            if (!req.body.id) {
                debug("Error: " + "Missing the property id");
                res.json({error: "Missing the property id"});
                return;
            }
            let instance = yield engine.createInstance(req.body.id);
            res.json({
                instanceID: instance.id,
            });
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not create the instance.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /API/instance/getVersion Gets the version of the instance
     * @apiGroup Instance
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The version id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "versionID": 1
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/instance/getVersion', function (req, res) {
        co(function*() {
            if (!req.body.id) {
                debug("Error: " + "Missing the property id");
                res.json({error: "Missing the property id"});
                return;
            }
            let instance = yield engine.model.instance.findById(req.body.id);
            res.json({
                versionID: instance.dataValues.versionID,
            });
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not get the version.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /API/instance/start Starts an instance
     * @apiGroup Instance
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The instance id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "versionId": 1,
     *      "hasStarted": false,
     *      "hasEnded": false,
     *      "updated_at": "2016-02-10T15:46:51.778Z",
     *      "created_at": "2016-02-10T15:46:51.778Z"
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/instance/start', function (req, res) {
        co(function*() {
            if (!req.body.id) {
                let message = "Missing the property id";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            let instance = engine.getInstance(req.body.id);
            yield instance.start();
            res.sendStatus(200);
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not start the instance.";
            res.status(500).send({message});
        });
    });


    /**
     * @api {post} /API/instance/sendEvent Send an event to an instance
     * @apiGroup Instance
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The instance id
     * @apiSuccess {String} data.event The event to send
     * @apiSuccess {Object} data.data The data to send along with the event
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/instance/sendEvent', function (req, res) {
        co(function*() {
            if (!req.body.id) {
                let message = "Missing the property id";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            let instance = engine.getInstance(req.body.id);
            yield instance.sendEvent(req.body.event, req.body.data);
            res.sendStatus(200);
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not send the event.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /API/instance/all Gets every instance
     * @apiGroup Instance
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [
     *      {
     *          "id": 1,
     *          "versionId": 1,
     *          "hasStarted": false,
     *          "hasEnded": false,
     *          "updated_at": "2016-02-10T15:46:51.778Z",
     *          "created_at": "2016-02-10T15:46:51.778Z"
     *      }, {
     *          "id": 2,
     *          "versionId": 1,
     *          "hasStarted": false,
     *          "hasEnded": false,
     *          "updated_at": "2016-02-10T15:46:51.778Z",
     *          "created_at": "2016-02-10T15:46:51.778Z"
     *      }
     *    ]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/instance/all', function (req, res) {
        co(function*() {
            let instances = yield engine.getAllInstances();
            res.json({
                instances: instances
            });
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not get the instances.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /API/instance/allRunning Gets every instance that is currently running(has started and has not ended)
     * @apiGroup Instance
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [
     *      {
     *          "id": 1,
     *          "versionId": 1,
     *          "hasStarted": true,
     *          "hasEnded": false,
     *          "updated_at": "2016-02-10T15:46:51.778Z",
     *          "created_at": "2016-02-10T15:46:51.778Z"
     *      }, {
     *          "id": 2,
     *          "versionId": 1,
     *          "hasStarted": true,
     *          "hasEnded": false,
     *          "updated_at": "2016-02-10T15:46:51.778Z",
     *          "created_at": "2016-02-10T15:46:51.778Z"
     *      }
     *    ]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/instance/allRunning', function (req, res) {
        co(function*() {
            //todo
            res.sendStatus(500);
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not get the running instances.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /API/instance/allStopped Gets every instance that is currently stopped(has not started or has ended)
     * @apiGroup Instance
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [
     *      {
     *          "id": 1,
     *          "versionId": 1,
     *          "hasStarted": true,
     *          "hasEnded": true,
     *          "updated_at": "2016-02-10T15:46:51.778Z",
     *          "created_at": "2016-02-10T15:46:51.778Z"
     *      }, {
     *          "id": 2,
     *          "versionId": 1,
     *          "hasStarted": false,
     *          "hasEnded": false,
     *          "updated_at": "2016-02-10T15:46:51.778Z",
     *          "created_at": "2016-02-10T15:46:51.778Z"
     *      }
     *    ]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/instance/allStopped', function (req, res) {
        co(function*() {
            //todo
            res.sendStatus(500);
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not stop th e instance's execution.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /API/instance/snapshot Gets a snapshot of the instance
     * @apiGroup Instance
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The instance id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *        "id": 2,
     *        "state": "running",
     *        "datamodel": {},
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/instance/snapshot', function (req, res) {
        try {
            if (!req.body.id) {
                debug("Error: " + "Missing the property id");
                res.json({error: "Missing the property id"});
                return;
            }
            let instance = engine.getInstance(parseInt(req.body.id));
            let sc = instance.getStateChart();
            let snapshot = sc.getSnapshot();
            let data = {
                id: req.body.instanceID,
                state: snapshot[0],
                datamodel: snapshot[3]
            };
            res.json(data);
        } catch (err) {
            debug("Error: " + err);
            let message = "Could not get the instance's snapshot.";
            res.status(500).send({message});
        }
    });

    /**
     * @api {post} /API/instance/revert Reverts an instance to a previous snapshot
     * @apiGroup Instance
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The instance id
     * @apiSuccess {Number} data.snapshotID The id of the snapshot
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/instance/revert', function (req, res) {
        co(function*() {
            //todo

            res.sendStatus(500);
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not revert the instance state.";
            res.status(500).send({message});
        });
    });
};
