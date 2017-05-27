module.exports = function (app, engine) {
    let debug = require("debug")("version-api");
    let co = require("co");
    app.post('/API/version/setSCXML', function (req, res) {
        co(function*(){
            try {
                debug("setSCXML");
                if (!req.body.id) {
                    debug("Error: " + "Missing the property id");
                    res.json({error: "Missing the property id"});
                }
                if (!req.body.scxml) {
                    debug("Error: " + "Missing the property scxml");
                    res.json({error: "Missing the property scxml"});
                }

                yield engine.meta.action.setScxml(req.body.id, req.body.scxml);
                res.sendStatus(200);
            } catch(err) {
                debug("Error: " + err);
                res.json({error: err});
            }
        }).then();
    });
    app.post('/API/version/seal', function (req, res) {
        co(function*(){
            try {
                debug("seal");
                if (!req.body.id) {
                    debug("Error: " + "Missing the property id");
                    res.json({error: "Missing the property id"});
                }
                yield engine.seal(req.body.id);
                res.sendStatus(200);
            } catch(err) {
                debug("Error: " + err);
                res.json({error: err});
            }
        }).then();
    });
    app.post('/API/version/allInstances', function (req, res) {
        co(function*(){
            try {
                debug("allInstances");
                if (!req.body.id) {
                    debug("Error: " + "Missing the property id");
                    res.json({error: "Missing the property id"});
                }
                let instances = yield engine.getInstancesByFsmId(req.body.id);
                res.json(instances);
            } catch(err) {
                debug("Error: " + err);
                res.json({error: err});
            }
        }).then();
    });
    app.post('/API/version/allRunningInstances', function (req, res) {
        co(function*(){
            try {
                debug("allRunningInstances");
                if (!req.body.id) {
                    debug("Error: " + "Missing the property id");
                    res.json({error: "Missing the property id"});
                }
                let instances = yield engine.getInstancesByFsmId(req.body.id);
                instances = instances.filter((instance)=>instance.hasStarted);
                res.json(instances);
            } catch(err) {
                debug("Error: " + err);
                res.json({error: err});
            }
        }).then();
    });
};