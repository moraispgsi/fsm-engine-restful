/**
 * Created by Ricardo Morais on 16/05/2017.
 */
module.exports = function (app, engine) {
    let debug = require("debug")("machine-api");
    let co = require("co");

    app.get('/api/machine', function (req, res) {
        debug("GET: /api/machine");
        co(function*(){
            let machinesNames = yield engine.getMachinesNames();
            res.json({
                machinesNames: machinesNames
            });
        }).catch((err)=> {
            debug("Error: " + err);
            let message = "Could not get the state machines.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /api/machine/create Creates a new state machine
     * @apiGroup Machine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.name The name of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/api/machine', function (req, res) {
        debug("POST: /api/machine");
        co(function*() {
            if (!req.body.name) {
                let message = "Name property is missing.";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            yield engine.addMachine(req.body.name);

        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not create the state machines.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /api/machine/:id/version Gets all the versions of the state machine
     * @apiGroup Machine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The id of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [
     *       {
     *         "id": 2,
     *         "machineID": 1,
     *         "isSealed": false,
     *         "scxml": "<scxml></scxml>",
     *         "parentVersionID": 1,
     *         "updated_at": "2016-02-10T15:46:51.778Z",
     *         "created_at": "2016-02-10T15:46:51.778Z"
     *       }, {
     *         "id": 3,
     *         "machineID": 1,
     *         "isSealed": false,
     *         "scxml": "<scxml></scxml>",
     *         "parentVersionID": 2,
     *         "updated_at": "2016-02-10T15:46:51.778Z",
     *         "created_at": "2016-02-10T15:46:51.778Z"
     *       }
     *    ]
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.get('/api/machine/:id/version', function (req, res) {
        debug("POST: '/api/machine/:id/version");
        co(function*() {
            if (!req.body.id) {
                let message = "ID property is missing.";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            let versions = yield engine.getFsmVersions(req.body.id);
            res.json({
                versions: versions
            });
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not get the state machine version.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /api/machine/latestVersion Gets the latest version of the state machine
     * @apiGroup Machine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The id of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 2,
     *      "machineID": 1,
     *      "isSealed": false,
     *      "scxml": "<scxml></scxml>",
     *      "parentVersionID": 1,
     *      "updated_at": "2016-02-10T15:46:51.778Z",
     *      "created_at": "2016-02-10T15:46:51.778Z"
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/api/machine/latestVersion', function (req, res) {
        debug("POST: /api/machine/latestVersion");
        co(function*() {
            if (!req.body.id) {
                let message = "ID property is missing.";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            let version = yield engine.getLatestFsmVersion(req.body.id);
            res.json(version);
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not get the lastest version of the state machine.";
            res.status(500).send({message});
        });
    });
    /**
     * @api {post} /api/machine/latestSealedVersion Gets the latest sealed version of the state machine
     * @apiGroup Machine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The id of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 2,
     *      "machineID": 1,
     *      "isSealed": true,
     *      "scxml": "<scxml></scxml>",
     *      "parentVersionID": 1,
     *      "updated_at": "2016-02-10T15:46:51.778Z",
     *      "created_at": "2016-02-10T15:46:51.778Z"
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/api/machine/latestSealedVersion', function (req, res) {
        debug("POST: /api/machine/latestSealedVersion");
        co(function*() {
            if (!req.body.id) {
                let message = "ID property is missing.";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            let version = yield engine.getLatestSealedFsmVersion(req.body.id);
            res.json(version);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });

    /**
     * @api {post} /api/machine/newVersion Creates a new version of the finite state machine if the latest version is sealed
     * @apiGroup Machine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The id of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "versionID": 1,
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/api/machine/newVersion', function (req, res) {
        debug("POST: /api/machine/newVersion");
        co(function*() {
            if (!req.body.id) {
                let message = "ID property is missing.";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            let version = yield engine.newVersion(req.body.id);
            res.json({
                versionID: version.id,
            });
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });

    /**
     * @api {post} /api/machine/getById Gets a state machine by its id
     * @apiGroup Machine
     * @apiSuccess {Object} data
     * @apiSuccess {String} data.name The name of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "name": "mymachine",
     *      "updated_at": "2016-02-10T15:46:51.778Z",
     *      "created_at": "2016-02-10T15:46:51.778Z"
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/api/machine/getById', function (req, res) {
        debug("POST: /api/machine/getById");
        co(function*(){
            if (!req.body.id) {
                let message = "ID property is missing.";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            let machine = yield engine.getFsmById(req.body.id);
            res.json(machine);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });

    /**
     * @api {post} /api/machine/getByName Gets a state machine by its name
     * @apiGroup Machine
     * @apiSuccess {Object} data
     * @apiSuccess {String} data.name The name of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "name": "mymachine",
     *      "updated_at": "2016-02-10T15:46:51.778Z",
     *      "created_at": "2016-02-10T15:46:51.778Z"
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/api/machine/getByName', function (req, res) {
        debug("POST: /api/machine/getByName");
        co(function*(){
            if (!req.body.name) {
                let message = "Name property is missing.";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            let machine = yield engine.getFsmById(req.body.name);
            res.json(machine);
        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
};
