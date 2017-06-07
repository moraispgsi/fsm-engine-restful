module.exports = function (app, engine) {
    let debug = require("debug")("version-api");
    let co = require("co");
    process.on('uncaughtException', function (err) {
        console.error(err);
        console.log("Node NOT Exiting...");
    });

    /**
     * @api {post} /API/version/all Gets all existing versions
     * @apiGroup Version
     * @apiSuccess {Object} data
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [
     *      {
     *         "id": 1,
     *         "fsmID": 1,
     *         "parentVersionID": 1,
     *         "updated_at": "2016-02-10T15:46:51.778Z",
     *         "created_at": "2016-02-10T15:46:51.778Z"
     *      }
     *    ]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/version/all', function (req, res) {
        co(function*(){
            let versions = yield engine.getAllVersions();
    	    res.json({
                versions: versions
            });
        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });

    /**
     * @api {post} /API/version/getById Gets a version by its id
     * @apiGroup Version
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [
     *      {
     *         "id": 1,
     *         "fsmID": 1,
     *         "isSealed": false,
     *         "scmxl": "<scxml></scxml>",
     *         "parentVersionID": 1,
     *         "updated_at": "2016-02-10T15:46:51.778Z",
     *         "created_at": "2016-02-10T15:46:51.778Z"
     *      }
     *    ]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/version/getById', function (req, res) {
        co(function*(){
            try {
                if (!req.body.id) {
                    debug("Error: " + "Missing the property id");
                    res.json({error: "Missing the property id"});
                }
                let version = yield engine.getVersionById(req.body.id);
                res.json(version);
            } catch(err) {
                res.json({error: err});
            }
        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });

    /**
     * @api {post} /API/version/setSCXML Set the SCXML of a version
     * @apiGroup Version
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The id of the version
     * @apiSuccess {Number} data.scmxl The SCXML markup to set to the version
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/version/setSCXML', function (req, res) {
        co(function*() {
            debug("setSCXML");
            if (!req.body.id) {
                debug("Error: " + "Missing the property id");
                res.json({error: "Missing the property id"});
            }
            if (!req.body.scxml) {
                debug("Error: " + "Missing the property scxml");
                res.json({error: "Missing the property scxml"});
            }

            yield engine.setScxml(req.body.id, req.body.scxml);
            res.sendStatus(200);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    /**
     * @api {post} /API/version/seal Seals a version
     * @apiGroup Version
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The id of the version
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/version/seal', function (req, res) {
        co(function*() {
            debug("seal");
            if (!req.body.id) {
                debug("Error: " + "Missing the property id");
                res.json({error: "Missing the property id"});
            }
            yield engine.seal(req.body.id);
            res.sendStatus(200);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });

    /**
     * @api {post} /API/version/allInstances Gets all the instances of a version of a state machine
     * @apiGroup Version
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The id of the version
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [
     *      {
     *          "id": 1,
     *          "versionID": 1,
     *          "hasStarted": false,
     *          "hasEnded": false,
     *          "updated_at": "2016-02-10T15:46:51.778Z",
     *          "created_at": "2016-02-10T15:46:51.778Z"
     *      }, {
     *          "id": 2,
     *          "versionID": 1,
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
    app.post('/API/version/allInstances', function (req, res) {
        co(function*() {
            debug("allInstances");
            if (!req.body.id) {
                debug("Error: " + "Missing the property id");
                res.json({error: "Missing the property id"});
            }
            let instances = yield engine.getInstancesByVersionId(req.body.id);
            res.json(instances);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });

    /**
     * @api {post} /API/version/allRunningInstances Gets all the running instances of a version of a state machine
     * @apiGroup Version
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The id of the version
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [
     *      {
     *          "id": 1,
     *          "versionID": 1,
     *          "hasStarted": true,
     *          "hasEnded": false,
     *          "updated_at": "2016-02-10T15:46:51.778Z",
     *          "created_at": "2016-02-10T15:46:51.778Z"
     *      }, {
     *          "id": 2,
     *          "versionID": 1,
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
    app.post('/API/version/allRunningInstances', function (req, res) {
        co(function*() {
            debug("allRunningInstances");
            if (!req.body.id) {
                debug("Error: " + "Missing the property id");
                res.json({error: "Missing the property id"});
            }
            let instances = yield engine.getInstancesByVersionId(req.body.id);
            instances = instances.filter((instance) => instance.hasStarted);
            res.json(instances);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
};