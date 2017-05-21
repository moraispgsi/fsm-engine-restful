module.exports = function (app, engine) {
    let co = require("co");
    app.post('/API/version/setSCXML', function (req, res) {
        co(function*(){
            try {
                //todo Method implementation
                if (typeof req.body.versionID !== "number") {
                    res.json({error: "Missing the property versionID"});
                }
                if (typeof req.body.scxml !== "string") {
                    res.json({error: "Missing the property scxml"});
                }

                let data = yield engine.meta.action.setScxml(req.body.versionID, req.body.scxml);
                res.json({
                    fsmID: data.fsm.dataValues.id,
                    versionID: data.version.dataValues.id,
                });

                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

    app.post('/API/version/getSCXML', function (req, res) {
        co(function*() {
            try {
                //todo Method implementation

                res.sendStatus(200);
            } catch (err) {
                res.json({error: err});
            }
        }).then();
    });

    app.post('/API/version/fork', function (req, res) {
        co(function*(){
            try {
                if (typeof req.body.versionID !== "number") {
                    res.send(400);
                    res.json({error: "Missing the property versionID"});
                }
                let version = yield engine.meta.action.fork(req.body.versionID);
                res.json({
                    versionID: version.dataValues.id,
                });
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

    app.post('/API/version/clone', function (req, res) {
        co(function*(){
            try {
                if (typeof req.body.versionID !== "number") {
                    res.send(400);
                    res.json({error: "Missing the property versionID"});
                }
                if (typeof req.body.fsmName !== "string") {
                    res.send(400);
                    res.json({error: "Missing the property fsmName"});
                }
                let data = yield engine.meta.action.clone(req.body.versionID, req.body.fsmName);
                res.json({
                    versionID: data.version.dataValues.id,
                    fsmID: data.fsm.dataValues.id,
                });
                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

    app.post('/API/version/seal', function (req, res) {
        co(function*(){
            try {
                if (typeof req.body.versionID !== "number") {
                    res.send(400);
                    res.json({error: "Missing the property versionID"});
                }
                yield engine.meta.action.seal(req.body.versionID);
                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

    app.post('/API/version/createInstance', function (req, res) {
        co(function*(){
            try {
                //todo Method implementation
                if (typeof req.body.versionID !== "number") {
                    res.json({error: "Missing the property versionID"});
                    return;
                }
                let instance = yield engine.makeInstance(req.body.versionID);
                res.json({
                    instanceID: instance.id,
                });
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

    //Queries
    app.post('/API/version/getVersionsByFsmName', function (req, res) {
        co(function*(){
            try {
                //todo
                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

    app.post('/API/version/getVersionsByFsmId', function (req, res) {
        co(function*(){
            try {
                //todo
                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

};