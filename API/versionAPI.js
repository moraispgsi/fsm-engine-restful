module.exports = function (app, engine) {
    let co = require("co");
    app.post('/API/version/setSCXML', function (req, res) {
        co(function*(){
            try {
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
    app.post('/API/version/seal', function (req, res) {
        co(function*(){
            try {
                if (typeof req.body.versionID !== "number") {
                    res.send(400);
                    res.json({error: "Missing the property versionID"});
                }
                yield engine.seal(req.body.versionID);
                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });
    app.post('/API/version/allInstances', function (req, res) {
        co(function*(){
            try {
                //todo Method implementation

                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });
    app.post('/API/version/allRunningInstances', function (req, res) {
        co(function*(){
            try {
                //todo Method implementation

                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });
};