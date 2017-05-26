/**
 * Created by Ricardo Morais on 16/05/2017.
 */
module.exports = function (app, engine) {
    let co = require("co");

    app.post('/API/instance/create', function (req, res) {
        co(function*(){
            try {
                if (typeof req.body.versionID !== "number") {
                    res.json({error: "Missing the property versionID"});
                    return;
                }
                let instance = yield engine.createInstance(req.body.versionID);
                res.json({
                    instanceID: instance.id,
                });
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

    app.post('/API/instance/start', function (req, res) {
        co(function*(){
            try {
                if(typeof req.body.instanceID !== 'number') {
                    res.send("Missing property instanceID");
                }
                let instance = engine.getInstance(req.body.instanceID);
                yield instance.start();
                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

    app.post('/API/instance/sendEvent', function (req, res) {
        co(function*(){
            try {
                if(typeof req.body.instanceID !== 'number') {
                    res.send("Missing property instanceID");
                }
                let instance = engine.getInstance(req.body.instanceID);
                yield instance.sendEvent(req.body.event, req.body.data);
                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

    app.post('/API/instance/getInstancesByFsmId', function (req, res) {
        co(function*(){
            try {
                if(!req.body.id) {
                    res.sendStatus(400);
                    return;
                }
                res.json({
                    instanceIds: yield engine.getInstancesByFsmId(req.body.id)
                });
                res.sendStatus(200);
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

    app.post('/API/instance/getInstancesByFsmName', function (req, res) {
        co(function*(){
            try {
                if(!req.body.name) {
                    res.sendStatus(400);
                    return;
                }
                res.json({
                    instanceIds: yield engine.getInstancesByFsmName(req.body.name)
                });
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });

    app.post('/API/instance/data', function (req, res) {
        try {
            if(!req.body.instanceID) {
                throw new Error("instanceID missing");
            }
            let instance = engine.getInstance(parseInt(req.body.instanceID));
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
};
