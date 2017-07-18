import https from 'https';
import fs from 'fs';
process.env.DEBUG = 'boot';
import debugInit from 'debug';


const debug = debugInit('boot');

module.exports = app => {
  debug('wtf');
  if (process.env.NODE_ENV === 'production') {
    const credentials = {
      key: fs.readFileSync('ntask.key', 'utf8'),
      cert: fs.readFileSync('ntask.cert', 'utf8'),
    };
    app.db.sequelize.sync().done(() => {
      https.createServer(credentials, app)
        .listen(app.get('port'), () => {
          // The server needs to be operational in order to bind the port within 90 seconds
          // Therefore since the engine init is an expensive operation,
          // we initialize the server first.
          app.engine.init(process.env.CLONE_URL,
            process.env.PUBLIC_KEY, process.env.PRIVATE_KEY, process.env.PASSPHRASE)
            .then(() => {
              debug('Engine was initialized');
            });
        });
    });
  } else if (process.env.NODE_ENV !== 'test') {
    const credentials = {
      key: fs.readFileSync('ntask.key', 'utf8'),
      cert: fs.readFileSync('ntask.cert', 'utf8'),
    };
    app.db.sequelize.sync().done(() => {
      https.createServer(credentials, app)
        .listen(app.get('port'), () => {
          // The server needs to be operational in order to bind the port within 90 seconds
          // Therefore since the engine init is an expensive operation,
          // we initialize the server first.
          app.engine.init(process.env.CLONE_URL,
            process.env.PUBLIC_KEY, process.env.PRIVATE_KEY, process.env.PASSPHRASE)
            .then(() => {
              debug('Engine was initialized');
            });
        });
    });
  } else {
    const credentials = {
      key: fs.readFileSync('ntask.key', 'utf8'),
      cert: fs.readFileSync('ntask.cert', 'utf8'),
    };
    app.db.sequelize.sync().done(() => {
      https.createServer(credentials, app)
        .listen(app.get('port'), () => {
          // The server needs to be operational in order to bind the port within 90 seconds
          // Therefore since the engine init is an expensive operation,
          // we initialize the server first.
          app.engine.init(process.env.CLONE_URL,
            process.env.PUBLIC_KEY, process.env.PRIVATE_KEY, process.env.PASSPHRASE)
            .then(() => {
              debug('Engine was initialized');
            });
        });
    });
  }
};