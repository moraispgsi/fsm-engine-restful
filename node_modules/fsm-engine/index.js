/**
 * Created by Ricardo Morais on 12/04/2017.
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

module.exports = function (dialect, host, user, password, database, config) {

    //Load dependencies
    let co = require('co');               //For a easier promise handling experience
    let Sequelize = require('sequelize'); //For a ORM for the database
    let initCore = require('fsm-core');   //Get the fsm-core initializer function

    return co(function*(){

        let core = yield initCore(dialect, host, user, password, database, config);    //Initialize fsm-core
        core.moduleName = "fsm-engine"; //The name of the module

        require("./model")(Sequelize, core); //Build the engine model

        //Returns a promise that will sync the database definition and return the module interface
        return co(function*() {
            let engine = yield require("./engine")(core);  //Build and start the engine
            return engine; //Return this module interface
        });
    });
};

