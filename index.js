/**
 * Created by Ricardo Morais on 14/04/2017.
 */

let co = require('co');
let init = require("fsm-engine");

co(function*(){
    let engine = yield init('mysql', 'localhost', 'root', 'root', 'mydatabase', {logging: false});
    let express = require('express');
    let app = express();
    let bodyParser = require('body-parser');
    app.use(bodyParser.json());         // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.use(express.static('public'));

    //API
    require("./API/deadlineSimulationAPI")(app, engine);
    require("./API/fsmAPI")(app, engine);
    require("./API/versionAPI")(app, engine);
    require("./API/instanceAPI")(app, engine);
    require("./API/globalAPI")(app, engine);

    //Start the server
    let server = app.listen(8081, '0.0.0.0', function () {
        let host = server.address().address;
        let port = server.address().port;
        console.log("listening at http://%s:%s", host, port)
    });

}).then().catch(function(err){
    console.log(err);
});

