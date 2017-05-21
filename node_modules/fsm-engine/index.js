/**
 * Created by Ricardo Morais on 12/04/2017.
 */

//  ______   ______     __    __           ______     __   __     ______     __     __   __     ______
// /\  ___\ /\  ___\   /\ "-./  \         /\  ___\   /\ "-.\ \   /\  ___\   /\ \   /\ "-.\ \   /\  ___\
// \ \  __\ \ \___  \  \ \ \-./\ \        \ \  __\   \ \ \-.  \  \ \ \__ \  \ \ \  \ \ \-.  \  \ \  __\
//  \ \_\    \/\_____\  \ \_\ \ \_\        \ \_____\  \ \_\\"\_\  \ \_____\  \ \_\  \ \_\\"\_\  \ \_____\
//   \/_/     \/_____/   \/_/  \/_/         \/_____/   \/_/ \/_/   \/_____/   \/_/   \/_/ \/_/   \/_____/


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

