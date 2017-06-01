module.exports = function (app, engine) {
    let debug = require("debug")("version-api");
    let co = require("co");
    process.on('uncaughtException', function (err) {
        console.error(err);
        console.log("Node NOT Exiting...");
    });
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