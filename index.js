/**
 * Created by Ricardo Morais on 14/04/2017.
 */

let co = require('co');
let init = require("fsm-engine");

co(function*(){

    let fsmEngine = yield init('mysql', 'mysql.fsm-engine-restful.svc', 'root', 'root', 'mydatabase');
    let express = require('express');
    let app = express();
    let bodyParser = require('body-parser');
    app.use(bodyParser.json());         // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

    app.post('/API/model/createFSM', function (req, res) {

        if(typeof req.body.name !== "string"){
            res.send(400);
            res.json({error: "Missing the name for the FSM"});
        }

        co(function*(){

            try {
                let data = yield fsmEngine.meta.action.createFSM(req.body.name);
                res.json({
                    fsmID: data.fsm.dataValues.id,
                    versionID: data.version.dataValues.id,
                });
            } catch(err) {
                res.send(400);
                res.json({ error: error });
            }

        }).then();
    });

    app.post('/API/model/setSCMXL', function (req, res) {

        if(typeof req.body.versionID !== "number"){
            res.send(400);
            res.json({error: "Missing the property versionID"});
        }

        if(typeof req.body.scxml !== "string"){
            res.send(400);
            res.json({error: "Missing the property scxml"});
        }

        co(function*(){

            try {
                let data = yield fsmEngine.meta.action.setScxml(req.body.versionID, req.body.scxml);
                res.json({
                    fsmID: data.fsm.dataValues.id,
                    versionID: data.version.dataValues.id,
                });
            } catch(err) {
                res.send(400);
                res.json({ error: error });
            }

        }).then();
    });

    app.post('/API/model/fork', function (req, res) {

        if(typeof req.body.versionID !== "number"){
            res.send(400);
            res.json({error: "Missing the property versionID"});
        }

        co(function*(){

            try {
                let version = yield fsmEngine.meta.action.fork(req.body.versionID);
                res.json({
                    versionID: version.dataValues.id,
                });
            } catch(err) {
                res.send(400);
                res.json({ error: error });
            }

        }).then();

    });

    app.post('/API/model/clone', function (req, res) {

        if (typeof req.body.versionID !== "number") {
            res.send(400);
            res.json({error: "Missing the property versionID"});
        }

        if (typeof req.body.fsmName !== "string") {
            res.send(400);
            res.json({error: "Missing the property fsmName"});
        }

        co(function*() {

            try {
                let data = yield fsmEngine.meta.action.clone(req.body.versionID, req.body.fsmName);
                res.json({
                    versionID: data.version.dataValues.id,
                    fsmID: data.fsm.dataValues.id,
                });
            } catch (err) {
                res.send(400);
                res.json({error: error});
            }

        }).then();
    });

    app.post('/API/model/seal', function (req, res) {

        if(typeof req.body.versionID !== "number"){
            res.send(400);
            res.json({error: "Missing the property versionID"});
        }

        co(function*(){

            try {
                yield fsmEngine.meta.action.seal(req.body.versionID);
                res.sendStatus(200);
            } catch(err) {
                res.send(400);
                res.json({ error: error });
            }

        }).then();
    });

    app.post('/API/instance/create', function (req, res) {

        if(typeof req.body.versionID !== "number"){
            res.send(400);
            res.json({error: "Missing the property versionID"});
        }

        co(function*(){
            try {
                let instance = yield fsmEngine.makeInstance(req.body.versionID);
                res.json({
                    instanceID: instance.id,
                });
            } catch(err) {
                res.sendStatus(500);
            }
        }).then();

    });

    app.post('/API/instance/start', function (req, res) {

        if(typeof req.body.instanceID !== 'number') {
            res.sendStatus(400);
            res.send("Missing property instanceID");
        }

        co(function*(){
            try {
                let instance = yield fsmEngine.getInstance(req.body.instanceID);
                yield instance.start();
                res.sendStatus(200);
            } catch(error){
                res.sendStatus(500);
            }
        }).then();

    });

    app.post('/API/instance/sendLocalEvent', function (req, res) {

        //todo validate
        if(typeof req.body.instanceID !== 'number') {
            res.sendStatus(400);
            res.send("Missing property instanceID");
        }

        co(function*(){
            try {
                let instance = yield fsmEngine.getInstance(req.body.instanceID);
                yield instance.sendEvent(req.body.event, req.body.data);
                res.sendStatus(200);
            } catch(error){
                res.sendStatus(500);
            }
        }).then();

    });

    app.post('/API/instance/sendGlobalEvent', function (req, res) {
        //todo validate
        co(function*(){
            try {
                yield fsmEngine.sendGlobalEvent(req.body.event, req.body.data);
                res.sendStatus(200);
            } catch(error){
                res.sendStatus(500);
            }
        }).then();
    });
    //todo - send global event
    //todo - send local event

    //Start the server
    let server = app.listen(8081, function () {
        let host = server.address().address;
        let port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port)
    });

}).then();

