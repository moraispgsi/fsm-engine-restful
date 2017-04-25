/**
 * Created by Ricardo Morais on 12/04/2017.
 */

module.exports = function (dialect, host, user, password, database) {

    //Load dependencies
    let co = require('co');                                         //For a easier promise handling experience
    let Sequelize = require('sequelize');                           //For a ORM for the database
    let init = require('fsm-core');                                 //Get the fsm-core initializer function
    let scxml = require('scxml');                                   //The scion library
    let Instance = require('./instance');
    let highLevelActions = require('./actions/highLevelActions');   //The high level actions

    return co(function*(){

        let fsmCore = yield init(dialect, host, user, password, database);    //Initialize fsm-core
        let SNAPSHOT_DELAY = 100;       //The delay
        let instanceStore = {};         //Storing the Finite-state machine instances in an object
        let tablePrefix = "FsmEngine";  //The prefix of every table in the database

        let meta = {};
        meta.sequelize = fsmCore.sequelize;
        meta.moduleName = "fsm-engine"; //The name of the module
        meta.model = fsmCore.model;     //Stores the model definitions
        meta.query = fsmCore.query;     //Stores the functions that query the database
        meta.action = fsmCore.action;   //Stores the actions available
        meta.utils = fsmCore.utils;     //Stores utility facilities

        //The instance table that holds all the Finite-state machine instances
        meta.model.instance = meta.sequelize.define(tablePrefix + 'Instance', {
            versionID: {type: Sequelize.INTEGER, allowNull: false},
            hasStarted: {type: Sequelize.BOOLEAN, allowNull: false, default: false},
            hasEnded: {type: Sequelize.BOOLEAN, allowNull: false, default: false}
        }, {
            freezeTableName: true,
            underscoredAll: false
        });

        //The instance snapshot table holds the snapshots taken from the instance
        meta.model.snapshot = meta.sequelize.define(tablePrefix + 'Snapshot', {
            instanceID: {type: Sequelize.INTEGER, allowNull: false},
            snapshot: {type: Sequelize.TEXT, allowNull: false}
        }, {
            freezeTableName: true,
            underscoredAll: false
        });

        //The relationship between the instance and the Finite-state machine model version
        meta.model.instance.belongsTo(meta.model.version, {
            foreignKey: 'versionID',
            constraints: false,
            onDelete: 'CASCADE'
        });

        //The relationship between snapshots and instances
        meta.model.snapshot.belongsTo(meta.model.instance, {
            foreignKey: 'instanceID',
            constraints: false,
            onDelete: 'CASCADE'
        });


        /**
         * Creates a SCION state chart with the versionID and optionally with a snapshot
         * @param versionID The Finite-state machine version
         * @param snapshot A snapshot of the state of the statechart
         * @returns {Promise} A Promise to create a SCION statechart and return it
         * @private
         */
        function _makeStateChart(versionID, snapshot) {
            return co(function*() {

                //Make sure the version is sealed
                let isVersionSealed = yield meta.query.isVersionSealed(versionID);
                if(!isVersionSealed){
                    throw new Error("The Finite-state machine version is not sealed");
                }

                let version = yield meta.model.version.findById(versionID); //Find the version with the versionID
                let scxmlDocumentString = version.dataValues.scxml;            //Get the SCXML document from the version

                //Create the SCION model from the SCXML document
                let model = yield new Promise((resolve, reject) => {
                    scxml.documentStringToModel(null, scxmlDocumentString, function (err, model) {
                        if (err) {
                            reject(err);
                        }
                        resolve(model);
                    });
                }).then();

                //Define the sandbox for the v8 virtual machine
                let sandbox = {
                    /**
                     * The object that will hold the properties of the instance
                     */
                    properties: {},
                    /**
                     * The function that will process the custom actions
                     * @param message
                     */
                    postMessage: function (message) {
                        let actionName = message.data["$type"];
                        let action = highLevelActions[actionName];
                        action(sandbox, message._event, message.data);
                    }
                };

                //Create the SCION-CORE fnModel to use in its interpreter
                let fnModel = yield new Promise((resolve, reject) => {
                    model.prepare(function (err, fnModel) {
                        if (err) {
                            reject(err);
                        }
                        resolve(fnModel);
                    }, sandbox);
                }).then();

                //Instantiate the interpreter
                return new scxml.scion.Statechart(fnModel, {snapshot: snapshot});
            });
        }

        /**
         * Creates the instance object based on a versionID and a Statechart
         * @param versionID The Finite-state machine Version ID
         * @param sc The SCION-CORE Statechart
         * @returns {Promise} A Promise that creates an instance object and returns it
         * @private
         */
        function _makeInstance(versionID, sc) {
            return co(function*() {
                //start the interpreter
                let instanceRow = yield meta.model.instance.create({
                    versionID: versionID,
                    hasStarted: false,
                    hasEnded: false
                });
                let instanceID = instanceRow.dataValues.id;
                let instance = new Instance(meta, sc, instanceID);
                instanceStore[instanceID] = instance;
                return instance;
            })
        }

        /**
         * Creates a new instance based on the version
         * @param versionID The Finite-state machine version to use as the model
         * @returns {Promise} A Promise that creates an instance from a Finite-state machine versin and returns an instance
         * object
         */
        function makeInstance(versionID) {
            return co(function*() {
                let sc = yield _makeStateChart(versionID);
                return yield _makeInstance(versionID, sc);
            });
        }

        /**
         * Gets a instance object from its ID
         * @param id The id of the instance object
         * @returns {Instance} The instance with the specified ID
         */
        function getInstance(id) {
            if (!instanceStore[id]) {
                throw new Error("Instance not found");
            }
            return instanceStore[id];
        }

        /**
         * Send a global event to all the instances
         * @param eventName The name of the event to send
         * @param data The data to send
         * @returns {Promise} A Promise to send the global event
         */
        function sendGlobalEvent(eventName, data) {
            return co(function*(){
                for (let property in instanceStore) {
                    if (instanceStore.hasOwnProperty(property)) {
                        let instance = instanceStore[property];
                        if(yield instance.hasStarted()){
                            yield instance.sendEvent(eventName, data);
                        }
                    }
                }
            });
        }

        //Returns a promise that will sync the database definition and return the module interface
        return co(function*() {
            yield meta.sequelize.sync();  //Synchronize the database with the database model definition
            //Find all the instances that didn't end yet in order to restart their execution process
            let instances = yield meta.model.instance.findAll({
                where: {
                    hasEnded: false
                }
            });

            //Iterating over the instances in order to restart them
            for (let instanceRow of instances) {
                let versionID = instanceRow.dataValues.versionID;   //Get the versionID
                //Find the latest Snapshot of the instance
                let latestSnapshot = yield meta.model.snapshot.findOne({
                    where: {
                        instanceID: instanceRow.dataValues.id
                    },
                    order: [ [ 'updatedAt', 'DESC' ]]
                });

                //The snapshot is parsed as JSON or is null if none was found
                let snapshot = latestSnapshot ? JSON.parse(latestSnapshot.dataValues.snapshot) : null;
                let sc = yield _makeStateChart(versionID, snapshot);        //Creates the StateChart using the snapshot
                let instance = new Instance(meta, sc, instanceRow.dataValues.id); //Creates an instance object

                //If the instance was already started we need to restart it now
                if(instanceRow.dataValues.hasStarted){
                    instance.startSnapshotInterval();
                }

                instanceStore[instance.id] = instance; //Store the instance in the instanceStore
            }



            //Return this module interface
            return {
                meta: meta,
                makeInstance: makeInstance,
                getInstance: getInstance
            }
        });

    });

};

