/**
 * Created by Ricardo Morais on 16/05/2017.
 */
module.exports = function (app, engine) {
    let co = require("co");
    app.post('/API/fsm/create', function (req, res) {
        co(function*(){
            try {
                if(typeof req.body.name !== "string"){
                    res.json({error: "Missing the name for the FSM"});
                }
                let data = yield engine.createFSM(req.body.name);
                res.json({
                    fsmID: data.fsm.id,
                    versionID: data.version.id,
                });
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });
    app.post('/API/fsm/allVersions', function (req, res) {
        co(function*(){
            try {
                //todo
                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });
    app.post('/API/fsm/latestVersion', function (req, res) {
        co(function*(){
            try {
                //todo
                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });
    app.post('/API/fsm/latestSealedVersion', function (req, res) {
        co(function*(){
            try {
                //todo
                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });
    app.post('/API/fsm/newVersion', function (req, res) {
        co(function*(){
            try {
                if (typeof req.body.versionID !== "number") {
                    res.send(400);
                    res.json({error: "Missing the property versionID"});
                }
                let version = yield engine.newVersion(req.body.versionID);
                res.json({
                    versionID: version.id,
                });
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });
};
