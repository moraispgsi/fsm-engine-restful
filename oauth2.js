
module.exports = function(app) {

    const OAuth2Server = require('oauth2-server');

    app.oauth = OAuth2Server({
        model: require('./model.js'),
            grants: ['password', 'client_credentials'],
        debug: true
    });

    app.all('/oauth/token', app.oauth.grant());

    app.get('/', app.oauth.authorise(), function (req, res) {
        res.send('Congratulations, you are in a secret area!');
    });

    app.use(app.oauth.errorHandler());

};