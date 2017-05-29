/**
 * Created by Ricardo Morais on 16/05/2017.
 */
module.exports = function (app, engine) {
    let debug = require("debug")("instance-api");
    let co = require("co");

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
            res.json({error: err});
        });
    });
    //Creates an instance using the version id
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
            res.json({error: err});
        });
    });
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
            res.json({error: err});
        });
    });
    app.post('/API/instance/start', function (req, res) {
        co(function*() {
            if (!req.body.id) {
                debug("Error: " + "Missing the property id");
                res.json({error: "Missing the property id"});
                return;
            }
            let instance = engine.getInstance(req.body.id);
            yield instance.start();
            res.sendStatus(200);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.post('/API/instance/sendEvent', function (req, res) {
        co(function*() {
            if (!req.body.id) {
                debug("Error: " + "Missing the property id");
                res.send("Missing property instanceID");
            }
            let instance = engine.getInstance(req.body.id);
            yield instance.sendEvent(req.body.event, req.body.data);
            res.sendStatus(200);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.post('/API/instance/all', function (req, res) {
        co(function*() {
            let instances = yield engine.getAllInstances();
            res.json({
                instances: instances
            });
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.post('/API/instance/allRunning', function (req, res) {
        co(function*() {
            //todo
            res.sendStatus(500);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.post('/API/instance/allStopped', function (req, res) {
        co(function*() {
            //todo
            res.sendStatus(500);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
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
            res.json({error: err});
        }
    });
    app.post('/API/instance/revert', function (req, res) {
        co(function*() {
            //todo

            res.sendStatus(500);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
};
