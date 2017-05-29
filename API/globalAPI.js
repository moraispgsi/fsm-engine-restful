/**
 * Created by Ricardo Morais on 16/05/2017.
 */
module.exports = function (app, engine) {
    let co = require("co");
    let debug = require("debug")("global-api");

    app.post('/API/global/sendEvent', function (req, res) {
        debug("POST: /API/global/sendEvent");
        co(function*() {
            yield engine.sendGlobalEvent(req.body.event, req.body.data);
            res.sendStatus(200);
        }).catch((err)=>{
            res.json({error: err});
        });
    });

    app.post('/API/global/turnSimulationOn', function (req, res) {
        debug("POST: /API/global/turnSimulationOn");
        co(function*(){
    	    //todo Method implementation

    	    res.sendStatus(200);
        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });

    app.post('/API/global/turnSimulationOff', function (req, res) {
        debug("POST: /API/global/turnSimulationOff");
        co(function*(){
    	    //todo Method implementation

    	    res.sendStatus(200);
        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });

    app.post('/API/global/setSimulationDate', function (req, res) {
        debug("POST: /API/global/setSimulationDate");
        co(function*(){
    	    //todo Method implementation

    	    res.sendStatus(200);
        }).catch((err)=> {
            debug("Error: " + err);
            res.json({error: err});
        });
    });
};
