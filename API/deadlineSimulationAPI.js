module.exports = function (app, engine) {
    let co = require("co");
    let ejs = require('ejs');

    co(function*() {

        //Start simulation mode
        engine.enableSimulationMode(new Date());

        let rate = 1000;
        function tick(){
            let current = engine.getCurrentSimulationDate();
            engine.setCurrentSimulationDate(new Date(current.getTime() + rate));
        }

        let delay = 1000;
        let interval = setInterval(tick, delay);

        app.get('/API/simulation/deadline/timeline', function (req, res) {
            try {
                let html = ejs.renderFile("public/html/timeline.ejs", null, null, function (err, html) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400);
                        return;
                    }
                    res.send(html);
                });
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        });

        app.get('/API/simulation/deadline/instance', function (req, res) {
            try {
                if (!req.query.id) {
                    res.sendStatus(400);
                }

                let instance = engine.getInstance(req.query.id);
                let sc = instance.getStateChart();
                let snapshot = sc.getSnapshot();
                let datamodel = snapshot[3];
                let data = {
                    simulationDate: engine.getCurrentSimulationDate(),
                    deadline: {
                        id: req.query.id,
                        datamodel: datamodel
                    }
                };

                let html = ejs.renderFile("public/html/deadline.ejs", data, null, function (err, html) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(400);
                        return;
                    }
                    res.send(html);
                });
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        });

        app.get('/API/simulation/deadline/deadlines', function (req, res) {
            co(function*() {
                try {
                    let fsm = yield engine.meta.query.getFsmByName("deadline");
                    let version = yield engine.meta.query.getLatestSealedFsmVersion(fsm.dataValues.id);
                    let data = {
                        deadlineIds: yield engine.meta.query.getInstancesByFsmName("deadline"),
                        deadlineSCXML: version.dataValues.scxml
                    };
                    if (data.deadlineIds === void 0) {
                        data.deadlineIds = [];
                    }

                    let html = ejs.renderFile("public/html/deadlines.ejs", data, null, function (err, html) {
                        if (err) {
                            res.sendStatus(400);
                            return;
                        }
                        res.send(html);
                    });
                } catch (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
            }).then();
        });

        app.post('/API/simulation/deadline/create', function (req, res) {
            co(function*() {
                try {
                    //Validate the version id type
                    if (typeof req.body.versionID !== "number") {
                        res.json({error: "Missing the property versionID"});
                        return;
                    }

                    //Validate the date type
                    if (typeof req.body.date !== "string") {
                        res.json({error: "Missing the property"});
                        return;
                    }

                    //Validate the deadline id type
                    if (typeof req.body.deadlineID !== "number") {
                        res.json({error: "Missing the property"});
                        return;
                    }

                    let deadline = new Date(req.body.date);

                    //Create the instance using the finite-state machine version
                    let instance = yield engine.makeInstance(req.body.versionID);

                    //Start the instance
                    yield instance.start();

                    //Send the init event
                    instance.sendEvent("init", {
                        deadlineId: req.body.deadlineID,
                        date: deadline
                    });

                    //Return the instance id
                    res.json({
                        instanceID: instance.id,
                    });

                } catch (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
            }).then();
        });

        app.post('/API/simulation/deadline/extend', function (req, res) {
            co(function*() {
                try {
                    if (typeof req.body.instanceID !== "number") {
                        res.json({error: "missing id"});
                        return;
                    }
                    let instance = engine.getInstance(req.body.instanceID);

                    //Send the extension event to the finite-state machine
                    let extensionDate = new Date(req.body.date);
                    instance.sendEvent("extension", {extensionDate: extensionDate})
                    res.sendStatus(200);
                } catch (err) {
                    res.json({error: err});
                }
            }).then();
        });

        app.post('/API/simulation/deadline/cancel', function (req, res) {
            co(function*() {
                try {
                    if (typeof req.body.instanceID !== "number") {
                        res.json({error: "missing id"});
                        return;
                    }
                    let instance = engine.getInstance(req.body.instanceID);

                    //Send the extension event to the finite-state machine
                    let extensionDate = new Date(req.body.date);
                    instance.sendEvent("extension", {extensionDate: extensionDate})
                    res.sendStatus(200);
                } catch (err) {
                    res.json({error: err});
                }
            }).then();
        });

        app.post('/API/simulation/setCurrentDate', function (req, res) {
            co(function*() {
                try {
                    if (req.body.date === void 0) {
                        res.json({error: "missing id"});
                        return;
                    }
                    engine.setCurrentSimulationDate(new Date(req.body.date));
                    res.sendStatus(200);
                } catch (err) {
                    res.json({error: err});
                }
            }).then();
        });

        app.post('/API/simulation/setSpeed', function (req, res) {
            co(function*() {
                try {
                    if(req.body.speed === void 0) {
                        throw new Error("speed must exist");
                    }
                    rate = parseInt(req.body.speed);
                    res.sendStatus(200);
                } catch (err) {
                    res.json({error: err});
                }
            }).then();
        });

        app.post('/API/simulation/instance/data', function (req, res) {
            try {
                let instance = engine.getInstance(parseInt(req.body.instanceID));
                let sc = instance.getStateChart();
                let snapshot = sc.getSnapshot();
                let data = {
                    simulationDate: engine.getCurrentSimulationDate(),
                    deadline: {
                        id: req.query.id,
                        state: snapshot[0],
                        datamodel: snapshot[3]
                    }
                };
                res.json(data);
            } catch (err) {
                res.json({error: err});
            }
        });

    }).then();
};
