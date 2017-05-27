/**
 * Created by Ricardo Morais on 16/05/2017.
 */
module.exports = function (app, engine) {
    let debug = require("debug")("fsm-api");
    let co = require("co");
    app.post('/API/fsm/create', function (req, res) {
        co(function*() {
            debug("create");
            if (!req.body.name) {
                debug("Error: ", "missing the name for the fsm");
                res.json({error: "missing the name for the fsm"});
            }
            let data = yield engine.createFSM(req.body.name);
            res.json({
                fsmID: data.fsm.id,
                versionID: data.version.id,
            });
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.post('/API/fsm/allVersions', function (req, res) {
        co(function*() {
            debug("allVersions");
            if (!req.body.id) {
                debug("Error: ", "Missing the fsm id");
                res.json({error: "Missing the fsm id"});
            }
            let versions = yield engine.getFsmVersions(req.body.id);
            res.json(versions);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.post('/API/fsm/latestVersion', function (req, res) {
        co(function*() {
            debug("latestVersion");
            if (!req.body.id) {
                debug("Error: ", "Missing the fsm id");
                res.json({error: "Missing the fsm id"});
            }
            let version = yield engine.getLatestFsmVersion(req.body.id);
            res.json(version);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.post('/API/fsm/latestSealedVersion', function (req, res) {
        co(function*() {
            debug("latestSealedVersion");
            if (!req.body.id) {
                debug("Error: ", "Missing the fsm id");
                res.json({error: "Missing the fsm id"});
            }
            let version = yield engine.getLatestSealedFsmVersion(req.body.id);
            res.json(version);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.post('/API/fsm/newVersion', function (req, res) {
        co(function*() {
            debug("newVersion");
            if (!req.body.id) {
                debug("Error: ", "Missing the fsm id");
                res.json({error: "Missing the fsm id"});
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
};
