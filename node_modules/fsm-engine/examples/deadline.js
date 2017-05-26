/**
 * Created by Ricardo Morais on 13/04/2017.
 */
let co = require('co');
let init = require("../index");

co(function*(){
    let engine = yield init('mysql', 'localhost', 'root', 'root', 'mydatabase', {logging: false});
    let fsm = yield engine.getFsmByName("deadline");
    let version = yield engine.getLatestSealedFsmVersion(fsm.id);
    let instance = yield engine.createInstance(version.id);
    yield instance.start();
    let date = new Date(new Date().getTime() + 1000 * 20);
    yield instance.sendEvent('init', {date: date, deadlineId: 1, now: new Date()});
}).catch((err)=> console.log(err));
