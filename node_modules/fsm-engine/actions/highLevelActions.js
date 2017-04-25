/**
 * Created by Ricardo Morais on 28/03/2017.
 */

let lowLevelActions = require('./lowLevelActions');

let $a = lowLevelActions.makeAction;
let $t = $a.transition;
let $i = (property) => $a.getInstanceProperty(property);
let $is = (property, value) => $a.setInstanceProperty(property, value);
let $d = (property) => $a.getDataProperty(property);
let $ds = (property, value) => $a.setDataProperty(property, value);
let $f = $a.getFixed;
let $seq = $a.actionSequence;
let $c = $a.context;
let $http = $a.httpRequest;
let $log = $a.log;

/*
high lever actions come in this format
{
    name: [string],
    actionArguments: {
       argName1: value1,
       argName2: value2
    }
}
 */
module.exports = {

    logme: function(context, data, actionArguments) {
        let title = actionArguments.title;
        let text = actionArguments.text;
        return $log(title, text)(context, data);
    },
    setInstanceProperty: function(context, actionArguments) {
        let prop = actionArguments.propertyName;
        let val = actionArguments.value;
        return $is(prop, val)(context, null);
    },


    // actions.timerLog = function(actionArguments) {
    //     let delay = actionArguments.delay;
    //     let timerID = actionArguments.timerID;
    //     let title = actionArguments.title;
    //     let text = actionArguments.text;
    //     return $is(timerID, $a.timeout(delay, $a.log(title, text)));
    // };
    // actions.cancelTimer = function(actionArguments){
    //     let timerID = actionArguments.timerID;
    //     return $a.cancelTimeout($i(timerID))(this, this.data);
    // }

};