/**
 * Created by Ricardo Morais on 13/04/2017.
 */
let fsmEngine = require("../index")('mysql', 'localhost', 'root', 'root', 'mydatabase');

fsmEngine.meta.sequelize.sync().then(function() {
    fsmEngine.makeInstancePromise(1).then((instance) => {
        instance.start().then();
    });
});
