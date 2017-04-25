/**
 * Created by Ricardo Morais on 13/04/2017.
 */
let co = require('co');
let init = require("../index");

co(function*(){
    let fsmEngine = yield init('mysql', 'localhost', 'root', 'root', 'mydatabase');
    // yield fsmEngine.makeInstancePromise(1);
    let instance = fsmEngine.getInstance(1);
    // yield instance.start();
    yield instance.sendEvent('Event1');
    // instance.sc.gen("expired")
}).then();
