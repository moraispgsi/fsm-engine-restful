/**
 * Created by Ricardo Morais on 16/05/2017.
 */
module.exports = function (app, engine) {
    let debug = require("debug")("fsm-api");
    let co = require("co");
    app.post('/API/fsm/all', function (req, res) {
        debug("POST: /API/fsm/all");
        co(function*(){
            let fsms = yield engine.getAllFsms();
            res.json({
                fsms: fsms
            });
        }).catch((err)=> {
            debug("Error: " + err);
            let message = "Could not get the state machines.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /API/fsm/create Creates a new state machine
     * @apiGroup StateMachine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.name The name of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "fsmID": 1,
     *      "versionID": 1,
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/fsm/create', function (req, res) {
        debug("POST: /API/fsm/create");
        co(function*() {
            if (!req.body.name) {
                let message = "Name property is missing.";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            let data = yield engine.createFSM(req.body.name);
            res.json({
                fsmID: data.fsm.id,
                versionID: data.version.id,
            });
        }).then().catch((err) => {
            debug("Error: " + err);
            let message = "Could not create the state machines.";
            res.status(500).send({message});
        });
    });

    /**
     * @api {post} /API/fsm/allVersions Gets all the versions of the state machine
     * @apiGroup StateMachine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The id of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    [
     *       {
     *         "id": 2,
     *         "fsmID": 1,
     *         "isSealed": false,
     *         "scxml": "<scxml></scxml>",
     *         "parentVersionID": 1,
     *         "updated_at": "2016-02-10T15:46:51.778Z",
     *         "created_at": "2016-02-10T15:46:51.778Z"
     *       }, {
     *         "id": 3,
     *         "fsmID": 1,
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
    app.post('/API/fsm/allVersions', function (req, res) {
        debug("POST: /API/fsm/allVersions");
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
     * @api {post} /API/fsm/latestVersion Gets the latest version of the state machine
     * @apiGroup StateMachine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The id of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 2,
     *      "fsmID": 1,
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
    app.post('/API/fsm/latestVersion', function (req, res) {
        debug("POST: /API/fsm/latestVersion");
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
     * @api {post} /API/fsm/latestSealedVersion Gets the latest sealed version of the state machine
     * @apiGroup StateMachine
     * @apiSuccess {Object} data
     * @apiSuccess {Number} data.id The id of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 2,
     *      "fsmID": 1,
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
    app.post('/API/fsm/latestSealedVersion', function (req, res) {
        debug("POST: /API/fsm/latestSealedVersion");
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
     * @api {post} /API/fsm/newVersion Creates a new version of the finite state machine if the latest version is sealed
     * @apiGroup StateMachine
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
    app.post('/API/fsm/newVersion', function (req, res) {
        debug("POST: /API/fsm/newVersion");
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
     * @api {post} /API/fsm/getById Gets a state machine by its id
     * @apiGroup StateMachine
     * @apiSuccess {Object} data
     * @apiSuccess {String} data.name The name of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "name": "myfsm",
     *      "updated_at": "2016-02-10T15:46:51.778Z",
     *      "created_at": "2016-02-10T15:46:51.778Z"
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/fsm/getById', function (req, res) {
        debug("POST: /API/fsm/getById");
        co(function*(){
            if (!req.body.id) {
                let message = "ID property is missing.";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            let fsm = yield engine.getFsmById(req.body.id);
            res.json(fsm);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });

    /**
     * @api {post} /API/fsm/getByName Gets a state machine by its name
     * @apiGroup StateMachine
     * @apiSuccess {Object} data
     * @apiSuccess {String} data.name The name of the state machine
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 200 OK
     *    {
     *      "id": 1,
     *      "name": "myfsm",
     *      "updated_at": "2016-02-10T15:46:51.778Z",
     *      "created_at": "2016-02-10T15:46:51.778Z"
     *    }
     * @apiErrorExample {json} List error
     *    HTTP/1.1 500 Internal Server Error
     *    {
     *      "Message": "error message"
     *    }
     */
    app.post('/API/fsm/getByName', function (req, res) {
        debug("POST: /API/fsm/getByName");
        co(function*(){
            if (!req.body.name) {
                let message = "Name property is missing.";
                debug("Error: " + message);
                res.status(500).send({message});
                return;
            }
            let fsm = yield engine.getFsmById(req.body.name);
            res.json(fsm);
        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
};
