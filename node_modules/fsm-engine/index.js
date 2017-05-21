/**
 * Created by Ricardo Morais on 12/04/2017.
 */

module.exports = function (dialect, host, user, password, database, config) {

    //Load dependencies
    let co = require('co');                                         //For a easier promise handling experience
    let Sequelize = require('sequelize');                           //For a ORM for the database
    let initCore = require('fsm-core');                             //Get the fsm-core initializer function

    return co(function*(){


        let fsmCore = yield initCore(dialect, host, user, password, database, config);    //Initialize fsm-core

        let meta = {};
        meta.sequelize = fsmCore.sequelize;
        meta.moduleName = "fsm-engine"; //The name of the module
        meta.model = fsmCore.model;     //Stores the model definitions
        meta.query = fsmCore.query;     //Stores the functions that query the database
        meta.action = fsmCore.action;   //Stores the actions available
        meta.utils = fsmCore.utils;     //Stores utility facilities

        require("./model")(Sequelize, meta);    //Build the engine model
        require("./queries")(meta);  //Build the engine model queries

        //Returns a promise that will sync the database definition and return the module interface
        return co(function*() {

            let engine = yield require("./engine")(meta);  //Build and start the engine

            //Return this module interface
            return engine;
        });
    });
};

