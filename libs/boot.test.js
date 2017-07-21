import https from 'https';
import debugInit from 'debug';
import fs from 'fs';
const debug = debugInit('boot.test');

module.exports = function (app) {
  const credentials = {
    key: fs.readFileSync('ntask.key', 'utf8'),
    cert: fs.readFileSync('ntask.cert', 'utf8'),
  };
  app.db.sequelize.sync({ force: true }).done(() => {
    app.engine.init(process.env.CLONE_URL,
      process.env.PUBLIC_KEY, process.env.PRIVATE_KEY, process.env.PASSPHRASE)
      .then(() => {
        debug('Engine was initialized');
        https.createServer(credentials, app)
          .listen(app.get('port'), () => {
            // The server needs to be operational in order to bind the port within 90 seconds
            // Therefore since the engine init is an expensive operation,
            // we initialize the server first.

          });
      });
  });
};
