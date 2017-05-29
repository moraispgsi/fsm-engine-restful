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
            res.json({error: err});
        });
    });
    app.post('/API/fsm/create', function (req, res) {
        debug("POST: /API/fsm/create");
        co(function*() {
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
        debug("POST: /API/fsm/allVersions");
        co(function*() {
            if (!req.body.id) {
                debug("Error: ", "Missing the fsm id");
                res.json({error: "Missing the fsm id"});
            }
            let versions = yield engine.getFsmVersions(req.body.id);
            res.json({
                versions: versions
            });
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.post('/API/fsm/latestVersion', function (req, res) {
        debug("POST: /API/fsm/latestVersion");
        co(function*() {
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
        debug("POST: /API/fsm/latestSealedVersion");
        co(function*() {
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
        debug("POST: /API/fsm/newVersion");
        co(function*() {
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
    app.post('/API/fsm/getById', function (req, res) {
        debug("POST: /API/fsm/getById");
        co(function*(){
            if (!req.body.id) {
                debug("Error: ", "Missing the fsm id");
                res.json({error: "Missing the fsm id"});
            }
            let fsm = yield engine.getFsmById(req.body.id);
            res.json(fsm);
        }).then().catch((err) => {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
    app.post('/API/fsm/getByName', function (req, res) {
        debug("POST: /API/fsm/getByName");
        co(function*(){
            if (!req.body.name) {
                debug("Error: ", "Missing the fsm name");
                res.json({error: "Missing the fsm name"});
            }
            let fsm = yield engine.getFsmById(req.body.name);
            res.json(fsm);
        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
};
