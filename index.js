/**
 * Created by Ricardo Morais on 14/04/2017.
 */


//    ad88                                                                                 88
//   d8"                                                                                   ""
//   88
// MM88MMM  ,adPPYba,  88,dPYba,,adPYba,              ,adPPYba,  8b,dPPYba,    ,adPPYb,d8  88  8b,dPPYba,    ,adPPYba,
//   88     I8[    ""  88P'   "88"    "8a  aaaaaaaa  a8P_____88  88P'   `"8a  a8"    `Y88  88  88P'   `"8a  a8P_____88
//   88      `"Y8ba,   88      88      88  """"""""  8PP"""""""  88       88  8b       88  88  88       88  8PP"""""""
//   88     aa    ]8I  88      88      88            "8b,   ,aa  88       88  "8a,   ,d88  88  88       88  "8b,   ,aa
//   88     `"YbbdP"'  88      88      88             `"Ybbd8"'  88       88   `"YbbdP"Y8  88  88       88   `"Ybbd8"'
//                                                                             aa,    ,88
//                                                                              "Y8bbdP"
//                                                ad88               88
//                                      ,d       d8"                 88
//                                      88       88                  88
// 8b,dPPYba,   ,adPPYba,  ,adPPYba,  MM88MMM  MM88MMM  88       88  88
// 88P'   "Y8  a8P_____88  I8[    ""    88       88     88       88  88
// 88          8PP"""""""   `"Y8ba,     88       88     88       88  88
// 88          "8b,   ,aa  aa    ]8I    88,      88     "8a,   ,a88  88
// 88           `"Ybbd8"'  `"YbbdP"'    "Y888    88      `"YbbdP'Y8  88
//

let co = require('co');
let init = require("fsm-engine");
co(function*(){
    let engine = yield init(
        process.env.DIALECT,
        process.env.DATABASE_HOST,
        process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD,
        process.env.DATABASE_NAME,
        {logging: false, port: process.env.DATABASE_PORT},
        process.env.ACTION_DISPATCHER_HOST
    );

    let kue = require('kue')
        , queue = kue.createQueue();

    queue.process('email', function(job, done){
        email(job.data.to, done);
    });

    function email(address, done) {
        if(!isValidEmail(address)) {
            //done('invalid to address') is possible but discouraged
            return done(new Error('invalid to address'));
        }
        // email send stuff...
        done();
    }

    let express = require('express');
    let app = express();
    let bodyParser = require('body-parser');
    app.use(bodyParser.json());         // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    // app.use(express.static('public'));
    app.all('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    //API
    require("./API/fsmAPI")(app, engine);
    require("./API/versionAPI")(app, engine);
    require("./API/instanceAPI")(app, engine);
    require("./API/globalAPI")(app, engine);

    //Start the server
    let server = app.listen(process.env.PORT || 8081, process.env.HOST || '0.0.0.0', function () {
        let host = server.address().address;
        let port = server.address().port;
        console.log("listening at http://%s:%s", host, port)
    });

}).then().catch(function(err){
    console.log(err);
});

