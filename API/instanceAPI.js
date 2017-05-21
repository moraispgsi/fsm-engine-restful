/**
 * Created by Ricardo Morais on 16/05/2017.
 */
module.exports = function (app, engine) {
    let co = require("co");
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

    //Queries
    app.post('/API/instance/getInstancesByFsmId', function (req, res) {
        co(function*(){
            try {
                if(!req.body.id) {
                    res.sendStatus(400);
                    return;
                }
                res.json({
                    instanceIds: yield engine.meta.query.getInstancesByFsmId(req.body.id)
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
                    instanceIds: yield engine.meta.query.getInstancesByFsmName(req.body.name)
                });
            } catch(err) {
                res.json({error: err});
            }
        }).then();
    });
};
