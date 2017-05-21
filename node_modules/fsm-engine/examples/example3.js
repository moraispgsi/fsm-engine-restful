/**
 * Created by Ricardo Morais on 13/04/2017.
 */
let co = require('co');
let init = require("../index");

co(function*(){
    let fsmEngine = yield init('mysql', 'localhost', 'root', 'root', 'mydatabase', {logging: false});
    let instance = yield fsmEngine.makeInstance(1);
    // fsmEngine.getInstance(1);
    yield instance.start();
    let date = new Date();
    date.setSeconds(date.getSeconds() + 10);
    yield instance.sendEvent('init', {date: date, deadlineId: 1, now: new Date()});
    // instance.sc.gen("expired")
}).then();
