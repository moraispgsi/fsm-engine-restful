/**
 * Created by Ricardo Morais on 16/05/2017.
 */
module.exports = function (app, engine) {
    let co = require("co");
    app.post('/API/global/sendEvent', function (req, res) {
        co(function*() {
            try {
                yield engine.sendGlobalEvent(req.body.event, req.body.data);
                res.sendStatus(200);
            } catch (err) {
                res.json({error: err});
            }
        }).then();
    });
};
