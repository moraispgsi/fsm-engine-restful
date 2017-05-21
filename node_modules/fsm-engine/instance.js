/**
 * Created by Ricardo Morais on 24/04/2017.
 */

let co = require('co');
let SNAPSHOT_DELAY = 100000000;       //The delay
/**
 * The instance class
 */
class Instance {

    constructor(core, sc, id) {
        this.sc = sc;
        this.id = id;
        this.core = core;
    }

    /**
     * Creates a instance snapshot
     * @returns {Promise} A Promise to save a snapshot of the instance in the database
     * @private
     */
    _saveInstance() {
        return co(function*() {
            //Take a snapshot of the instance
            let snapshot = JSON.stringify(this.sc.getSnapshot());
            //Get last snapshot on the database
            let snapRow = yield this.core.model.snapshot.findOne({
                where: {
                    instanceID: this.id
                },
                order: [ [ 'createdAt', 'DESC' ] ]
            });

            //if the last snapshot equals this one => do nothing
            if(snapRow && snapRow.dataValues.snapshot === snapshot){
                return;
            }

            //Create the snapshot
            yield this.core.model.snapshot.create({
                instanceID: this.id,
                snapshot: snapshot
            });

        }.bind(this));
    }

    /**
     * Starts the instance
     * @returns {Promise} A Promise that starts the instance
     */
    start() {
        return co(function*() {
            yield this._saveInstance();  //Saves the first snapshot
            this.sc.on("onSmallStepBegin", ()=>{this.stepped = true});
            this.sc.on("onSmallStepEnd", ()=>{this.stepped = true});
            this.sc.start();                    //Start the statechart
            this.interval = setInterval(function(){
                if(this.sc === null) {
                    clearInterval(this.interval);
                    return;
                }
                if(this.sc.isFinal()){
                    this.core.model.instance.update({
                        hasEnded: true
                    }, {where:{id:this.id}}).then();
                    return;
                }
                if(!this.sc._isStepping && this.stepped){
                    this._saveInstance().then();
                    this.stepped = false;
                }
            }.bind(this), 1000);

            //Since it hasn't started yet mark it as started
            yield this.core.model.instance.update({hasStarted: true}, {where: {id: this.id}});
        }.bind(this));
    }

    /**
     * Gets the instance statechart
     * @returns {object} The statechart of this instance
     */
    getStateChart() {
        return this.sc;
    }

    /**
     * Gets the the instance ID
     * @returns {Integer} The ID of the instance
     */
    getId() {
        return this.id;
    }

    /**
     * Checks if the instance has started
     * @returns {Promise} A Promise to return true if the instance has started and false if it hasn't
     */
    hasStarted() {
        return co(function*(){
            let instance = yield this.core.model.instance.findById(this.id);
            return instance.dataValues.hasStarted;
        }.bind(this));
    }

    /**
     * Checks if the instance has ended
     * @returns {Promise} A Promise to return true if the instance has ended and false if it hasn't
     */
    hasEnded() {
        return co(function*(){
            let instance = yield this.core.model.instance.findById(this.id);
            return instance.dataValues.hasStarted;
        }.bind(this));
    }

    /**
     * Reverts an instance to a previous snapshot
     * @param snapshotID The ID of the snapshot
     */
    revert(snapshotID) {
        //todo
        //kill the stateChart(HOW) > Create a new statechart > start the instance
        return co(function*(){

        });
    }

    /**
     * Sends an event to the statechart
     * @param eventName The name of the event
     * @param data The data of the event
     */
    sendEvent(eventName, data) {
        return co(function*(){
            //Find out if the instance has already started
            if(!(yield this.hasStarted())) {
                throw new Error("The instance hasn't started yet.");
            }
            data = data || {};
            data.name = eventName;
            this.sc.gen(data);
        }.bind(this));
    }
}

module.exports = Instance;
