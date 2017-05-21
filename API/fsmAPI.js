/**
 * Created by Ricardo Morais on 16/05/2017.
 */
module.exports = function (app, engine) {
    let co = require("co");
    app.post('/API/fsm/createFSM', function (req, res) {
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
    app.post('/API/fsm/getAllVersions', function (req, res) {
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
