/**
 * Created by Ricardo Morais on 21/05/2017.
 */

module.exports = function (app, engine) {
    let co = require("co");
    let ejs = require('ejs');

    app.get('/backoffice/statemachines', function (req, res) {
        co(function*(){
            ejs.renderFile("public/statemachines.ejs", null, null, function (err, html) {
                if (err) {
                    res.sendStatus(400);
                    return;
                }
                res.send(html);
            });
        }).then().catch((err)=> {
            console.log(err);
            res.json({error: err});
        });
    });

    app.get('/backoffice/statemachine', function (req, res) {
        co(function*(){
            let data = {
                id: req.query.id,
                fsm: JSON.stringify(yield engine.getFsmById(req.query.id))
            };
            ejs.renderFile("public/statemachine.ejs", data, null, function (err, html) {
                if (err) {
                    res.sendStatus(400);
                    return;
                }
                res.send(html);
            });
        }).then().catch((err)=> {
            console.log(err);
            res.json({error: err});
        });
    });
};
