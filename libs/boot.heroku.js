
import vantageInit from './vantageInit';
import debugInit from 'debug';
const debug = debugInit('boot.heroku');

module.exports = function (app) {
  app.db.sequelize.sync().done(() => {
    const server = app.vantage
      .delimiter('fsm-engine-restful > ')
      .listen(app, {
        port: app.get('port'),
      });
    vantageInit(app, server);
    debug('Server listening on port: ' + app.get('port'));
    app.engine.init(process.env.CLONE_URL,
      process.env.PUBLIC_KEY, process.env.PRIVATE_KEY, process.env.PASSPHRASE)
      .then(() => {
        debug('Engine was initialized');
      });
  });
};
